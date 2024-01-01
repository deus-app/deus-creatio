import type { AppModel } from '$/commonTypesWithClient/appModels';
import { githubRepo } from '$/domain/app/repository/githubRepo';
import { llmRepo } from '$/domain/app/repository/llmRepo';
import { localGitRepo } from '$/domain/app/repository/localGitRepo';
import { railwayRepo } from '$/domain/app/repository/railwayRepo';
import { appUseCase } from '$/domain/app/useCase/appUseCase';
import { transaction } from '$/service/prismaClient';
import { customAssert } from '$/service/returnStatus';
import type { Prisma } from '@prisma/client';
import type { AppEventType, SubscriberId } from '../model/appEventModels';
import { appEventMethods, appSubscriberDict } from '../model/appEventModels';
import { appEventQuery } from '../query/appEventQuery';
import { appEventRepo } from '../repository/appEventRepo';

let isCreatingGitHub = false;
let isCreatingRailway = false;
let isStartingDevelopment = false;

const subscribe = async (tx: Prisma.TransactionClient, subscriberId: SubscriberId) => {
  const failed = await appEventQuery.findHead(tx, subscriberId, 'failed');

  if (failed !== null) {
    const published = appEventMethods.publish(failed);
    await appEventRepo.save(tx, published);

    return published;
  } else {
    const waiting = await appEventQuery.findHead(tx, subscriberId, 'waiting');

    if (waiting === null) return null;

    const published = appEventMethods.publish(waiting);
    await appEventRepo.save(tx, published);

    return published;
  }
};

const develop = async (app: AppModel) => {
  const localGit = await localGitRepo.getFiles(app);
  const gitDiff = await llmRepo.initApp(app, localGit);
  if (gitDiff !== null) {
    await localGitRepo.pushToRemote(app, gitDiff);
    await appUseCase.pushedGitDiff(app, gitDiff);
  }
};

export const appEventUseCase = {
  dispach: async (tx: Prisma.TransactionClient, type: AppEventType, app: AppModel) => {
    const events = appEventMethods.create(type, app);
    await Promise.all(events.map((ev) => appEventRepo.save(tx, ev)));

    const subs = appSubscriberDict()[type];
    events.forEach((ev) => subs.find((sub) => sub.id === ev.subscriberId)?.fn());
  },
  createGitHub: async () => {
    if (isCreatingGitHub) return;
    isCreatingGitHub = true;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const published = await transaction('RepeatableRead', async (tx) => {
        const published = await subscribe(tx, 'createGitHub');

        if (published === null) return null;

        if (published.app.status === 'waiting') {
          customAssert(published.app.status === 'waiting', 'エラーならロジック修正必須');

          const inited = await appUseCase.init(tx, published.app);
          return { ...published, app: inited };
        }

        return published;
      });

      if (published === null) break;

      customAssert(published.app.status === 'init', 'エラーならロジック修正必須');

      await githubRepo
        .create(published.app)
        .then(() =>
          transaction('RepeatableRead', async (tx) => {
            const event = await appEventQuery.findByIdOrThrow(tx, published.id);
            await appEventRepo.save(tx, appEventMethods.complete(event));

            customAssert(event.app.status === 'init', 'エラーならロジック修正必須');
            await appUseCase.completeGitHubInit(tx, event.app);
          })
        )
        .catch(() =>
          transaction('RepeatableRead', async (tx) => {
            const event = await appEventQuery.findByIdOrThrow(tx, published.id);
            await appEventRepo.save(tx, appEventMethods.fail(event));
          })
        );
    }

    isCreatingGitHub = false;
  },
  createRailway: async () => {
    if (isCreatingRailway) return;
    isCreatingRailway = true;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const published = await transaction('RepeatableRead', (tx) => subscribe(tx, 'createRailway'));

      if (published === null) break;

      customAssert(published.app.status === 'init', 'エラーならロジック修正必須');

      await railwayRepo
        .create(published.app)
        .then((railway) =>
          transaction('RepeatableRead', async (tx) => {
            const event = await appEventQuery.findByIdOrThrow(tx, published.id);
            await appEventRepo.save(tx, appEventMethods.complete(event));

            customAssert(event.app.status === 'init', 'エラーならロジック修正必須');
            await appUseCase.completeRailwayInit(tx, event.app, railway);
          })
        )
        .catch(() =>
          transaction('RepeatableRead', async (tx) => {
            const event = await appEventQuery.findByIdOrThrow(tx, published.id);
            await appEventRepo.save(tx, appEventMethods.fail(event));
          })
        );
    }

    isCreatingRailway = false;
  },
  startDevelopment: async () => {
    if (isStartingDevelopment) return;
    isStartingDevelopment = true;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const published = await transaction('RepeatableRead', (tx) =>
        subscribe(tx, 'startDevelopment')
      );

      if (published === null) break;

      await develop(published.app)
        .then(() =>
          transaction('RepeatableRead', async (tx) => {
            const event = await appEventQuery.findByIdOrThrow(tx, published.id);
            await appEventRepo.save(tx, appEventMethods.complete(event));
          })
        )
        .catch(() =>
          transaction('RepeatableRead', async (tx) => {
            const event = await appEventQuery.findByIdOrThrow(tx, published.id);
            await appEventRepo.save(tx, appEventMethods.fail(event));
          })
        );
    }

    isStartingDevelopment = false;
  },
};
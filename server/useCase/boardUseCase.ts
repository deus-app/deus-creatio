import playwright from 'playwright';
import puppeteer from 'puppeteer';
import type { UserId } from '../commonTypesWithClient/branded';
export type BoardArr = number[][];

let board: BoardArr = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 1, 2, 3, 0, 0],
  [0, 0, 3, 2, 1, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
puppeteer;
const directions: number[][] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
];

const clearNewBoard = () => {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      board[y][x] = board[y][x] % 3; // 3 -> 0にしている
    }
  }
};
const flipPiece = (x: number, y: number, type: boolean, color: number, w: number[], i: number) => {
  if (type) {
    board[y][x] = color;
    for (let z = 1; z < i; z++) {
      board[y + w[0] * z][x + w[1] * z] = color;
    }
  } else {
    if (board[y][x] === 0) {
      board[y][x] = 3;
    }
  }
};
const isContinue = (i: number, x: number, y: number, color: number, w: number[]): boolean => {
  return board[y + w[0] * i] !== undefined && board[y + w[0] * i][x + w[1] * i] === 3 - color;
};

const isBreak = (i: number, x: number, y: number, w: number[]): boolean => {
  return (
    board[y + w[0] * i] === undefined ||
    board[x + w[1] * i] === undefined ||
    board[y + w[0] * i][x + w[1] * i] % 3 === 0
  );
};

const flipPiece2 = (x: number, y: number, type: boolean, color: number, w: number[]) => {
  for (let i = 2; i < 9; i++) {
    if (isContinue(i, x, y, color, w)) {
      continue;
    } else if (isBreak(i, x, y, w)) {
      break;
    } else {
      flipPiece(x, y, type, color, w, i);
    }
  }
};

const changeBoard = (x: number, y: number, type: boolean, color: number) => {
  if (board[y][x] === 0) {
    for (const w of directions) {
      if (board[y + w[0]] !== undefined && board[y + w[0]][x + w[1]] === 3 - color) {
        // 隣が相手の色だったら
        flipPiece2(x, y, type, color, w);
      }
    }
  }
};
const updateBoard = (color: number) => {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      changeBoard(x, y, false, color);
    }
  }
};

const countCandidates = () => {
  let candidate = 0;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (board[y][x] === 3) {
        candidate++;
      }
    }
  }
  return candidate;
};

const countthree = () => {
  const positions: number[][] = [];
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 3) {
        positions.push([y, x]);
      }
    }
  }
  // console.log(positions);

  const getRandomPosition = (positions: number[][]): number[] => {
    const randomIndex = Math.floor(Math.random() * positions.length);
    return positions[randomIndex];
  };
  // console.log(getRandomPosition(positions));
  return getRandomPosition(positions);
};
const turn = 1;
let randomPosition = countthree();
let count = 0;

const advanceBoard = (
  advancey: number,
  advancex: number,
  turnclour: number,
  recursive: boolean
) => {
  if (onoff === 1) {
    let pass = 0;
    let turn = turnclour;
    const handlePass = () => {
      console.log('パス');
      pass++;
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          changeBoard(x, y, false, turnclour);
        }
      }
      turn = 3 - turnclour;
    };
    let turn1 = 1;
    turn1 = 3 - turnclour;
    const Pass = () => {
      const candidate = countCandidates();
      if (candidate !== 0) {
        console.log('ゲーム続行');
        pass = 0;
        turn = turnclour;
      } else {
        handlePass();
      }
    };
    turn = 3 - turnclour;
    clearNewBoard();
    changeBoard(advancex, advancey, true, turnclour);
    updateBoard(3 - turnclour);
    Pass();
    const candidate = countCandidates();
    // count++;
    // if (recursive && count <= 10) {
    if (recursive && candidate !== 0) {
      const randomPosition = countthree();
      console.log('こっち来ている');
      console.log(randomPosition);
      //スクリーンショットを撮影
      getscreenshot();
      //ツイート
      // advanceBoard(randomPosition[0], randomPosition[1], turn1, true);
      setTimeout(function () {
        advanceBoard(randomPosition[0], randomPosition[1], turn1, true);
      }, 3000);
    }
    // board[params.y][params.x] = params.turn;
    return { board, turn };
  }
  return { board, turn };
};

let onoff = 0;

export const boardUseCace = {
  getBoard: () => board,
  clickBoard: async (params: { x: number; y: number; turn: number }, userId: UserId) => {
    onoff = 1;
    return advanceBoard(params.y, params.x, params.turn, false);
  },

  resetBoard: () => {
    board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 3, 0, 0, 0],
      [0, 0, 0, 1, 2, 3, 0, 0],
      [0, 0, 3, 2, 1, 0, 0, 0],
      [0, 0, 0, 3, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    count = 0;
    onoff = 0;
    randomPosition = [];
    return board;
  },

  startBoard: async () => {
    onoff = 1;
    randomPosition = countthree();
    // console.log('1');
    //スタートボタンと同時にTwitterと会話画面起動
    /*gettwitter();
    startconversation();*/
    advanceBoard(randomPosition[0], randomPosition[1], turn, true);
  },
};
/*
const gettwitter = async () => {
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://twitter.com/home');
  await page.goto('https://twitter.com/login');
  await page.goto('https://twitter.com/i/flow/login');
  await page.getByLabel('電話番号/メールアドレス/ユーザー名').click();
  await page.getByLabel('電話番号/メールアドレス/ユーザー名').fill('ini5thji');
  await page.getByLabel('電話番号/メールアドレス/ユーザー名').press('Enter');
  await page.getByLabel('パスワード', { exact: true }).fill('iniad5thjissyuu');
  await page.getByLabel('パスワード', { exact: true }).press('Enter');
  return page;
};

const tweetscreenshot = async () => {
  // ここで写真を追加
  const page = await gettwitter();
  await page.getByLabel('Add photos or video').click();
  const file = await page.waitForSelector('input[type="file"]');
  await file.setInputFiles('/Users/iniad/Documents/TS/alan/othello_turn.png');
  await page.getByTestId('tweetButtonInline').click();
};

const startconversation = async () => {
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3000/conversation/');
};
*/
const getscreenshot = async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000');
  await page.waitForNavigation();
  await page.screenshot({ path: `othello_turn.png` });

  await browser.close();
};

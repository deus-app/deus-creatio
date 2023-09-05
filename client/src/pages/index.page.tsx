import { CloseOutlined } from '@ant-design/icons';
import type { DolanModel } from 'commonTypesWithClient/models';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

// aaaa
const Home = () => {
  // const [user] = useAtom(userAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayedOutput = output.substring(0, currentIndex);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<{ [key: number]: boolean }>({});
  const [messages, setMessages] = useState<DolanModel[]>([]);
  const [expanded, setExpanded] = useState<number>(-1);
  const [inputValue, setInputValue] = useState<string>('');
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const user = 'nisinoanase';

  const postRaspi = async () => {
    console.log('押した');
    const response = await apiClient.raspi.$post({ body: { id: user } });
    console.log('1', response);
  };

  const postLangchain = async () => {
    const response1 = await apiClient.aaaaa.$post({ body: { message: inputValue } });
    console.log(response1?.toString());
  };

  // const fetchDolan = useCallback(async () => {
  //   if (!user) {
  //     console.error('User is null or undefined!');
  //     return;
  //   }
  //   const getDlanMessage = await apiClient.dolan.$post({ body: { id: user.id } });
  //   setMessages(getDlanMessage);
  // }, [user]);

  // useEffect(() => {
  //   fetchDolan();
  //   const intervalId = setInterval(fetchDolan, 100);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [fetchDolan]);

  // const handleItemClick = (index: number) => {
  //   setValues((prev) => ({
  //     ...prev,
  //     [index]: !prev[index],
  //   }));
  // };

  // const PostDolan = async () => {
  //   if (!user) {
  //     console.error('User is null or undefined!');
  //     return;
  //   }
  //   setCurrentIndex(0);
  //   setIsModalOpen(false);
  //   setOutput('読み込み中...');
  //   console.log('押した');
  //   const response = await apiClient.langchain.$post({
  //     body: { id: user.id, values, message: inputValue },
  //   });
  //   setOutput(response.toString());
  //   console.log(response);
  //   setInputValue('');
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (currentIndex < output.length) {
  //       setCurrentIndex((prev) => prev + 1);
  //       if (quoteRef.current) {
  //         quoteRef.current.scrollTop = quoteRef.current.scrollHeight;
  //       }
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, [currentIndex, output]);

  return (
    <div className={styles.container}>
      <div className={styles.conversationList}>
        {messages
          .slice()
          .reverse()
          .map((message, index) => (
            <div className={styles.messageBox} key={index}>
              <div style={{ maxHeight: expanded === index ? 'none' : '100px', overflow: 'hidden' }}>
                {message.message}
              </div>
              {message.message.length > 40 && expanded !== index && (
                <button onClick={() => setExpanded(index)}>read more</button>
              )}
              {expanded === index && <button onClick={() => setExpanded(-1)}>close</button>}
            </div>
          ))}
      </div>
      <div className={styles.gridContainer}>
        {/* {[...Array(8)].map((_, index) => (
          <div key={index} className={styles.gridItem} onClick={() => handleItemClick(index)}>
            <div className={styles.switchCover}>
              <Switch
                style={{
                  backgroundColor: '#a8a8a8 ',
                }}
                checkedChildren={<span style={{ backgroundColor: '#a8a8a8' }}>ON</span>}
              />
            </div>
            {index === 0 && (
              <div className={styles.FontAwesomeIconCover}>
                <FontAwesomeIcon icon={faBook} color="white" size="4x" />
              </div>
            )}
            {index === 1 && (
              <div className={styles.FontAwesomeIconCover}>
                <FontAwesomeIcon icon={faCloudSun} color="white" size="4x" />
              </div>
            )}
            {index === 2 && (
              <div className={styles.FontAwesomeIconCover}>
                <FontAwesomeIcon icon={faUtensils} color="white" size="4x" />
              </div>
            )}
          </div>
        ))} */}
      </div>
      <button className={styles.buttonAskDoraemon} onClick={() => setIsModalOpen(true)}>
        {/* <button className={styles.buttonAskDoraemon} onClick={() => postRaspi()}> */}
        教えてDOLAN
      </button>
      <div className={styles.doraemonImage} />
      <div ref={quoteRef} className={styles.quote}>
        {displayedOutput}
      </div>
      <div className={styles.dolanLabel}>DOLAN</div>
      {isModalOpen && (
        <div className={styles.overlay}>
          <div className={styles.inputModal}>
            <input
              type="text"
              className={styles.inputarea}
              placeholder="ここに質問を入力"
              value={inputValue} // stateをinputのvalueにバインド
              onChange={handleInputChange} // 入力が変わるたびにhandleInputChangeを呼ぶ
            />
            <button className={styles.sendButton} onClick={postLangchain}>
              送信
            </button>
            <div className={styles.closeButton}>
              <CloseOutlined onClick={() => setIsModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

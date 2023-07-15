'use client';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import { useRouter, useParams } from 'next/navigation';
import lottie from 'lottie-web';

import { DOMAIN_BE_PROD, TYPE_MYPAGE, DOMAIN_BE_DEV } from '@/constants/constant';
import { getHeaders } from '@/utils/util';

import styles from './index.module.css';
import QuestionAndAnswer from '@/components/QuestionAndAnswer';
import Footer from '../../components/Footer';
import animationData_1 from './loading_1.json';

export default function TestOn() {
  const router = useRouter();
  const containerRef_1 = useRef(null);
  const params = useParams();

  let [testData, setTestData] = useState({});
  let [qstStageIdx, setQstStageIdx] = useState(1);
  let [score, setScore] = useState([]);
  let [testDone, setTestDone] = useState({
    state: false,
    lastClick: false,
  });
  let [putArr, setPutArr] = useState([]);

  const barClassName = styles[`gaugeBar_${qstStageIdx}`];

  useEffect(() => {
    const headers = getHeaders();
    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/tests/test/${params.testId}`, { headers })
      .then((res) => {
        setTestData(res.data);
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
      });

    const anim = lottie.loadAnimation({
      container: containerRef_1.current,
      renderer: 'svg',
      animationData: animationData_1,
      loop: true,
      autoplay: true,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  useEffect(() => {
    let timer;
    if (testDone.lastClick) {
      timer = setTimeout(() => {
        setTestDone((prev) => ({ ...prev, state: true }));
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [testDone.lastClick]);

  useEffect(() => {
    if (testDone.state) {
      sessionStorage.setItem('mbScore', JSON.stringify(score));
      return router.push(`/result/${params.testId}`);
    }
  }, [testDone.state]);

  function clickGoBack() {
    putArr[qstStageIdx - 1] = 0;
    setPutArr([...putArr]);
    setQstStageIdx(qstStageIdx - 1);
  }

  function makeScore() {
    setTestDone((prev) => ({ ...prev, lastClick: true }));

    const part_1 = putArr[1] + putArr[2] + putArr[3];
    const part_2 = putArr[4] + putArr[5] + putArr[6];
    const part_3 = putArr[7] + putArr[8] + putArr[9];
    const part_4 = putArr[10] + putArr[11] + putArr[12];

    setScore([part_1, part_2, part_3, part_4]);
  }

  function clickAnswer_plus() {
    putArr[qstStageIdx] = 1;
    setPutArr([...putArr]);
    if (qstStageIdx !== 12) setQstStageIdx(qstStageIdx + 1);
    if (qstStageIdx === 12) makeScore();
  }

  function clickAnswer_minus() {
    putArr[qstStageIdx] = -1;
    setPutArr([...putArr]);
    if (qstStageIdx !== 12) setQstStageIdx(qstStageIdx + 1);
    if (qstStageIdx === 12) makeScore();
  }

  return (
    <div
      className={cx(styles.wrap, {
        [styles.noClick]: testDone.lastClick,
      })}
    >
      <div className={styles.progressContentWrap}>
        <div className={styles.progressWrap}>
          <div className={styles.barWrap}>
            <div></div>
            <div
              className={cx(barClassName, {
                [styles.gaugeBar_13]: testDone.lastClick,
              })}
            ></div>
          </div>
          <span>{`질문 ${qstStageIdx} /`}</span>
          <span>12</span>
        </div>
      </div>

      {testData.questions ? (
        testData.questions.map(
          (q, i) =>
            qstStageIdx === q.index + 1 && (
              <QuestionAndAnswer
                key={i}
                q_idx={q.index}
                q_str={q.question}
                a_str_1={q.answerPlus}
                a_str_2={q.answerMinus}
                clickAnswer_plus={clickAnswer_plus}
                clickAnswer_minus={clickAnswer_minus}
                clickGoBack={clickGoBack}
              />
            ),
        )
      ) : (
        <div className={styles.loadImgWrap_1}>
          <div ref={containerRef_1}></div>
        </div>
      )}
      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer type={TYPE_MYPAGE} />
      </div>
    </div>
  );
}

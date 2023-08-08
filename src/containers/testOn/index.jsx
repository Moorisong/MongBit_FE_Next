'use client';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import { useRouter, useParams } from 'next/navigation';
import lottie from 'lottie-web';

import { DOMAIN_BE_PROD, TYPE_MYPAGE } from '@/constants/constant';
import { getHeaders, setUTMParameter, addDailyVisitCount } from '@/utils/util';

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

  const totalQuestionNumber = testData.questions ? testData.questions.length : ' loading';

  useEffect(() => {
    addDailyVisitCount();
  }, []);

  useEffect(() => {
    setUTMParameter(router);

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
      sessionStorage.setItem('mbTestDone', true);
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
    if (qstStageIdx !== totalQuestionNumber) setQstStageIdx(qstStageIdx + 1);
    if (qstStageIdx === totalQuestionNumber) makeScore();
  }

  function clickAnswer_minus() {
    putArr[qstStageIdx] = -1;
    setPutArr([...putArr]);
    if (qstStageIdx !== totalQuestionNumber) setQstStageIdx(qstStageIdx + 1);
    if (qstStageIdx === totalQuestionNumber) makeScore();
  }

  function calculateWidth(index) {
    if (index === 1) return '0%';
    if (testDone.lastClick) return '100%';

    const percentage = ((index - 1) / totalQuestionNumber) * 100;
    return `${percentage}%`;
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
            <div className={styles.gaugeBar} style={{ width: calculateWidth(qstStageIdx) }}></div>
          </div>
          <span>{`질문 ${qstStageIdx} /`}</span>
          <span>{totalQuestionNumber}</span>
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

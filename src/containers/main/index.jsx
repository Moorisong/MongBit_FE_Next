'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import lottie from 'lottie-web';
import { useRecoilState } from 'recoil';

import { showCoupangClickWrap } from '/atom.js';

import { getHeaders, setUTMParameter, addDailyVisitCount } from '@/utils/util';
import { TITLE_WITH_CONTENT, TYPE_LATEST_MAIN } from '@/constants/constant';
import { apiBe } from '@/services';

import styles from './index.module.css';
import animationData_1 from './loading_1.json';
import Footer from '@/components/Footer';
import { TitleWithText } from '@/components/Titles';
import { TestCard } from '@/components/TestCard';
import { GoRandomStartBtn } from '@/components/ButtonSets';

export default function main() {
  // Test 삭제
  // useEffect(()=>{
  //   const headers = getHeaders()
  //   apiBe.delete(`/api/v1/tests/test/649e4baa11bc25457a51f534`, {headers})
  //   .then((res)=>{
  //     console.log('r--> ', res)
  //   })
  // }, [])

  const router = useRouter();
  const containerRef_1 = useRef(null);
  const [latestTestData, setLatestTestData] = useState({
    testArr: [],
  });
  const [, setGlobalCoupangState] = useRecoilState(showCoupangClickWrap);

  useEffect(() => {
    addDailyVisitCount();
  }, []);

  useEffect(() => {
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
    setUTMParameter(router);
    setGlobalCoupangState(false);

    sessionStorage.getItem('mbResult') === '' && sessionStorage.removeItem('mbResult');
    sessionStorage.getItem('mbTest') === '' && sessionStorage.removeItem('mbTest');

    const headers = getHeaders();
    apiBe.get(`/api/v1/tests/0/6`, { headers }).then((res) => {
      setLatestTestData((prev) => ({
        ...prev,
        testArr: res.data.testCoverDTOList,
      }));
    });
  }, []);

  return (
    <div className={styles.containerWrap}>
      <TitleWithText
        title="👀 랜덤 심리테스트"
        content="고민할 틈은 안줄테니 일단 플레이하고 생각하기"
        type_1={TITLE_WITH_CONTENT}
      />

      <GoRandomStartBtn url="/test/random" str="아무거나 시작" />
      <div className={styles.testWrap}>
        <TitleWithText title="🌟 심테의 근본, MBTI 검사" />
        <TestCard
          thumbnailStr="신속하고 아마도 정확한 퀵 MBTI!"
          testId="649a7bccaa04db61384808c5"
          thumbnailUri="https://i.ibb.co/GJ08BC3/quick-mbti-cover.png"
        />

        <div className={styles.miniTestWrap}>
          <TitleWithText title="💙 최신 심테" />
          <div className={styles.latesCardWrap}>
            {latestTestData.testArr.length > 0 ? (
              latestTestData.testArr.map((t, i) => (
                <TestCard
                  key={i}
                  thumbnailStr={t.title}
                  type={TYPE_LATEST_MAIN}
                  testId={t.id}
                  thumbnailUri={t.imageUrl}
                  playCnt={t.playCount}
                />
              ))
            ) : (
              <div className={styles.loadImgWrap_1}>
                <div ref={containerRef_1}></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

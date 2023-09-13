'use client';
import lottie from 'lottie-web';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { getHeaders, setUTMParameter, addDailyVisitCount } from '@/utils/util';
import { apiBe } from '@/services';

import styles from './index.module.css';
import Footer from '@/components/Footer';
import TestResult from '@/components/TestResult';
import animationData from './loading_1.json';

export default function ViewOldResult() {
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  const containerRef = useRef(null);

  useEffect(() => {
    addDailyVisitCount();
  }, []);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      animationData: animationData,
      loop: true,
      autoplay: true,
    });

    window.scrollTo(0, 0);

    return () => {
      anim.destroy();
    };
  }, []);

  useEffect(() => {
    setUTMParameter(router);

    const headers = getHeaders();
    apiBe.get(`/api/v1/tests/test/test-result/${params.testId}/${params.testResultId}`, { headers }).then((res) => {
      setTestData(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <div className={styles.wrap}>
      {loading && (
        <div className={styles.loadImgWrap}>
          <div ref={containerRef} className={styles.loadImg}></div>
        </div>
      )}

      {loading || (
        <TestResult
          titleStr={testData.title}
          contentStrArr={testData.content.split('<br>')}
          likeCnt={testData.likeCnt}
          testId={params.testId}
          imgUri={testData.imageUrl}
        />
      )}

      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}

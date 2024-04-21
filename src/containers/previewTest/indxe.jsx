'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import lottie from 'lottie-web';

import { getHeaders, addDailyVisitCount } from '@/utils/util';
import { apiBe } from '@/services';

import animationData from './loadingIcon.json';
import Footer from '../../components/Footer';
import TestPreview from '../../components/TestPreview';
import styles from './index.module.css';

export default function PreviewTest() {
  const params = useParams();
  const [data, setData] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    addDailyVisitCount();
  }, []);

  useEffect(() => {
    const headers = getHeaders();
    apiBe.get(`/api/v1/tests/test/${params.testId}`, { headers }).then((res) => {
      setData(res.data.test);
    });
  }, []);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      animationData: animationData,
      loop: true,
      autoplay: true,
    });

    return () => {
      anim.destroy();
    };
  }, [data.imageUrl]);
  return (
    <div className={styles.wrap}>
      {data.imageUrl ? (
        <TestPreview
          testId={params.testId}
          thumbnailStr={data.title}
          playCnt={data.playCount}
          description={data.content}
          thumbnailUri={data.imageUrl}
        />
      ) : (
        <div className={styles.loadImgWrap}>
          <div ref={containerRef}></div>
        </div>
      )}

      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}

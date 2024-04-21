'use client';
import { useEffect, useState, useRef } from 'react';
import lottie from 'lottie-web';

import { getHeaders, addDailyVisitCount } from '@/utils/util';
import { apiBe } from '@/services';

import animationData_1 from './loading_2.json';
import TestPreview from '../../components/TestPreview';
import Footer from '../../components/Footer';
import styles from './index.module.css';

export default function RandomTest() {
  const [thumbnailStr, setThumbnailStr] = useState('');
  const [playCnt, setPlayCnt] = useState(0);
  const [description, setDescription] = useState('');
  const [thumbnailUri, setThumbnailUri] = useState('');
  const [testId, setTestId] = useState('');
  const containerRef_1 = useRef(null);

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

    const headers = getHeaders();
    apiBe.get(`/api/v1/tests/random`, { headers }).then((res) => {
      setThumbnailStr(res.data.title);
      setPlayCnt(res.data.playCount);
      setDescription(res.data.content);
      setThumbnailUri(res.data.imageUrl);
      setTestId(res.data.id);
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <div className={styles.wrap}>
      {description ? (
        <TestPreview
          testId={testId}
          thumbnailStr={thumbnailStr}
          playCnt={playCnt}
          description={description}
          thumbnailUri={thumbnailUri}
        />
      ) : (
        <div className={styles.loadImgWrap_1}>
          <div ref={containerRef_1}></div>
        </div>
      )}
      <Footer />
    </div>
  );
}

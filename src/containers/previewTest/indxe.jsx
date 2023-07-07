'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import lottie from 'lottie-web';

import animationData from './loadingIcon.json';
import Footer from '../../components/Footer';
import TestPreview from '../../components/TestPreview';
import styles from './index.module.css';
import { DOMAIN_BE_PROD, DOMAIN_BE_DEV } from '../../constants/constant';

import { getHeaders } from '@/utils/util';

export default function PreviewTest() {
  const params = useParams();
  const [data, setData] = useState({});
  const containerRef = useRef(null);
  const router = useRouter();
  const headers = getHeaders();

  useEffect(() => {
    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/tests/test/${params.testId}`, { headers })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
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

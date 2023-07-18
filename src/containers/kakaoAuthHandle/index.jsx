'use client';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import lottie from 'lottie-web';

import { getHeaders } from '@/utils/util';
import { DOMAIN_BE_PROD, DOMAIN_BE_DEV, TOKEN_NAME, USER_INFO } from '@/constants/constant';

import animationData_1 from './loading_1.json';
import Footer from '@/components/Footer';
import styles from './index.module.css';

export default function KakaoAuthHandle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef_1 = useRef(null);
  const code = searchParams.get('code');

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
    const headers = getHeaders();
    if (code) {
      axios
        .get(`${DOMAIN_BE_PROD}/login/oauth2/kakao/code?code=${code}`, {
          headers,
        })
        .then((response) => {
          sessionStorage.setItem(TOKEN_NAME, response.headers['authorization']);
          sessionStorage.setItem(USER_INFO + 'memeberId', response.data.memberId);
          sessionStorage.setItem(USER_INFO + 'thumbnail', response.data.thumbnail);
          sessionStorage.setItem(USER_INFO + 'registDate', response.data.registDate);
          sessionStorage.setItem(USER_INFO + 'username', response.data.username);

          const prev = sessionStorage.getItem('ngb');
          if (prev) {
            // 직전 페이지로 이동이 필요한 경우
            sessionStorage.setItem('ngb', false);
            prev.indexOf('need_login') > -1 ? router.back() : router.push(prev);
          } else {
            router.push('/main');
          }
        })
        .catch((err) => {
          alert(err.response.data);
          router.push('/login');
        });
    }
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <div ref={containerRef_1}></div>
      </div>
      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}

'use client';
import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import lottie from 'lottie-web';

import { getHeaders, decodeToken } from '@/utils/util';
import { TOKEN_NAME, USER_INFO } from '@/constants/constant';
import { apiBe } from '@/services';

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
    let headers = getHeaders();
    if (code) {
      apiBe
        .get(`/login/oauth2/kakao/code?code=${code}`, {
          headers,
        })
        .then((response) => {
          sessionStorage.setItem(TOKEN_NAME, response.headers['authorization']);
          sessionStorage.setItem(USER_INFO + 'memeberId', response.data.memberId);
          sessionStorage.setItem(USER_INFO + 'thumbnail', response.data.thumbnail);
          sessionStorage.setItem(USER_INFO + 'registDate', response.data.registDate);
          sessionStorage.setItem(USER_INFO + 'username', response.data.username);

          const prev = sessionStorage.getItem('ngb');

          // 로그인 전 headers -> 토큰 값 없음, 로그인 후 -> headers -> 토큰 값 있음
          // 그러므로 getHeaders 함수를 한번 더 호출해준다.
          headers = getHeaders();

          // 로그인 트랙킹 api 호출
          if (!decodeToken().role || decodeToken().role === 'ROLE_USER') {
            apiBe.post(`/api/v1/loginTracker/${response.data.memberId}/track`, {}, { headers });
          }

          if (prev) {
            // 직전 페이지로 이동이 필요한 경우
            sessionStorage.setItem('ngb', false);
            prev.indexOf('need_login') > -1 ? router.back() : router.push(prev);
          } else {
            router.push('/');
          }
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

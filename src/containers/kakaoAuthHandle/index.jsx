'use client';
import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import lottie from 'lottie-web';
import { useRecoilState, useRecoilValue } from 'recoil';

import { getHeaders, decodeToken, goPage } from '@/utils/util';
import { LOGIN } from '@/constants/constant';
import { apiBe } from '@/services';
import { atomlogInState, selectorLogInState } from '@/recoil/atoms.js';

import animationData_1 from './loading_1.json';
import styles from './index.module.css';

export default function KakaoAuthHandle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef_1 = useRef(null);
  const code = searchParams.get('code');

  const [logInAtom, setLogInAtom] = useRecoilState(atomlogInState);
  const logInSelector = useRecoilValue(selectorLogInState);

  const updateLogInState = (response) => {
    setLogInAtom({
      ...atomlogInState,
      goPage: {
        url: '/',
      },
      [LOGIN.TOKEN_NAME]: response.headers['authorization'],
      [LOGIN.USER_MEMBER_ID]: response.data.memberId,
      [LOGIN.USER_THUMBNAIL]: response.data.thumbnail,
      [LOGIN.USER_REGISTER_DATE]: response.data.registDate,
      [LOGIN.USER_USER_NAME]: response.data.username,
    });
  };

  const goMainPage = () => {
    goPage(logInSelector, router);
    clearGoPageState(setLogInAtom, logInAtom);
  };

  const clearGoPageState = () => {
    setLogInAtom({
      ...logInAtom,
      goPage: false,
    });
  };

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
          updateLogInState(response);

          // 로그인 전 headers -> 토큰 값 없음, 로그인 후 -> headers -> 토큰 값 있음
          // 그러므로 getHeaders 함수를 한번 더 호출해준다.
          headers = getHeaders();

          // 어드민
          // 로그인 트랙킹 api 호출
          // if (!decodeToken().role || decodeToken().role === 'ROLE_USER') {
          //   apiBe.post(`/api/v1/loginTracker/${response.data.memberId}/track`, {}, { headers });
          // }
        });
    }
  }, []);

  useEffect(() => {
    if (logInAtom.goPage) goMainPage();
  }, [logInAtom.goPage]);

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <div ref={containerRef_1}></div>
      </div>
      <div className={`${styles.bgWhite} ${styles.footerWrap}`}></div>
    </div>
  );
}

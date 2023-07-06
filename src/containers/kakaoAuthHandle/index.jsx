'use client';
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { DOMAIN_BE_PROD, DOMAIN_BE_DEV, TOKEN_NAME, USER_INFO } from '@/constants/constant';

import { getHeaders } from '@/utils/util';

export default function KakaoAuthHandle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

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
    <div>
      <button></button>
    </div>
  );
}

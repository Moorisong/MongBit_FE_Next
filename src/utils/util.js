import jwtDecode from 'jwt-decode';

import { DOMAIN, TOKEN_NAME, USER_INFO, OG_STANDARD_IMAGE } from '../constants/constant';

export function decodeToken() {
  if (typeof sessionStorage === 'undefined') return;
  if (!sessionStorage.getItem(TOKEN_NAME)) {
    return {
      state: false,
    };
  }
  const token = sessionStorage.getItem(TOKEN_NAME);
  const decodedToken = jwtDecode(token);
  const expiration = decodedToken.exp;
  const expirationTime = new Date(expiration * 1000);
  const currentTime = new Date();

  // console.log('decoded-----> ', decodedToken)
  if (expirationTime < currentTime) {
    return {
      state: false,
    };
  } else {
    return {
      state: true,
      role: decodedToken.auth,
    };
  }
}

export function formatTimeDifference(dateString) {
  const currentDate = new Date();
  let targetDate = new Date(dateString);
  targetDate.setHours(targetDate.getHours() + 9);

  const timeDiff = Math.abs(currentDate - targetDate);
  const diffMinutes = Math.floor(timeDiff / (1000 * 60)); // ms를 분 단위로 변환

  if (diffMinutes < 60) {
    if (diffMinutes === 0) return `방금 전`;
    return `${diffMinutes}분 전`;
  } else if (diffMinutes < 24 * 60) {
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours}시간 전`;
  } else if (diffMinutes < 24 * 60 * 7) {
    const diffDays = Math.floor(diffMinutes / (60 * 24));
    return `${diffDays}일 전`;
  } else if (diffMinutes < 24 * 60 * 30) {
    const diffWeeks = Math.floor(diffMinutes / (60 * 24 * 7));
    return `${diffWeeks}주 전`;
  } else if (diffMinutes < 24 * 60 * 30 * 12) {
    const diffMonths = Math.floor(diffMinutes / (60 * 24 * 30));
    return `${diffMonths}개월 전`;
  } else {
    const diffYears = Math.floor(diffMinutes / (60 * 24 * 30 * 12));
    return `${diffYears}년 전`;
  }
}

export function shareToKakaotalk_test(testId, memberId, type, title, description, testImgUri, likeCnt) {
  if (!window.Kakao.isInitialized()) window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: 'MBTI 심테는 "몽빗"에서✨',
      description: title,
      imageUrl: testImgUri,
      link: {
        mobileWebUrl: `${DOMAIN}/test/preview/${testId}`,
        webUrl: `${DOMAIN}/test/preview/${testId}`,
      },
    },
    social: {
      likeCount: likeCnt,
    },
    buttons: [
      {
        title: '테스트 하러 가기',
        link: {
          mobileWebUrl: `${DOMAIN}/test/preview/${testId}`,
          webUrl: `${DOMAIN}/test/preview/${testId}`,
        },
      },
    ],
    serverCallbackArgs: `{"testId": "${testId}", "memberId": "${memberId}", "type": "${type}"}`,
  });
}

export function shareToKakaotalk_result(testId, memberId, type, title, description, resultImgUri, pathName, likeCnt) {
  if (!window.Kakao.isInitialized()) window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '나의 심테 결과는.. 🤔',
      description: title,
      imageUrl: resultImgUri,
      link: {
        // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
        mobileWebUrl: `${DOMAIN}${pathName}`,
        webUrl: `${DOMAIN}${pathName}`,
      },
    },
    social: {
      likeCount: likeCnt,
    },
    buttons: [
      {
        title: '테스트 하기',
        link: {
          mobileWebUrl: `${DOMAIN}/test/preview/${testId}`,
          webUrl: `${DOMAIN}/test/preview/${testId}`,
        },
      },
      {
        title: '결과 보기',
        link: {
          mobileWebUrl: `${DOMAIN}${pathName}`,
          webUrl: `${DOMAIN}${pathName}`,
        },
      },
    ],
    serverCallbackArgs: `{"testId": "${testId}", "memberId": "${memberId}", "type": "${type}"}`,
  });
}

export function clearSessionStorage() {
  sessionStorage.setItem(TOKEN_NAME, '');
  sessionStorage.setItem(USER_INFO + 'memeberId', '');
  sessionStorage.setItem(USER_INFO + 'thumbnail', '');
  sessionStorage.setItem(USER_INFO + 'registDate', '');
  sessionStorage.setItem(USER_INFO + 'username', '');
}

export function getHeaders() {
  if (typeof sessionStorage === 'undefined') return;
  return {
    Authorization: sessionStorage.getItem(TOKEN_NAME),
  };
}

// OG 이미지 세팅할때 사용

export const getTestData = async (url) => {
  const headers = getHeaders();
  return await fetch(url, { headers })
    .then((response) => response.json())
    .then((res) => res)
    .catch(() => OG_STANDARD_IMAGE);
};

export function setUTMParameter(router) {
  const userAgent = navigator.userAgent.toLowerCase();
  let utmSource = '';

  if (userAgent.includes('facebook')) {
    utmSource = 'facebook';
  } else if (userAgent.includes('kakaotalk')) {
    utmSource = 'kakao_mb';
  } else if (userAgent.includes('twitter')) {
    utmSource = 'twitter';
  } else if (userAgent.includes('instagram')) {
    utmSource = 'instagram_mb';
  } else {
    utmSource = 'other_mb';
  }

  const utmUrl = `${window.location.href}/?utm_source=${utmSource}`;
  router.push(utmUrl);
}

'use client';
import { useEffect, useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

import { decodeToken, getHeaders, addDailyVisitCount, isLogIned } from '@/utils/util';
import { apiBe } from '@/services';
import { selectorLogInState } from '@/recoil/atoms';
import { useAnimationEffect } from '@/hooks/hooks';

import animationData_1 from './loading_2.json';
import animationData_2 from './seeMoreIcon.json';
import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';
import { LOGIN, CONST_FONT } from '@/constants/constant';
import { MyPageUserInfo } from '@/components/base/MyPageUserInfo';
import { TextElement } from '@/components/ui/text/Text';

const titleTextStyle = {
  margin: '1rem 0 1rem 1.5rem',
  fontSize: CONST_FONT.SIZE.FONT_SIZE_BIG,
  fontWeight: CONST_FONT.BOLD_SCALE.FIRST,
};

export default function MyPage() {
  const router = useRouter();
  // const pathName = usePathname();
  const containerRef_1 = useRef(null);
  // const containerRef_2 = useRef(null);

  // const [isMounted, setIsMounted] = useState(false);
  // const [testData, setTestData] = useState({
  //   resultArr: [],
  //   hasNextPage: false,
  // });
  // let [page, setPage] = useState(0);
  // let [clickSeeMore, setClickSeeMore] = useState(false);
  // const [loading, setLoading] = useState(true);
  const logInState = useRecoilValue(selectorLogInState);

  useAnimationEffect(containerRef_1, animationData_1);

  // useEffect(() => {
  //   const anim = lottie.loadAnimation({
  //     container: containerRef_2.current,
  //     renderer: 'svg',
  //     animationData: animationData_2,
  //     loop: true,
  //     autoplay: true,
  //   });

  //   return () => {
  //     anim.destroy();
  //   };
  // }, [clickSeeMore]);

  // useEffect(() => {
  //   addDailyVisitCount();
  // }, []);

  // useEffect(() => {
  //   // 토큰 없는 경우
  //   // if (!decodeToken().state) {
  //   //   sessionStorage.setItem('ngb', pathName);
  //   //   router.push('/login');
  //   // }

  //   // 마이페이지 테스트 기록 조회
  //   const memberId = logInState[LOGIN.USER_MEMBER_ID];
  //   const params = {
  //     page: page,
  //     size: 10,
  //   };
  //   const headers = getHeaders();

  //   apiBe
  //     .get(`/api/v1/member-test-result/${memberId}`, {
  //       params: params,
  //       headers: headers,
  //     })
  //     .then((res) => {
  //       setTestData((prev) => ({
  //         ...prev,
  //         resultArr: res.data.memberTestResultDTOList,
  //         hasNextPage: res.data.hasNextPage,
  //       }));
  //       setLoading(false);
  //       setPage(page + 1);
  //     });
  // }, []);

  // function clickSeeMoreResult() {
  //   setClickSeeMore(true);

  //   if (!decodeToken().state) {
  //     sessionStorage.setItem('ngb', pathName);
  //     return router.push('/login');
  //   }
  //   const memberId = logInState[LOGIN.USER_MEMBER_ID];
  //   const params = {
  //     page: page,
  //     size: 10,
  //   };
  //   const headers = getHeaders();
  //   apiBe
  //     .get(
  //       `/api/v1/member-test-result/${memberId}`,
  //       {
  //         params,
  //       },
  //       { headers },
  //     )
  //     .then((res) => {
  //       let copy = [...testData.resultArr];
  //       res.data.memberTestResultDTOList.forEach((ele) => {
  //         copy.push(ele);
  //       });
  //       setTestData((prev) => ({
  //         ...prev,
  //         resultArr: copy,
  //         hasNextPage: res.data.hasNextPage,
  //       }));
  //       setLoading(false);
  //       setPage(page + 1);
  //       setClickSeeMore(false);
  //     });
  // }
  if (isLogIned(logInState)) {
    const dateParts = logInState[LOGIN.USER_REGISTER_DATE].split('T')[0].split('-');
    const registerDate = `${dateParts[0]}.${dateParts[1]}.${dateParts[2]}`;
    return (
      <Wrap_mediaquery style={{ flexDirection: 'column', justifyContent: 'center' }}>
        <TextElement text={'🦁 마이페이지'} style={titleTextStyle} />

        <MyPageUserInfo logInState={logInState} registerDate={registerDate} />
        <TextElement text={' 🐭 최근 테스트 결과(10개)'} style={titleTextStyle} />
      </Wrap_mediaquery>
    );
  }
  return null;
}

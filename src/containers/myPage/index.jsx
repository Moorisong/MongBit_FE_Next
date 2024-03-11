'use client';
import { useEffect, useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { getHeaders, isLogIned } from '@/utils/util';
import { apiBe } from '@/services';
import { selectorLogInState } from '@/recoil/atoms';
import { useAnimationEffect } from '@/hooks/hooks';
import { LOGIN, CONST_FONT, IMAGE_ALT_STRING } from '@/constants/constant';

import { MyPageUserInfo } from '@/components/base/MyPageUserInfo';
import { TextElement } from '@/components/ui/text/Text';
import { MyPageTestResult, ImageElement } from '@/components/ui/test/Test';
import animationData_1 from './loading_2.json';
import animationData_2 from './seeMoreIcon.json';
import { Wrap_mediaquery, DivElement } from '@/components/ui/wrap/Wrap';

const titleTextStyle = {
  margin: '1rem 0 1rem 1.5rem',
  fontSize: CONST_FONT.SIZE.FONT_SIZE_BIG,
  fontWeight: CONST_FONT.BOLD_SCALE.SECOND,
};

const seeMoreIconWrapStyle = {
  backgroundColor: CONST_FONT.COLOR.GRAY_3,
  width: '100px',
  height: '33px',
  borderRadius: '15px',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const seeMoreIconTextStyle = {
  fontSize: CONST_FONT.SIZE.FONT_SIZE_SMALL_2,
  marginTop: '-4px',
  color: CONST_FONT.COLOR.GRAY_2,
};

const updateTestResultData = (setTestData, setMyPageData, response) => {
  setTestData((prev) => ({
    ...prev,
    resultArr: response.data.memberTestResultDTOList,
    hasNextPage: response.data.hasNextPage,
  }));
  setMyPageData((prev) => ({
    ...prev,
    loading: false,
    page: prev.page + 1,
    clickedSeeMoreCount: 0,
  }));
};

export default function MyPage() {
  const containerRef_1 = useRef(null);
  // const containerRef_2 = useRef(null);

  const [clickSeeMoreButton, setClickSeeMoreButton] = useState(false);
  const [testData, setTestData] = useState({
    resultArr: [],
    hasNextPage: false,
    clickSeeMoreButton: false,
  });
  const [myPageData, setMyPageData] = useState({
    page: 0,
    loading: true,
  });
  const logInState = useRecoilValue(selectorLogInState);

  useAnimationEffect(containerRef_1, animationData_1);

  // useEffect(() => {
  //   addDailyVisitCount();
  // }, []);

  useEffect(() => {
    const getData = async () => {
      const headers = getHeaders();
      const memberId = logInState[LOGIN.USER_MEMBER_ID];
      const params = {
        page: myPageData.page,
        size: 10,
      };

      const result = await apiBe.get(`/api/v1/member-test-result/${memberId}`, {
        params: params,
        headers: headers,
      });
      return result;
    };

    const promise = getData();
    if (myPageData.page === 0 && !clickSeeMoreButton) {
      // 마이페이지 최초 테스트 기록 조회
      promise.then((res) => {
        updateTestResultData(setTestData, setMyPageData, res);
      });
    } else if (clickSeeMoreButton) {
      promise.then((res) => {
        let copy = [...testData.resultArr];
        res.data.memberTestResultDTOList.forEach((ele) => {
          copy.push(ele);
        });

        if (clickSeeMoreButton) {
          setTestData((prev) => ({
            ...prev,
            resultArr: copy,
            hasNextPage: res.data.hasNextPage,
          }));
          setMyPageData((prev) => ({
            ...prev,
            loading: false,
            page: prev.page + 1,
          }));
          setClickSeeMoreButton(false);
        }
      });
    }
  }, [clickSeeMoreButton]);

  function clickSeeMoreResultButton() {
    setClickSeeMoreButton(true);
  }
  if (isLogIned(logInState)) {
    const dateParts = logInState[LOGIN.USER_REGISTER_DATE].split('T')[0].split('-');
    const registerDate = `${dateParts[0]}.${dateParts[1]}.${dateParts[2]}`;
    return (
      <Wrap_mediaquery style={{ flexDirection: 'column', justifyContent: 'center' }}>
        <TextElement text={'🦁 마이페이지'} style={titleTextStyle} />

        <MyPageUserInfo logInState={logInState} registerDate={registerDate} />
        <TextElement text={' 🐭 최근 테스트 결과(10개)'} style={{ ...titleTextStyle, paddingTop: '1rem' }} />
        {testData.resultArr.map((e, i) => (
          <MyPageTestResult key={e + i} data={e} altString={IMAGE_ALT_STRING.MONGBIT_TITLE + '결과 내용'} />
        ))}
        <Wrap_mediaquery
          style={{ justifyContent: 'center', padding: '1.3rem 0 0.3rem 0' }}
          onClick={clickSeeMoreResultButton}
        >
          <DivElement style={seeMoreIconWrapStyle}>
            <ImageElement
              imageUrl={'/images/test/seeMoreIcon.svg'}
              altStringt={IMAGE_ALT_STRING + '결과 목록 더 보기 버튼'}
              style={{ position: 'absolute', bottom: '5px', width: '13px' }}
            />
            <TextElement text={'더 보기'} style={seeMoreIconTextStyle} />
          </DivElement>
        </Wrap_mediaquery>
      </Wrap_mediaquery>
    );
  }
  return null;
}

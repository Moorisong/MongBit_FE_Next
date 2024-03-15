'use client';
import { useEffect, useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { getHeaders, isLogIned } from '@/utils/util';
import { apiBe } from '@/services';
import { selectorLogInState } from '@/recoil/atoms';
import { useAnimationEffect } from '@/hooks/hooks';
import { LOGIN, CONST_FONT, IMAGE_ALT_STRING } from '@/constants/constant';

import { MyPageUserInfo } from '@/components/base/MyPageUserInfo';
import { TitleText, Wrap } from '@/components/ui/CommonElements';
import { MyPageTestResult, ImageElement } from '@/components/ui/test/Test';
import animationData_2 from './seeMoreIcon.json';
import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';

const SeeMoreIconText = styled.p`
  font-size: ${CONST_FONT.SIZE.FONT_SIZE_SMALL_2};
  margin-top: -4px;
  color: ${CONST_FONT.COLOR.GRAY_2};
`;

const AnimationRef_seeMore = styled.div`
  width: 50px;
  height: 50px;
`;

const updateTestResultData = (setTestData, setMyPageData, response, copyArr = null) => {
  setTestData((prev) => ({
    ...prev,
    resultArr: copyArr ? copyArr : response.data.memberTestResultDTOList,
    hasNextPage: response.data.hasNextPage,
  }));

  setMyPageData((prev) => ({
    ...prev,
    seeMoreLoading: false,
    page: prev.page + 1,
    clickedSeeMoreCount: 0,
  }));
};

const getData = async (logInState, myPageData) => {
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

const isInitialLoaded = (myPageData, clickSeeMoreButton) => myPageData.page === 0 && !clickSeeMoreButton;

export default function MyPage() {
  const containerRef_1 = useRef(null);

  const [clickSeeMoreButton, setClickSeeMoreButton] = useState(false);
  const [testData, setTestData] = useState({
    resultArr: [],
    hasNextPage: false,
    clickSeeMoreButton: false,
  });
  const [myPageData, setMyPageData] = useState({
    page: 0,
    seeMoreLoading: true,
  });
  const [loading, setLoading] = useState(false);
  const logInState = useRecoilValue(selectorLogInState);

  // useEffect(() => {
  //   addDailyVisitCount();
  // }, []);

  useAnimationEffect(containerRef_1, animationData_2);

  useEffect(() => {
    const promise = getData(logInState, myPageData);

    if (isInitialLoaded(myPageData, clickSeeMoreButton)) {
      promise.then((res) => {
        updateTestResultData(setTestData, setMyPageData, res);
      });
    }
  }, []);

  function clickSeeMoreResultButton() {
    setClickSeeMoreButton(true);
    setLoading(true);

    const promise = getData(logInState, myPageData);

    promise.then((res) => {
      let copy = [...testData.resultArr];
      res.data.memberTestResultDTOList.forEach((ele) => {
        copy.push(ele);
      });

      updateTestResultData(setTestData, setMyPageData, res, copy);
      setClickSeeMoreButton(false);
      setLoading(false);
    });
  }

  if (isLogIned(logInState)) {
    const dateParts = logInState[LOGIN.USER_REGISTER_DATE].split('T')[0].split('-');
    const registerDate = `${dateParts[0]}.${dateParts[1]}.${dateParts[2]}`;

    return (
      <Wrap_mediaquery flexDirection="column" justifycontent="center">
        <TitleText
          fontSize={CONST_FONT.SIZE.FONT_SIZE_BIG}
          fontWeight={CONST_FONT.BOLD_SCALE.SECOND}
          margin="0 0 1rem 1.5rem "
        >
          🦁 마이페이지
        </TitleText>

        <MyPageUserInfo logInState={logInState} registerDate={registerDate} />
        <TitleText
          fontSize={CONST_FONT.SIZE.FONT_SIZE_BIG}
          fontWeight={CONST_FONT.BOLD_SCALE.SECOND}
          margin="2rem 0 0.8rem 1.5rem "
        >
          🐭 최근 테스트 결과(10개)
        </TitleText>

        {testData.resultArr.map((e, i) => (
          <MyPageTestResult key={e + i} data={e} altString={IMAGE_ALT_STRING.MONGBIT_TITLE + '결과 내용'} />
        ))}
        <Wrap_mediaquery justifycontent="center" padding="1.3rem 0 0.3rem 0" onClick={clickSeeMoreResultButton}>
          <Wrap
            width="100px"
            height="33px"
            borderradius="15px"
            position="relative"
            display="flex"
            justifycontent="center"
            alignitems="center"
          >
            {loading ? (
              <AnimationRef_seeMore ref={containerRef_1}></AnimationRef_seeMore>
            ) : (
              <>
                <ImageElement
                  imageUrl={'/images/test/seeMoreIcon.svg'}
                  altStringt={IMAGE_ALT_STRING + '결과 목록 더 보기 버튼'}
                  style={{ position: 'absolute', bottom: '5px', width: '13px' }}
                />
                <SeeMoreIconText>더 보기</SeeMoreIconText>
              </>
            )}
          </Wrap>
        </Wrap_mediaquery>
      </Wrap_mediaquery>
    );
  }
  return null;
}

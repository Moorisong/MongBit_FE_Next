'use client';

import lottie from 'lottie-web';
import styled from 'styled-components';

import { CONST_MAIN_PAGE, TEST_IMAGE_URL } from '@/constants/constant';

import { TitleAndText, TitleAndTest } from '@/components/base/TestContent';
import { YellowButton } from '@/components/ui/button/Button';
import { WhiteWrapWithFlex } from '@/components/ui/wrap/Wrap';

// Element
const RandomStartYellowButton = styled(YellowButton)`
  margin: 1rem 0;
  border-radius: 1rem;
  width: 95%;
  height: 2.5rem;
`;

// Detail
const mainTitleText = {
  titleText: CONST_MAIN_PAGE.MAIN_TITLE_TEXT.TITLE,
  contentText: CONST_MAIN_PAGE.MAIN_TITLE_TEXT.CONTENT,
};

const mainTestDetail = {
  titleText: CONST_MAIN_PAGE.TITLE_TEXT.MAIN_TEST,
  imageUrl: TEST_IMAGE_URL.MAIN_TEST,
};

const wrapStyle = { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }; // 메인페이지 Wrap element

export default function main() {
  // Test 삭제
  // useEffect(()=>{
  //   const headers = getHeaders()
  //   apiBe.delete(`/api/v1/tests/test/649e4baa11bc25457a51f534`, {headers})
  //   .then((res)=>{
  //     console.log('r--> ', res)
  //   })
  // }, [])

  return (
    <WhiteWrapWithFlex style={wrapStyle}>
      <TitleAndText text={mainTitleText} />
      <RandomStartYellowButton>{CONST_MAIN_PAGE.RANDOM_START_BUTTON_TEXT}</RandomStartYellowButton>
      <TitleAndTest style={mainTestDetail} />
    </WhiteWrapWithFlex>
  );
}

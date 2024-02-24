import styled from 'styled-components';

import { CONST_FONT, CONST_MAIN_PAGE, MEDIAQUERY, TEST_ICON } from '@/constants/constant';

import { TitleText, SmallTestContentText, TestIconText } from '@/components/ui/text/Text';
import { TestTitleBlackSquareArea } from '@/components/ui/square/Square';
import { TestInfoIcon } from '@/components/ui/button/Button';

// 심리테스트 1개 표시
const TestImageBig = styled.img`
  width: ${MEDIAQUERY.WIDTH_370};
  height: 240px;
  border-radius: 1rem;
  margin: 0.5rem 0;

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: ${MEDIAQUERY.WIDTH_345};
  }
`;

// 심리테스트 여러개 표시

const TestImagesSmallWrap = styled.div`
  width: ${MEDIAQUERY.WIDTH_420};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: ${MEDIAQUERY.WIDTH_345};
  }
`;

const SmallTestSetWrap = styled.div`
  margin: 1rem 0.5rem;
`;

const TestImgageSmall = styled.img`
  width: 180px;
  height: 115px;
  object-fit: cover;
  border-radius: 1rem;
  cursor: pointer;

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: 150px;
    height: 100px;
  }
`;

const TestInfoAreaWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: center;
`;

export function TestVersionBig({ imageUrl, squareText }) {
  return (
    <div>
      <TestImageBig src={imageUrl} />
      <TestTitleBlackSquareArea text={squareText} />
    </div>
  );
}

export function TestVersionSmallForSeveral({ testData }) {
  console.log('testData::: ', testData);
  const testIconTextStyle = { fontSize: CONST_FONT.SIZE.SMALL_TEST_SET_TEXT };
  return (
    <>
      <TitleText text={CONST_MAIN_PAGE.TITLE_TEXT.LATEST_TEST} />
      <TestImagesSmallWrap>
        {testData.map((e, i) => (
          <SmallTestSetWrap key={e.id + i}>
            <TestImgageSmall src={e.imageUrl} />
            <SmallTestContentText text={e.title} />
            <TestInfoAreaWrap>
              <TestInfoIcon imageUrl={TEST_ICON.URL.PLAY_COUNT} />
              <TestIconText style={testIconTextStyle} text={e.playCount} />
            </TestInfoAreaWrap>
          </SmallTestSetWrap>
        ))}
      </TestImagesSmallWrap>
    </>
  );
}

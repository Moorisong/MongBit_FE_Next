import styled from 'styled-components';

import { CONST_FONT, MEDIAQUERY, TEST_ICON } from '@/constants/constant';

import { TextElement } from '@/components/ui/text/Text';
import { TestTitleBlackSquareArea } from '@/components/ui/square/Square';
import { TestCountIconImage } from '@/components/ui/button/Button';

// styled components
const TestImageBig = styled.img`
  width: ${MEDIAQUERY.WIDTH_370};
  height: 240px;
  border-radius: 1rem;
  margin: 0.5rem 0;
  cursor: pointer;

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: ${MEDIAQUERY.WIDTH_345};
  }
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
  margin: 0.5rem 0.5rem;
`;

const TestCountInfoAreaWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: center;
`;

// style
const smalltestsTitleTextStyle = {
  color: CONST_FONT.COLOR.GRAY_1,
  width: '150px',
  paddingLeft: '3px',
  fontSize: CONST_FONT.SIZE.FONT_SIZE_SMALL_1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  cursor: 'pointer',
};

const testIconTextStyle = {
  fontSize: CONST_FONT.SIZE.FONT_SIZE_SMALL_1,
  color: CONST_FONT.COLOR.GRAY_1,
  display: 'inline-block',
  marginLeft: '3px',
  cursor: 'pointer',
};

export function TestVersionBig({ imageUrl, squareText }) {
  return (
    <div>
      <TestImageBig src={imageUrl} />
      <TestTitleBlackSquareArea text={squareText} />
    </div>
  );
}

export function TestVersionSmallForSeveral({ testData }) {
  return (
    <>
      <TestImagesSmallWrap>
        {testData.map((e, i) => (
          <SmallTestSetWrap key={e.id + i}>
            <TestImgageSmall src={e.imageUrl} />
            <TextElement text={e.title} style={smalltestsTitleTextStyle} />
            <TestCountInfoAreaWrap>
              <TestCountIconImage imageUrl={TEST_ICON.URL.PLAY_COUNT} />
              <TextElement style={testIconTextStyle} text={e.playCount} />
            </TestCountInfoAreaWrap>
          </SmallTestSetWrap>
        ))}
      </TestImagesSmallWrap>
    </>
  );
}

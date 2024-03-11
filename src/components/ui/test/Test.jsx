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
    width: ${MEDIAQUERY.WIDTH_340};
  }
`;

const TestImgageSmall = styled.img`
  width: 180px;
  height: 115px;
  object-fit: cover;
  border-radius: 1rem;
  cursor: pointer;

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: 165px;
    height: 100px;
  }
`;
const Wrap = styled.div``;
const Image = styled.img``;
const Ul = styled.ul`
  width: 230px;
  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: 210px;
  }
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

const totalWrapStyle = {
  width: MEDIAQUERY.WIDTH_420,
  display: 'flex',
  flexWrap: 'wrap',
  position: 'relative',
  paddingTop: '0.5rem',
};

const TestCountInfoAreaWrapStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'baseline',
  alignItems: 'center',
};

export function TestVersionBig({ imageUrl, squareText }) {
  return (
    <Wrap style={{ paddingRight: '1rem' }}>
      <TestImageBig src={imageUrl} />
      <TestTitleBlackSquareArea text={squareText} />
    </Wrap>
  );
}

export function TestVersionSmallForSeveral({ testData }) {
  return (
    <Wrap style={totalWrapStyle}>
      {testData.map((e, i) => (
        <Wrap key={e.id + i} style={{ padding: ' 0 0.5rem 0.7rem 0' }}>
          <TestImgageSmall src={e.imageUrl} />
          <TextElement text={e.title} style={smalltestsTitleTextStyle} />
          <Wrap style={TestCountInfoAreaWrapStyle}>
            <TestCountIconImage imageUrl={TEST_ICON.URL.PLAY_COUNT} />
            <TextElement style={testIconTextStyle} text={e.playCount} />
          </Wrap>
        </Wrap>
      ))}
    </Wrap>
  );
}

export function ImageElement({ imageUrl, style, altStringt }) {
  return <Image src={imageUrl} style={style} alt={altStringt} />;
}

export function MyPageTestResult({ data, altString }) {
  const resultDescriptionArray = data.content.split('<br>');
  return (
    <Wrap style={{ margin: '0.5rem 0 1rem 0.5rem', display: 'flex', justifyContent: 'center' }}>
      <Image
        src={data.imageUrl}
        alt={altString}
        style={{ width: '120px', objectFit: 'cover', borderRadius: '1rem', marginRight: '0.5rem' }}
      />
      <Wrap style={{ height: '11rem', overflow: 'hidden' }}>
        <TextElement
          text={data.title}
          style={{ fontWeight: CONST_FONT.BOLD_SCALE.FIRST, fontSize: CONST_FONT.SIZE.FONT_SIZE_SMALL_1 }}
        />
        <Ul style={{ color: CONST_FONT.COLOR.GRAY_2, fontSize: CONST_FONT.SIZE.FONT_SIZE_SMALL_2 }}>
          {resultDescriptionArray.map((e, i) => (
            <li key={e + i}>{e}</li>
          ))}
        </Ul>
      </Wrap>
    </Wrap>
  );
}

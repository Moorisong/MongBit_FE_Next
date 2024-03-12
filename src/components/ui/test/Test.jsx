import styled from 'styled-components';

import { CONST_FONT, MEDIAQUERY, TEST_ICON } from '@/constants/constant';

import { TestTitleBlackSquareArea } from '@/components/ui/square/Square';
import { TestCountIconImage } from '@/components/ui/button/Button';

// styled components
const Div = styled.div``;
const Image = styled.img`
  cursor: pointer;
`;
const Text = styled.p`
color: ${(props) => (props.color ? props.color : '')};
width: ${(props) => (props.width ? props.width : '')};
padding-left: ${(props) => (props.paddingleft ? props.paddingleft : '')};
font-size: ${(props) => (props.fontSize ? props.fontSize : '')};
white-space: ${(props) => (props.whitespace ? props.whitespace : '')};
overflow: ${(props) => (props.overflow ? props.overflow : '')};
text-overflow: ${(props) => (props.textoverflow ? props.textoverflow : '')};
cursor: ${(props) => (props.cursor ? props.cursor : '')};
display: ${(props) => (props.display ? props.display : '')};
margin-left: ${(props) => (props.marginleft ? props.marginleft : '')};
width: ${(props) => (props.width ? props.width : '')};
width: ${(props) => (props.width ? props.width : '')};
width: ${(props) => (props.width ? props.width : '')};
color
`;

const Wrap = styled(Div)`
  width: ${(props) => (props.width ? props.width : '')};
  height: ${(props) => (props.height ? props.height : '')};
  margin: ${(props) => (props.margin ? props.margin : '')};
  display: ${(props) => (props.display ? props.display : '')};
  flex-wrap: ${(props) => (props.flexwrap ? props.flexwrap : '')};
  position: ${(props) => (props.position ? props.position : '')};
  padding-top: ${(props) => (props.paddingtop ? props.paddingtop : '')};
  flex-direction: ${(props) => (props.flexdirection ? props.flexdirection : '')};
  justify-content: ${(props) => (props.justifycontent ? props.justifycontent : '')};
  align-items: ${(props) => (props.alignitems ? props.alignitems : '')};
`;

const TestImageBig = styled(Image)`
  width: ${MEDIAQUERY.WIDTH_370};
  height: 240px;
  border-radius: 1rem;
  margin: 0.5rem 0;

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: ${MEDIAQUERY.WIDTH_340};
  }
`;

const TestImgageSmall = styled(Image)`
  width: 180px;
  height: 115px;
  object-fit: cover;
  border-radius: 1rem;

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: 165px;
    height: 100px;
  }
`;

const Ul = styled.ul`
  width: 230px;
  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: 210px;
  }
`;

export function TestVersionBig({ imageUrl, squareText }) {
  return (
    <Div style={{ paddingRight: '1rem' }}>
      <TestImageBig src={imageUrl} />
      <TestTitleBlackSquareArea text={squareText} />
    </Div>
  );
}

export function TestVersionSmallForSeveral({ testData }) {
  return (
    <Wrap width={MEDIAQUERY.WIDTH_420} display="flex" flexwrap="wrap" position="relative" paddingtop="0.5rem">
      {testData.map((e, i) => (
        <Wrap key={e.id + i} style={{ padding: ' 0 0.5rem 0.7rem 0' }}>
          <TestImgageSmall src={e.imageUrl} />
          <Text
            color={CONST_FONT.COLOR.GRAY_1}
            width="150px"
            paddingleft="3px"
            fontSize={CONST_FONT.SIZE.FONT_SIZE_SMALL_1}
            whitespace="nowrap"
            overflow="hidden"
            textoverflow="ellipsis"
            cursor="pointer"
          >
            {e.title}
          </Text>
          <Wrap display="flex" justifycontent="baseline" alignitems="center">
            <TestCountIconImage imageUrl={TEST_ICON.URL.PLAY_COUNT} />
            <Text
              fontSize={CONST_FONT.SIZE.FONT_SIZE_SMALL_1}
              color={CONST_FONT.COLOR.GRAY_1}
              display="inline-block"
              marginleft="3px"
              cursor="pointer"
            >
              {e.playCount}
            </Text>
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
    <Wrap margin="0.5rem 0 1rem 0.5rem" display="flex" justifycontent="center">
      <Image
        src={data.imageUrl}
        alt={altString}
        style={{ width: '120px', objectFit: 'cover', borderRadius: '1rem', marginRight: '0.5rem' }}
      />
      <Wrap height="11rem" overflow="hidden">
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

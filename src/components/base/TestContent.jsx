import styled from 'styled-components';

import { CONST_FONT, CONST_MAIN_PAGE } from '@/constants/constant';

import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';
import { TestVersionBig, TestVersionSmallForSeveral } from '@/components/ui/test/Test';

const Text = styled.p`
  margin: ${(props) => (props.margin ? props.margin : '')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '')};
  color: ${(props) => (props.color ? props.color : '')};
`;

export function TitleAndText({ text }) {
  return (
    <Wrap_mediaquery flexDirection="column" justifyContent="space-around" alignitems="baseline" padding="1rem 1rem 0 0 ">
      <Text margin="0 0 0 1.5rem" fontSize={CONST_FONT.SIZE.FONT_SIZE_BIG} fontWeight={CONST_FONT.BOLD_SCALE.SECOND}>
        {text.titleText}
      </Text>
      <Text fontSize={CONST_FONT.SIZE.FONT_SIZE_SMALL_1} color={CONST_FONT.COLOR.GRAY_1}>
        {text.contentText}
      </Text>
    </Wrap_mediaquery>
  );
}

export function TitleAndTest({ style }) {
  return (
    <Wrap_mediaquery
      flexDirection="column"
      justifyContent="space-around"
      alignitems="baseline"
      padding="1rem 1rem 0.8rem 0"
      position="relative"
    >
      <Text margin="0 0 0 1.5rem" fontSize={CONST_FONT.SIZE.FONT_SIZE_BIG} fontWeight={CONST_FONT.BOLD_SCALE.SECOND}>
        {style.titleText}
      </Text>
      <TestVersionBig imageUrl={style.imageUrl} squareText={style.squareText} />
    </Wrap_mediaquery>
  );
}

export function TitleAndTestsSmallForSeveral({ testData }) {
  return (
    <Wrap_mediaquery
      flexDirection="column"
      justifyContent="space-around"
      alignitems="baseline"
      padding="1rem 1rem 0.8rem 0"
      position="relative"
    >
      <Text margin="0 0 0 1.5rem" fontSize={CONST_FONT.SIZE.FONT_SIZE_BIG} fontWeight={CONST_FONT.BOLD_SCALE.SECOND}>
        {CONST_MAIN_PAGE.TITLE_TEXT.LATEST_TEST}
      </Text>
      <TestVersionSmallForSeveral testData={testData.testCoverDTOList} />
    </Wrap_mediaquery>
  );
}

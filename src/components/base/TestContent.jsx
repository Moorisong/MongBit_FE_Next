import { CONST_FONT, CONST_MAIN_PAGE } from '@/constants/constant';

import { TextElement } from '@/components/ui/text/Text';
import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';
import { TestVersionBig, TestVersionSmallForSeveral } from '@/components/ui/test/Test';

const wrapStyle = { flexDirection: 'column', justifyContent: 'space-around', alignItems: 'baseline' };
const titleTextStyle = {
  margin: '0 0 0 1.5rem',
  fontSize: CONST_FONT.SIZE.FONT_SIZE_BIG,
  fontWeight: CONST_FONT.BOLD_SCALE.FIRST,
};

export function TitleAndText({ text }) {
  const combinedStyle = { ...wrapStyle, padding: '2rem 1rem 0 0' };

  return (
    <Wrap_mediaquery style={combinedStyle}>
      <TextElement text={text.titleText} style={titleTextStyle} />
      <TextElement
        text={text.contentText}
        style={{ color: CONST_FONT.COLOR.GRAY_1, fontSize: CONST_FONT.SIZE.FONT_SIZE_REGULAR }}
      />
    </Wrap_mediaquery>
  );
}

export function TitleAndTest({ style }) {
  const combinedStyle = { ...wrapStyle, padding: '1rem 1rem 0.8rem 0', position: 'relative' };

  return (
    <Wrap_mediaquery style={combinedStyle}>
      <TextElement text={style.titleText} style={titleTextStyle} />
      <TestVersionBig imageUrl={style.imageUrl} squareText={style.squareText} />
    </Wrap_mediaquery>
  );
}

export function TitleAndTestsSmallForSeveral({ testData }) {
  const combinedStyle = { ...wrapStyle, padding: '1rem 1rem 0.8rem 0', position: 'relative' };

  return (
    <Wrap_mediaquery style={combinedStyle}>
      <TextElement text={CONST_MAIN_PAGE.TITLE_TEXT.LATEST_TEST} style={titleTextStyle} />
      <TestVersionSmallForSeveral style={combinedStyle} testData={testData.testCoverDTOList} />
    </Wrap_mediaquery>
  );
}

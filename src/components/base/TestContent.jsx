import { TitleText, BigTestContentText } from '@/components/ui/text/Text';
import { WhiteWrapWithFlex } from '@/components/ui/wrap/Wrap';
import { TestVersionBig, TestVersionSmallForSeveral } from '@/components/ui/test/Test';

const wrapStyle = { flexDirection: 'column', justifyContent: 'space-around', alignItems: 'baseline' };

export function TitleAndText({ text }) {
  const combinedStyle = { ...wrapStyle, padding: '2rem 1rem 0 0' };

  return (
    <WhiteWrapWithFlex style={combinedStyle}>
      <TitleText text={text.titleText} />
      <BigTestContentText text={text.contentText} />
    </WhiteWrapWithFlex>
  );
}

export function TitleAndTest({ style }) {
  const combinedStyle = { ...wrapStyle, padding: '1rem 1rem 0.8rem 0', position: 'relative' };

  return (
    <WhiteWrapWithFlex style={combinedStyle}>
      <TitleText text={style.titleText} />
      <TestVersionBig imageUrl={style.imageUrl} squareText={style.squareText} />
    </WhiteWrapWithFlex>
  );
}

export function TitleAndTestsSmallForSeveral({ testData }) {
  const combinedStyle = { ...wrapStyle, padding: '1rem 1rem 0.8rem 1rem' };

  return <TestVersionSmallForSeveral style={combinedStyle} testData={testData.testCoverDTOList} />;
}

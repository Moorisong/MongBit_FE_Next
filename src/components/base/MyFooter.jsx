'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CONST_FONT, CONST_FOOTER } from '@/constants/constant';

import { WhiteWrapWithFlex } from '@/components/ui/wrap/Wrap';

const FooterP = styled.p`
  font-size: ${CONST_FONT.SIZE.FONT_SIZE_SMALL_2};
  color: ${CONST_FONT.COLOR.GRAY_2};
  margin-left: ${(props) => props.marginLeft};
  padding-left: ${(props) => props.paddingLeft};
`;

const FooterImg = styled.img`
  width: 20px;
  margin-right: 10px;
`;

const FlexDiv = styled.div`
  display: flex;
  align-item: center;
`;

const DescriptionWrapDiv = styled.div`
  margin-bottom: 2rem;
`;

const totalWrapStyle = {
  flexDirection: 'column',
  alignItems: 'baseline',
  padding: '2em 0 1rem 1rem',
  position: 'relative',
};

const policyWrapStyle = { position: 'absolute', right: '-1.3rem', bottom: '2.7rem', padding: '1rem 2.5rem 0 0' };
const policyStyle = { marginRight: '5px' };
const copyrightStyle = { position: 'absolute', right: '0', padding: '0.2rem 1.5rem 0 0' };

export default function MyFooter() {
  const pathName = usePathname();
  const isShow = !pathName.includes('policy') && !pathName.includes('terms');

  // 약관 및 정책 페이지에서 footer 표시되지 않도록
  if (isShow)
    return (
      <>
        <WhiteWrapWithFlex style={totalWrapStyle}>
          <DescriptionWrapDiv>
            {CONST_FOOTER.DESCRIPTION.map((e, i) => (
              <FooterP key={e + i}>{e}</FooterP>
            ))}
          </DescriptionWrapDiv>

          <FlexDiv style={policyWrapStyle}>
            {CONST_FOOTER.POLICY.map((e, i) => (
              <Link key={e + i} href={CONST_FOOTER.PAGE_URL[i]} target="_blank">
                <FooterP style={policyStyle}>{e}</FooterP>
              </Link>
            ))}
          </FlexDiv>

          <FlexDiv>
            <FlexDiv>
              {CONST_FOOTER.BUTTON_IMG_URL.map((e, i) => (
                <Link key={e + i} href={CONST_FOOTER.LINK_URL[i]} target="_blank">
                  <FooterImg key={e + i} src={e} />
                </Link>
              ))}
            </FlexDiv>
            <FooterP style={copyrightStyle}>{CONST_FOOTER.COPYRIGHT}</FooterP>
          </FlexDiv>
        </WhiteWrapWithFlex>
      </>
    );
}

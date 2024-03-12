'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CONST_FONT, CONST_FOOTER, IMAGE_ALT_STRING } from '@/constants/constant';

import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';

const Image = styled.img`
  width: 20px;
  margin-right: 10px;
`;
const Text = styled.p``;
const Div = styled.div`
  margin-bottom: ${(props) => (props.marginbottom ? props.marginbottom : '')};
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : '')};
  align-items: ${(props) => (props.alignitems ? props.alignitems : '')};
  padding: ${(props) => (props.padding ? props.padding : '')};
  position: ${(props) => (props.position ? props.position : '')};
  display: ${(props) => (props.display ? props.display : '')};
  right: ${(props) => (props.right ? props.right : '')};
  bottom: ${(props) => (props.bottom ? props.bottom : '')};
`;

const FooterDiscriptionText = styled(Text)`
  font-size: ${CONST_FONT.SIZE.FONT_SIZE_SMALL_2};
  color: ${CONST_FONT.COLOR.GRAY_2};
`;

const PolicyText = styled(Text)`
  margin-right: 5px;
  font-size: ${CONST_FONT.SIZE.FONT_SIZE_SMALL_2};
  color: ${CONST_FONT.COLOR.GRAY_2};
`;

const CopyrightText = styled(Text)`
  position: absolute;
  right: 0;
  padding: 0.2rem 1.5rem 0 0;
  font-size: ${CONST_FONT.SIZE.FONT_SIZE_SMALL_2};
  color: ${CONST_FONT.COLOR.GRAY_2};
`;

export default function MyFooter() {
  const pathName = usePathname();
  const isShow = !pathName.includes('policy') && !pathName.includes('terms');

  // 약관 및 정책 페이지에서 footer 표시되지 않도록
  if (isShow)
    return (
      <>
        <Wrap_mediaquery flexDirection="column" alignitems="baseline" padding="2em 0 1rem 1rem" position="relative">
          <Div marginbottom="2rem">
            {CONST_FOOTER.DESCRIPTION.map((e, i) => (
              <FooterDiscriptionText key={e + i}>{e}</FooterDiscriptionText>
            ))}
          </Div>

          <Div
            display="flex"
            alignitems="center"
            position="absolute"
            right="-1.3rem"
            bottom="2.7rem"
            padding="1rem 2.5rem 0 0"
          >
            {CONST_FOOTER.POLICY.map((e, i) => (
              <Link key={e + i} href={CONST_FOOTER.PAGE_URL[i]} target="_blank">
                <PolicyText>{e}</PolicyText>
              </Link>
            ))}
          </Div>

          <Div display="flex" alignitems="center">
            <Div display="flex" alignitems="center">
              {CONST_FOOTER.BUTTON_IMG_URL.map((e, i) => (
                <Link key={e + i} href={CONST_FOOTER.LINK_URL[i]} target="_blank">
                  <Image key={e + i} src={e} alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '깃허브 및 인스타그램 바로가기'} />
                </Link>
              ))}
            </Div>
            <CopyrightText>{CONST_FOOTER.COPYRIGHT}</CopyrightText>
          </Div>
        </Wrap_mediaquery>
      </>
    );
}

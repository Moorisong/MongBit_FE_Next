'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CONST_FONT, CONST_FOOTER, IMAGE_ALT_STRING } from '@/constants/constant';

import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';
import { TextElement } from '@/components/ui/text/Text';

const Image = styled.img`
  width: 20px;
  margin-right: 10px;
`;

const Div = styled.div``;

const totalWrapStyle = {
  flexDirection: 'column',
  alignItems: 'baseline',
  padding: '2em 0 1rem 1rem',
  position: 'relative',
};

const policyWrapStyle = {
  display: 'flex',
  alignItem: 'center',
  position: 'absolute',
  right: '-1.3rem',
  bottom: '2.7rem',
  padding: '1rem 2.5rem 0 0',
};

const policyStyle = { marginRight: '5px', fontSize: CONST_FONT.SIZE.FONT_SIZE_SMALL_2, color: CONST_FONT.COLOR.GRAY_2 };

const copyrightStyle = {
  position: 'absolute',
  right: '0',
  padding: '0.2rem 1.5rem 0 0',
  fontSize: CONST_FONT.SIZE.FONT_SIZE_SMALL_2,
  color: CONST_FONT.COLOR.GRAY_2,
};

export default function MyFooter() {
  const pathName = usePathname();
  const isShow = !pathName.includes('policy') && !pathName.includes('terms');

  // 약관 및 정책 페이지에서 footer 표시되지 않도록
  if (isShow)
    return (
      <>
        <Wrap_mediaquery style={totalWrapStyle}>
          <Div style={{ marginBottom: '2rem' }}>
            {CONST_FOOTER.DESCRIPTION.map((e, i) => (
              <TextElement
                key={e + i}
                text={e}
                style={{
                  fontSize: CONST_FONT.SIZE.FONT_SIZE_SMALL_2,
                  color: CONST_FONT.COLOR.GRAY_2,
                }}
              />
            ))}
          </Div>

          <Div style={policyWrapStyle}>
            {CONST_FOOTER.POLICY.map((e, i) => (
              <Link key={e + i} href={CONST_FOOTER.PAGE_URL[i]} target="_blank">
                <TextElement style={policyStyle} text={e} />
              </Link>
            ))}
          </Div>

          <Div
            style={{
              display: 'flex',
              alignItem: 'center',
            }}
          >
            <Div style={{ display: 'flex', alignItem: 'center' }}>
              {CONST_FOOTER.BUTTON_IMG_URL.map((e, i) => (
                <Link key={e + i} href={CONST_FOOTER.LINK_URL[i]} target="_blank">
                  <Image key={e + i} src={e} alt={IMAGE_ALT_STRING.FOOTER.SNS} />
                </Link>
              ))}
            </Div>
            <TextElement style={copyrightStyle} text={CONST_FOOTER.COPYRIGHT} />
          </Div>
        </Wrap_mediaquery>
      </>
    );
}

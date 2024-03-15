'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CONST_FONT, CONST_FOOTER, IMAGE_ALT_STRING } from '@/constants/constant';

import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';
import { Wrap, Text, Image } from '@/components/ui/CommonElements';

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
      <div>
        <Wrap_mediaquery flexDirection="column" alignitems="baseline" padding="2em 0 1rem 1rem" position="relative">
          <Wrap margin="0 0 2rem 0">
            {CONST_FOOTER.DESCRIPTION.map((e, i) => (
              <Text fontSize={CONST_FONT.SIZE.FONT_SIZE_SMALL_2} color={CONST_FONT.COLOR.GRAY_2} key={e + i}>
                {e}
              </Text>
            ))}
          </Wrap>

          <Wrap
            display="flex"
            alignItems="center"
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
          </Wrap>

          <Wrap display="flex" alignItems="center">
            <Wrap display="flex" alignItems="center">
              {CONST_FOOTER.BUTTON_IMG_URL.map((e, i) => (
                <Link key={e + i} href={CONST_FOOTER.LINK_URL[i]} target="_blank">
                  <Image
                    width="20px"
                    margin=" 0 10px 0 0"
                    key={e + i}
                    src={e}
                    alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '깃허브 및 인스타그램 바로가기'}
                  />
                </Link>
              ))}
            </Wrap>
            <CopyrightText>{CONST_FOOTER.COPYRIGHT}</CopyrightText>
          </Wrap>
        </Wrap_mediaquery>
      </div>
    );

  return null;
}

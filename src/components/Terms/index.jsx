'use client';

import { styled } from 'styled-components';

import { CONST_FONT } from '@/constants/constant';

import { TERM_STRING } from './content';
import { WhiteWrapWithFlex } from '@/components/ui/wrap/Wrap';

const TermStringElement = styled.p`
  color: ${CONST_FONT.COLOR.BLACK};
  font-size: ${CONST_FONT.SIZE.FONT_SIZE_SMALL_1};
  padding: 0 20px 0 20px;
  white-space: pre-line;
`;

export default function Terms() {
  return (
    <WhiteWrapWithFlex>
      <TermStringElement>{TERM_STRING}</TermStringElement>
    </WhiteWrapWithFlex>
  );
}

'use client';

import { styled } from 'styled-components';

import { CONST_FONT } from '@/constants/constant';

import { POLICY_STRING } from './content';
import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';

const PolicyStringElement = styled.p`
  color: ${CONST_FONT.COLOR.BLACK};
  font-size: ${CONST_FONT.SIZE.FONT_SIZE_SMALL_1};
  padding: 0 20px 0 20px;
  white-space: pre-line;
`;

export default function Policy() {
  return (
    <Wrap_mediaquery>
      <PolicyStringElement>{POLICY_STRING}</PolicyStringElement>
    </Wrap_mediaquery>
  );
}

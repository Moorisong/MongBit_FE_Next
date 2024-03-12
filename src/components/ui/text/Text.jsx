import styled from 'styled-components';

import { CONST_FONT } from '@/constants/constant';

export const TitleText = styled.p`
  margin: 1rem 0 1rem 1.5rem;
  font-size: ${CONST_FONT.SIZE.FONT_SIZE_BIG};
  font-weight: ${CONST_FONT.BOLD_SCALE.SECOND};
  padding-top: ${(props) => (props.paddingtop ? props.paddingtop : '')};
`;

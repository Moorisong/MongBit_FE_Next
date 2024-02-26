import styled from 'styled-components';

import { CONST_FONT } from '@/constants/constant';

const Title = styled.p`
  font-size: ${CONST_FONT.SIZE.FONT_SIZE_BIG};
  font-weight: ${CONST_FONT.BOLD_SCALE.FIRST};
  margin: 0 0 0 1.5rem;
`;

const TitleContent = styled.p`
  color: ${CONST_FONT.COLOR.GRAY_1};
  font-size: ${CONST_FONT.SIZE.FONT_SIZE_REGULAR};
`;

const SmallTestContent = styled.p`
  color: ${CONST_FONT.COLOR.GRAY_1};
  width: 150px;
  padding-left: 3px;
  font-size: ${CONST_FONT.SIZE.FONT_SIZE_SMALL_1};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

const IconText = styled.p`
  font-size: ${(props) => props.style.fontSize};
  color: ${CONST_FONT.COLOR.GRAY_1};
  display: inline-block;
  margin-left: 3px;
  cursor: pointer;
`;

export function TitleText({ text }) {
  return <Title>{text}</Title>;
}

export function BigTestContentText({ text }) {
  return <TitleContent>{text}</TitleContent>;
}

export function SmallTestContentText({ text }) {
  return <SmallTestContent>{text}</SmallTestContent>;
}

export function TestIconText({ style, text }) {
  return <IconText style={style}>{text}</IconText>;
}

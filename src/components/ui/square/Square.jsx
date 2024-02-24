import styled from 'styled-components';

import { CONST_FONT, MEDIAQUERY } from '@/constants/constant';

const TestTitleBlackSquare = styled.div`
  width: ${MEDIAQUERY.WIDTH_370};
  height: 2.5rem;
  background-color: black;
  opacity: 0.7;
  border-radius: 0 0 1rem 1rem;
  position: absolute;
  bottom: 1.5rem;
  display: flex;
  align-items: center;
  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: ${MEDIAQUERY.WIDTH_345};
  }
`;

const TestTitleBlackSquareText = styled.p`
  color: ${CONST_FONT.COLOR.WHITE};
  font-size: ${CONST_FONT.SIZE.SMALL_TEST_SET_TEXT};
  white-space: noWrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.2rem 0.5rem 0 0.7rem;
`;

export function TestTitleBlackSquareArea({ text }) {
  return (
    <TestTitleBlackSquare>
      <TestTitleBlackSquareText>{text}</TestTitleBlackSquareText>
    </TestTitleBlackSquare>
  );
}

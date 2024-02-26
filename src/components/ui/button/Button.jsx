import styled from 'styled-components';

import { TEST_ICON, YELLOW_BUTTON } from '@/constants/constant';

const HeaderBtn = styled.button`
  width: ${(props) => props.style.width};
  height: ${(props) => props.style.height};
  border-style: none;
  background: none;
  background-image: url('${(props) => props.style.imageUrl}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin: 0 1rem;
`;

const ImageIcon = styled.img`
  width: ${TEST_ICON.SIZE.WIDTH};
  height: ${TEST_ICON.SIZE.HEIGHT};
  cursor: pointer;
`;

// export

export function HeaderButton({ style }) {
  return <HeaderBtn style={style} />;
}

export function TestInfoIcon({ imageUrl }) {
  return <ImageIcon src={imageUrl} />;
}

export const YellowButton = styled.button`
  background-color: ${YELLOW_BUTTON.BACKGROUND_COLOR};
  transition: ${YELLOW_BUTTON.TRANSITION};
  color: ${YELLOW_BUTTON.FONT_COLOR};
`;

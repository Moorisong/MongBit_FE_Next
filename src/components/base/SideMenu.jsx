import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { CONST_HEADER, MEDIAQUERY } from '@/constants/constant';

const SideMenuBlackDiv = styled.div`
  background-color: black;
  transition: opacity 0.3s ease-in-out;
  width: ${MEDIAQUERY.WIDTH_420};
  position: fixed;
  z-index: 1;
`;

const SideMenuWhiteDiv = styled.div`
  background-color: white;
  transition: left 0.3s ease-in-out;
  width: ${CONST_HEADER.SIDE_MENU_WHITE_BOARD_WIDTH}px;
  height: 100%;
  position: fixed;
  z-index: 2;
`;

export function SideMenu({ show }) {
  const [height, setHeight] = useState(window.innerHeight);

  const onClickBlackArea = () => {
    show.setShowSideMenu(false);
  };
  useEffect(() => {
    setHeight(window.innerHeight);
  }, [window.innerHeight]);

  const sideMenuBlacAreaStyle = { height, opacity: show.showSideMenu ? '.5' : '0' };
  const sideMenuWhiteAreaStyle = {
    left: show.showSideMenu ? `calc(50% - ${CONST_HEADER.SIDE_MENU_WHITE_BOARD_WIDTH}px)` : '-300px',
  };

  return (
    <>
      <SideMenuBlackDiv style={sideMenuBlacAreaStyle} onClick={onClickBlackArea} />
      <SideMenuWhiteDiv style={sideMenuWhiteAreaStyle} />
    </>
  );
}

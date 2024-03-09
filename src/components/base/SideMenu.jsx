import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { CONST_FONT, CONST_HEADER, MEDIAQUERY, LOGIN } from '@/constants/constant';
import { decodeToken } from '@/utils/util';

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

const ListElement = styled.li``;

const titleListStyle = {
  fontSize: CONST_FONT.SIZE.FONT_SIZE_REGULAR,
  paddingBottom: '0.2rem',
  fontWeight: CONST_FONT.BOLD_SCALE.FIRST,
};

const wrapListStyle = {
  paddingTop: '1rem',
};

const contentListStyle = {
  fontSize: CONST_FONT.SIZE.FONT_SIZE_REGULAR,
  padding: '0 0 0.2rem 0.5rem',
};

const wrapBottomArea = {
  position: 'absolute',
  bottom: '0',
};

const WrapBottomLogoutArea = {
  display: 'flex',
  justifyContent: 'space-between',
  width: CONST_HEADER.SIDE_MENU_WHITE_BOARD_WIDTH - 60,
  color: CONST_FONT.COLOR.GRAY_1,
};

export function SideMenu({ show }) {
  const [height, setHeight] = useState(window.innerHeight);
  const logInState = decodeToken();

  const onClickBlackArea = () => {
    show.setShowSideMenu(false);
  };

  const sideMenuBlacAreaStyle = {
    height,
    opacity: show.showSideMenu ? '.5' : '0',
    pointerEvents: show.showSideMenu ? '' : 'none',
  };

  const sideMenuWhiteAreaStyle = {
    left: show.showSideMenu ? `calc(50% - ${CONST_HEADER.SIDE_MENU_WHITE_BOARD_WIDTH}px)` : '-300px',
  };

  useEffect(() => {
    setHeight(window.innerHeight);
  }, [window.innerHeight]);

  return (
    <>
      <SideMenuBlackDiv style={sideMenuBlacAreaStyle} onClick={onClickBlackArea} />
      <SideMenuWhiteDiv style={sideMenuWhiteAreaStyle}>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li style={{ paddingTop: '3rem' }}>
            <ul>
              <ListElement style={titleListStyle}>심리테스트</ListElement>
              <li style={contentListStyle}>최신보기</li>
              <li style={contentListStyle}>전체보기</li>
            </ul>
          </li>
          <li style={wrapListStyle}>
            <ul>
              <ListElement style={titleListStyle}>마이페이지</ListElement>

              <li style={contentListStyle}>심테 기록 보기</li>
            </ul>
          </li>
          <li style={wrapListStyle}>
            <ul>
              <ListElement style={titleListStyle}>개발자 정보</ListElement>
              <li style={contentListStyle}>몽뭉이 크루</li>
            </ul>
          </li>
          {logInState && logInState.state && (
            <ListElement style={wrapBottomArea}>
              <ul>
                {logInState && logInState.role === LOGIN.ROLE_ADMIN && (
                  <ListElement style={{ ...contentListStyle, color: CONST_FONT.COLOR.GRAY_1 }}>
                    관리자 페이지
                  </ListElement>
                )}
                <ListElement style={contentListStyle}>
                  <div style={WrapBottomLogoutArea}>
                    <span>로그아웃</span>
                    <img
                      src="/images/header/logOutIcon.svg"
                      alt="몽빗 MBTI 심리테스트 로그아웃 아이콘"
                      style={{ marginLeft: '-1rem' }}
                    />
                    <img src="/images/header/logo_dog.svg" alt="몽빗 MBTI 심리테스트 로고" style={{ width: '60px' }} />
                  </div>
                </ListElement>
              </ul>
            </ListElement>
          )}
        </ul>
      </SideMenuWhiteDiv>
    </>
  );
}

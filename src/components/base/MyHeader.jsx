'use client';

import styled from 'styled-components';

import { CONST_HEADER } from '@/constants/constant';

import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';

const HeaderButton = styled.button`
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

const buttonArray = [
  {
    name: 'sideMenuIconDetail',
    width: '1rem',
    height: '1rem',
    imageUrl: CONST_HEADER.HEADER_BUTTON_IMAGE_URL.SIDE_MENU_ICON,
  },
  {
    name: 'dogLogoDetail',
    width: '12rem',
    height: '4rem',
    imageUrl: CONST_HEADER.HEADER_BUTTON_IMAGE_URL.MAIN_LOGO_ICON,
  },
  {
    name: 'userIconDetatil',
    width: '1rem',
    height: '1rem',
    imageUrl: CONST_HEADER.HEADER_BUTTON_IMAGE_URL.USER_ICON,
  },
];

const wrapStyle = { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.1rem' };

export default function MyHeader() {
  return (
    <Wrap_mediaquery style={wrapStyle}>
      {buttonArray.map((e, i) => (
        <HeaderButton key={i + e.name} style={e} />
      ))}
    </Wrap_mediaquery>
  );
}

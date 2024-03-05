'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';

import { BUTTON_TYPE, CONST_HEADER } from '@/constants/constant';

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
    name: BUTTON_TYPE.HEADER_SIDEMENU,
    width: '1rem',
    height: '1rem',
    imageUrl: CONST_HEADER.HEADER_BUTTON_IMAGE_URL.SIDE_MENU_ICON,
  },
  {
    name: BUTTON_TYPE.HEADER_MAINLOGO,
    width: '12rem',
    height: '4rem',
    imageUrl: CONST_HEADER.HEADER_BUTTON_IMAGE_URL.MAIN_LOGO_ICON,
  },
  {
    name: BUTTON_TYPE.HEADER_MYPAGE,
    width: '1rem',
    height: '1rem',
    imageUrl: CONST_HEADER.HEADER_BUTTON_IMAGE_URL.USER_ICON,
  },
];

const wrapStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 0.5rem',
};

const clickHeaderButton = (type, router) => {
  if (type === BUTTON_TYPE.HEADER_MYPAGE) router.push('/login');
  if (type === BUTTON_TYPE.HEADER_MAINLOGO) router.push('/');
};

export default function MyHeader() {
  var router = useRouter();
  return (
    <Wrap_mediaquery style={wrapStyle}>
      {buttonArray.map((e, i) => (
        <HeaderButton
          key={i + e.name}
          style={e}
          onClick={() => {
            clickHeaderButton(e.name, router);
          }}
        />
      ))}
    </Wrap_mediaquery>
  );
}

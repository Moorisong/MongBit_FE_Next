'use client';

import { HeaderButton } from '@/components/ui/button/Button';
import { WhiteWrapWithFlex } from '@/components/ui/wrap/Wrap';
import { CONST_MAIN_PAGE } from '@/constants/constant';

const buttonArray = [
  {
    name: 'sideMenuIconDetail',
    width: '1rem',
    height: '1rem',
    imgUrl: CONST_MAIN_PAGE.HEADER_BUTTON_IMAGE_URL.SIDE_MENU_ICON,
  },
  {
    name: 'dogLogoDetail',
    width: '12rem',
    height: '4rem',
    imgUrl: CONST_MAIN_PAGE.HEADER_BUTTON_IMAGE_URL.MAIN_LOGO_ICON,
  },
  {
    name: 'userIconDetatil',
    width: '1rem',
    height: '1rem',
    imgUrl: CONST_MAIN_PAGE.HEADER_BUTTON_IMAGE_URL.USER_ICON,
  },
];

const wrapStyle = { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' };
const combinedStyle = { ...wrapStyle, paddingTop: '1.1rem;' };

export default function MyHeader() {
  return (
    <WhiteWrapWithFlex style={combinedStyle}>
      {buttonArray.map((e, i) => (
        <HeaderButton key={i + e.name} style={e} />
      ))}
    </WhiteWrapWithFlex>
  );
}

'use client';
import { CONST_HEADER } from '@/constants/constant';

import { HeaderButton } from '@/components/ui/button/Button';
import { WhiteWrapWithFlex } from '@/components/ui/wrap/Wrap';

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

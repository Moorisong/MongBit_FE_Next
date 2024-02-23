'use client';

import { HeaderButton } from '@/components/ui/button/Button';
import { WhiteWrapWithFlex } from '@/components/ui/wrap/Wrap';

const buttonArray = [
  {
    name: 'sideMenuIconDetail',
    width: '1rem',
    height: '1rem',
    imgUrl: '/images/header/side-menu.svg',
  },
  {
    name: 'dogLogoDetail',
    width: '12rem',
    height: '4rem',
    imgUrl: '/images/header/logo_main.svg',
  },
  {
    name: 'userIconDetatil',
    width: '1rem',
    height: '1rem',
    imgUrl: '/images/header/user.svg',
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

'use client';
import Button from '@/components/ui/button/Button';
import styled from 'styled-components';

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

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 420px;
  background-color: white;

  @media (max-width: 375px) {
    width: 375px;
  }
`;

export default function MyHeader() {
  return (
    <Wrap>
      {buttonArray.map((e, i) => (
        <Button key={i + e.name} style={e} />
      ))}
    </Wrap>
  );
}

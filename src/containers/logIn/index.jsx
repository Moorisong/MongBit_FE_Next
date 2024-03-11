'use client';
import { styled } from 'styled-components';

import { CONST_FONT, DOMAIN, IMAGE_ALT_STRING, MEDIAQUERY } from '@/constants/constant';

import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';
import { TextElement } from '@/components/ui/text/Text';

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${CONST_FONT.COLOR.BLACK};
  font-size: ${CONST_FONT.SIZE.FONT_SIZE_BIG};
  font-weight: ${CONST_FONT.BOLD_SCALE.SECOND};
  margin-botton: 3rem;
`;

const Image = styled.img`
  width: 12rem;
  height: 5rem;
  margin: 5rem 0 2rem 0;
`;

const YellowKakaoLoginButton = styled.button`
  width: 100%;
  max-width: ${MEDIAQUERY.WIDTH_370};
  height: 3rem;
  background-image: url('images/logIn/kakaoLogInBtn.png');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  margin-bottom: 5rem;

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    max-width: ${MEDIAQUERY.WIDTH_345};
  }
`;

const wrapStyle = { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' };
const textSTyle = {
  fontSize: CONST_FONT.SIZE.FONT_SIZE_SMALL_1,
  color: CONST_FONT.COLOR.BLACK,
  margin: '2rem 0 1rem 0',
};
const copyrightTextStyle = {
  color: CONST_FONT.COLOR.GRAY_2,
  fontSize: CONST_FONT.SIZE.FONT_SIZE_SMALL_2,
  marginBottom: '5rem',
};

export default function Login() {
  // console.log(process.env.NEXT_PUBLIC_FE_URL);
  // console.log(process.env.NODE_ENV);
  const url = process.env.NEXT_PUBLIC_FE_URL
    ? `https://kauth.kakao.com/oauth/authorize?client_id=3245a5f9cb8303814aadbe1eb65b2e73&redirect_uri=${process.env.NEXT_PUBLIC_FE_URL}/login/oauth2/kakao/code&response_type=code`
    : `https://kauth.kakao.com/oauth/authorize?client_id=3245a5f9cb8303814aadbe1eb65b2e73&redirect_uri=${DOMAIN}/login/oauth2/kakao/code&response_type=code`;

  const kakaoLogin = () => {
    window.location.href = url;
  };

  // 어드민
  // useEffect(() => {
  //   addDailyVisitCount();
  // }, []);

  return (
    <Wrap_mediaquery style={wrapStyle}>
      <TextElement text={'3초만에 로그인하고'} style={textSTyle}></TextElement>
      <TextWrap>
        <TextElement text={'무료로 성격 검사'} />
        <TextElement text={'친구에게 공유까지'} />
      </TextWrap>
      <Image src={'/images/logIn/loginLogo.svg'} alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '카카오 로그인 아이콘'} />
      <TextElement text={'© 2023 MongMoongCrew. All rights reserved'} style={copyrightTextStyle} />
      <YellowKakaoLoginButton onClick={kakaoLogin} />
    </Wrap_mediaquery>
  );
}

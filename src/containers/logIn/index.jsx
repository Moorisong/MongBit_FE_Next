'use client';
import { styled } from 'styled-components';

import { CONST_FONT, DOMAIN, IMAGE_ALT_STRING, MEDIAQUERY } from '@/constants/constant';

import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';
import { Text } from '@/components/ui/CommonElements';

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${CONST_FONT.COLOR.BLACK};
  font-size: ${CONST_FONT.SIZE.FONT_SIZE_BIG};
  font-weight: ${CONST_FONT.BOLD_SCALE.SECOND};
  margin-top: 1rem;
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

const CopyrightText = styled.p`
  color: ${CONST_FONT.COLOR.GRAY_2};
  font-size: ${CONST_FONT.SIZE.FONT_SIZE_SMALL_2};
  margin-bottom: 5rem;
`;

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
    <Wrap_mediaquery flexDirection="column" justifyContent="center" alignItems="center" padding="3rem 0 0 0 ">
      <Text fontSize={CONST_FONT.SIZE.FONT_SIZE_SMALL_1} color={CONST_FONT.COLOR.BLACK}>
        3초만에 로그인하고
      </Text>
      <TextWrap>
        <Text>무료로 성격 검사</Text>
        <Text>친구에게 공유까지</Text>
      </TextWrap>
      <Image src={'/images/logIn/loginLogo.svg'} alt={IMAGE_ALT_STRING.MONGBIT_TITLE + '카카오 로그인 아이콘'} />
      <CopyrightText>© 2023 MongMoongCrew. All rights reserved</CopyrightText>
      <YellowKakaoLoginButton onClick={kakaoLogin} />
    </Wrap_mediaquery>
  );
}

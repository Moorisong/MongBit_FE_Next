import { DOMAIN } from '@/constants/constant';

import MyPage from '@/containers/myPage';

export async function generateMetadata() {
  const url = `${DOMAIN}/mypage`;
  const title = '몽빗(MongBit)';
  let description = 'MBTI 심리테스트 공작소';
  let imageUrl = `${DOMAIN}/mypage/opengraph-image`;

  return {
    title,
    description,
    openGraph: {
      description,
      type: 'website',
      title,
      url,
      images: [
        {
          url: imageUrl,
          alt: '이미지 설명',
        },
      ],
    },
  };
}

export default function Page() {
  return <MyPage />;
}

import { DOMAIN } from '@/constants/constant';
import MyPage from '@/containers/myPage';

export async function generateMetadata() {
  const url = `${DOMAIN}/mypage`;
  const title = '몽빗(MongBit)';
  const description = 'MBTI 심리테스트 공작소';
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
          alt: 'og_image',
        },
      ],
    },
  };
}

export default function Page() {
  return <MyPage />;
}

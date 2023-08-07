import { DOMAIN } from '@/constants/constant';
import Main from '@/containers/main';

export async function generateMetadata() {
  const url = `${DOMAIN}`;
  const title = '몽빗 | MBTI 심리테스트 공작소';
  const description = 'MBTI 심리테스트 공작소';
  const imageUrl = `${DOMAIN}/main/opengraph-image`;
  // main의 opengraph-image.jsx 파일을 사용하도록 함
  const alt = '몽빗 MBTI 심리테스트 메인 페이지';

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
          alt: alt,
        },
      ],
    },
  };
}

export default function Home() {
  return <Main />;
}

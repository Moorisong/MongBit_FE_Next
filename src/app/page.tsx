import { DOMAIN } from '@/constants/constant';

import Main from '@/containers/main';

export async function generateMetadata() {
  const url = `${DOMAIN}`;
  const title = '몽빗(MongBit)';
  let description = 'MBTI 심리테스트 공작소';
  let imageUrl = `${DOMAIN}/main/opengraph-image`;
  // main의 opengraph-image.jsx 파일을 사용하도록 함

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

export default function Home() {
  return <Main />;
}

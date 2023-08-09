import { DOMAIN } from '@/constants/constant';
import Main from '@/containers/main';

export async function generateMetadata() {
  const url = `${DOMAIN}/`;
  const title = '몽빗 | MBTI 심리테스트 공작소';
  const description = 'MBTI 심리테스트 공작소';
  let imageUrl = `${DOMAIN}/main/opengraph-image`;

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
  return <Main />;
}

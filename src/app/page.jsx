import { DOMAIN } from '@/constants/constant';
import Main from '@/containers/main';

import sitemap from './sitemap';

export async function generateMetadata() {
  const url = `${DOMAIN}`;
  const title = '몽빗 | MBTI 심리테스트 공작소';
  const description = '조심스런 우리의 과감한 커뮤니케이션, MBTI 심리테스트 사이트 몽빗에 어서와!';
  const imageUrl = `${DOMAIN}/opengraph-image`;
  const alt = '몽빗 MBTI 심리테스트 메인 페이지';

  sitemap();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
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

import { DOMAIN } from '@/constants/constant';
import TestList from '@/containers/testList';

export async function generateMetadata() {
  const url = `${DOMAIN}/test/list`;
  const title = '몽빗 | MBTI 심리테스트 공작소';
  const description = '조심스런 우리의 과감한 커뮤니케이션, MBTI 심리테스트 사이트 몽빗에 어서와!';
  let imageUrl = `${DOMAIN}/test/list/opengraph-image`;

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
          alt: 'og_image',
        },
      ],
    },
  };
}

export default function Page() {
  return <TestList />;
}

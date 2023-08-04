import { DOMAIN } from '@/constants/constant';
import TestOn from '@/containers/testOn';

export async function generateMetadata({ params: { testId } }) {
  const url = `${DOMAIN}/test/on/${testId}`;
  const title = '몽빗(MongBit)';
  const description = 'MBTI 심리테스트 공작소';
  let imageUrl = `${DOMAIN}/test/on/${testId}/opengraph-image`;

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
  return <TestOn />;
}

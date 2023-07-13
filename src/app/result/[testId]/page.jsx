import { DOMAIN } from '@/constants/constant';

import Result from '@/containers/result';

export async function generateMetadata({ params: { testId } }) {
  const url = `${DOMAIN}/test/preview/${testId}`;
  const title = '몽빗(MongBit)';
  let description = 'MBTI 심리테스트 공작소';
  let imageUrl = `${DOMAIN}/result/${testId}/opengraph-image`;

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
  return <Result />;
}

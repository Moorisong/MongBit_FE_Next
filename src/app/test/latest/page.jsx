import { DOMAIN } from '@/constants/constant';
import TestLatest from '@/containers/testLatest';

export async function generateMetadata({ params: { testId, testResultId } }) {
  const url = `${DOMAIN}/test/latest`;
  const title = '몽빗 | MBTI 심리테스트 공작소';
  const description = '조심스런 우리의 과감한 커뮤니케이션, MBTI 심리테스트 사이트 몽빗에 어서와!';
  let imageUrl = `${DOMAIN}/record/${testId}/${testResultId}/opengraph-image`;

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
  return <TestLatest />;
}

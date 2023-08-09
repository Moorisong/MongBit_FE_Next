import { DOMAIN } from '@/constants/constant';
import Result from '@/containers/result';

export async function generateMetadata({ params: { testId } }) {
  const url = `${DOMAIN}/result/${testId}`;
  const title = '몽빗 | MBTI 심리테스트 공작소';
  const description = '조심스런 우리의 과감한 커뮤니케이션, MBTI 심리테스트 사이트 몽빗에 어서와!';
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
          alt: 'og_image',
        },
      ],
    },
  };
}

export default function Page() {
  return <Result />;
}

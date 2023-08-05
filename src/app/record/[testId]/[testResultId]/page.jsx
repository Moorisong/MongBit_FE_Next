import { DOMAIN } from '@/constants/constant';
import ViewOldResult from '@/containers/viewOldResults';

export async function generateMetadata({ params: { testId, testResultId } }) {
  const url = `${DOMAIN}/record/${testId}/${testResultId}`;
  const title = '몽빗 | MBTI 심리테스트 공작소';
  const description = 'MBTI 심리테스트 공작소';
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
  return <ViewOldResult />;
}

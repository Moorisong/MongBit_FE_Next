import { DOMAIN, DOMAIN_BE_PROD } from '@/constants/constant';
import { getTestData } from '@/utils/util';
import PreviewTest from '@/containers/previewTest/indxe';

export async function generateMetadata({ params: { testId } }) {
  const url = `${DOMAIN}/test/preview/${testId}`;
  const title = '몽빗 | MBTI 심리테스트 공작소';
  const description = '조심스런 우리의 과감한 커뮤니케이션, MBTI 심리테스트 사이트 몽빗에 어서와!';
  let imageUrl = `${DOMAIN}/test/preview/${testId}/opengraph-image`;

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

export default async function Page({ params }) {
  const { testId } = params;
  const [data] = await Promise.all([getTestData(`${DOMAIN_BE_PROD}/api/v1/tests/test/${testId}`)]);

  return <PreviewTest data={data} />;
}

import { DOMAIN, DOMAIN_BE_PROD } from '@/constants/constant';
import { getHeaders } from '@/utils/util';
import PreviewTest from '@/containers/previewTest/indxe';

export async function generateMetadata({ params: { testId } }) {
  const testData = await getData(testId);
  const url = `${DOMAIN}/test/preview/${testId}`;
  const title = '몽빗 | MBTI 심리테스트 공작소';
  const description = testData.content.replaceAll('<br>', '');
  let imageUrl = `${DOMAIN}/test/preview/${testId}/opengraph-image`;

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

async function getData(testId) {
  const headers = getHeaders();
  const res = await fetch(`${DOMAIN_BE_PROD}/api/v1/tests/test/${testId}`, { headers });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page({ params }) {
  const { testId } = params;
  const testData = await getData(testId);

  return <PreviewTest data={testData} />;
}

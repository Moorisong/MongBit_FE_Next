import { DOMAIN_BE_PROD } from '@/constants/constant';

import { getTestData } from '@/utils/util';
import PreviewTest from '@/containers/previewTest/indxe';

export async function generateMetadata({ params: { testId } }) {
  const url = `${DOMAIN_BE_PROD}/test/preview/${testId}`;
  const title = '몽빗(MongBit)';
  let description = 'MBTI 심리테스트 공작소';
  let imageUrl = `https://mong-bit-fe-next.vercel.app/test/preview/${testId}/opengraph-image`;

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

export default async function Page({ params }) {
  const { testId } = params;
  const [data] = await Promise.all([getTestData(`${DOMAIN_BE_PROD}/api/v1/tests/test/${testId}`)]);

  return <PreviewTest data={data} />;
}

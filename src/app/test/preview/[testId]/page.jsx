import axios from 'axios';

import { DOMAIN_BE_PROD } from '@/constants/constant';

import PreviewTest from '@/containers/previewTest/indxe';
import { getHeaders } from '@/utils/util';

export async function generateMetadata({ params: { testId } }) {
  const url = `${DOMAIN_BE_PROD}/test/preview/${testId}`;
  const title = '프리뷰 페이지입니다!';
  const description = '설명';
  const imageUrl = `https://3b41-219-255-158-61.ngrok-free.app/test/preview/${testId}/opengraph-image`;

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
      ]
    },
  };
}

export default async function Page({ params }) {
  const { testId } = params;
  const headers = getHeaders();
  let getData = axios.get(`${DOMAIN_BE_PROD}/api/v1/tests/test/${testId}`, { headers }).then((res) => res.data);

  const [data] = await Promise.all([getData]);

  return <PreviewTest data={data} />;
}

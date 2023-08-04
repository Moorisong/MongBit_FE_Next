import { ImageResponse } from 'next/server';

import { DOMAIN_BE_PROD } from '@/constants/constant';
import { getTestData } from '@/utils/util';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
export const runtime = 'edge';
export const alt = '몽빗 MBTI 심리테스트 프리뷰 페이지';

export default async function Image({ params: { testId } }) {
  try {
    let imgUrl;

    await getTestData(`${DOMAIN_BE_PROD}/api/v1/tests/test/${testId}`).then((r) => (imgUrl = r.imageUrl));

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            background: 'white',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={imgUrl}
            style={{
              objectFit: 'cover',
            }}
            alt="og_imgage"
          />
        </div>
      ),
      {
        width: 1200,
        height: 600,
      },
    );
  } catch (err) {
    return null;
  }
}

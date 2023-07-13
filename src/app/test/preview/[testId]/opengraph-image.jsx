import { ImageResponse } from 'next/server';

import { DOMAIN_BE_PROD, OG_STANDARD_IMAGE } from '@/constants/constant';

import { getTestData } from '@/utils/util';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
export const runtime = 'edge';

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
            alt=""
          />
        </div>
      ),
      {
        width: 1200,
        height: 600,
      },
    );
  } catch (err) {
    return OG_STANDARD_IMAGE;
  }
}

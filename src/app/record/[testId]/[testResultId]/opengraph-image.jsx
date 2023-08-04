import { ImageResponse } from 'next/server';

import { OG_TEST_RESULT } from '@/constants/constant';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
export const runtime = 'edge';
export const alt = '몽빗 MBTI 심리테스트 결과 페이지';

export default async function Image() {
  try {
    const imgUrl = OG_TEST_RESULT;

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

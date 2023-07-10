import { ImageResponse } from 'next/server';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
export const runtime = 'edge';

export default async function Image({ params: { testId } }) {
  try {
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
            src={'https://imgfootball.ytn.co.kr/osen/2022/12/202212072118024630_1.jpg'}
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
  } catch (error) {
    console.log(error);
    return null;
  }
}

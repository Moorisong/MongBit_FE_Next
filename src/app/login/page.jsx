import { DOMAIN } from '@/constants/constant';
import LogIn from '@/containers/logIn';

export async function generateMetadata() {
  const url = `${DOMAIN}/login`;
  const title = '몽빗(MongBit)';
  const description = 'MBTI 심리테스트 공작소';
  let imageUrl = `${DOMAIN}/login/opengraph-image`;

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
  return <LogIn />;
}
``;

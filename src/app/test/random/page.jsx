import { DOMAIN } from '@/constants/constant';
import RandomTest from '@/containers/randomTest';

export async function generateMetadata() {
  const url = `${DOMAIN}/test/random`;
  const title = '몽빗(MongBit)';
  let description = 'MBTI 심리테스트 공작소';
  let imageUrl = `${DOMAIN}/test/random/opengraph-image`;

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
  return <RandomTest />;
}

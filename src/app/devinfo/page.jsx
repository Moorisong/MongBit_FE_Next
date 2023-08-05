import { DOMAIN, OG_STANDARD_IMAGE } from '@/constants/constant';
import DevInfo from '@/containers/devInfo';

export async function generateMetadata() {
  const url = `${DOMAIN}/devinfo`;
  const title = '몽빗 | MBTI 심리테스트 공작소';
  const description = 'MBTI 심리테스트 공작소';
  const imageUrl = OG_STANDARD_IMAGE;

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
        },
      ],
    },
  };
}

export default function Page() {
  return <DevInfo />;
}

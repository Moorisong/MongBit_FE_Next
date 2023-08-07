import './globals.css';
import './font.css';

import NavigationBar from '@/components/NavigationBar';
import GlobalStateRoot from './GlobalStateRoot';

const inter = 'Noto Sans';

export const metadata = {
  title: '몽빗 | MBTI 심리테스트 공작소',
  description: 'MBTI 심리테스트 공작소',
  keywords: [
    'MBTI',
    'MBTI 연애',
    'MBTI 궁합',
    'MBTI 심리테스트',
    '무료 심테',
    'MBTI 검사',
    'MBTI 무료',
    '심리테스트',
    '연애 심테',
    '연애 심리테스트',
    'MongBit',
    '몽빗',
    'INFP',
    'ISFP',
    'INFJ',
    'INTJ',
    'INTP',
    'ISTP',
    'ISTJ',
    'ISFJ',
    'ENFP',
    'ESFP',
    'ENFJ',
    'ENTJ',
    'ENTP',
    'ESTP',
    'ESTJ',
    'ESFJ',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.2.0/kakao.min.js"
          integrity="sha384-x+WG2i7pOR+oWb6O5GV5f1KN2Ko6N7PTGPS7UlasYWNxZMKQA63Cj/B2lbUmUfuC"
          crossOrigin="anonymous"
        ></script>

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_GA_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_GA_ID}');
            `,
          }}
        />

        {/* Naver 웹마스터 등록 */}
        <meta name="naver-site-verification" content="3080d0760387b27d34081c736da49231b2f2112b" />
      </head>
      <body className={inter.className}>
        <GlobalStateRoot>
          <NavigationBar />
          {children}
        </GlobalStateRoot>
      </body>
    </html>
  );
}

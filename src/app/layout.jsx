import './globals.css';
import './font.css';

import NavigationBar from '@/components/NavigationBar';

const inter = 'Noto Sans';

export const metadata = {
  title: '몽빗(MongBit)',
  description: 'MBTI 심테 공작소',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.2.0/kakao.min.js"
          integrity="sha384-x+WG2i7pOR+oWb6O5GV5f1KN2Ko6N7PTGPS7UlasYWNxZMKQA63Cj/B2lbUmUfuC"
          crossorigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}

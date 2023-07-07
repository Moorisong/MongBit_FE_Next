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
      <body className={inter.className}>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}

'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { addDailyVisitCount } from '@/utils/util';

import styles from './index.module.css';
import Footer from '@/components/Footer';

export default function ExceptionPage() {
  const router = useRouter();

  useEffect(() => {
    addDailyVisitCount();
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', () => router.push('/main'));

    return () => {
      window.removeEventListener('popstate', () => router.push('/main'));
    };
  }, []);

  return (
    <div>
      <div className={styles.textBox}>
        <p>세션이 만료되었습니다.</p>
      </div>

      <div className={styles.logoImgWrap}>
        <img src="/images/logIn/loginLogo.svg" alt="몽빗 MBTI 심리테스트 사이트 로고 이미지" />
        <p className={styles.logoText}>© 2023 MongMoongCrew. All rights reserved</p>
      </div>

      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}

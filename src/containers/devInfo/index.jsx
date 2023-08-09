'use client';
import { useEffect } from 'react';
import Link from 'next/link';

import { addDailyVisitCount } from '@/utils/util';

import styles from './index.module.css';

export default function DevInfo() {
  useEffect(() => {
    addDailyVisitCount();
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.textBox}>
        <ul>
          <li>
            <span> GitHub &nbsp; : &nbsp; </span>
            <span className={styles.gitHub}>
              {' '}
              프론트엔드
              <Link href="https://github.com/Moorisong/MongBit_FE_Next" />
            </span>
            <span className={styles.gitHub}>
              {' '}
              백엔드
              <Link href="https://github.com/WillNeiman/MongBit_Backend" />
            </span>
          </li>
          <li>
            <span>Instagram &nbsp; : &nbsp; </span>
            <span className={styles.instagram}>
              {' '}
              몽빗 계정
              <Link href="https://www.instagram.com/mongbit_" />
            </span>
          </li>
        </ul>
      </div>

      <div className={styles.logoImgWrap}>
        <img src="/images/logIn/loginLogo.svg" alt="몽빗 MBTI 심리테스트 사이트 로고 이미지" />
        <p className={styles.logoText}>© 2023 MongMoongCrew. All rights reserved</p>
      </div>

      <div className={`${styles.bgWhite} ${styles.footerWrap}`}></div>
    </div>
  );
}

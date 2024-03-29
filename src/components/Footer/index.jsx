import Link from 'next/link';

import { TYPE_LOGIN, TYPE_ON_TEST, TYPE_MYPAGE, TYPE_TEST_LIST } from '@/constants/constant';

import styles from './index.module.css';

export default function Footer(props) {
  const cn = () => {
    if (props.type === TYPE_ON_TEST) return `${styles.wrap} ${styles.moveBottom}`;
    if (props.type === TYPE_LOGIN) return `${styles.wrap} ${styles.moveBottom_2}`;
    if (props.type === TYPE_MYPAGE) return `${styles.wrap} ${styles.moveBottom_3}`;
    if (props.type === TYPE_TEST_LIST) return `${styles.wrap} ${styles.moveBottom_4}`;
    return `${styles.wrap}`;
  };
  return (
    <div className={cn()}>
      <div className={styles.upper}>
        <p>몽뭉이 크루 &nbsp; | &nbsp; 서울 관악구 신림역 스터디존에서 만듦 &nbsp; </p>
        <p> 채용문의 &nbsp; | &nbsp; 채용되고 싶다</p>
      </div>
      <div className={styles.docs}>
        <span>
          <Link href="/terms" target="_blank">
            <p>이용약관</p>
          </Link>
        </span>

        <span>
          <Link href="/policy" target="_blank">
            <p>개인정보처리방침</p>
          </Link>
        </span>
      </div>
      <div className={styles.under}>
        <div>
          <div className={styles.gitHub}>
            <Link className={styles.gitHub} href="https://github.com/WillNeiman/MongBit_Backend" />
          </div>
          <div className={styles.instagram}>
            <Link className={styles.instagramIcon} href="https://www.instagram.com/mongbit_" />
          </div>
        </div>
        <p>© 2023 MongMoongCrew. All rights reserved </p>
      </div>
    </div>
  );
}

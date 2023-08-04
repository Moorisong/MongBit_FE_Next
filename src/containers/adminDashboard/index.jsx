'use client';
import { useRouter } from 'next/navigation';

import styles from './index.module.css';

export default function AdminDashboard() {
  const router = useRouter();

  function onClickGoMain() {
    router.push('/main');
  }
  return (
    <div className={styles.wrap}>
      <div>
        <div onClick={onClickGoMain}>메인으로</div>
      </div>
      <div className={styles.menuBar}></div>
      <div className={styles.contentWrap}></div>
    </div>
  );
}

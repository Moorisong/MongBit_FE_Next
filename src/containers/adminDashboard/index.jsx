'use client';
// import { useRouter } from 'next/navigation';

import styles from './index.module.css';

export default function AdminDashboard() {
  // const router = useRouter();

  return (
    // 배경, 사이드 바
    <div className={styles.wrap}>
      <div>
        <div className={styles.menuBar}>
          <p>ADMIN</p>
          <ul>
            <li>
              <img src="/images/adminDashboard/menuBar_dashboard.svg" alt="" />
              <span>Dashboard</span>
            </li>
            <li>
              <img src="/images/adminDashboard/menuBar_contents.svg" alt="" />
              <span>Contents</span>
            </li>
            <li>
              <img src="/images/adminDashboard/menuBar_members.svg" alt="" />

              <span>Members</span>
            </li>
            <li>
              <img src="/images/adminDashboard/menuBar_insight.svg" alt="" />

              <span>Insight</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 본문 콘텐츠 */}
      <div className={styles.contentWrap}>
        <div></div>
      </div>
    </div>
  );
}

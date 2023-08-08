'use client';
import { useState } from 'react';

import { apiBe } from '@/services';
import { getHeaders } from '@/utils/util';

import { CountCardWithColor } from '@/components/Dashboard/CountShowContent';
import styles from './index.module.css';

export default function AdminDashboard() {
  const headers = getHeaders();
  // apiBe.get('/api/v2/metrics/visits/count', {headers})
  // .then((r)=> console.log('aa--> ', r.data))
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

        {/* 콘텐츠 내용 */}
        <div>
          <CountCardWithColor title="Total Visits" count="1000" borderColor="green" />
        </div>
      </div>
    </div>
  );
}

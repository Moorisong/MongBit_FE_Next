'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { decodeToken } from '@/utils/util';

import styles from './index.module.css';

export default function Admin() {
  const router = useRouter();

  function onClickTestAdd() {
    router.push('/admin/testAdd');
  }

  function onClickDashboard() {
    router.push('/admin/dashboard');
  }

  useEffect(() => {
    if (decodeToken().role !== 'ROLE_ADMIN') return router.push('/main');
  }, []);
  return (
    <div className={styles.wrap}>
      <div onClick={onClickTestAdd}>
        <span>테스트 추가</span>
      </div>

      <div onClick={onClickDashboard}>
        <span>대시보드 가기</span>
      </div>
    </div>
  );
}

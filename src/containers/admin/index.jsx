'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { decodeToken } from '@/utils/util';

import TestAdd from '@/components/TestAdd';

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    if (decodeToken().role !== 'ROLE_ADMIN') return router.push('/main');
  }, []);
  return <TestAdd />;
}

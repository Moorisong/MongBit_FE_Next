'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import axios from 'axios';

import { COUPANG_VISIT, DOMAIN_BE_PROD, DOMAIN_BE_DEV } from '@/constants/constant';

import styles from './index.module.css';
import Footer from '@/components/Footer';
import TestResult from '@/components/TestResult';
import ResultLoading from '@/components/ResultLoading';

import { decodeToken, getHeaders } from '@/utils/util';

export default function Result() {
  const [resultData, SetResultData] = useState({
    titleStr: '',
    contentStrArr: [],
    imgUri: '',
    testResultId: '',
  });
  let [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathName = usePathname();
  const params = useParams();
  const memberId = sessionStorage.getItem('mongBitmemeberId');

  useEffect(() => {
    if (!decodeToken().state) {
      sessionStorage.setItem('ngb', pathName);
      return router.push('/need_login');
    }
    checkCoupnagSiteVisit();

    if (!sessionStorage.getItem('mbScore'))
      return router.push(`/record/${params.testId}/${sessionStorage.getItem('mbResultId')}`);

    const popstateHandler = () => {
      router.push('/exception');
    };
    window.addEventListener('popstate', popstateHandler);

    const headers = getHeaders();

    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/test/${params.testId}/like/count`, {
        headers,
      })
      .then((res) => {
        SetResultData((prev) => ({ ...prev, likeCnt: res.data }));
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
      });

    const score = JSON.parse(sessionStorage.getItem('mbScore'));
    axios
      .post(`${DOMAIN_BE_PROD}/api/v1/member-test-result/${params.testId}/${memberId}`, score, { headers })
      .then((res) => {
        const contentArray = res.data.content.split('<br>');

        SetResultData((prev) => ({
          ...prev,
          titleStr: res.data.title,
          contentStrArr: contentArray,
          imgUri: res.data.imageUrl,
          testResultId: res.data.id,
        }));
        sessionStorage.removeItem('mbScore');
        sessionStorage.setItem('mbResultId', res.data.id);
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
      });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      popstateHandler();
      clearTimeout(timer);
      window.removeEventListener('popstate', popstateHandler);
    };
  }, []);

  function isWithin24Hours(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    const diff = Math.abs(new Date(date1) - new Date(date2));
    return diff < oneDay;
  }

  function checkCoupnagSiteVisit() {
    const coupangVisitDate = localStorage.getItem(COUPANG_VISIT);
    const currentDate = new Date();

    if (!coupangVisitDate || !isWithin24Hours(coupangVisitDate, currentDate))
      router.push(`/result/before/${params.testId}`);
  }

  return (
    <div className={styles.wrap}>
      {loading && <ResultLoading />}
      {loading ||
        (resultData.titleStr && (
          <TestResult
            titleStr={resultData.titleStr}
            contentStrArr={resultData.contentStrArr}
            likeCnt={resultData.likeCnt && resultData.likeCnt}
            testId={params.testId}
            imgUri={resultData.imgUri}
            testResultId={resultData.testResultId}
          />
        ))}
      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}

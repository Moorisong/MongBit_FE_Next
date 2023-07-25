'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import cx from 'classnames';

import { COUPANG_VISIT, DOMAIN_BE_PROD, DOMAIN_BE_DEV } from '@/constants/constant';
import { getHeaders } from '@/utils/util';

import styles from './index.module.css';
import Footer from '@/components/Footer';
import TestResult from '@/components/TestResult';
import ResultLoading from '@/components/ResultLoading';

export default function Result() {
  const [resultData, SetResultData] = useState({
    titleStr: '',
    contentStrArr: [],
    imgUri: '',
    testResultId: '',
  });
  let [loading, setLoading] = useState(true);

  const router = useRouter();
  const params = useParams();
  const memberId = sessionStorage.getItem('mongBitmemeberId');

  useEffect(() => {
    // 다른 플랫폼에서 URI 클릭해서 페이지 진입한 경우
    if (!sessionStorage.getItem('mbTestDone')) return router.push('/main');

    checkCoupnagSiteVisit();

    if (!sessionStorage.getItem('mbScore')) {
      return router.push(`/record/${params.testId}/${sessionStorage.getItem('mbResultId')}`);
    }
    const popstateHandler = (evt) => {
      // 뒤로 가기 했을 때 익셉션 페이지로 이동시키기
      if (evt && evt.state) {
        router.push('/exception');
      }
    };
    window.addEventListener('popstate', (evt) => {
      popstateHandler(evt);
    });

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

      <div
        className={cx(styles.resultWrap, {
          [styles.displayNone]: loading,
        })}
      >
        <TestResult
          loadingState={loading}
          titleStr={resultData.titleStr}
          contentStrArr={resultData.contentStrArr}
          likeCnt={resultData.likeCnt && resultData.likeCnt}
          testId={params.testId}
          imgUri={resultData.imgUri}
          testResultId={resultData.testResultId}
        />
      </div>

      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}

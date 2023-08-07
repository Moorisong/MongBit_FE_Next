'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import cx from 'classnames';
import { useRecoilState } from 'recoil';

import { showCoupangClickWrap } from '/atom.js';

import { COUPANG_VISIT, DOMAIN_BE_PROD } from '@/constants/constant';
import { decodeToken, getHeaders } from '@/utils/util';

import CoupangAdv_3 from '@/components/CoupangAdv_3';
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
  const [loading, setLoading] = useState(true);
  const [showCoupangBox, setShowCoupangBox] = useState(false);
  const [secondNumber, setSecondNumber] = useState(5);
  const [, setGlobalCoupangState] = useRecoilState(showCoupangClickWrap);

  const router = useRouter();
  const params = useParams();
  const memberId = typeof window !== 'undefined' ? sessionStorage.getItem('mongBitmemeberId') : '';

  useEffect(() => {
    const currLocation = window.location.href;
    // 다른 플랫폼에서 URI 클릭해서 페이지 진입한 경우
    if (!sessionStorage.getItem('mbTestDone')) return router.push('/main');

    checkCoupnagSiteVisit();

    if (!sessionStorage.getItem('mbScore')) {
      return router.push(`/record/${params.testId}/${sessionStorage.getItem('mbResultId')}`);
    }

    const popstateHandler = (evt) => {
      // 뒤로 가기 했을 때 결과 페이지로 가도록
      if (evt && evt.state) {
        router.push(currLocation);
      }
    };

    function getResult(url) {
      const headers = getHeaders();

      axios
        .post(url, score, { headers })
        .then((res) => {
          const contentArray = res.data.content.split('<br>');

          SetResultData((prev) => ({
            ...prev,
            titleStr: res.data.title,
            contentStrArr: contentArray,
            imgUri: res.data.imageUrl,
            testResultId: res.data.id,
          }));
          sessionStorage.setItem('mbResultId', res.data.id);
        })
        .catch((err) => {
          alert(err.response.data);
          router.push('/login');
        });
    }

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

    // 토큰이 유효한지 검증 후에 회원/비회원 결과 보기 API 호출 진행
    if (decodeToken().state) {
      getResult(`${DOMAIN_BE_PROD}/api/v1/member-test-result/${params.testId}/${memberId}`);
    } else {
      getResult(`${DOMAIN_BE_PROD}/api/v1/member-test-result/${params.testId}`);
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      popstateHandler();
      clearTimeout(timer);
      window.removeEventListener('popstate', popstateHandler);
    };
  }, []);

  useEffect(() => {
    // 1~5초 카운트 인터벌 세팅
    let interval;
    if (!loading && showCoupangBox) {
      interval = setInterval(() => {
        if (secondNumber > 0) {
          setSecondNumber(secondNumber - 1);
        } else {
          return clearInterval(interval);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [loading, secondNumber]);

  useEffect(() => {
    if (!loading && showCoupangBox) setGlobalCoupangState(true);
  }, [loading, showCoupangBox]);

  useEffect(() => {
    const handleDocVisibilitychange = () => {
      // 쿠팡 광고 페이지에서 몽빗 페이지로 돌아올때마다 실행되도록 함

      if (localStorage.getItem(COUPANG_VISIT)) {
        setShowCoupangBox(false);
        setGlobalCoupangState(false);
      }
    };

    document.addEventListener('visibilitychange', handleDocVisibilitychange);

    return () => {
      document.removeEventListener('visibilitychange', handleDocVisibilitychange);
    };
  }, []);

  function isWithin12Hours(date1, date2) {
    const halfDay = 12 * 60 * 60 * 1000;
    const diff = Math.abs(new Date(date1) - new Date(date2));
    return diff < halfDay;
  }

  function checkCoupnagSiteVisit() {
    const coupangVisitDate = localStorage.getItem(COUPANG_VISIT);
    const currentDate = new Date();

    if (!coupangVisitDate || !isWithin12Hours(coupangVisitDate, currentDate))
      // router.push(`/result/before/${params.testId}`);
      setShowCoupangBox(true);
  }

  function saveCoupangVisitDate() {
    const currentDate = new Date();
    localStorage.setItem(COUPANG_VISIT, currentDate);
  }

  function onClickAdv() {
    const link = 'https://link.coupang.com/a/2s6aq';

    saveCoupangVisitDate();
    sessionStorage.removeItem('mbScore');
    window.open(link, '_blank');
  }

  function onClickCancelIcon() {
    setShowCoupangBox(false);
    setGlobalCoupangState(false);
  }

  return (
    <div className={styles.wrap}>
      {loading && <ResultLoading />}

      {!loading && showCoupangBox && (
        <div className={styles.coupangBox}>
          <div className={styles.coupangContent}>
            <p>
              <strong>쿠팡&nbsp;</strong>
              <span>다녀와서 결과 확인하기!</span>
            </p>
            <div className={styles.bannerWrap}>
              <div className={styles.overlayBanner} onClick={onClickAdv}></div>
              <CoupangAdv_3 />
              {secondNumber === 0 ? (
                <img
                  src="/images/coupangAdv/closeButton.svg"
                  alt="몽빗 MBTI 심리테스트 사이트 배너 닫기 아이콘"
                  onClick={onClickCancelIcon}
                />
              ) : (
                <div>
                  <p>{secondNumber}</p>
                </div>
              )}
            </div>
            <div>
              <p>쿠팡 다녀오면</p>
              <strong>12시간 동안 광고없이 무제한 이용</strong>
            </div>
          </div>
        </div>
      )}

      <div
        className={cx(styles.resultWrapper, {
          [styles.displayNone]: loading,
          [styles.noScroll]: showCoupangBox,
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

      {loading && (
        <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
          <Footer />
        </div>
      )}
    </div>
  );
}

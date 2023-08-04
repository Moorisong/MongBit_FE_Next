'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import lottie from 'lottie-web';

import { decodeToken, getHeaders } from '@/utils/util';

import animationData_1 from './loading_2.json';
import animationData_2 from './seeMoreIcon.json';
import Footer from '../../components/Footer';
import styles from './index.module.css';
import { TestSetMyPage } from '../../components/TestSets';
import { TitleWithText } from '../../components/Titles';
import { TITLE_WITH_CONTENT, TYPE_MYPAGE, USER_INFO, DOMAIN_BE_PROD, DOMAIN_BE_DEV } from '../../constants/constant';
import { Stroke } from '../../components/ButtonSets';

export default function MyPage() {
  const router = useRouter();
  const pathName = usePathname();
  const containerRef_1 = useRef(null);
  const containerRef_2 = useRef(null);

  const [isMounted, setIsMounted] = useState(false);
  const [testData, setTestData] = useState({
    resultArr: [],
    hasNextPage: false,
  });
  let [page, setPage] = useState(0);
  let [clickSeeMore, setClickSeeMore] = useState(false);
  const [loading, setLoading] = useState(true);

  if (typeof sessionStorage === 'undefined') return;
  if (!sessionStorage.getItem(USER_INFO + 'registDate')) router.push('/login');
  const dateParts = sessionStorage
    .getItem(USER_INFO + 'registDate')
    .split('T')[0]
    .split('-');
  const registerDate = `${dateParts[0]}.${dateParts[1]}.${dateParts[2]}`;

  useEffect(() => {
    setIsMounted(true);
    const anim = lottie.loadAnimation({
      container: containerRef_1.current,
      renderer: 'svg',
      animationData: animationData_1,
      loop: true,
      autoplay: true,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef_2.current,
      renderer: 'svg',
      animationData: animationData_2,
      loop: true,
      autoplay: true,
    });

    return () => {
      anim.destroy();
    };
  }, [clickSeeMore]);

  useEffect(() => {
    // 토큰 없는 경우
    if (!decodeToken().state) {
      sessionStorage.setItem('ngb', pathName);
      router.push('/login');
    }

    // 마이페이지 테스트 기록 조회
    const memberId = sessionStorage.getItem('mongBitmemeberId');
    const params = {
      page: page,
      size: 10,
    };
    const headers = getHeaders();

    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/member-test-result/${memberId}`, {
        params: params,
        headers: headers,
      })
      .then((res) => {
        setTestData((prev) => ({
          ...prev,
          resultArr: res.data.memberTestResultDTOList,
          hasNextPage: res.data.hasNextPage,
        }));
        setLoading(false);
        setPage(page + 1);
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
      });
  }, []);

  function clickSeeMoreResult() {
    setClickSeeMore(true);

    if (!decodeToken().state) {
      sessionStorage.setItem('ngb', pathName);
      return router.push('/login');
    }
    const memberId = sessionStorage.getItem('mongBitmemeberId');
    const params = {
      page: page,
      size: 10,
    };
    const headers = getHeaders();
    axios
      .get(
        `${DOMAIN_BE_PROD}/api/v1/member-test-result/${memberId}`,
        {
          params,
        },
        { headers },
      )
      .then((res) => {
        let copy = [...testData.resultArr];
        res.data.memberTestResultDTOList.forEach((ele) => {
          copy.push(ele);
        });
        setTestData((prev) => ({
          ...prev,
          resultArr: copy,
          hasNextPage: res.data.hasNextPage,
        }));
        setLoading(false);
        setPage(page + 1);
        setClickSeeMore(false);
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
      });
  }
  return (
    <>
      {isMounted && (
        <div className={styles.wrap}>
          <TitleWithText type_1={TITLE_WITH_CONTENT} title="🦁 마이페이지" />

          <div className={styles.userInfoWrap}>
            <img
              src={sessionStorage.getItem(USER_INFO + 'thumbnail')}
              alt="몽빗 MBTI 심리테스트 사이트 유저 이미지"
              className={styles.userImg}
            />
            <div className={styles.spanWrap}>
              <p>{sessionStorage.getItem(USER_INFO + 'username')}</p>
              <p>{registerDate} 가입</p>
            </div>
          </div>
          <Stroke type_1={TYPE_MYPAGE} type_2="1" />
          <TitleWithText type_1={TITLE_WITH_CONTENT} type_2={TYPE_MYPAGE} title=" 🐭 최근 테스트 결과(10개)" />
          {loading && (
            <div>
              <div ref={containerRef_1} className={styles.loadImg}></div>
            </div>
          )}
          {!loading && testData.resultArr.length == 0 ? (
            <div className={styles.noResultWrap}>
              <p>최근 테스트 결과가 없습니다.</p>
              <Link href="/test/list" className={styles.goTestLink}>
                테스트 보러 가기
              </Link>
            </div>
          ) : (
            testData.resultArr.map((t, i) => (
              <TestSetMyPage
                key={i}
                title={t.title}
                testId={t.testId}
                testResultId={t.testResultId}
                content={{
                  description: t.content,
                  date: t.testData,
                }}
                type={TYPE_MYPAGE}
                imgUri={t.imageUrl}
                hasNextPage={testData.hasNextPage}
              />
            ))
          )}

          {testData.hasNextPage && (
            <div className={styles.seeMoreWrap} onClick={clickSeeMoreResult}>
              {clickSeeMore ? (
                <div className={styles.loadImgWrap_2}>
                  <div ref={containerRef_2}></div>
                </div>
              ) : (
                <>
                  <button>더보기</button>
                  <img src="/images/test/seeMoreIcon.svg" alt="몽빗 MBTI 심리테스트 마이페이지 더보기 아이콘" />
                </>
              )}
            </div>
          )}

          <div className={styles.footerWrap}>
            <Footer type={TYPE_MYPAGE} />
          </div>
        </div>
      )}
    </>
  );
}

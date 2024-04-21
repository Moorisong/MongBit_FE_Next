'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import cx from 'classnames';
import lottie from 'lottie-web';

import { getHeaders, setUTMParameter, addDailyVisitCount } from '@/utils/util';
import { apiBe } from '@/services';

import animationData_1 from './loading_2.json';
import { TitleWithText } from '@/components/Titles';
import { TestSetComplete } from '@/components/TestSets';
import styles from './index.module.css';
import { TYPE_TEST_LIST, TITLE_WITH_CONTENT } from '../../constants/constant';

export default function TestList() {
  const [data, setData] = useState({
    testArr: [],
    hasNextPage: false,
  });
  const containerRef_1 = useRef(null);
  const [slideIn, setSlideIn] = useState(false);
  let [page, setPage] = useState(0);
  const titleStr = '💛  몽빗 심테';
  const contentStr = '몽빗에 있는 모든 테스트는 이곳에!';
  const router = useRouter();

  useEffect(() => {
    addDailyVisitCount();
  }, []);

  useEffect(() => {
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
    setUTMParameter(router);

    const headers = getHeaders();
    apiBe.get(`/api/v1/tests/${page}/10`, { headers }).then((res) => {
      setData((prev) => ({
        ...prev,
        testArr: res.data.testCoverDTOList,
        hasNextPage: res.data.hasNextPage,
      }));
      setPage(page + 1);
    });
    const timer = setTimeout(() => {
      setSlideIn(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  function clickSeeMoreBtn() {
    const headers = getHeaders();
    apiBe.get(`/api/v1/tests/${page}/10`, { headers }).then((res) => {
      let copy = [...data.testArr];
      res.data.testCoverDTOList.forEach((d) => {
        copy.push(d);
      });
      setData((prev) => ({
        ...prev,
        testArr: copy,
        hasNextPage: res.data.hasNextPage,
      }));
      setPage(page + 1);
    });
  }

  return (
    <div className={styles.containerWrap}>
      <div className={styles.titleTextWrap}>
        <TitleWithText
          className={styles.titleWithText}
          title={titleStr}
          content={contentStr}
          type_1={TITLE_WITH_CONTENT}
          type_2={TYPE_TEST_LIST}
        />
      </div>

      {data.testArr.length > 0 ? (
        data.testArr.map((d, i) => (
          <TestSetComplete
            key={i}
            type={TYPE_TEST_LIST}
            thumbnailStr={d.title}
            playCount={d.playCount}
            likeCount={d.likeCount}
            commentCount={d.commentCount}
            imageUrl={d.imageUrl}
            testId={d.id}
          />
        ))
      ) : (
        <div className={styles.loadImgWrap_1}>
          <div ref={containerRef_1}></div>
        </div>
      )}

      {data.hasNextPage && (
        <div className={styles.seeMoreWrap} onClick={clickSeeMoreBtn}>
          <button>더보기</button>
          <img src="/images/test/seeMoreIcon.svg" alt="몽빗 MBTI 심리테스트 목록 더보기 이미지" />
        </div>
      )}

      <div
        className={cx(styles.goRandomBtnWrap, {
          [styles.slideIn]: slideIn,
        })}
        onClick={() => {
          router.push('/test/random');
        }}
      >
        <Link className={styles.goRandomStartBtn} href="/test/random">
          아무거나 시작
        </Link>
        <img src="/images/test/nextIcon.svg" alt="몽빗 MBTI 심리테스트 목록 더보기 이미지" />
      </div>
    </div>
  );
}

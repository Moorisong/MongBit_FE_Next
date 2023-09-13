'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import lottie from 'lottie-web';

import { getHeaders, setUTMParameter, addDailyVisitCount } from '@/utils/util';
import { apiBe } from '@/services';

import animationData_1 from './loading_2.json';
import { TitleWithText } from '@/components/Titles';
import { TestSetComplete } from '@/components/TestSets';
import styles from './index.module.css';
import { TYPE_TEST_LIST, TITLE_WITH_CONTENT } from '../../constants/constant';

export default function TestLatest() {
  const [data, setData] = useState({
    testArr: [],
    hasNextPage: false,
  });
  const [slideIn, setSlideIn] = useState(false);
  const containerRef_1 = useRef(null);

  const titleStr = '😜 최신 심테';
  const contentStr = '몽빗 최신 심테들 여기 다 모여있어요!';
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
    apiBe.get(`/api/v1/tests/0/5`, { headers }).then((res) => {
      setData((prev) => ({
        ...prev,
        testArr: res.data.testCoverDTOList,
        hasNextPage: res.data.hasNextPage,
      }));
    });

    const timer = setTimeout(() => {
      setSlideIn(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
        <img src="/images/test/nextIcon.svg" alt="몽빗 MBTI 심리테스트 아무거나 시작 화살표 이미지" />
      </div>
    </div>
  );
}

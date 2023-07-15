'use client';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import cx from 'classnames';
import lottie from 'lottie-web';

import { getHeaders } from '@/utils/util';

import animationData_1 from './loading_2.json';
import { TitleWithText } from '@/components/Titles';
import { TestSetComplete } from '@/components/TestSets';
import styles from './index.module.css';
import { TYPE_TEST_LIST, TITLE_WITH_CONTENT, DOMAIN_BE_PROD, DOMAIN_BE_DEV } from '../../constants/constant';

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
    const headers = getHeaders();
    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/tests/${page}/10`, { headers })
      .then((res) => {
        setData((prev) => ({
          ...prev,
          testArr: res.data.testCoverDTOList,
          hasNextPage: res.data.hasNextPage,
        }));
        setPage(page + 1);
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
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
    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/tests/${page}/10`, { headers })
      .then((res) => {
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
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
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
          <img src="/images/test/seeMoreIcon.svg" alt="see_more" />
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
        <img src="/images/test/nextIcon.svg" alt="next_icon" />
      </div>
    </div>
  );
}

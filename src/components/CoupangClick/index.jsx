'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import lottie from 'lottie-web';

import { DOMAIN_BE_PROD, TYPE_COMMENT, COUPANG_VISIT } from '@/constants/constant';
import { getHeaders } from '@/utils/util';

import Footer from '../Footer';
import ResultLoading from '../ResultLoading';
import styles from './index.module.css';
import { CardButton, CommentReadOnly } from '../ButtonSets';
import animationData_1 from './commentAreaLaoadingIcon.json';

export default function CoupangClick(props) {
  const params = useParams();
  const containerRef_1 = useRef(null);
  const [showLoading, setShowLoading] = useState(false);
  const [data, setData] = useState({
    testId: params.testId,
    comment: [],
    memberId: props.memberId,
  });

  const router = useRouter();
  const timerRef = useRef(null);

  useEffect(() => {
    const headers = getHeaders();
    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/test/comments/${data.testId}/page/0`, {
        headers,
      })
      .then((res) => {
        setData((prev) => ({ ...prev, comment: res.data.commentDTOList }));
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
      });
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
    const handleDocVisibilitychange = () => {
      // 쿠팡 광고 페이지에서 몽빗 페이지로 돌아올때마다 실행되도록 함

      if (localStorage.getItem(COUPANG_VISIT)) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
          setShowLoading(false);
          router.push(`/result/${params.testId}`);
        }, 3000);
      }
    };

    document.addEventListener('visibilitychange', handleDocVisibilitychange);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      document.removeEventListener('visibilitychange', handleDocVisibilitychange);
    };
  }, []);

  function saveCoupangVisitDate() {
    const currentDate = new Date();
    localStorage.setItem(COUPANG_VISIT, currentDate);
  }

  function clickLink() {
    const link = 'https://link.coupang.com/a/2s6aq';
    setShowLoading(true);
    saveCoupangVisitDate();
    window.open(link, '_blank');
  }

  return (
    <div className={styles.wrap}>
      {showLoading && <ResultLoading />}

      {showLoading || (
        <div className={styles.content}>
          <div onClick={clickLink}>
            <button>쿠팡 보고 와서 결과 확인</button>
            <p>솔직하게 말할게요. 서버비 때문이예요ㅜㅜ </p>
          </div>
        </div>
      )}
      {showLoading || (
        <div className={styles.commentWrap}>
          <CardButton type={TYPE_COMMENT} />

          {data.comment.length === 0 ? (
            <div>
              <p>댓글이 없습니다</p>
            </div>
          ) : data.comment.length > 0 ? (
            data.comment.map((com, i) => (
              <div key={i} className={styles.commentContentWrap}>
                <CommentReadOnly data={com} memberId={data.memberId} testId={data.testId} id={com.id} />
              </div>
            ))
          ) : (
            <div className={styles.loadImgWrap_1}>
              <div ref={containerRef_1}></div>
            </div>
          )}
        </div>
      )}

      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}

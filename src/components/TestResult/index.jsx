import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import lottie from 'lottie-web';
import cx from 'classnames';

import { DOMAIN, TYPE_COMMENT, COMMENT_TIME } from '@/constants/constant';
import { decodeToken, shareToKakaotalk_result, getHeaders } from '@/utils/util';
import { apiBe } from '@/services';

import styles from './index.module.css';
import CoupangAdv_1 from '../CoupangAdv_1';
import { Stroke, Comment, AddCommentButton } from '../ButtonSets';
import animationData_1 from './commentLoading.json';
import animationData_2 from './commentAreaLaoadingIcon.json';
import { TestButton, CardButton } from '../ButtonSets';

export default function TestResult(props) {
  const [commentIndex, setCommentIndex] = useState([0, false]);
  const [commentLoading, setCommentLoading] = useState(true);
  const [commentChanged, setCommentChanged] = useState(true);
  const [commentValue, setCommentValue] = useState('');
  const [commentCnt, setCommentCnt] = useState(0);
  const [commentSeeMoreLoading, setCommentSeeMoreLoading] = useState(false);
  const [canAddComment, setCanAddComment] = useState(true);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // const [likeLoading, setLikeLoading] = useState(true);
  const [likeChanged, setLikeChanged] = useState(true);
  const [linkCopyState, setLinkCopyState] = useState(false);
  const [isSubmittingLike, setIsSubmittingLike] = useState(false);

  const [slideIn, setSlideIn] = useState(false);
  const [likeData, setLikeData] = useState({
    likeState: false,
    likeCnt: 0,
  });

  const [data, setData] = useState({
    testId: props.testId,
    thumbnailStr: props.thumbnailStr,
    thumbnailUri: props.thumbnailUri,
    playCnt: props.playCnt,
    contentArr: props.contentStrArr,
    comment: [],
  });

  useEffect(() => {
    const headers = getHeaders();
    apiBe.get(`/api/v1/test/comments/${data.testId}/page/${commentIndex[0]}`, { headers }).then((res) => {
      setData((prev) => ({ ...prev, comment: res.data.commentDTOList }));
      setCommentLoading(false);
      setCommentIndex([commentIndex[0] + 1, res.data.hasNextPage]);
    });
  }, [commentChanged]);

  useEffect(() => {
    // 댓글 도배 방지용

    let timer_AddCommnetBtn;

    if (!canAddComment) {
      timer_AddCommnetBtn = setTimeout(() => {
        setCanAddComment(true);
      }, 20000);
    }

    return () => {
      clearTimeout(timer_AddCommnetBtn);
    };
  }, [canAddComment]);

  data.comment.sort((a, b) => new Date(b.commentDate) - new Date(a.commentDate));

  const memberId = typeof window !== 'undefined' ? sessionStorage.getItem('mongBitmemeberId') : '';
  const resultPathName =
    location.pathname.indexOf('record') > -1 ? location.pathname : `/record/${props.testId}/${props.testResultId}`;
  const router = useRouter();
  const containerRef_1 = useRef(null);
  const containerRef_2 = useRef(null);

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
  }, [commentSeeMoreLoading]);

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
  }, [commentLoading]);

  useEffect(() => {
    const headers = getHeaders();
    const fetchLikeDataLogIned = async () => {
      const [stateResponse, cntResponse] = await Promise.all([
        apiBe.get(`/api/v1/test/${props.testId}/${memberId}/like`, { headers }),
        apiBe.get(`/api/v1/test/${props.testId}/like/count`, {
          headers,
        }),
      ]);

      setLikeData((prev) => ({
        ...prev,
        likeState: stateResponse.data,
        likeCnt: cntResponse.data,
      }));
      // setLikeLoading(false);
    };

    const fetchLikeDataNoLogined = async () => {
      const headers = getHeaders();
      apiBe
        .get(`/api/v1/test/${props.testId}/like/count`, {
          headers,
        })
        .then((res) => {
          setLikeData((prev) => ({ ...prev, likeCnt: res.data }));
        });
      // setLikeLoading(false);
    };

    if (decodeToken().state) {
      fetchLikeDataLogIned();
    } else {
      fetchLikeDataNoLogined();
    }
  }, [likeChanged]);

  useEffect(() => {
    const headers = getHeaders();
    apiBe
      .get(`/api/v1/test/${data.testId}/comments/count`, {
        headers,
      })
      .then((res) => {
        setCommentCnt(res.data);
      });
  }, [commentChanged]);

  useEffect(() => {
    let timer;

    if (!props.loadingState) {
      timer = setTimeout(() => {
        setSlideIn(true);
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [props.loadingState]);

  function clickRetry() {
    router.push(`/test/preview/${props.testId}`);
  }

  async function clickLikeBtn() {
    if (!decodeToken().state) {
      sessionStorage.setItem('ngb', location.pathname);
      return router.push('/login');
    }

    const headers = getHeaders();

    if (isSubmittingLike) return;
    setIsSubmittingLike(true);

    if (likeData.likeState) {
      setLikeData((prev) => ({
        ...prev,
        likeState: false,
        likeCnt: prev.likeCnt - 1,
      }));
      await apiBe.delete(`/api/v1/test/${props.testId}/${memberId}/like`, { headers });
      setLikeChanged(!likeChanged);
    } else {
      setLikeData((prev) => ({
        ...prev,
        likeState: true,
        likeCnt: prev.likeCnt + 1,
      }));
      await apiBe.post(
        `/api/v1/test/${props.testId}/${memberId}/like`,
        { testId: props.testId, memberId: memberId },
        { headers },
      );
      setLikeChanged(!likeChanged);
    }
    setIsSubmittingLike(false);
  }

  async function addComment() {
    const headers = getHeaders();
    apiBe
      .post(
        `/api/v1/test/comments`,
        {
          memberId: sessionStorage.getItem('mongBitmemeberId'),
          testId: data.testId,
          content: commentValue,
        },
        { headers },
      )
      .then((res) => {
        setCommentIndex([0, res.data.hasNextPage]);
        setCommentChanged(!commentChanged);
      });
    setIsSubmittingComment(false);
  }

  function clickTestShare() {
    if (!decodeToken().state) {
      sessionStorage.setItem('ngb', location.pathname);
      return router.push('/login');
    }

    const likeCntNum = location.pathname.indexOf('result') > -1 ? props.likeCnt : likeData.likeCnt;
    if (window) {
      shareToKakaotalk_result(
        props.testId,
        sessionStorage.getItem('mongBitmemeberId'),
        'KAKAO',
        props.titleStr,
        props.contentStrArr.join(),
        props.imgUri,
        resultPathName,
        likeCntNum,
      );
    }
  }

  function clickAddCommentBtn() {
    if (!canAddComment) return alert(COMMENT_TIME);

    if (!decodeToken().state) {
      sessionStorage.setItem('ngb', location.pathname);
      return router.push('/login');
    }

    if (!commentValue) return;
    setCommentValue('');
    addComment();

    setCanAddComment(false);
  }

  function commentAddWithEnter(evt) {
    if (evt.key === 'Enter') {
      if (!canAddComment) return alert(COMMENT_TIME);

      if (!decodeToken().state) {
        sessionStorage.setItem('ngb', location.pathname);
        return router.push('/login');
      }

      if (!evt.currentTarget.value) return;

      setCommentValue('');
      setIsSubmittingComment(true);

      //댓글 추가 요청이 진행 중일때 추가로 등록하지 못하도록 조치함
      if (isSubmittingComment) return;
      addComment();
      setCanAddComment(false);

      // 일정 시간이 지난 후에 다시 추가할 수 있도록 타이머 설정
      setTimeout(() => {
        setCanAddComment(true);
      }, 20000);
    }
  }

  function clikeSeeMoreBtn() {
    setCommentSeeMoreLoading(true);
    const headers = getHeaders();
    apiBe.get(`/api/v1/test/comments/${data.testId}/page/${commentIndex[0]}`, { headers }).then((res) => {
      let newArr = [...data.comment];
      res.data.commentDTOList.forEach((d) => {
        newArr.push(d);
      });
      setData((prev) => ({ ...prev, comment: newArr }));
      setCommentLoading(false);
      setCommentIndex([commentIndex[0] + 1, res.data.hasNextPage]);
      setCommentSeeMoreLoading(false);
    });
  }

  function deleteCommnet(com) {
    const headers = getHeaders();
    const data = {
      id: com.id,
      memberId: sessionStorage.getItem('mongBitmemeberId'),
    };
    apiBe.delete(`/api/v1/test/comments`, { headers, data }).then(() => {
      setCommentIndex((prev) => [0, prev[1]]);
      setCommentChanged(!commentChanged);
    });
  }
  function clickLinkCopy() {
    const headers = getHeaders();
    const memeberId = sessionStorage.getItem('mongBitmemeberId') || 'anonymous';

    if (!decodeToken().role || decodeToken().role === 'ROLE_USER') {
      apiBe
        .post(
          `/api/v1/tests/share`,
          {
            testId: data.testId,
            memberId: memeberId,
            type: 'LINK',
          },
          { headers },
        )
        .then((res) => {
          setCommentIndex([0, res.data.hasNextPage]);
          setCommentChanged(!commentChanged);
        });
    }

    setLinkCopyState(true);
  }
  return (
    <div className={styles.resultWrap}>
      <img className={styles.resultImg} src={props.imgUri} alt="몽빗 MBTI 심리테스트 결과 이미지" />
      <p>{[props.titleStr]}</p>
      <ul className={styles.resultStrList}>
        {props.contentStrArr.map((str, i) => (
          <li key={i}>
            <img src="/images/test/circleIcon.svg" alt="몽빗 MBTI 심리테스트 결과 목록 인덱스 이미지" />
            <p>{str}</p>
          </li>
        ))}
      </ul>

      <Stroke />

      <div className={styles.buttonsWrap}>
        <div className={styles.partWrap}>
          <div className={styles.linkCopyWrap} onClick={clickLinkCopy}>
            <CopyToClipboard text={`${DOMAIN}${resultPathName}`}>
              <button className={linkCopyState ? styles.linkCopied : styles.noneLinkCopied}></button>
            </CopyToClipboard>
            <p>{linkCopyState ? '링크 복사됨' : '링크 복사'}</p>
          </div>
        </div>

        <div className={styles.retryWrap}>
          <div className={styles.retryDiv} onClick={clickRetry}>
            <p>다시 해보기</p>
          </div>
          <img src="/images/test/retryIcon.svg" alt="몽빗 MBTI 심리테스트 다시 해보기 버튼 이미지" />
        </div>

        <div className={styles.partWrap} onClick={clickLikeBtn}>
          <TestButton btnType="like" str="재밌당" likeState={likeData.likeState} />
          <p className={styles.likeCnt}>{likeData.likeCnt}</p>
        </div>
      </div>

      <div className={styles.coupangAdvWrap}>
        <CoupangAdv_1 />
      </div>
      {/* 댓글 */}
      <CardButton type={TYPE_COMMENT} data={commentCnt} />

      <div className={styles.commentInputWrap}>
        <span className={styles.charsLimit}>{`${commentValue.length} / 100`}</span>
        <input
          maxLength="100"
          type="text"
          value={commentValue}
          className={cx(styles.commentInput, {
            [styles.modifyInputBoderBottomRed]: commentValue.length >= 100,
          })}
          placeholder="나쁜말 하면 신고합니다 ㅇㅅㅇ"
          onChange={(evt) => {
            setCommentValue(evt.currentTarget.value);
          }}
          onKeyDown={(evt) => {
            commentAddWithEnter(evt);
          }}
        />
        <AddCommentButton onClick={clickAddCommentBtn} />
      </div>

      <div
        className={cx(styles.commentWrap, {
          [styles.commentWrapInResult_paddingBottom]: location.pathname.includes('result'),
        })}
      >
        {commentLoading ? (
          <div className={styles.loadImgWrap_2}>
            <div ref={containerRef_2}></div>
          </div>
        ) : (
          <>
            {data.comment.map((com, i) => (
              <div key={i} className={styles.commentContentWrap}>
                <Comment
                  data={com}
                  deleteComment={() => {
                    deleteCommnet(com);
                  }}
                  modifyComment={() => {
                    setCommentIndex((prev) => [0, prev[1]]);
                    setCommentChanged(!commentChanged);
                  }}
                  memberId={memberId}
                  testId={data.testId}
                  id={com.id}
                />
              </div>
            ))}
          </>
        )}
      </div>
      {commentIndex[1] && (
        <div className={styles.seeMoreWrap}>
          {commentSeeMoreLoading ? (
            <div className={styles.loadImgWrap_1}>
              <div ref={containerRef_1}></div>
            </div>
          ) : (
            <>
              <button onClick={clikeSeeMoreBtn}>더보기</button>
              <img src="/images/test/seeMoreIcon.svg" alt="몽빗 MBTI 심리테스트 코멘트 더보기 이미지" />
            </>
          )}
        </div>
      )}

      <button
        className={cx(styles.shareBtn, {
          [styles.slideIn]: slideIn,
        })}
        onClick={clickTestShare}
      >
        친구에게 테스트 결과 공유하기
      </button>
    </div>
  );
}

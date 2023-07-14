import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import cx from 'classnames';
import lottie from 'lottie-web';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { decodeToken, shareToKakaotalk_test, getHeaders } from '@/utils/util';
import {
  TYPE_ON_TEST,
  TYPE_COMMENT,
  TYPE_PLAY_CNT,
  DOMAIN,
  DOMAIN_BE_PROD,
  DOMAIN_BE_DEV,
  TYPE_TEST_PREVIEW,
  COMMENT_TIME,
} from '@/constants/constant';

import animationData_1 from './commentLoading.json';
import animationData_2 from './commentAreaLaoadingIcon.json';
import { TestCard } from '../TestCard';
import { CardButton, Stroke, GoRandomStartBtn, TestButton, AddCommentButton, Comment } from '../ButtonSets';
import styles from './index.module.css';

export default function TestPreview(props) {
  let [data, setData] = useState({
    testId: props.testId,
    thumbnailStr: props.thumbnailStr,
    thumbnailUri: props.thumbnailUri,
    playCnt: props.playCnt,
    conentArr: props.description.split('<br>'),
    likeState: false,
    likeCnt: 0,
    comment: [],
  });
  let [linkCopyState, setLinkCopyState] = useState(false);

  const [likeChanged, setLikeChanged] = useState(true);
  const [commentIndex, setCommentIndex] = useState([0, false]);
  const [commentLoading, setCommentLoading] = useState(true);
  const [commentChanged, setCommentChanged] = useState(true);
  let [commentValue, setCommentValue] = useState('');
  const [commentCnt, setCommentCnt] = useState(0);
  let [commentSeeMoreLoading, setCommentSeeMoreLoading] = useState(false);
  const [canAddComment, setCanAddComment] = useState(true);
  let [isSubmittingComment, setIsSubmittingComment] = useState(false);
  let [isSubmittingLike, setIsSubmittingLike] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  const containerRef_1 = useRef(null);
  const containerRef_2 = useRef(null);

  const memberId = sessionStorage.getItem('mongBitmemeberId');

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
    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/test/${data.testId}/comments/count`, {
        headers,
      })
      .then((res) => {
        setCommentCnt(res.data);
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
      });
  }, [commentChanged]);

  useEffect(() => {
    const headers = getHeaders();

    const fetchLikeDataLogIned = async () => {
      try {
        const [stateResponse, cntResponse] = await Promise.all([
          axios.get(`${DOMAIN_BE_PROD}/api/v1/test/${data.testId}/${memberId}/like`, { headers }),
          axios.get(`${DOMAIN_BE_PROD}/api/v1/test/${data.testId}/like/count`, {
            headers,
          }),
        ]);

        setData((prev) => ({
          ...prev,
          likeState: stateResponse.data,
          likeCnt: cntResponse.data,
        }));
      } catch (err) {
        alert(err.response.data);
        router.push('/login');
      }
    };

    const fetchLikeDataNoLogined = () => {
      const headers = getHeaders();
      axios
        .get(`${DOMAIN_BE_PROD}/api/v1/test/${data.testId}/like/count`, {
          headers,
        })
        .then((res) => {
          setData((prev) => ({
            ...prev,
            likeCnt: res.data,
          }));
        })
        .catch((err) => {
          alert(err.response.data);
          router.push('/login');
        });
    };

    if (decodeToken().state) {
      fetchLikeDataLogIned();
    } else {
      fetchLikeDataNoLogined();
    }
  }, [likeChanged]);

  useEffect(() => {
    const headers = getHeaders();

    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/test/comments/${data.testId}/page/${commentIndex[0]}`, { headers })
      .then((res) => {
        setData((prev) => ({ ...prev, comment: res.data.commentDTOList }));
        setCommentLoading(false);
        setCommentIndex([commentIndex[0] + 1, res.data.hasNextPage]);
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
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

  function addComment() {
    const headers = getHeaders();

    axios
      .post(
        `${DOMAIN_BE_PROD}/api/v1/test/comments`,
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
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
      });
    setIsSubmittingComment(false);
  }

  async function clickLikeBtn() {
    if (!decodeToken().state) {
      sessionStorage.setItem('ngb', pathName);
      return router.push('/login');
    }
    const headers = getHeaders();

    setIsSubmittingLike(true);
    if (isSubmittingLike) return;
    if (data.likeState) {
      setData((prev) => ({
        ...prev,
        likeCnt: prev.likeCnt - 1,
        likeState: false,
      }));
      await axios.delete(`${DOMAIN_BE_PROD}/api/v1/test/${data.testId}/${memberId}/like`, { headers }).catch((err) => {
        alert(err.response.data);
        router.push('/login');
      });
      setLikeChanged(!likeChanged);
    } else {
      setData((prev) => ({
        ...prev,
        likeCnt: prev.likeCnt + 1,
        likeState: true,
      }));
      await axios
        .post(
          `${DOMAIN_BE_PROD}/api/v1/test/${data.testId}/${memberId}/like`,
          { testId: data.testId, memberId: memberId },
          { headers },
        )
        .catch((err) => {
          alert(err.response.data);
          router.push('/login');
        });
      setLikeChanged(!likeChanged);
    }
    setIsSubmittingLike(false);
  }
  function clickTestShare() {
    if (!decodeToken().state) {
      sessionStorage.setItem('ngb', location.pathname);
      return router.push('/login');
    }
    console.log('111--> ', window.Kakao);
    if (window)
      shareToKakaotalk_test(data.testId, data.thumbnailStr, data.conentArr.join(), data.thumbnailUri, data.likeCnt);
  }

  function clickAddCommentBtn() {
    if (!canAddComment) alert(COMMENT_TIME);
    if (canAddComment) {
      if (!decodeToken().state) {
        sessionStorage.setItem('ngb', location.pathname);
        return router.push('/login');
      }

      if (!commentValue) return;
      setCommentValue('');
      addComment();

      setCanAddComment(false);
    }
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
    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/test/comments/${data.testId}/page/${commentIndex[0]}`, { headers })
      .then((res) => {
        let newArr = [...data.comment];
        res.data.commentDTOList.forEach((d) => {
          newArr.push(d);
        });
        setData((prev) => ({ ...prev, comment: newArr }));
        setCommentLoading(false);
        setCommentIndex([commentIndex[0] + 1, res.data.hasNextPage]);
        setCommentSeeMoreLoading(false);
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
      });
  }
  return (
    <div className={styles.wrap}>
      {/* 테스트  */}
      <div className={styles.contentWrap}>
        <div>
          <TestCard
            thumbnailStr={data.thumbnailStr}
            thumbnailUri={data.thumbnailUri}
            thumbnailClass="normal_thumbnail"
            titleBoxClass="normal_titleBox"
            testId={data.testId}
            type={TYPE_TEST_PREVIEW}
          />
          <CardButton type={TYPE_PLAY_CNT} data={data.playCnt} />
        </div>
        <Stroke type_1={TYPE_ON_TEST} type_2="2" />

        <ul className={styles.contentUl}>
          {data.conentArr.map((str, i) => (
            <li key={i}>
              <p>{str}</p>
            </li>
          ))}
        </ul>
        <GoRandomStartBtn url={`/test/on/${data.testId}`} str="테스트 시작" />
        <ul className={styles.buttonSet}>
          <li>
            <div
              className={styles.linkCopyWrap}
              onClick={() => {
                setLinkCopyState(true);
              }}
            >
              <CopyToClipboard text={`${DOMAIN}${location.pathname}`}>
                <button className={linkCopyState ? styles.linkCopied : styles.noneLinkCopied}></button>
              </CopyToClipboard>
              <p>{linkCopyState ? '링크 복사됨' : '링크 복사'}</p>
            </div>
          </li>

          <li className={styles.likeWrap} onClick={clickLikeBtn}>
            <TestButton btnType="like" str="재밌당" likeState={data.likeState} />
            <p className={styles.likeCntNum}>{data.likeCnt}</p>
          </li>

          <li onClick={clickTestShare}>
            <TestButton btnType="share" str="공유하기" />
          </li>
        </ul>
        <Stroke type_1={TYPE_ON_TEST} type_2="1" />

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
            [styles.commentWrapLoading]: commentLoading,
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
                      const headers = getHeaders();
                      const data = {
                        id: com.id,
                        memberId: sessionStorage.getItem('mongBitmemeberId'),
                      };
                      axios
                        .delete(`${DOMAIN_BE_PROD}/api/v1/test/comments/`, {
                          headers,
                          data,
                        })
                        .then(() => {
                          setCommentIndex((prev) => [0, prev[1]]);
                          setCommentChanged(!commentChanged);
                        })
                        .catch((err) => {
                          alert(err.response.data);
                          router.push('/login');
                        });
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
              <img src="/images/test/seeMoreIcon.svg" alt="see_more" />
            </>
          )}
        </div>
      )}
    </div>
  );
}

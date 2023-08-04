import axios from 'axios';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { TYPE_ON_TEST, TYPE_MYPAGE, TYPE_COMMENT, DOMAIN_BE_PROD, DOMAIN_BE_DEV } from '../../constants/constant';
import { decodeToken, formatTimeDifference, getHeaders } from '../../utils/util';
import styles from './index.module.css';

export function CardButton(props) {
  return (
    <div className={props.type === TYPE_COMMENT ? styles.wrap_comment : styles.wrap}>
      <button className={`${styles.button} ${styles[props.type]}`}></button>
      {props.type === TYPE_COMMENT || <span className={`${styles.span} ${styles.count}`}>{props.data}</span>}
      {props.type === TYPE_COMMENT && <span className={`${styles.commentText_onTest}`}>댓글</span>}
      {props.type === TYPE_COMMENT && <span className={`${styles.commentText_onTest}`}>{props.data}</span>}
    </div>
  );
}

export function TestButton(props) {
  const cn_1 = props.likeState ? `${styles.button} ${styles.liked}` : `${styles.button} ${styles.noneLiked}`;
  const cn_2 = `${styles.button} ${styles[props.btnType]}`;
  const cn_3 = props.linkCopyState
    ? `${styles.button} ${styles.linkCopied}`
    : `${styles.button} ${styles.noneLinkCopied}`;
  return (
    <div className={styles.testBtnWrap}>
      <button className={props.btnType === 'like' ? cn_1 : props.btnType === 'linkCopy' ? cn_3 : cn_2}></button>
      <p className={styles.btnNameText}>{props.str}</p>
    </div>
  );
}

export function AddCommentButton(props) {
  return (
    <div className={styles.commentBtnWrap}>
      <button className={`${styles.button} ${styles.addCommentButton}`} onClick={props.onClick}></button>
    </div>
  );
}

export function CommentReadOnly(props) {
  useEffect(() => {
    sessionStorage.removeItem('mbComm');
  }, []);

  return (
    <div className={styles.commentWrapper}>
      <img src={props.data.thumbnailImage} className={`${styles.userImg}`} alt="몽빗 MBTI 심리테스트 코멘트" />
      <div className={styles.userAndDateReadOnly}>
        <div>
          <span>{`${props.data.username} · `}</span>
          <span>{formatTimeDifference(props.data.commentDate)}</span>
        </div>
        <p>{props.data.content}</p>
      </div>
    </div>
  );
}

export function Comment(props) {
  const router = useRouter();
  let [isCommentEditMode, setIsCommentEditMode] = useState(false);
  let [newValue, setNewValue] = useState(null);

  useEffect(() => {
    sessionStorage.removeItem('mbComm');
  }, []);

  function updateComment() {
    if (!newValue) {
      sessionStorage.removeItem('mbComm');
      return setIsCommentEditMode(false);
    }
    if (props.data.content === newValue) {
      sessionStorage.removeItem('mbComm');
      return setIsCommentEditMode(false);
    }
    if (!sessionStorage.getItem('mongBitmemeberId') || !decodeToken().state) return router.push('/login');

    props.data.content = newValue;
    sessionStorage.removeItem('mbComm');
    setIsCommentEditMode(false);

    const headers = getHeaders();

    axios
      .patch(
        `${DOMAIN_BE_PROD}/api/v1/test/comments`,
        {
          memberId: sessionStorage.getItem('mongBitmemeberId'),
          testId: props.testId,
          content: newValue,
          id: props.id,
        },
        { headers },
      )
      .then((res) => {
        if (res.status === 400) return alert(res.data);
        props.modifyComment();
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
      });
  }

  function cancelUpdataComment(evt) {
    const oldVal = evt.currentTarget.value;
    setNewValue(oldVal);
    sessionStorage.removeItem('mbComm');
    setIsCommentEditMode(false);
  }
  return (
    <div className={styles.commentWrapper}>
      <img src={props.data.thumbnailImage} className={`${styles.userImg}`} alt="몽빗 MBTI 심리테스트 코멘트"></img>
      <div className={styles.userAndDate}>
        <div>
          <span>{`${props.data.username} · `}</span>
          <span>{formatTimeDifference(props.data.commentDate)}</span>
        </div>
        {(isCommentEditMode && (
          <div className={styles.modifyInputWrap}>
            {
              <input
                maxLength="100"
                type="text"
                rows="3"
                className={cx(styles.modifyInput, {
                  [styles.modifyInputBoderBottomRed]: newValue
                    ? newValue.length >= 100
                    : props.data.content.length >= 100,
                })}
                defaultValue={props.data.content}
                onChange={(evt) => {
                  setNewValue(evt.currentTarget.value);
                }}
                onKeyDown={(evt) => {
                  if (evt.key === 'Enter') {
                    if (props.data.content === newValue) {
                      sessionStorage.removeItem('mbComm');
                      return setIsCommentEditMode(false);
                    }
                    if (!sessionStorage.getItem('mongBitmemeberId') || !decodeToken().state)
                      return router.push('/login');
                    props.data.content = newValue;
                    sessionStorage.removeItem('mbComm');
                    setIsCommentEditMode(false);

                    const headers = getHeaders();
                    axios
                      .patch(
                        `${DOMAIN_BE_PROD}/api/v1/test/comments`,
                        {
                          memberId: sessionStorage.getItem('mongBitmemeberId'),
                          testId: props.testId,
                          content: newValue,
                          id: props.id,
                        },
                        { headers },
                      )
                      .then((res) => {
                        if (res.status === 400) return alert(res.data);
                        props.modifyComment();
                      })
                      .catch((err) => {
                        alert(err.response.data);
                        router.push('/login');
                      });
                  }
                }}
              ></input>
            }
            <span className={styles.charsLimit}>{`${
              newValue ? newValue.length : props.data.content.length
            } / 100`}</span>
            <button onClick={updateComment} className={styles.newCommRightBtn_apply}>
              확인
            </button>
            <button
              className={styles.newCommRightBtn_cancel}
              onClick={(evt) => {
                cancelUpdataComment(evt);
              }}
            >
              취소
            </button>
          </div>
        )) || <p>{(isCommentEditMode && '') || props.data.content}</p>}
      </div>
      {
        // Admin일 때는 모든 댓글 삭제만 가능하도록 함
        decodeToken().role === 'ROLE_ADMIN'
          ? isCommentEditMode || (
              <div className={styles.modifyArea}>
                <div className={styles.modifyWrap}>
                  {sessionStorage.getItem('mongBitmemeberId') === props.data.memberId && (
                    <button
                      onClick={() => {
                        if (sessionStorage.getItem('mbComm')) {
                          return setIsCommentEditMode(false);
                        }
                        sessionStorage.setItem('mbComm', true);
                        setIsCommentEditMode(true);
                      }}
                    >
                      수정
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (sessionStorage.getItem('mbComm')) return;
                      const result = confirm('삭제 하시겠습니까?');
                      if (result) return props.deleteComment();
                      if (!result) return;
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            )
          : //일반 User는 본인이 작성한 댓글에만 수정, 삭제 가능하도록 함
            sessionStorage.getItem('mongBitmemeberId') === props.data.memberId &&
            (isCommentEditMode || (
              <div className={styles.modifyArea}>
                <div className={styles.modifyWrap}>
                  <button
                    onClick={() => {
                      if (sessionStorage.getItem('mbComm')) {
                        return setIsCommentEditMode(false);
                      }
                      sessionStorage.setItem('mbComm', true);
                      setIsCommentEditMode(true);
                    }}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => {
                      if (sessionStorage.getItem('mbComm')) return;
                      const result = confirm('삭제 하시겠습니까?');
                      if (result) return props.deleteComment();
                      if (!result) return;
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))
      }
    </div>
  );
}

export function Stroke(props) {
  const cn = () => {
    if (props.type_1 === TYPE_ON_TEST && props.type_2 === '1') return `${styles.stroke} ${styles.stroke_onTest_bottom}`;
    if (props.type_1 === TYPE_ON_TEST && props.type_2 === '2') return `${styles.stroke} ${styles.stroke_onTest_top}`;
    if (props.type_1 === TYPE_MYPAGE && props.type_2 === '1') return `${styles.stroke} ${styles.stroke_myPage_bottm}`;
    if (props.type_1 === TYPE_MYPAGE && props.type_2 === '2') return `${styles.stroke} ${styles.stroke_myPage_top}`;
    return `${styles.stroke}`;
  };

  return <div className={cn()} />;
}

export function GoRandomStartBtn(props) {
  return (
    <Link href={props.url} className={styles.goRandomStartBtn}>
      {' '}
      {props.str} &gt;{' '}
    </Link>
  );
}

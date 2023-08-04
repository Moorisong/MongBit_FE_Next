import { useRouter } from 'next/navigation';

import styles from './index.module.css';
import { TYPE_LATEST_MAIN, TYPE_MYPAGE, TYPE_TEST_PREVIEW } from '../../constants/constant';

function TestCard(props) {
  const router = useRouter();
  const cn_1 =
    props.type === TYPE_MYPAGE
      ? `${styles.inline}`
      : props.type === TYPE_TEST_PREVIEW
      ? `${styles.inline} ${styles.preview}`
      : `${styles.inline}`;
  const cn_2 =
    props.type === TYPE_LATEST_MAIN
      ? `${styles.latest_thumbnail}`
      : props.type === TYPE_MYPAGE
      ? `${styles.mypage_thumbnail} ${styles.myPage}`
      : `${styles.normal_thumbnail}`;
  const cn_3 = props.type === TYPE_LATEST_MAIN ? `${styles.latest_titleBox}` : `${styles.normal_titleBox}`;

  return (
    <div
      className={cn_1}
      onClick={() => {
        if (props.type === TYPE_MYPAGE) return router.push(`/record/${props.testId}/${props.testResultId}`);
        router.push(`/test/preview/${props.testId}`);
      }}
    >
      <img src={props.thumbnailUri} className={cn_2} alt="몽빗 MBTI 심리테스트 이미지" />
      {props.type === TYPE_MYPAGE || (
        <div className={cn_3}>
          {props.type === TYPE_LATEST_MAIN ? (
            <p className={styles.p_2}>{props.thumbnailStr}</p>
          ) : (
            <p className={styles.p_1}>{props.thumbnailStr}</p>
          )}
          {props.type === TYPE_LATEST_MAIN && (
            <div className={`${styles.playCntWrap} ${styles.paddingBottomLatest}`}>
              <button className={styles.plyCntBtn} />
              <p className={styles.playCntText}>{props.playCnt}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { TestCard };

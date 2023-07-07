import styles from './index.module.css';
import { TITLE_WITH_CONTENT, TYPE_TEST_LIST, TYPE_MYPAGE } from '../../constants/constant';

function TitleWithText(props) {
  const cn_1 = props.type_1 === TITLE_WITH_CONTENT ? `${styles.title} ${styles.withContent}` : `${styles.title}`;
  const cn_2 =
    props.type_2 === TYPE_TEST_LIST
      ? `${styles.content} ${styles.marginBottom}`
      : props.type_2 === TYPE_MYPAGE
      ? `${styles.content} ${styles.myPage}`
      : `${styles.content}`;
  return (
    <div className={styles.wrap}>
      <p className={cn_1}>{props.title}</p>
      <p className={cn_2}>{props.content}</p>
    </div>
  );
}

export { TitleWithText };

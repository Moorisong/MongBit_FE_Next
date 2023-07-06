import cx from 'classnames';

import styles from './index.module.css';

export default function QuestionAndAnswer(props) {
  return (
    <div
      className={cx(styles.wrap, {
        [styles.display_none]: false,
      })}
    >
      <div className={styles.questionWrap}>
        <p>{props.q_str}</p>
      </div>
      <div className={styles.answerWrap}>
        <div className={styles.answer} onClick={props.clickAnswer_plus}>
          <div>
            <span>{props.a_str_1}</span>
          </div>
        </div>

        <div className={styles.answer} onClick={props.clickAnswer_minus}>
          <div>
            <span>{props.a_str_2}</span>
          </div>
        </div>
      </div>
      {props.q_idx === 0 || (
        <div onClick={props.clickGoBack} className={styles.clickGoBack}>
          <button>이전 질문</button>
          <img src="/images/test/leftArrowIcon.svg" alt="leftArrow" />
        </div>
      )}
    </div>
  );
}

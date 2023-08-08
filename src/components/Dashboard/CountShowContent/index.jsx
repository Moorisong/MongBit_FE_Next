import { numberFormatToKoreanStyle } from '@/utils/util';

import styles from './index.module.css';

export function CountCardWithColor(props) {
  const contentNumber = numberFormatToKoreanStyle(props.count);
  if (props.borderColor)
    return (
      <div
        className={styles.countCardWithColorWrap}
        style={{
          borderLeft: `3px solid ${props.borderColor};`,
        }}
      >
        <p>{props.title}</p>
        <p>{contentNumber}</p>
      </div>
    );
}

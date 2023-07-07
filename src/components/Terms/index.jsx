import { termsString } from './content';
import styles from './index.module.css';

export default function Terms() {
  return (
    <div className={styles.wrap}>
      <p className={styles.text}>{termsString}</p>
    </div>
  );
}

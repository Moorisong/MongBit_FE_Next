import styles from './index.module.css';

export function CountCardWithColor(props) {
  return (
    <div className={styles.wrap}>
      <p>props.title</p>
      <p>props.count</p>
    </div>
  );
}

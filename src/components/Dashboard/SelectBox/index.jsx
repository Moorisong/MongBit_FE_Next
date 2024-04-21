import styles from './index.module.css';

export function SelectBoxDashboard(props) {
  return (
    <select id={props.name} name={props.name} onChange={props.onChange} className={styles.select}>
      <optgroup label={props.name}>
        {props.valueArr.map((d, i) => (
          <option key={d + i} value={d}>
            {' '}
            {d}{' '}
          </option>
        ))}
      </optgroup>
    </select>
  );
}

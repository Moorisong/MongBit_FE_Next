import styles from './index.module.css'

export function countCardWithColor(props){
  return(
    <div className={styles.wrap}>
      <p>props.title</p>
      <p>props.count</p>
    </div>
  )
}

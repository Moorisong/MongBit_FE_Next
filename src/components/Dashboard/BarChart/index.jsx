import { ResponsiveBar } from '@nivo/bar'


import styles from './index.module.css'

const data = [
  {
    "country": "A",
    "hot dog": 33,
    "hot dogColor": "hsl(323, 70%, 50%)",
  },
  {
    "country": "B",
    "hot dog": 76,
    "hot dogColor": "hsl(323, 70%, 50%)",
  },
  {
    "country": "C",
    "hot dog": 4,
    "hot dogColor": "hsl(323, 70%, 50%)",
  },
]

export function MetricsBarChartDashboard() {
  console.log('sdf')

  return (
    <div className={styles.wrap}>
      <ResponsiveBar
        data={data} key={['hot dog']}
        indexBy="country"
        colors="nivo"
      />
    </div>
  )
}

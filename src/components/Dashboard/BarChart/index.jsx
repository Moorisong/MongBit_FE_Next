import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

import styles from './index.module.css';
import { TitleInDashboard } from '@/components/Titles';

export function MetricsBarChartDashboard(props) {
  const chartRef = useRef(null);
  const [xAxis, setXAxis] = useState([])
  const [chartValue, setChartValue] = useState([])

  useEffect(() => {
    // x축 데이터와 차트 데이터를 가공
    const xValues = props.data.map((d)=> d.data)
    setXAxis(xValues)
  }, [])
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: xAxis,
          datasets: [
            {
              data: ['ksh_값'],
              backgroundColor: '#3F80FF',
              hoverBorderColor: '#FF3FD5',
              barPercentage: 0.2,
              borderRadius: 10,
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0)',
              },
            },
            y: {
              grid: {
                color: '#EFEFEF',
              },
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false, // 범례 숨김
            },
          },
        },
      });

  }, [xAxis]);

  return (
    <div className={styles.wrap}>
      <div>
        <TitleInDashboard text="메트릭스" />
      </div>

      <canvas ref={chartRef}></canvas>
    </div>
  );
}

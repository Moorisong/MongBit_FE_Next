import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

import styles from './index.module.css';
import { TitleInDashboard } from '@/components/Titles';

export function MetricsBarChartDashboard() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: '#범례',
            data: [12, 19, 3, 65, 52, 13, 45, 66, 47, 50, 22, 10],
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
      },
    });
  }, []);

  return (
    <div className={styles.wrap}>
      <div>
        <TitleInDashboard text="메트릭스" />
      </div>

      <canvas ref={chartRef}></canvas>
    </div>
  );
}

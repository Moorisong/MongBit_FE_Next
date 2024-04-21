import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

import { formatDateToShort } from '@/utils/util';

import styles from './index.module.css';
import { TitleInDashboard } from '@/components/Titles';
import { SelectBoxDashboard } from '../SelectBox';

export function MetricsBarChartDashboard(props) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); //Chart 인스턴스를 저장하는 곳

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const xValues = props.data.map((d) => formatDateToShort(d.date));
    const yValues = props.data.map((d) => d.count);

    // 이전에 참조하고 있는 Chart 인스턴스가 있으면 destroy 해줌
    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: xValues,
        datasets: [
          {
            data: yValues,
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
            display: false,
          },
        },
      },
    });
  }, [props.data]);

  return (
    <div className={styles.wrap}>
      <div>
        <TitleInDashboard text="메트릭스" />
        <SelectBoxDashboard valueArr={props.selectValueArr} onChange={props.onChange} />
      </div>

      <canvas ref={chartRef}></canvas>
    </div>
  );
}

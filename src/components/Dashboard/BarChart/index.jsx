import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

import { formatDateToShort } from '@/utils/util';

import styles from './index.module.css';
import { TitleInDashboard } from '@/components/Titles';
import { SelectBoxDashboard } from '../SelectBox';

export function MetricsBarChartDashboard(props) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({});

  const selectBoxData = props.selectBoxData;
  useEffect(() => {
    // x축 데이터와 y축 데이터 가공
    const xValues = props.data.map((d) => formatDateToShort(d.date));
    const yValues = props.data.map((d) => d.count);

    setChartData({ xValues, yValues });
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartData.xValues) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.xValues,
          datasets: [
            {
              data: chartData.yValues,
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
    }
  }, [chartData]);

  return (
    <div className={styles.wrap}>
      <div>
        <TitleInDashboard text="메트릭스" />
        <SelectBoxDashboard valueArr={selectBoxData.valueArr} />
      </div>

      <canvas ref={chartRef}></canvas>
    </div>
  );
}

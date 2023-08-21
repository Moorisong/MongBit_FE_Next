'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { apiBe } from '@/services';
import { getHeaders, formatCurrentDateTime, decodeToken } from '@/utils/util';

import { CountCardWithColor, CountTopContents } from '@/components/Dashboard/CountShowContent';
import { MetricsBarChartDashboard } from '@/components/Dashboard/BarChart';
import { TitleInDashboard } from '@/components/Titles';
import styles from './index.module.css';

const colorArr = ['#FF3F3F', '#3F80FF', '#3FDCFF', '#FF9B3F', '#FF3FD5', '#93FF3F', '#7C3FFF'];
const countCardWithColorNames = ['방문', '플레이', '로그인', '공유', '링크복사', '좋아요', '댓글'];

export default function AdminDashboard() {
  const router = useRouter();
  const [hasRole, setHasRole] = useState(false);
  const [totalCountCardWithColorData, setTotalCountCardWithColorData] = useState([]);
  const [todayCountCardWithColorData, setTodayCountCardWithColorData] = useState([]);
  const headers = getHeaders();

  useEffect(() => {
    if (decodeToken().role !== 'ROLE_ADMIN') return router.push('/');
    setHasRole(true);
  }, []);

  useEffect(() => {
    if (hasRole) {
      apiBe.get('/api/v2/metrics/total', { headers }).then((res) => {
        const keyArr = Object.keys(res.data);
        const resultArr = keyArr.map((d) => ({ totalCount: res.data[d] }));
        setTotalCountCardWithColorData(resultArr);
      });
    }
  }, [hasRole]);

  useEffect(() => {
    if (hasRole) {
      const todayTimeRange = formatCurrentDateTime();
      const params = {
        startDate: todayTimeRange.startDate,
        endDate: todayTimeRange.endDate,
      };

      apiBe.get('/api/v2/metrics/total/date-range', { headers, params }).then((res) => {
        const keyArr = Object.keys(res.data[0]);
        const resultArr = keyArr.map((d) => ({ todayCount: res.data[0][d] }));
        resultArr.splice(0, 1);
        setTodayCountCardWithColorData(resultArr);
      });
    }
  }, [hasRole]);

  if (hasRole)
    return (
      // 배경, 사이드 바
      <div className={styles.wrap}>
        <div>
          <div className={styles.menuBar}>
            <p>몽빗 어드민</p>
            <ul>
              <li>
                <img src="/images/adminDashboard/menuBar_dashboard.svg" alt="" />
                <span>대시보드</span>
              </li>
              <li>
                <img src="/images/adminDashboard/menuBar_contents.svg" alt="" />
                <span>컨텐츠</span>
              </li>
              <li>
                <img src="/images/adminDashboard/menuBar_members.svg" alt="" />

                <span>유저</span>
              </li>
              <li>
                <img src="/images/adminDashboard/menuBar_insight.svg" alt="" />

                <span>인사이트</span>
              </li>
            </ul>
          </div>

          {/* 콘텐츠 내용 */}
          <div className={styles.contentWrap}>
            <div>
              <TitleInDashboard text="대시보드" />
            </div>

            <div>
              <div className={styles.countCardWithColorArea}>
                {console.log('todayCountCardWithColorData-- > ', todayCountCardWithColorData)}
                {totalCountCardWithColorData && todayCountCardWithColorData.length > 0 &&
                  totalCountCardWithColorData.map((d, i) => (
                    <CountCardWithColor
                      key={i}
                      title={countCardWithColorNames[i]}
                      totalCount={d.totalCount}
                      todayCount={todayCountCardWithColorData[i].todayCount}
                      borderColor={colorArr[i]}
                    />
                  ))}
              </div>

              <div className={styles.flexDirRow}>
                <MetricsBarChartDashboard />
                <CountTopContents />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

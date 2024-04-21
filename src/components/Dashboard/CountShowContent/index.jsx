import { useEffect, useState } from 'react';

import { getHeaders, numberFormatToKoreanStyle } from '@/utils/util';
import { apiBe } from '@/services';

import styles from './index.module.css';
import { TitleInDashboard } from '@/components/Titles';
import { SelectBoxDashboard } from '../SelectBox';

const topContentsSelectArr = ['플레이', '공유', '좋아요'];

export function CountCardWithColor(props) {
  const contentNumber = numberFormatToKoreanStyle(props.totalCount);
  if (props.borderColor)
    return (
      <div
        className={styles.countCardWithColorWrap}
        style={{
          borderLeft: `3px solid ${props.borderColor}`,
        }}
      >
        <div>
          <p>{props.title}</p>
          <p>Today / Total</p>
        </div>

        <p>{`${props.todayCount} / ${contentNumber}`}</p>
      </div>
    );
}

export function CountTopContents() {
  const [selectValue, setSelectValue] = useState('tests');
  const [contentData, setContentData] = useState([]);

  useEffect(() => {
    const headers = getHeaders();
    const queryParams = {
      quantity: 6,
    };
    apiBe
      .get(`/api/v2/metrics/${selectValue}`, {
        headers: headers,
        params: queryParams,
      })
      .then((res) => {
        setContentData(res.data);
      });
  }, [selectValue]);

  function onChangeSelectValue(evt) {
    let getResultValue = () => {
      if (evt.currentTarget.value === '플레이') return 'tests';
      if (evt.currentTarget.value === '공유') return 'shares';
      if (evt.currentTarget.value === '좋아요') return 'likes';
    };
    setSelectValue(getResultValue());
  }

  if (contentData)
    return (
      <div className={styles.countTopContentsWrap}>
        <div className={styles.titleArea}>
          <TitleInDashboard text="탑 컨텐츠" />
          <SelectBoxDashboard valueArr={topContentsSelectArr} onChange={onChangeSelectValue} />
        </div>

        <div className={styles.contentBodyWrap}>
          {contentData.map((d, i) => (
            <div key={d + i}>
              <span>{d.title}</span>
              <span>{numberFormatToKoreanStyle(d.value)}</span>
            </div>
          ))}
        </div>
      </div>
    );
}

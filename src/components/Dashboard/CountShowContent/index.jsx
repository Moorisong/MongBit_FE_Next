import { useEffect, useState } from 'react';

import { getHeaders, numberFormatToKoreanStyle } from '@/utils/util';
import { apiBe } from '@/services';

import styles from './index.module.css';
import { TitleInDashboard } from '@/components/Titles';
import { SelectBoxDashboard } from '../SelectBox';

const topContentsSelectArr = ['Plays', 'Shares', 'Likes'];

export function CountCardWithColor(props) {
  const contentNumber = numberFormatToKoreanStyle(props.count);
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

        <p>{contentNumber}</p>
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
    let resultValue = evt.currentTarget.value === 'Plays' ? 'tests' : evt.currentTarget.value.toLowerCase();
    setSelectValue(resultValue);
  }

  if (contentData)
    return (
      <div className={styles.countTopContentsWrap}>
        <div className={styles.titleArea}>
          <TitleInDashboard text="탑 컨텐츠" />
          <SelectBoxDashboard valueArr={topContentsSelectArr} name="topContent" onChange={onChangeSelectValue} />
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

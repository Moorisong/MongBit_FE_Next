import { useEffect, useState } from 'react';

import { getHeaders, numberFormatToKoreanStyle } from '@/utils/util';
// import { apiBe } from '@/services';

import styles from './index.module.css';
import { TitleInDashboard } from '@/components/Titles';
import { SelectBoxDashboard } from '../SelectBox';

const topContentsSelectArr = ['Palys', 'Shares', 'Likes'];

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
        <p>{props.title}</p>
        <p>{contentNumber}</p>
      </div>
    );
}

export function CountTopContents() {
  const [selectValue, setSelectValue] = useState(topContentsSelectArr[0]);
  useEffect(() => {
    console.log('selectValue--> ', selectValue);
    // let requestType = selectValue === 'Plays' ? 'tests' : selectValue.toLowerCase()
    const headers = getHeaders();
    const queryParams = {
      quantity: 3,
    };
    // apiBe.get(`/api/v2/metrics/${selectValue}`, {
    //   headers: headers,
    //   params: queryParams,
    // })
    // .then((res)=>{
    //   console.log('r-->', res.data)
    // })
  }, [selectValue]);

  function onChangeSelectValue(evt) {
    let resultValue = evt.currentTarget.value === 'Plays' ? 'tests' : evt.currentTarget.value;
    setSelectValue(resultValue);
    //ksh 여기서 잘 들어가는지 확인, selectBox 다시 만들기
  }

  return (
    <div className={styles.countTopContentsWrap}>
      <div className={styles.titleArea}>
        <TitleInDashboard text="Top Contents" />
        <SelectBoxDashboard valueArr={topContentsSelectArr} name="topContent" onChange={onChangeSelectValue} />
      </div>
    </div>
  );
}

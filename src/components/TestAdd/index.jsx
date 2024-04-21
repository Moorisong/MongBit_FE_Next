'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ALL_FULLFILL, NUMBER_500, LENGTH_OVER_500, TOKEN_NAME } from '@/constants/constant';
import { getHeaders } from '@/utils/util';
import { apiBe } from '@/services';

import styles from './index.module.css';
import { ImagePart, InfoPart, QuestionPart, ResultPart } from '../TestAddElements';
import MarketingInfo from '@/components/MarketingInfo';

export default function TestAdd() {
  const [data, setData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    questions: [],
    results: [],
  });
  const [stage, setStage] = useState(1);
  const [qstStageIdx, setQstStageIdx] = useState(1);
  const [rstStageIdx, setRstStageIdx] = useState(1);
  let [imgUploading, setImgUploading] = useState(true);
  let [imgCntArr, setImgCntArr] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!imgUploading) {
      const headers = getHeaders();
      apiBe.post(`/api/v1/tests/test`, data, { headers }).then(() => {
        alert('테스트 등록 완료. 고생 많으셨어요 :)');
        router.push('/');
      });
    }
  }, [imgUploading]);

  const mapTarget = {
    question: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    result: [
      'ENFJ',
      'ENFP',
      'ENTJ',
      'ENTP',
      'ESFJ',
      'ESFP',
      'ESTJ',
      'ESTP',
      'INFJ',
      'INFP',
      'INTJ',
      'INTP',
      'ISFJ',
      'ISFP',
      'ISTJ',
      'ISTP',
    ],
  };

  const getAnswerTypeArr = () => {
    if (qstStageIdx === 1 || qstStageIdx === 2 || qstStageIdx === 3)
      return ['[대답지 : +1 / E 속성]', '[대답지 : -1 / I 속성]'];
    if (qstStageIdx === 4 || qstStageIdx === 5 || qstStageIdx === 6)
      return ['[대답지 : +1 / N 속성]', '[대답지 : -1 / S 속성]'];
    if (qstStageIdx === 7 || qstStageIdx === 8 || qstStageIdx === 9)
      return ['[대답지 : +1 / F 속성]', '[대답지 : -1 / T 속성]'];
    if (qstStageIdx === 10 || qstStageIdx === 11 || qstStageIdx === 12)
      return ['[대답지 : +1 / J 속성]', '[대답지 : -1 / P 속성]'];
  };

  function onClickNext() {
    switch (stage) {
      case 1:
        if (!data.title || !data.content) return alert(ALL_FULLFILL);
        if (data.title.length > NUMBER_500 || data.content > NUMBER_500) return alert(LENGTH_OVER_500);
        setStage(stage + 1);
        break;
      case 2:
        setData((prev) => {
          let copy = [...prev.questions];
          const parsedObj = JSON.parse(sessionStorage.getItem('mbTest'));
          copy.push(parsedObj);
          sessionStorage.setItem('mbTest', '');
          return { ...prev, questions: copy };
        });

        setQstStageIdx(qstStageIdx + 1);
        if (qstStageIdx === 12) {
          setStage(stage + 1);
        }
        break;
      case 3:
        setData((prev) => {
          let copy = [...prev.results];
          const parsedObj = JSON.parse(sessionStorage.getItem('mbResult'));
          copy.push(parsedObj);
          sessionStorage.setItem('mbResult', '');
          return { ...prev, results: copy };
        });
        setRstStageIdx(rstStageIdx + 1);

        if (rstStageIdx === 16) {
          setStage(stage + 1);
        }
        break;
    }
  }

  function onChange_s1_title(evt) {
    setData((prev) => ({ ...prev, title: evt.target.value }));
  }

  function onChange_s1_content(evt) {
    setData((prev) => ({ ...prev, content: evt.target.value }));
  }

  function imgUploadStart() {
    const isAllFormData = imgCntArr.every((item) => item instanceof FormData);
    if (imgCntArr.length != 17 || !isAllFormData) return alert('모든 항목에 이미지를 업로드 해주세요.');

    setImgUploading(true);
    const promiseArr = [];
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: sessionStorage.getItem(TOKEN_NAME),
    };

    imgCntArr.forEach((fdata) => {
      const promise = apiBe.post(`/upload`, fdata, {
        headers,
      });
      promiseArr.push(promise);
    });

    Promise.all(promiseArr)
      .then((results) => {
        results.forEach((res, idx) => {
          if (idx === 0) {
            setData((prev) => ({ ...prev, imageUrl: res.data }));
          } else {
            let copy = [...data.results];
            copy[idx - 1].imageUrl = res.data;
            setData((prev) => ({ ...prev, results: copy }));
          }
        });
        setImgUploading(false);
      })
      .catch(() => {
        setImgUploading(false);
      });
  }

  function makeFormData(evt) {
    const file = evt.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    let copy = [...imgCntArr];
    copy[window.mbInputIndex] = formData;
    setImgCntArr(copy);
  }

  function onClickPrev() {
    if (stage === 2 && qstStageIdx > 1) {
      return setQstStageIdx(qstStageIdx - 1);
    }
    setStage(stage - 1);
  }

  function onClickMain() {
    router.push('/admin');
  }

  return (
    <div className={styles.resultWrap}>
      {/* 이미지 업로드  */}
      {/* <input type='file' onChange={(evt)=>{
        const file = evt.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const headers = getHeaders()
        apiBe.post(`/upload`, formData, {
          headers,
        });
      }} /> */}

      <MarketingInfo />

      {stage === 1 && (
        <InfoPart
          data={data}
          onClickMain={onClickMain}
          onClickNext={onClickNext}
          onChange_s1_title={onChange_s1_title}
          onChange_s1_content={onChange_s1_content}
          // onChange_s1_imageUrl={onChange_s1_imageUrl}
          imgUploading={imgUploading[1]}
        />
      )}
      {stage === 2 &&
        mapTarget.question.map(
          (t, i) =>
            qstStageIdx === t && (
              <QuestionPart
                key={t}
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                idx={t - 1}
                data={data.questions.length > 0 && data.questions[i]}
                getAnswerTypeArr={getAnswerTypeArr()}
              />
            ),
        )}
      {stage === 3 &&
        mapTarget.result.map(
          (t, i) =>
            rstStageIdx - 1 === i && (
              <ResultPart key={t} onClickNext={onClickNext} onClickPrev={onClickPrev} idx={i + 1} resultName={t} />
            ),
        )}
      {stage === 4 && (
        <ImagePart
          inputOnChange={(evt) => {
            makeFormData(evt);
          }}
          onClickNext={imgUploadStart}
        />
      )}
    </div>
  );
}

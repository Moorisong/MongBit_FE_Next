import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { DOMAIN_BE_PROD } from '@/constants/constant';
import { getHeaders } from '@/utils/util';

import styles from './index.module.css';

export default function MarketingInfo() {
  const router = useRouter();
  const [data, setData] = useState({
    logInCount: 'loading',
    shareCount: 'loading',
    linkCopyCount: 'loading',
    resultCountMemberId: [null, null],
  });
  const [memberId, setMemberId] = useState('');

  useEffect(() => {
    const headers = getHeaders();

    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/loginTracker/count`, { headers })
      .then((res) => {
        setData((prev) => ({ ...prev, logInCount: res.data }));
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
      });

    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/shares/count/type?type=KAKAO`, { headers })
      .then((res) => {
        setData((prev) => ({ ...prev, shareCount: res.data }));
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
      });

    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/shares/count/type?type=LINK`, { headers })
      .then((res) => {
        setData((prev) => ({ ...prev, linkCopyCount: res.data }));
      })
      .catch((err) => {
        alert(err.response.data);
        router.push('/login');
      });
  }, []);

  function inputValChange(evt) {
    setMemberId(evt.currentTarget.value);
  }

  function getMemberLoginCount() {
    const headers = getHeaders();
    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/loginTracker/${memberId}/count`, { headers })
      .then((res) => {
        setData((prev) => ({ ...prev, resultCountMemberId: ['로그인 횟수', res.data] }));
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }

  function getMemberShareCount() {
    const headers = getHeaders();
    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/members/${memberId}/shares/count`, { headers })
      .then((res) => {
        setData((prev) => ({ ...prev, resultCountMemberId: ['공유 횟수', res.data] }));
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.readPart}>
        <div>
          <span>전체 회원의 총 로그인 횟수:</span>
          <span>{data.logInCount}</span>
        </div>

        <div>
          <span>전체 회원의 공유 카운트:</span>
          <span>{data.shareCount}</span>
        </div>

        <div>
          <span>전체 회원의 링크복사 카운트:</span>
          <span>{data.linkCopyCount}</span>
        </div>
      </div>

      <div className={styles.inputPart}>
        <div>
          <span>Member Id</span>
          <input
            type="text"
            onChange={(evt) => {
              inputValChange(evt);
            }}
          />
          <div>
            <button onClick={getMemberLoginCount}>로그인 횟수 보기</button>
            <button onClick={getMemberShareCount}>공유 횟수 보기</button>
            {data.resultCountMemberId[0] && (
              <p>{`${data.resultCountMemberId[0]} : ${data.resultCountMemberId[1]}`}번</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

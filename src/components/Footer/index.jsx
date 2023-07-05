import Link from "next/link";

import {
  TYPE_LOGIN,
  TYPE_ON_TEST,
  TYPE_MYPAGE,
  TYPE_TEST_LIST,
} from "@/constants/constant";

import styles from "./index.module.css";

export default function Footer(props) {
  const cn = () => {
    if (props.type === TYPE_ON_TEST)
      return `${styles.wrap} ${styles.moveBottom}`;
    if (props.type === TYPE_LOGIN)
      return `${styles.wrap} ${styles.moveBottom_2}`;
    if (props.type === TYPE_MYPAGE)
      return `${styles.wrap} ${styles.moveBottom_3}`;
    if (props.type === TYPE_TEST_LIST)
      return `${styles.wrap} ${styles.moveBottom_4}`;
    return `${styles.wrap}`;
  };
  return (
    <div className={cn()}>
      <div className={styles.upper}>
        <p>
          몽뭉이 크루 &nbsp; | &nbsp; 공동 대표 : 김송현, 임건재, 김정은, 안혜지
          &nbsp; | &nbsp; 사업자 없음
        </p>
        <p>서울 관악구 신림역 인근 카페 3층 스터디존에서 만듦</p>
        <p>채용문의 &nbsp; | &nbsp; 채용되고 싶다.</p>
      </div>
      <div className={styles.under}>
        <Link href="https://github.com/WillNeiman/MongBit_Backend" />
        <p>© 2023 MongMoongCrew. All rights reserved </p>
      </div>
    </div>
  );
}

"use client";
import { useRouter } from "next/navigation";

import styles from "./index.module.css";
import Footer from "../../components/Footer";
import { DOMAIN } from "../../constants/constant";

export default function NeedLogIn() {
  const router = useRouter();
  return (
    <div className={styles.wrap}>
      <div className={styles.textBox}>
        <p>3초만에 로그인하고</p>
        <p
          onClick={() => {
            router.push("/login");
          }}
        >
          {" "}
          테스트 결과 보기
        </p>
        <button
          className={styles.kakaoLogInBtn}
          onClick={() => {
            const url = process.env.REACT_APP_FE_URL
              ? `https://kauth.kakao.com/oauth/authorize?client_id=3245a5f9cb8303814aadbe1eb65b2e73&redirect_uri=${process.env.REACT_APP_FE_URL}/login/oauth2/kakao/code&response_type=code`
              : `https://kauth.kakao.com/oauth/authorize?client_id=3245a5f9cb8303814aadbe1eb65b2e73&redirect_uri=${DOMAIN}/login/oauth2/kakao/code&response_type=code`;

            window.location.href = url;
          }}
        />
      </div>
      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}

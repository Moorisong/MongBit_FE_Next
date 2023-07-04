"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import styles from "./index.module.css";
import Footer from "../../components/Footer";

export default function ExceptionPage() {
  const router = useRouter();
  useEffect(() => {
    window.onpopstate = handlePopstate;
  }, []);

  function handlePopstate() {
    router.push("/main");
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.textBox}>
        <p>세션이 만료되었습니다.</p>
      </div>

      <div className={styles.logoImgWrap}>
        <img src="/images/logIn/loginLogo.svg" alt="Logo_image" />
        <p className={styles.logoText}>
          © 2023 MongMoongCrew. All rights reserved
        </p>
      </div>

      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}

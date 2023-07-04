import styles from "./index.module.css";
import Footer from "../../components/Footer";

export default function DevInfo() {
  return (
    <div className={styles.wrap}>
      <div className={styles.textBox}>
        <ul>
          <li>
            <p> 프론트엔드 : 김송현</p>
          </li>
          <li>
            <p>백엔드 : 임건재, 김정은, 안혜지</p>
          </li>
        </ul>
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

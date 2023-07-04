"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import cx from "classnames";

import styles from "./index.module.css";
import { TOKEN_NAME, USER_INFO } from "@/constants/constant";
import { decodeToken } from "@/utils/util";

export default function NavigationBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuClicked, setMenuClicked] = useState(false);

  useEffect(() => {
    if (!decodeToken().state) {
      sessionStorage.setItem(USER_INFO + "memeberId", "");
      sessionStorage.setItem(USER_INFO + "thumbnail", "");
      sessionStorage.setItem(USER_INFO + "registDate", "");
      sessionStorage.setItem(USER_INFO + "username", "");
    }
  }, []);

  function clickMypageBtn() {
    if (!sessionStorage.getItem(TOKEN_NAME) || !decodeToken().state) {
      sessionStorage.setItem("ngb", "/mypage");
      return router.push("/login");
    }
    router.push("/mypage");
  }
  function clickLogOut() {
    sessionStorage.setItem(TOKEN_NAME, "");
    sessionStorage.setItem(USER_INFO + "memeberId", "");
    sessionStorage.setItem(USER_INFO + "thumbnail", "");
    sessionStorage.setItem(USER_INFO + "registDate", "");
    sessionStorage.setItem(USER_INFO + "username", "");
    setMenuClicked(false);
    router.push("/main");
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.navWrap}>
        <div
          className={styles.menuIcon}
          onClick={() => setMenuClicked(true)}
        ></div>
        <div className={styles.logoWrap} onClick={() => setMenuClicked(false)}>
          <Link href="/main" className={styles.logoDog}></Link>
          <Link href="/main" className={styles.logoTitle}></Link>
        </div>
        {pathname === "/mypage" ? (
          <button className={styles.myPageBtnNone}></button>
        ) : (
          <button
            className={styles.myPageBtn}
            onClick={clickMypageBtn}
          ></button>
        )}
      </div>

      <div
        className={cx(styles.menuWrap, {
          [styles.menuMoveToRight]: menuClicked,
        })}
      >
        <ul className={styles.menuUlWrapper}>
          <li>
            <ul className={styles.ulWrap}>
              심리테스트
              <li>
                <Link href="/test/latest">최신 보기</Link>
                <Link href="/test/list">전체 보기</Link>
              </li>
            </ul>
          </li>
          <li>
            <ul className={styles.ulWrap}>
              마이페이지
              <li onClick={clickMypageBtn}>심테 기록 보기</li>
            </ul>
          </li>
          <li>
            <ul className={styles.ulWrap}>
              개발자 정보
              <li>
                <Link href="/devInfo">몽뭉이 크루</Link>
              </li>
            </ul>
          </li>
          {decodeToken()?.state === "ROLE_ADMIN" && (
            <li>
              <button
                className={styles.adminBtn}
                onClick={() => {
                  router.push("/admin");
                }}
              >
                <p>관리자 페이지</p>
              </button>
            </li>
          )}
          <li>
            <ul>
              {decodeToken()?.state && (
                <li className={styles.logOutWrap}>
                  <p onClick={clickLogOut}>로그아웃</p>
                  <button
                    className={styles.logOutBtn}
                    onClick={clickLogOut}
                  ></button>
                  <img src="/images/navigationBar/logo_dog.svg" alt="logo" />
                </li>
              )}
            </ul>
          </li>
        </ul>
      </div>
      <div className={styles.fixModal}></div>
      <div
        className={cx(styles.blackModal, {
          [styles.modalMoveToRight]: menuClicked,
        })}
        onClick={() => setMenuClicked(false)}
      ></div>
    </div>
  );
}

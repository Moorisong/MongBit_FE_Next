'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import cx from 'classnames';
import { useRecoilValue } from 'recoil';

import { TOKEN_NAME, USER_INFO } from '@/constants/constant';
import { decodeToken } from '@/utils/util';

import { showCoupangClickWrap } from '/atom.js';

import styles from './index.module.css';

export default function NavigationBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuClicked, setMenuClicked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const coupangClickWrap = useRecoilValue(showCoupangClickWrap);

  useEffect(() => {
    setIsMounted(true);
    if (!decodeToken().state) {
      sessionStorage.setItem(USER_INFO + 'memeberId', '');
      sessionStorage.setItem(USER_INFO + 'thumbnail', '');
      sessionStorage.setItem(USER_INFO + 'registDate', '');
      sessionStorage.setItem(USER_INFO + 'username', '');
    }
  }, []);

  function clickMypageBtn() {
    if (!sessionStorage.getItem(TOKEN_NAME) || !decodeToken().state) {
      sessionStorage.setItem('ngb', '/mypage');
      return router.push('/login');
    }
    router.push('/mypage');
  }

  function clickLogOut() {
    sessionStorage.setItem(TOKEN_NAME, '');
    sessionStorage.setItem(USER_INFO + 'memeberId', '');
    sessionStorage.setItem(USER_INFO + 'thumbnail', '');
    sessionStorage.setItem(USER_INFO + 'registDate', '');
    sessionStorage.setItem(USER_INFO + 'username', '');
    setMenuClicked(false);
    router.push('/');
  }

  if (!pathname.includes('dashboard'))
    return (
      pathname.includes('dashboard') || (
        <div className={styles.wrap}>
          <div className={styles.navWrap}>
            <div
              className={cx(styles.menuIcon, {
                [styles.cursorPointer]: coupangClickWrap,
              })}
              onClick={() => {
                if (!coupangClickWrap) setMenuClicked(true);
              }}
            ></div>
            <div
              className={styles.logoWrap}
              onClick={() => {
                setMenuClicked(false);
                router.push('/');
              }}
            >
              <span className={styles.logoDog}></span>
              <span className={styles.logoTitle}></span>
            </div>
            {pathname === '/mypage' ? (
              <button className={styles.myPageBtnNone}></button>
            ) : (
              <button
                className={cx(styles.myPageBtn, {
                  [styles.cursorPointer]: coupangClickWrap,
                })}
                onClick={() => {
                  if (!coupangClickWrap) clickMypageBtn();
                }}
              ></button>
            )}
          </div>

          <div
            className={cx(styles.menuWrap, {
              [styles.menuMoveToRight]: menuClicked,
            })}
          >
            {isMounted && (
              <ul className={styles.menuUlWrapper}>
                <li>
                  <ul className={styles.ulWrap}>
                    심리테스트
                    <li>
                      <Link href="/test/latest" onClick={() => setMenuClicked(false)}>
                        최신 보기
                      </Link>
                      <Link href="/test/list" onClick={() => setMenuClicked(false)}>
                        전체 보기
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <ul className={styles.ulWrap}>
                    마이페이지
                    <li
                      onClick={() => {
                        clickMypageBtn();
                        setMenuClicked(false);
                      }}
                    >
                      심테 기록 보기
                    </li>
                  </ul>
                </li>
                <li>
                  <ul className={styles.ulWrap}>
                    개발자 정보
                    <li>
                      <Link href="/devinfo" onClick={() => setMenuClicked(false)}>
                        몽뭉이 크루
                      </Link>
                    </li>
                  </ul>
                </li>
                {decodeToken()?.role === 'ROLE_ADMIN' && (
                  <li>
                    <button
                      className={styles.adminBtn}
                      onClick={() => {
                        router.push('/admin');
                        setMenuClicked(false);
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
                        <button className={styles.logOutBtn} onClick={clickLogOut}></button>
                        <img src="/images/navigationBar/logo_dog.svg" alt="몽빗 MBTI 심리테스트 사이트 로고" />
                      </li>
                    )}
                  </ul>
                </li>
              </ul>
            )}
          </div>
          <div className={styles.fixModal}></div>
          <div
            className={cx(styles.blackModal, {
              [styles.modalMoveToRight]: menuClicked,
            })}
            onClick={() => setMenuClicked(false)}
          ></div>
        </div>
      )
    );
}

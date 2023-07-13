import { useRef, useEffect } from 'react';
import lottie from 'lottie-web';

import animationData from './loadingIcon.json';
import styles from './index.module.css';
import CoupangAdv_1 from '../CoupangAdv_1';
import CoupangAdv_2 from '../CoupangAdv_2';

export default function ResultLoading() {
  const containerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      animationData: animationData,
      loop: true,
      autoplay: true,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <div className={styles.wrap}>
      <CoupangAdv_1 />
      <div className={styles.content}>
        <div>
          <span className={styles.pointText}>나</span>
          <span>는...!</span>
        </div>
        <div>
          <div ref={containerRef} className={styles.loadImg}></div>
        </div>
      </div>
      <CoupangAdv_2 />
    </div>
  );
}

import { useEffect, useRef } from 'react';
import iframeResizer from 'iframe-resizer/js/iframeResizer';

import styles from './index.module.css';

export default function CoupangAdv() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    if (iframe) {
      iframeResizer({ checkOrigin: false }, iframe);
    }
  }, []);
  return (
    <iframe
      ref={iframeRef}
      className={styles.iframe}
      src="https://ads-partners.coupang.com/widgets.html?id=665493&template=carousel&trackingCode=AF7346840&subId=&width=400&height=90&tsource="
      height="70"
      frameBorder="0"
      scrolling="no"
      referrerPolicy="unsafe-url"
    ></iframe>
  );
}

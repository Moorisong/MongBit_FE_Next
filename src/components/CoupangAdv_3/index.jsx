import { useEffect, useRef } from 'react';
import iframeResizer from 'iframe-resizer/js/iframeResizer';

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
      src="https://ads-partners.coupang.com/widgets.html?id=693208&template=carousel&trackingCode=AF7346840&subId=&width=350&height=100&tsource="
      width="350"
      height="100"
      frameBorder="0"
      scrolling="no"
      referrerPolicy="unsafe-url"
      style={{ margin: '10px 0 10px 0' }}
    ></iframe>
  );
}

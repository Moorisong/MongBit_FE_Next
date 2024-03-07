import { useEffect } from 'react';
import lottie from 'lottie-web';

export function useAnimationEffect(containerRef, animationData) {
  useEffect(() => {
    if (!containerRef.current) return;

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
  }, [containerRef.current]);
}

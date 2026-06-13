import { useEffect, useRef } from 'react';

export const useAnimatedCounter = (end: number, duration: number = 2000) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let startTime: number | null = null;
    let started = false;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // easeOutExpo
      const easePercentage = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      const currentCount = Math.floor(end * easePercentage);
      if (element) element.textContent = currentCount.toString();

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        if (element) element.textContent = end.toString();
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        requestAnimationFrame(animate);
        observer.unobserve(element);
      }
    }, { threshold: 0.5 });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [end, duration]);

  return ref;
};

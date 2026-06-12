import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

/* Counts 0 → target when the returned ref scrolls into view (once).
   Reduced motion shows the final value immediately. */
export function useCountUp(target, { duration = 1.8, delay = 0 } = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduceMotion) {
      setValue(target);
      return undefined;
    }
    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.165, 0.84, 0.44, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, target, duration, delay]);

  return { ref, value };
}

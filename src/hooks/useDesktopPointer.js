import { useState, useEffect } from 'react';

/* True only on devices with a fine hover pointer at desktop width —
   gates 3D tilt / parallax so touch devices never pay for them */
export function useDesktopPointer() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return enabled;
}

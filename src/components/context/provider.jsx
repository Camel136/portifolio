import { useEffect, useMemo, useRef, useState } from 'react';
import { Context } from './context';

function detectMobile() {
  if (typeof window === 'undefined') return false;
  const hasTouchScreen =
    window.matchMedia('(pointer: coarse)').matches ||
    navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 1024;
  return hasTouchScreen && isSmallScreen;
}

export function Provider({ children }) {
  const smartphoneRef = useRef();
  const pcLeftRef = useRef();
  const pcRightRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [destiny, setDestiny] = useState(0);
  const [isMobile, setIsMobile] = useState(detectMobile);

  useEffect(() => {
    const onResize = () => setIsMobile(detectMobile());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const value = useMemo(
    () => ({
      smartphoneRef,
      pcLeftRef,
      pcRightRef,
      modalOpen,
      setModalOpen,
      destiny,
      setDestiny,
      isMobile,
    }),
    [modalOpen, destiny, isMobile]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

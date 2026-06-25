import { useRef } from 'react';
import { Context } from './context';

export function Provider({ children }) {
  const smartphoneRef = useRef();
  const pcLeftRef = useRef();
  const pcRightRef = useRef();

  const value = { smartphoneRef, pcLeftRef, pcRightRef };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

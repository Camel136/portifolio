import { useEffect, useState } from 'react';

const AIM_TIP_DELAY_MS = 4000;

// Returns an i18n key; translate it with `t()` at the call site.
export default function useInstruction(insideOfTent) {
  const [showAimTip, setShowAimTip] = useState(false);

  useEffect(() => {
    if (!insideOfTent) return;

    const timer = setTimeout(() => setShowAimTip(true), AIM_TIP_DELAY_MS);
    return () => {
      clearTimeout(timer);
      setShowAimTip(false);
    };
  }, [insideOfTent]);

  if (!insideOfTent) return 'instructions.lookAround';
  return showAimTip ? 'instructions.aim' : 'instructions.welcome';
}

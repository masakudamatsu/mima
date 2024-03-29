// Borrowed from https://github.com/vercel/next.js/blob/canary/examples/with-portals/components/ClientOnlyPortal.js

import {useRef, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

export function ClientOnlyPortal({children, selector}) {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
}

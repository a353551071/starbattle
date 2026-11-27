'use client';

import { useEffect } from 'react';

const PRODUCTION_HOSTS = new Set(['starbattleonline.com', 'www.starbattleonline.com']);

export default function AdSenseScript({ client }: { client: string }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!PRODUCTION_HOSTS.has(window.location.hostname)) return;
    if (document.querySelector('script[data-adsense-script]')) return;

    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.adsenseScript = '1';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    document.head.appendChild(script);
  }, [client]);

  return null;
}

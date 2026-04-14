'use client';

import { useEffect, useState } from 'react';

function formatCount(n: number): string {
  if (n >= 1000) {
    return n.toLocaleString('pt-BR');
  }
  return String(n);
}

export function SocialProofSection() {
  const [count, setCount] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);

    async function fetchCount() {
      try {
        const res = await fetch('/api/analytics/fatura-count');
        if (res.ok) {
          const data = await res.json();
          setCount(data.count);
        }
      } catch {
        // Silently fail — no badge shown
      }
    }

    fetchCount();
    return () => clearTimeout(timer);
  }, []);

  if (count === null || count === 0) return null;

  return (
    <div
      className={`flex items-center justify-center gap-2 mb-6 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5">
        <span className="text-blue-500 text-sm">🔥</span>
        <span className="text-sm font-semibold text-blue-700">
          Milhares de faturas emitidas para SMEs brasileiras
        </span>
      </div>
    </div>
  );
}

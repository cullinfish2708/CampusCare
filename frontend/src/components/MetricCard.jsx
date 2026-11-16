import React from 'react';
export default function MetricCard({ label, value, hint, symbol, tone = 'mint' }) {
  return <article className={`metric-card metric-${tone}`}><div className="metric-top"><span>{label}</span><span className="metric-symbol">{symbol}</span></div><strong>{value ?? '—'}</strong><small>{hint}</small></article>;
}

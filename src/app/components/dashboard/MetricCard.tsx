import type { ReactNode } from 'react';

type MetricCardProps = {
  icon: ReactNode;
  value: string;
  label: string;
  trendLabel?: string;
  trendTone?: 'positive' | 'negative' | 'neutral';
  iconToneClassName?: string;
};

export default function MetricCard({
  icon,
  value,
  label,
  trendLabel,
  trendTone = 'neutral',
  iconToneClassName = 'vf-metric-icon-tone-default',
}: MetricCardProps) {
  const trendClassName =
    trendTone === 'positive'
      ? 'vf-trend-chip vf-trend-chip-positive'
      : trendTone === 'negative'
        ? 'vf-trend-chip vf-trend-chip-negative'
        : 'vf-trend-chip';

  return (
    <article className="vf-surface-card vf-metric-card">
      <header className="vf-metric-card-header">
        <div className={`vf-metric-icon ${iconToneClassName}`}>{icon}</div>
        {trendLabel ? <span className={trendClassName}>{trendLabel}</span> : null}
      </header>
      <p className="vf-metric-value">{value}</p>
      <p className="vf-metric-label">{label}</p>
    </article>
  );
}

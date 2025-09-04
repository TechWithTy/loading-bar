'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import type { LoadingBarProps } from './types';

// Dynamically import to avoid SSR issues with lottie player
const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

/**
 * LoadingBar
 * - Inline or block layout
 * - Three render types: progress (default), lottie, lucide
 * - Lottie progresses with `progress` via `goToAndStop` method
 * - Lucide sequence switches icon based on progress buckets
 */
export default function LoadingBar({
  progress,
  mode = 'block',
  type = 'progress',
  lottieSrc,
  lucideIcons = [],
  className = '',
  title,
  subtitle,
  onLoad,
}: LoadingBarProps) {
  const pct = Math.max(0, Math.min(100, progress));
  const wrapper =
    mode === 'inline'
      ? 'inline-flex items-center gap-2 align-middle'
      : 'w-full';
  const lottieRef = React.useRef<any>(null);

  // Invoke onLoad once on mount
  React.useEffect(() => {
    if (onLoad) onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (lottieRef.current && lottieRef.current.animation) {
      const totalFrames = lottieRef.current.animation.totalFrames;
      const frame = Math.floor((pct / 100) * totalFrames);
      lottieRef.current.goToAndStop(frame, true);
    }
  }, [pct]);

  const renderProgress = () => (
    <div className="w-full bg-muted rounded-full h-2.5">
      <div
        className="bg-primary h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${pct}%` }}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        role="progressbar"
      />
    </div>
  );

  const renderLottie = () => {
    if (!lottieSrc) return renderProgress();
    return (
      <div className={mode === 'inline' ? 'w-16 h-8' : 'w-full h-16'}>
        <Lottie
          ref={lottieRef}
          play={false}
          loop={false}
          path={lottieSrc}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  };

  const renderLucide = () => {
    if (!lucideIcons.length) return renderProgress();
    const idx = Math.min(
      Math.floor((pct / 100) * Math.max(1, lucideIcons.length - 1)),
      lucideIcons.length - 1,
    );
    return <div className={mode === 'inline' ? 'w-6 h-6' : 'w-8 h-8'}>{lucideIcons[idx]}</div>;
  };

  const content =
    type === 'lottie' ? renderLottie() : type === 'lucide' ? renderLucide() : renderProgress();

  return (
    <div className={[wrapper, className].filter(Boolean).join(' ')}>
      {mode === 'block' && (title || subtitle) && (
        <div className="mb-1">
          {title && <div className="text-sm font-medium leading-none">{title}</div>}
          {subtitle && (
            <div className="text-xs text-muted-foreground leading-snug">{subtitle}</div>
          )}
        </div>
      )}
      {content}
      {mode === 'inline' && title && (
        <span className="text-xs font-medium">{title}</span>
      )}
      {mode === 'inline' && subtitle && (
        <span className="text-[10px] text-muted-foreground">{subtitle}</span>
      )}
      {mode === 'inline' && (
        <span className="text-xs text-foreground/80 tabular-nums">{pct}%</span>
      )}
    </div>
  );
}

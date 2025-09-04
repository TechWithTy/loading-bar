/**
 * LoadingBar types and props.
 * - mode: inline within text or block (card/container)
 * - type: visual style (progress bar, lottie animation, or lucide icon sequence)
 */

export type LoadingBarMode = 'inline' | 'block';
export type LoadingBarType = 'progress' | 'lottie' | 'lucide';

export interface LoadingBarProps {
  /** 0..100 percent */
  progress: number;
  /** Visual mode (layout) */
  mode?: LoadingBarMode;
  /** Rendering strategy */
  type?: LoadingBarType;
  /** Path to a public lottie JSON file (e.g., /lottie/CampaignPing.json) */
  lottieSrc?: string;
  /** Sequence of icons to show as progress advances (index picked by progress) */
  lucideIcons?: React.ReactNode[];
  /** Optional wrapper className for layout tweaks */
  className?: string;
  /** Optional title label shown near the loader */
  title?: string;
  /** Optional subtitle/description shown near the loader */
  subtitle?: string;
  /** Optional callback invoked once on mount */
  onLoad?: () => void;
  /** Optional callback invoked when progress reaches 100% */
  onSuccess?: () => void;
}

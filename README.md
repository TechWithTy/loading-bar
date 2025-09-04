# LoadingBar Component

A flexible loading indicator component that supports three types: progress bar, Lottie animation, and Lucide icons.

## Usage

### Import
```tsx
import LoadingBar from './LoadingBar';
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `progress` | number | **required** | The progress percentage (0-100). |
| `mode` | 'inline' \| 'block' | 'block' | The layout mode. Inline mode displays the progress bar and percentage side by side. |
| `type` | 'progress' \| 'lottie' \| 'lucide' | 'progress' | The type of loading indicator. |
| `lottieSrc` | string | undefined | The path to the Lottie JSON file (required for Lottie type). |
| `lucideIcons` | React.ReactNode[] | [] | An array of Lucide icon components (required for Lucide type). |
| `className` | string | '' | Additional CSS classes for the wrapper. |

### Examples

#### Progress Bar (Default)
```tsx
<LoadingBar progress={50} />
```

#### Lottie Animation
```tsx
<LoadingBar 
  progress={75} 
  type="lottie" 
  lottieSrc="/path/to/animation.json" 
/>
```

#### Lucide Icons
```tsx
import { Loader, RefreshCw } from 'lucide-react';

<LoadingBar 
  progress={25} 
  type="lucide" 
  lucideIcons={[<Loader />, <RefreshCw />]} 
/>
```

## Notes
- The component uses `next/dynamic` to dynamically import the Lottie player to avoid SSR issues.
- For the Lucide type, the icon displayed is determined by the current progress percentage and the number of icons provided.

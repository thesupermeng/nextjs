import Image from 'next/image';
import ErrorBoundary from '../videoPlayer/ErrorBoundary';
import { TransparentIcon } from '@/asset/icons';
export const ImageWithFallback = ({
  src,
  fallbackSrc = TransparentIcon,
  ...props
}) => {
  return (
    <ErrorBoundary key={`img-error-${src}`} noLog>
      <Image
        src={src || fallbackSrc}
        onError={(e) => {
          e.target.srcset = fallbackSrc?.src || fallbackSrc;
        }}
        {...props}
        alt=''
      />
    </ErrorBoundary>
  );
};

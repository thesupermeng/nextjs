import React, { useRef, useEffect, useState } from 'react';

const VisibilityDetector = ({ children, onVisible, ...props }) => {
  const elementRef = useRef(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0, // Trigger on first intersection
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
          if (onVisible) {
            onVisible();
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    const element = elementRef.current;

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasBeenVisible, onVisible]);

  return (
    <div ref={elementRef} {...props}>
      {children}
    </div>
  );
};

export default VisibilityDetector;

export function VisibilityDetectorWithReset({
  children,
  onVisibilityChange,
  ...props
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: '0px' }
    );
    onVisibilityChange(isIntersecting);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isIntersecting]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}

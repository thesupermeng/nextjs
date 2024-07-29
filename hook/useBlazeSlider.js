import React from 'react';
import BlazeSlider from 'blaze-slider';
import 'blaze-slider/dist/blaze.css';

const useBlazeSlider = (config) => {
  const sliderRef = React.useRef();
  const elRef = React.useRef();

  React.useEffect(() => {
    // if not already initialized
    if (!sliderRef.current && elRef.current) {
      sliderRef.current = new BlazeSlider(elRef.current, config);
    }
  }, []);

  return elRef;
};

export { useBlazeSlider };

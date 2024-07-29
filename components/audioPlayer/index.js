import React, { useCallback, useEffect, useState } from 'react';

const AudioPlayer = ({ src, setIsPlaying, isPlaying }) => {
  const audioRef = React.createRef();

  const togglePlay = useCallback(() => {
    audioRef.current.play();
  }, [audioRef]);

  useEffect(() => {
    if (isPlaying) {
      togglePlay();
    }
  }, [isPlaying]);

  const onEnded = () => {
    setIsPlaying(false);
  };

  return <audio ref={audioRef} src={src} id='audio' onEnded={onEnded} />;
};

export default AudioPlayer;

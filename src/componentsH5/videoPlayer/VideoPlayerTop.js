import { isWeb } from '@/util/common';
import { VideoPlayerTopWeb } from './VideoPlayerTopWeb';
import { VideoPlayerTopH5 } from './VideoPlayerTopH5';

export const VideoPlayerTop = () => {
  return <>{isWeb() ? <VideoPlayerTopWeb /> : <VideoPlayerTopH5 />}</>;
};

import useGetConfig from './user/useGetConfig';

export const useOffsetPosition = () => {
  const { isActive } = useGetConfig();
  const bannerHeight = 3; //donwload banner height in rem
  const iframeOffset = 3; //fb header and footer total height

  const checkOffset = (val) => {
    return isActive ? val : val - bannerHeight;
  };

  const setFbIframeHeight = (val) => {
    return isActive ? val : val - iframeOffset;
  };

  return { checkOffset, setFbIframeHeight };
};

import { URL_USER } from '@/config/url';
import { UserApi } from '@/util/UserApi';

export const usePostFeedback = () => {
  const postFeedback = async (content, images) => {
    const formData = new FormData();
    formData.append('content', content);
    Array.prototype.forEach.call(images, (image) => {
      formData.append('images', image);
    });

    return UserApi(URL_USER.postFeedback, formData, {
      isFormdata: true,
    });
  };

  return { postFeedback };
};

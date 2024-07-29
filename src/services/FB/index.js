import { URL_FB_APP } from '@/config/url';
import { FBApi } from '@/util/FB_Api';

export const getFBUser = async () => {
  return FBApi(URL_FB_APP.userBase, {});
};

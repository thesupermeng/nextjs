import SocketAction from './socketAction';

let Config = {};

Config.socketUrl = {
  chatRoom: 'https://chat.ctchat.live',
  // notify: 'https://stgbl-notify.97kqb.com/',
  // gift: 'https://stgbl-gift.97kqb.com/',
};

export const ChatRoomMsgType = {
  TEXT: 1, // 字段
  PIC_URL: 2, // 图片链接
  PIC_BASE64: 3, // 图片
  AD_TEXT: 4, // 广告
  STICKER: 5, //礼物
  GIFT: 6,
  TYPING: 100,
  EMPTY: 101,
  FOLLOWBET: -2,
};

export const findPropertyNameByValue = (obj, value) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === value) {
      return key;
    }
  }
  return null; // Value not found
};

export default Config;

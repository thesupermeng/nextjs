import { useLocaleLanguage } from '@/hook/common/useLocaleLanguage';
import { useAnnouncements } from '@/hook/user/useAnnouncements';
import useGetConfig from '@/hook/user/useGetConfig';
import {
  setAudio,
  setBottomAnnContent,
  setTopAnnContent,
} from '@/store/videoPlayerMisc';
import { Config } from '@/util/config';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const IData = {
  TEXT: 1,
  AUDIO: 2,
};
export const useLiveRoomMessages = ({ hasAudio }) => {
  const lang = useLocaleLanguage();
  const { config } = useGetConfig();
  const { room_ann_first = 0, room_ann_interval = 10 } = config?.timer || {};
  const { othersAnnouncements } = useAnnouncements();
  const dispatch = useDispatch();

  // audio message
  const curAudioMsgIdxRef = useRef(-1);
  const nextAudioRef = useRef(null);
  const audioData = useSelector((s) => s.videoPlayerMisc.audio);
  useEffect(() => {
    dispatch(setAudio({}));
  }, []);
  const allAudioMessages = useMemo(() => {
    const res = othersAnnouncements
      .filter((ann) => ann.data.type === IData.AUDIO)
      .map((ann) => ({
        ...ann,
        data: ann.data[lang] ?? ann.data[Config.locale],
      }));
    curAudioMsgIdxRef.current = Math.floor(Math.random() * res.length);
    return res;
  }, [JSON.stringify(othersAnnouncements)]);

  const pushAudioMessage = useCallback(() => {
    if (!hasAudio || allAudioMessages.length < 1) {
      return;
    }
    curAudioMsgIdxRef.current =
      (curAudioMsgIdxRef.current + 1) % (allAudioMessages.length || 1);
    dispatch(setTopAnnContent(allAudioMessages[curAudioMsgIdxRef.current]));
    dispatch(setAudio(allAudioMessages[curAudioMsgIdxRef.current]));
  }, [allAudioMessages]);

  useEffect(() => {
    const setPlayAudio = (playTime) => {
      clearTimeout(nextAudioRef.current);
      nextAudioRef.current = setTimeout(() => {
        pushAudioMessage();
      }, playTime - Date.now());
    };

    if (allAudioMessages?.length === 0) {
      return;
    }
    if (audioData?.ended) {
      setPlayAudio(audioData.ended + room_ann_interval * 1000);
    } else if (!audioData?.data?.mp3 && !audioData?.ended) {
      setPlayAudio(Date.now() + room_ann_first * 1000);
    }
    return () => {
      clearTimeout(nextAudioRef.current);
    };
  }, [audioData, allAudioMessages, room_ann_interval, room_ann_first]);
  // end audio messages

  // overlay messages
  const curTextMsgIdxRef = useRef(-1);
  const topOverlayAnnContent = useSelector(
    (s) => s.videoPlayerMisc.topOverlayAnnContent
  );
  const bottomOverlayAnnContent = useSelector(
    (s) => s.videoPlayerMisc.bottomOverlayAnnContent
  );
  const allOverlayMessages = useMemo(() => {
    const res = othersAnnouncements
      .filter((ann) => ann.data.type === IData.TEXT)
      .map((ann) => ({
        ...ann,
        data: ann.data[lang] ?? ann.data[Config.locale],
      }));
    curTextMsgIdxRef.current = Math.floor(Math.random() * res.length);
    return res;
  }, [JSON.stringify(othersAnnouncements)]);

  useEffect(() => {
    if (allOverlayMessages.length > 0 && !topOverlayAnnContent?.data) {
      pushOverlayMessage({ isTop: true });
    }
  }, [topOverlayAnnContent?.data, allOverlayMessages]);
  useEffect(() => {
    if (allOverlayMessages.length > 0 && !bottomOverlayAnnContent?.data) {
      pushOverlayMessage({ isTop: false });
    }
  }, [bottomOverlayAnnContent?.data, allOverlayMessages]);

  const pushOverlayMessage = useCallback(
    ({ isTop = true }) => {
      curTextMsgIdxRef.current =
        (curTextMsgIdxRef.current + 1) % (allOverlayMessages.length || 1);
      if (isTop) {
        dispatch(
          setTopAnnContent(allOverlayMessages[curTextMsgIdxRef.current])
        );
      } else {
        dispatch(
          setBottomAnnContent(allOverlayMessages[curTextMsgIdxRef.current])
        );
      }
    },
    [allOverlayMessages]
  );
  // end overlay messages

  useEffect(() => {
    return () => {
      //todo xl clear msg redux
    };
  }, []);
  return null;
};

const other = [
  {
    redirect_type: 2,
    data: {
      en: {
        desc: '',
        mp3: '',
        text: "I'm type 3 Text en Without MP3 and route to deposit",
        title: '',
      },
      fa: {
        desc: '',
        mp3: '',
        text: "I'm type 3 Text fa Without MP3 and route to deposit",
        title: '',
      },
      hi: {
        desc: '',
        mp3: '',
        text: "I'm type 3 Text hi Without MP3 and route to deposit",
        title: '',
      },
      type: 1,
    },
  },
  {
    url: '1',
    redirect_type: 3,
    data: {
      en: {
        desc: '',
        mp3: '',
        text: "I'm type 3 Text en Without MP3 route to promotion 1",
        title: '',
      },
      fa: {
        desc: '',
        mp3: '',
        text: "I'm type 3 Text fa Without MP3 route to promotion 1",
        title: '',
      },
      hi: {
        desc: '',
        mp3: '',
        text: "I'm type 3 Text hi Without MP3 route to promotion 1",
        title: '',
      },
      type: 1,
    },
  },
  {
    url: 'https://www.google.com',
    redirect_type: 1,
    data: {
      en: {
        desc: '',
        mp3: '',
        text: "I'm type 3 Text en Without MP3 route to google",
        title: '',
      },
      fa: {
        desc: '',
        mp3: '',
        text: "I'm type 3 Text en Without MP3 route to google",
        title: '',
      },
      hi: {
        desc: '',
        mp3: '',
        text: "I'm type 3 Text en Without MP3 route to google",
        title: '',
      },
      type: 1,
    },
  },
  {
    data: {
      en: {
        desc: 'Im description en',
        mp3: 'https://s3.amazonaws.com/pb_previews/201_the-beginning-electronic-logo/201_full_the-beginning-electronic-logo_0012_preview.mp3',
        text: "I'm type 3 Text en With MP3 and no route",
        title: 'Im title en',
      },
      fa: {
        desc: 'Im description fa',
        mp3: 'https://s3.amazonaws.com/pb_previews/201_the-beginning-electronic-logo/201_full_the-beginning-electronic-logo_0012_preview.mp3',
        text: "I'm type 3 Text fa With MP3 and no route",
        title: 'Im title fa',
      },
      hi: {
        desc: 'Im description hi',
        mp3: 'https://s3.amazonaws.com/pb_previews/201_the-beginning-electronic-logo/201_full_the-beginning-electronic-logo_0012_preview.mp3',
        text: "I'm type 3 Text hi With MP3 and no route",
        title: 'Im title hi',
      },
      type: 2,
    },
  },
  {
    redirect_type: 2,
    data: {
      en: {
        desc: 'Im description en',
        mp3: 'https://s3.amazonaws.com/pb_previews/201_the-beginning-electronic-logo/201_full_the-beginning-electronic-logo_0012_preview.mp3',
        text: "I'm type 3 Text en With MP3 and route to deposit",
        title: 'Im title en',
      },
      fa: {
        desc: 'Im description fa',
        mp3: 'https://s3.amazonaws.com/pb_previews/201_the-beginning-electronic-logo/201_full_the-beginning-electronic-logo_0012_preview.mp3',
        text: "I'm type 3 Text fa With MP3 and route to deposit",
        title: 'Im title fa',
      },
      hi: {
        desc: 'Im description hi',
        mp3: 'https://s3.amazonaws.com/pb_previews/201_the-beginning-electronic-logo/201_full_the-beginning-electronic-logo_0012_preview.mp3',
        text: "I'm type 3 Text hi With MP3 and route to deposit",
        title: 'Im title hi',
      },
      type: 2,
    },
  },
  {
    url: '1',
    redirect_type: 3,
    data: {
      en: {
        desc: 'Im description en',
        mp3: 'https://s3.amazonaws.com/pb_previews/201_the-beginning-electronic-logo/201_full_the-beginning-electronic-logo_0012_preview.mp3',
        text: "I'm type 3 Text en With MP3 route to promotion 1",
        title: 'Im title en',
      },
      fa: {
        desc: 'Im description fa',
        mp3: 'https://s3.amazonaws.com/pb_previews/201_the-beginning-electronic-logo/201_full_the-beginning-electronic-logo_0012_preview.mp3',
        text: "I'm type 3 Text en With MP3 route to promotion 1",
        title: 'Im title fa',
      },
      hi: {
        desc: 'Im description hi',
        mp3: 'https://s3.amazonaws.com/pb_previews/201_the-beginning-electronic-logo/201_full_the-beginning-electronic-logo_0012_preview.mp3',
        text: "I'm type 3 Text en With MP3 route to promotion 1",
        title: 'Im title hi',
      },
      type: 2,
    },
  },
  {
    url: 'https://www.google.com',
    redirect_type: 1,
    data: {
      en: {
        desc: 'Im description en',
        mp3: 'https://s3.amazonaws.com/pb_previews/201_the-beginning-electronic-logo/201_full_the-beginning-electronic-logo_0012_preview.mp3',
        text: "I'm type 3 Text en With MP3 route to google",
        title: 'Im title en',
      },
      fa: {
        desc: 'Im description fa',
        mp3: 'https://s3.amazonaws.com/pb_previews/201_the-beginning-electronic-logo/201_full_the-beginning-electronic-logo_0012_preview.mp3',
        text: "I'm type 3 Text en With MP3 route to google",
        title: 'Im title fa',
      },
      hi: {
        desc: 'Im description hi',
        mp3: 'https://s3.amazonaws.com/pb_previews/201_the-beginning-electronic-logo/201_full_the-beginning-electronic-logo_0012_preview.mp3',
        text: "I'm type 3 Text en With MP3 route to google",
        title: 'Im title hi',
      },
      type: 2,
    },
  },
  {
    data: {
      en: {
        desc: '',
        mp3: '',
        text: "I'm type 3 only Text en Without MP3 and no route",
        title: '',
      },
      fa: {
        desc: '',
        mp3: '',
        text: "I'm type 3 only Text fa Without MP3 and no route",
        title: '',
      },
      hi: {
        desc: '',
        mp3: '',
        text: "I'm type 3 only Text hi Without MP3 and no route",
        title: '',
      },
      type: 1,
    },
  },
];

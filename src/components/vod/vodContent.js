import Image from "next/image";
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next";
import { ArrowDownIcon } from "@/asset/icons";

import styles from './style.module.css';

export const VodContent = ({
  vodContent,
  vodEpisodeInfo,
  vodEpisodeSelected
}) => {
  const { t } = useTranslation();

  const qqqref = useRef();
  const [isLineExceed, setLineExceed] = useState(false);
  const [isCollapse, setCollapse] = useState(true);
  const [episodeInfo, setEpisodeInfo] = useState(null);

  useEffect(() => {
    setLineExceed(checkIsLineExceed(qqqref.current));
  }, []);

  useEffect(() => {
    if(vodEpisodeInfo != null && vodEpisodeSelected != null){
      const episodeId = vodEpisodeSelected.nid;
      const selectedItem = vodEpisodeInfo.filter((info) => info.episode == episodeId + 1);
      if(selectedItem.length > 0){
        setEpisodeInfo(selectedItem[0]);
      } else {
        setEpisodeInfo(null);
      }
    }
  }, [vodEpisodeInfo, vodEpisodeSelected]);

  const checkIsLineExceed = (e) => {
    if(e != null){
      return e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth;
    }
    return true;
  }

  const onExpandPress = () => {
    setCollapse(!isCollapse);
  }
  
  return (
    <>
      {episodeInfo != null &&
        <div className="desktop bg-[#1d2023] bg-[#1d2023e0]" style={{ padding: '1rem 1.5rem', borderRadius: '12px' }}>
          <div className="space-y-4">
            <span className="">{t('分集剧情 : ')}{episodeInfo.title}</span>
            <p ref={qqqref} className={`${isCollapse ? 'line-clamp-2' : ''} text-white/75 text-sm`} style={{ color: '#9C9C9C' }}>{episodeInfo.gpt_content}</p>
            {isLineExceed &&
              <div>
                {isCollapse ?
                  <div className="flex flex-row space-x-2 items-center" onClick={onExpandPress}>
                    <span className={styles.primaryText}>{t('更多')}</span>
                    <ArrowDownIcon
                      color={'#FAC33D'}
                    />
                  </div>

                  :

                  <div className="flex flex-row space-x-2 items-center" onClick={onExpandPress}>
                    <span className={styles.primaryText}>{t('收起')}</span>
                    <div style={{ transform: 'rotate(180deg)' }}>
                      <ArrowDownIcon
                        color={'#FAC33D'}
                      />
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      }
    </>
  )
}
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import DropZoneWeb from './DropZoneWeb';
import { isWeb } from '@/util/common';
import DropZoneH5 from './DropZoneH5';

const KycFormDropZone = ({ emitFile }) => {
  const [receivedFiles, setReceivedFiles] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    emitFile(receivedFiles);
  }, [receivedFiles]);

  return (
    <>
      {isWeb() ? (
        <>
          <DropZoneWeb
            setReceivedFiles={setReceivedFiles}
            receivedFiles={receivedFiles}
          />
          <p className='text-[14px] font-bold'>{t('selfieWithIDCard')}</p>
          <DropZoneWeb
            setReceivedFiles={setReceivedFiles}
            receivedFiles={receivedFiles}
          />
        </>
      ) : (
        <>
          <DropZoneH5
            setReceivedFiles={setReceivedFiles}
            receivedFiles={receivedFiles}
          />
          <p className='text-[14px] font-bold'>{t('selfieWithIDCard')}</p>
          <DropZoneH5
            setReceivedFiles={setReceivedFiles}
            receivedFiles={receivedFiles}
          />
        </>
      )}
    </>
  );
};

export default KycFormDropZone;

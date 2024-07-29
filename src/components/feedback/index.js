import React, { useState } from 'react';
import { RightMenuLayout } from '../rightMenuLayout';
import { RightMenuHeader } from '../rightMenuLayout/rightMenuHeader';
import { useTranslation } from 'next-i18next';
import { ScrollContentVertical } from '../ScrollContentVertical';
import { Button } from '@/componentsH5/button';
import { WEBOnly } from '../Fragments/EnvComponent';
import { isWeb } from '@/util/common';
import DropZoneWeb from '../fileDropzone/DropZoneWeb';
import DropZoneH5 from '../fileDropzone/DropZoneH5';
import { usePostFeedback } from '@/hook/api/usePostFeedback';
import SuccessModal from '../profileMenu/account/components/changePassword/components/successModal';

export const Feedback = () => {
  const { t } = useTranslation();
  const [receivedFiles, setReceivedFiles] = useState([]);
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { postFeedback } = usePostFeedback();

  const onButtonClick = () => {
    setIsLoading(true);
    postFeedback(content, receivedFiles).then((data) => {
      if (data.code === 0) {
        setSuccess(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
    // .finally(setIsLoading(false));
  };

  const resetData = () => {
    setContent('');
    setReceivedFiles([]);
  };

  return (
    <>
      <RightMenuLayout>
        <WEBOnly>
          <RightMenuHeader
            className='p-4'
            tabs={[{ label: t('feedback') }]}
            selected={0}
          ></RightMenuHeader>
        </WEBOnly>

        <ScrollContentVertical
          className={`p-4 ${isWeb() ? 'text-15' : 'text-sm'} gap-[17px]`}
        >
          <p>{t('providesCommentsAndSuggestions')}</p>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder={t('describeIssuesSuggestion')}
            className=' min-h-[232px] w-full bg-[#191A1D] rounded-lg py-2 px-3 text-[16px]'
          ></textarea>

          <div>
            <p>{t('supportAttachments')}</p>
            {isWeb() ? (
              <DropZoneWeb
                setReceivedFiles={setReceivedFiles}
                maxFiles={2}
                receivedFiles={receivedFiles}
              />
            ) : (
              <DropZoneH5
                setReceivedFiles={setReceivedFiles}
                maxFiles={2}
                receivedFiles={receivedFiles}
              />
            )}
            <p className={`text-[#D8BA92] ${isWeb() ? 'text-sm' : 'text-xs'}`}>
              {t('maximumUploadFileSize10MB')}
            </p>
          </div>
        </ScrollContentVertical>
        <Button
          onClick={onButtonClick}
          disabled={(!content && receivedFiles?.length == 0) || isLoading}
        >
          {isLoading ? t('loading') : t('sendFeedback')}
        </Button>
      </RightMenuLayout>

      {success && (
        <SuccessModal
          className='bg-transparent'
          message={t('feedbackSubmitted')}
          setModalOpen={() => {
            setSuccess(false);
            resetData();
          }}
        />
      )}
    </>
  );
};

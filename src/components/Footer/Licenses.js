import { licenses } from '@/asset/icons/license/footerLicense';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';

export const Licenses = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const onClickIcon = (url) => {
    if (isWeb()) {
      window.open(url);
    } else {
      router.push(url);
    }
  };
  return (
    <div
      className={`flex flex-wrap gap-3.5 ${isWeb() ? '' : 'justify-center'}`}
    >
      {licenses.map((item, index) => {
        return (
          <div
            key={index}
            className='self-center grayscale hover:grayscale-0'
            onClick={() => onClickIcon(item.url)}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={110}
              height={30}
              className='object-contain'
            />
          </div>
        );
      })}
      <p className='text-[13px] text-[#A9A9A938] mt-2'>
        {t('eastRichHasLegalLicenses')}
      </p>
    </div>
  );
};

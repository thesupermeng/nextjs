import FullScreenModal from '@/components/FullScreenModal'
import { logout } from '@/services/user';
import { useTranslation } from 'next-i18next';

const LogoutModal = ({setIsLogoutOpen}) => {
  const { t } = useTranslation();

  const onLogoutClick = () => {
    logout().then((res) => {
      if(res.code === 0){
        window.location.reload()
      }
    });
  }

  const onCloseClick = () =>{
    setIsLogoutOpen(false)
  }

  return <FullScreenModal>
    <div className='flex-initial flex flex-col rounded-3xl bg-[#121212] p-7'>
      <div className='text-xl font-bold text-center'>{t('logOut')}</div>
      <div className='text-lg text-center mt-10 mb-[49px]'>{t('logOutDesc')}</div>
      <button className='py-3 px-3.5 rounded-md mb-[15px] tayagradient w-[331px] ml-[61px] mr-[58px]' onClick={onLogoutClick}>
        <p className='font-semibold text-[15px] text-[#FFFFFF]'>{t('logOut')}</p>
      </button>
      <button className='py-3 px-3.5 opacity-50 w-[331px] ml-[61px] mr-[58px]' onClick={onCloseClick}>
        <p className='font-semibold text-[15px] text-[#FFFFFF]'>{t('cancel')}</p>
      </button>
    </div>
  </FullScreenModal>
}

export default LogoutModal
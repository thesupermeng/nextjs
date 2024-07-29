import BetSlip from '@/components/header/headerBetSlip';
import useUser from '@/hook/user/useUser';
import { useRouter } from 'next/navigation';

export default function HeaderBetSlip() {
  const router = useRouter();
  const { isLogin } = useUser();
  const onClick = () => {
    if (isLogin) router.push('/bet/slip');
    else router.push('/user/login');
  };
  return <BetSlip onClick={onClick} withText={false} />;
}

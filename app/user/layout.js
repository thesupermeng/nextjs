import { isWeb } from '@/util/common';

export default function Layout({ children }) {
  if (isWeb()) {
    return null;
  }
  return <div className='flex flex-col flex-1 overflow-hidden'>{children}</div>;
}

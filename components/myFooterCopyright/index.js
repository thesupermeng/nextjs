'use client';
import { usePathname, useRouter } from 'next/navigation';
const MyFooterCopyRight = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (
    pathname.startsWith('/vod/play') ||
    pathname.startsWith('/search/') ||
    pathname.startsWith('/payment') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/setpin') ||
    pathname.startsWith('/privacy') ||
    pathname.startsWith('/service') ||
    pathname.startsWith('/sport') ||
    pathname.startsWith('/myprofile/watchHistory') ||
    pathname.startsWith('/myprofile/userCenter') ||
    pathname.startsWith('/myprofile/feedback') ||
    //aha
    pathname.startsWith('/sport/user/deposit') ||
    pathname.startsWith('/sport/user/withdraw') ||
    pathname.startsWith('/sport/user/transaction') ||
    pathname.startsWith('/sport/user/history') ||
    pathname.startsWith('/purchase-redirect') ||
    pathname.startsWith('/purchase-redirect') ||
    pathname.startsWith('/download') ||
    pathname.startsWith('/invite')
  ) {
    return <></>;
  }

  return (
    <div
      className='px-8 py-3 desktop'
      style={{
        marginTop: '2rem',
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#1D2023',
        fontSize: '14px',
        borderTop: '1px solid hsla(0, 0%, 100%, .05)',
      }}
    >
      <div
        style={{
          color: '#6B6B6B !important',
          lineHeight: '24px',
        }}
      >
        版权声明：影视TV内容均来自互联网，不提供存储/录制/上传。
        <br />
        如果影视TV提供内容侵犯了您的版权，请发送电子邮件至
        <a href='mailto:contactus@yingshi.tv'>contactus@yingshi.tv</a>
        进行说明，我们将立即删除内容，保护版权所有者的权益。
        <br />
        <br />
        <a className='hover-yellow custom-link' href={'/privacy'}>
          隐私协议
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
        <a className='hover-yellow custom-link' href={'/service'}>
          用户服务协议
        </a>
        <br />
        Copyright © 2024 yingshi.tv All Rights Reserved
      </div>
    </div>
  );
};
export default MyFooterCopyRight;

import { URL_ROUTE } from '@/config/url';
import Image from 'next/image';
import QRCode from 'qrcode';
import { useState, useEffect } from 'react';

const QrcodeGenerator = ({ size = 150 }) => {
  const downloadUrl = window.location.origin.toString() + URL_ROUTE.download;
  const [qr, setQr] = useState('');
  const generateQRCode = () => {
    QRCode.toDataURL(
      `${downloadUrl}`,
      { width: size, margin: 2, color: {} },
      (err, generatedQr) => {
        if (err) {
          console.error(err);
          return;
        }
        setQr(generatedQr);
      }
    );
  };

  useEffect(() => {
    if (downloadUrl) {
      generateQRCode();
    }
  }, [downloadUrl]);

  return (
    <>
      {qr ? (
        <Image
          width={size}
          height={size}
          src={qr}
          className='rounded-[10px]'
          alt='QR Code'
        />
      ) : (
        <SkeletonQrCode size={size} />
      )}
    </>
  );
};

export const SkeletonQrCode = ({ size, className = '', ...props }) => {
  return (
    <div className={`flex flex-row items-start ${className}`} {...props}>
      <div
        style={{ width: size, height: size }}
        className={`flex flex-row overflow-hidden skeleton rounded-lg`}
      ></div>
    </div>
  );
};

export default QrcodeGenerator;

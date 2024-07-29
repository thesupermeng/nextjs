// QRCodeReader.js
import jsQR from 'jsqr';

const MAX_FILE_SIZE = (1024 * 1024) / 1.3;
const readQRCode = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const ratio =
        img.width * img.height > MAX_FILE_SIZE
          ? Math.sqrt((img.width * img.height) / MAX_FILE_SIZE)
          : 1;

      canvas.width = img.width / ratio;
      canvas.height = img.height / ratio;
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        img.width / ratio,
        img.height / ratio
      );
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);
      callback(code);
    };
    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
};

export default readQRCode;

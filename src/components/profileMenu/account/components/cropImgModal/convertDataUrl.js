// export default function convertUrlToImageData(URI) {
//   return new Promise((resolve, reject) => {
//     if(URI == null) return reject();

//     var canvas = document.createElement('canvas');
//     var context = canvas.getContext('2d');
//     var image = new Image();

//     image.addEventListener('load', () => {
//       canvas.width = image.width;
//       canvas.height = image.height;
//       context.drawImage(image, 0, 0, canvas.width, canvas.height);
//       resolve(context.getImageData(0, 0, canvas.width, canvas.height));
//     }, false);
//     image.src = URI;
//   })
// } 

export default async function convertDataUrlToFile(dataUrl, filename){
  const blob = await (await fetch(dataUrl)).blob();
  return new File([blob], filename, {type: blob.type});
}
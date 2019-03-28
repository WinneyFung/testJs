import img from './img.png';
const image = new Image();
image.src = img;
document.body.appendChild(image);
console.error('出错了');
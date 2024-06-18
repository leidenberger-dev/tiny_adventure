import { canvas, ctx } from "../config/canvas.js";

export function convertToBlackAndWhite() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const length = data.length;

  for (let i = 0; i < length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    const gray = 0.299 * red + 0.587 * green + 0.114 * blue;

    data[i] = data[i + 1] = data[i + 2] = gray;
  }

  ctx.putImageData(imageData, 0, 0);
}

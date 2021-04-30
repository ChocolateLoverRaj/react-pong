/**
 * Scales width and height up for maximum size while maintaining aspect ratio
 */
const scale = (maxWidth, maxHieght, aspectRatio) => {
  const shorterWidth = maxHieght * aspectRatio;
  const shorterHeight = maxWidth / aspectRatio;
  const widthShorter = shorterWidth < shorterHeight;
  const width = widthShorter ? shorterWidth : maxWidth;
  const height = widthShorter ? maxHieght : shorterHeight;
  return { width, height };
};

export default scale;

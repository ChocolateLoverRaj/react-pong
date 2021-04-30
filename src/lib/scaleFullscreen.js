/**
 * Scales width and height up for maximum size while maintaining aspect ratio
 */
const scaleFullscreen = (maxWidth, maxHeight, scaleSize) => {
  const scale = Math.min(
    maxHeight / scaleSize.height,
    maxWidth / scaleSize.width
  );
  return {
    width: scaleSize.width * scale,
    height: scaleSize.height * scale,
    scale
  };
};

export default scaleFullscreen;

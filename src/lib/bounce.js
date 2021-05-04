/**
 * Changes a vector to 'bounce' at a certain angle
 */
const bounce = (wallAngle, enterAngle) => {
  const bigWallAngle = wallAngle > Math.PI;
  if (bigWallAngle) wallAngle -= Math.PI;
  let exitAngle = wallAngle * 2 - enterAngle;
  if (bigWallAngle) exitAngle += Math.PI;
  return exitAngle;
};

export default bounce;

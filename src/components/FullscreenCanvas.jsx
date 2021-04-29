import { useEffect, useRef } from "react";
import styles from "./FullscreenCanvas.module.css";

const FullscreenCanvas = (props) => {
  const { aspectRatio, width, height } = props;

  const ref = useRef(null);

  const shorterWidth = height * aspectRatio;
  const shorterHeight = width / aspectRatio;
  const widthShorter = shorterWidth < shorterHeight;
  const scaledWidth = widthShorter ? shorterWidth : width;
  const scaledHeight = widthShorter ? height : shorterHeight;
  console.log(widthShorter, scaledWidth, scaledHeight);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, scaledWidth, scaledHeight);
  }, [ref, scaledWidth, scaledHeight, aspectRatio]);

  return (
    <canvas
      width={scaledWidth}
      height={scaledHeight}
      className={styles.canvas}
      ref={ref}
    />
  );
};

export default FullscreenCanvas;

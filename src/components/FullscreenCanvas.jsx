import { useEffect } from "react";
import { useComponentSize } from "react-use-size";
import styles from "./FullscreenCanvas.module.css";

const FullscreenCanvas = () => {
  const { ref, width, height } = useComponentSize();

  useEffect(() => {
    const ctx = ref.current.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, width, height);
  }, [ref, width, height]);

  return (
    <div className={styles.div}>
      <canvas width={100} height={100} className={styles.canvas} ref={ref} />
    </div>
  );
};

export default FullscreenCanvas;

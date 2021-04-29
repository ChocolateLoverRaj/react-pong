import "./styles.css";
import FullscreenCanvas from "./components/FullscreenCanvas";
import styles from "./App.module.css";
import { useComponentSize } from "react-use-size";

export default function App() {
  const { ref, width, height } = useComponentSize();

  return (
    <div className={styles.div} ref={ref}>
      <FullscreenCanvas aspectRatio={1 / 2} width={width} height={height} />
    </div>
  );
}

import { useRef, useEffect } from "react";

const useKeysPressed = () => {
  const keysPressed = useRef(new Set()).current;

  useEffect(() => {
    const handleKeydown = ({ key }) => {
      keysPressed.add(key);
    };
    const handleKeyup = ({ key }) => {
      keysPressed.delete(key);
    };
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, []);

  return keysPressed;
};

export default useKeysPressed;

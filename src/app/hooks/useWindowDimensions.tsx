import { useState, useEffect } from "react";

const useWindowDimensions = () => {
  const getWindowDimensions = () => {
    const { innerWidth: width } = window;
    return {
      width,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    const onResize = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return windowDimensions;
};

export default useWindowDimensions;

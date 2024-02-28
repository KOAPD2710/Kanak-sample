import { useState, useEffect } from "react";
// import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

export default useWindowSize
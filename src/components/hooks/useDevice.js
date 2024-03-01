import { useEffect, useState } from 'react';

function useSSRMediaQuery(mediaQueryString) {
    const [matches, setMatches] = useState(true)

    useEffect(() => {
        const mediaQueryList = window.matchMedia(mediaQueryString)
        const listener = () => setMatches(!!mediaQueryList.matches)
        mediaQueryList.addEventListener("change", listener)
        listener()
        return () => {
            mediaQueryList.removeEventListener("change", listener)
        }
    }, [mediaQueryString])

    return matches
}

function useDevice() {
    const isDesktop = useSSRMediaQuery('(min-width: 992px)');
    const isTablet = useSSRMediaQuery(
        '(min-width: 768px) and (max-width: 991px)'
    );
    const isMobile = useSSRMediaQuery('(max-width: 767px)');
    const isSmartphone = useSSRMediaQuery('(max-width: 478px)');

    return { isDesktop, isTablet, isMobile, isSmartphone }
}

export default useDevice;



import { useRef, useCallback } from 'react';

function useSelector() {
    const ref = useRef();
    const q = useCallback((child, index = 0) => child && ref.current.querySelectorAll(child)[index], [ref]);
    return [q, ref];
}

export default useSelector;
import { useCallback } from 'react';

function useSelector(ref) {
    return useCallback((child, index = 0) => child && ref.current.querySelectorAll(child)[index], [ref]);
}

export default useSelector;
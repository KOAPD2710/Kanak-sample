import Lenis from '@studio-freight/lenis';

let lenis;

function initLenis() {
    lenis = new Lenis()

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
}

function getLenis() {
    return lenis;
}

export {initLenis, getLenis}
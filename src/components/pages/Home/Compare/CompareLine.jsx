import { useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import * as ut from '@/js/utils.js';

function CompareLine({ ...props }) {
    const [index, setIndex] = useState(0);
    const activeItem = (idx) => {
        ut.dom('.home-comp-main-prog-list-item.active').classList.remove('active')
        ut.dom('.home-comp-main-prog-list-item', false)[idx].classList.add('active')
        ut.dom('.home-comp-main-item.good .home-comp-main-item-list-item.active').classList.remove('active')
        ut.dom('.home-comp-main-item.good .home-comp-main-item-list-item', false)[idx].classList.add('active')
        ut.dom('.home-comp-main-item.bad .home-comp-main-item-list-item.active').classList.remove('active')
        ut.dom('.home-comp-main-item.bad .home-comp-main-item-list-item', false)[idx].classList.add('active')
    }

    const onUpdateProgress = useCallback((progress) => {
        const numberOfBreakPoints = props.listLength;
        const step = 1 / numberOfBreakPoints;
        const breakPoints = Array.from({ length: numberOfBreakPoints + 1 }, (_, index) => parseFloat((index * step).toPrecision(2)));
        let idx;

        for (let i = 0; i < breakPoints.length - 1; i++) {
            const startPoint = breakPoints[i];
            const endPoint = breakPoints[i + 1];

            if (progress >= startPoint && progress < endPoint) {
                let idx = Math.floor(progress * 5)
                setIndex(idx);
                activeItem(idx);
                break;
            }
        }
    }, [index])

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-comp',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                snap: [0, .2, .4, .6, .8, 1],
                onUpdate: (self) => {
                    let progress = self.progress;
                    onUpdateProgress(progress);
                }
            }
        })
        tl
            .to('.home-comp-main-prog-line', { '--prog': 100, duration: 1, ease: 'linear' })
    }, []);
    return (
        <div className="home-comp-main-prog-line" style={{'--PI': Math.PI}}>
            {props.plateLine}
        </div>
    )
}
export default CompareLine;



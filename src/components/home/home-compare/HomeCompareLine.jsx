import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import * as ut from '../../../js/utils.js';

function HomeCompareLine({ ...props }) {
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        let currIdx;
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-comp',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,                
                snap: [0, .25, .5, .75, 1],
                onUpdate: (self) => {
                    let prog = self.progress;
                    let idx
                    if (prog >= .75) {idx = 3
                    } else if (prog >= .5) {idx = 2
                    } else if (prog >= .25) {idx = 1
                    } else {idx = 0}
                    if (currIdx !== idx) {
                        activeItem(idx)
                    }
                    currIdx = idx;
                }
            }
        })
        tl
        .to('.home-comp-main-prog-line', {'--prog': 100, duration: 1, ease: 'linear'})

        function activeItem(idx) {
            ut.dom('.home-comp-main-prog-list-item.active').classList.remove('active')
            ut.dom('.home-comp-main-prog-list-item', false)[idx].classList.add('active')
            ut.dom('.home-comp-main-item.good .home-comp-main-item-list-item.active').classList.remove('active')
            ut.dom('.home-comp-main-item.good .home-comp-main-item-list-item', false)[idx].classList.add('active')
            ut.dom('.home-comp-main-item.bad .home-comp-main-item-list-item.active').classList.remove('active')
            ut.dom('.home-comp-main-item.bad .home-comp-main-item-list-item', false)[idx].classList.add('active')
        }
    })
    return (
        <>
            <div className="home-comp-main-prog-line" style={{'--PI': Math.PI}}>
                {props.plateLine}
            </div>
            {/* <style jsx="true">{`
                .home-comp-main-prog-line {
                    z-index: 1;
                    position: absolute;
                    inset: 0rem;
                    --arcL: calc(2 * var(--PI) * 315);
                    --prog: 0;
                    --arcOffset: calc(var(--arcL) * (-1 * (var(--prog) - 100) / 100));
                    transform: rotate(-90deg);
                }
            `}
            </style> */}
        </>

    )
}
export default HomeCompareLine;



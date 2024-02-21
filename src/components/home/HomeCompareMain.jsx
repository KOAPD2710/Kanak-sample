import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react';

function HomeCompareMain({ ...props }) {
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-comp',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                markers: true,
                snap: [0, .25, .5, .75],
                onUpdate: (self) => {
                    let prog = self.progress;
                    let idx;
                    if (prog >= .75) {idx = 3
                    } else if (prog >= .5) {idx = 2
                    } else if (prog >= .25) {idx = 1
                    } else {idx = 0}
                }
            }
        })
        tl
        .to('.home-comp-main-prog-line', {'--prog': 100, duration: 1, ease: 'linear'})
    })
    console.log(props)
    return (
        <>
            <div className="home-comp-main-prog-line" style={{'--PI': Math.PI}}>
                {props.plateLine}
            </div>
            <style jsx="true" global="true">{`
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
            </style>
        </>

    )
}
export default HomeCompareMain;



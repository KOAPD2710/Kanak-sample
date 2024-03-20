import './Gallery.scss'
import { useEffect, useRef } from 'react';
import { timeline, scroll } from "motion";
import useSelector from '@hooks/useSelector';

function KareerGallery(props) {
    const ref = useRef();
    const q = useSelector(ref);
    useEffect(() => {
        const sequenceDesktop = [
            [q('.kareer-gall-content-inner'), { width: ['0%', '100%'], height: [window.innerWidth > 991 ? '11rem' : window.innerWidth > 767 ? '7.2rem' : '3.96rem', '100%'] }, {duration: 1,  easing: 'linear', at: 0  }],
            [q('.kareer-gall-content-inner img'), { scale: [2, 1] }, {duration: 1, easing: 'linear', at: 0 }],
            [q('.kareer-gall-content-inner .kareer-gall-title-left'), { marginRight: window.innerWidth > 991 ? ['1.2rem', '2.4rem'] : ['.6rem', '1.2rem']}, {duration: 1,  easing: 'linear', at: 0  }],
            [q('.kareer-gall-content-inner .kareer-gall-title-right'), { marginLeft: window.innerWidth > 991 ? ['1.2rem', '2.4rem'] : ['.6rem', '1.2rem'] }, {duration: 1,  easing: 'linear', at: 0  }]
        ]
        scroll(timeline(sequenceDesktop), { 
            target: document.querySelector('.kareer-gall'), 
            offset: window.innerWidth > 767 ? ["65vh start", "end end"] : ["75vh start", "end end"] 
        })
    }, []);
    return (
        <section className="kareer-gall" ref={ref}>
            <div className="kareer-gall-stick bg-dark">
                <div className="kareer-gall-content-wrap">
                    <div className="kareer-gall-content-inner">
                        <div className="heading h0 txt-up txt-black kareer-gall-title kareer-gall-title-top">
                            We are making
                        </div>
                        <div className="heading h0 txt-up txt-black kareer-gall-title kareer-gall-title-left">
                            <span className="txt-green">Good</span>
                        </div>
                        <div className="heading h0 txt-up txt-black kareer-gall-title kareer-gall-title-right">
                            <span className="txt-green">Things</span>
                        </div>
                        <div className="heading h0 txt-up txt-black kareer-gall-title kareer-gall-title-bot">
                            together
                        </div>
                        <div className="kareer-gall-content-img">
                            {props.gallBg}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default KareerGallery
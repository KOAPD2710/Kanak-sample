import './Gallery.scss'
import { useEffect, useRef } from 'react';
import useDevice from '@hooks/useDevice';
import { timeline, scroll } from "motion";
import useSelector from '@hooks/useSelector';

function KareerGallery(props) {
    const { isDesktop, isTablet, isMobile } = useDevice();
    const ref = useRef(null);
    const q = useSelector(ref);
    useEffect(() => {
        const sequenceDesktop = [
            [q('.kareer-gall-content-inner'), { width: ['0%', '100%'], height: [`${isDesktop ? 11 : isTablet ? 7.2 : 39.6}rem`, `${isDesktop ? "100%" : isTablet ? "80rem" : "60rem"}`] }, { easing: 'linear', at: 0  }],
            [q('.kareer-gall-content-inner img'), { scale: [1.2, 1] }, { easing: 'linear', at: 0  }],
            [q('.kareer-gall-content-inner .kareer-gall-title-left'), { marginRight: [1.2, 2.4] }, { easing: 'linear', at: 0  }],
            [q('.kareer-gall-content-inner .kareer-gall-title-right'), { marginLeft: [1.2, 2.4] }, { easing: 'linear', at: 0  }],
        ]
        const sequenceTablet = [
            ...sequenceDesktop,
            [q('.kareer-gall-content-img'), { height: ['30%', '100%'] }, { easing: 'linear', at: 0 }],
            [q('.kareer-gall-content-inner .kareer-gall-title-top'), { transform: ["translate(-50%, 0)", "translate(-50%, 100%)"] }, { easing: 'linear', at: 0  }],
            [q('.kareer-gall-content-inner .kareer-gall-title-bot'), { transform: ["translate(-50%, 0)", "translate(-50%, -100%)"] }, { easing: 'linear', at: 0  }],
        ]
        const sequenceMobile = [
            ...sequenceDesktop,
            [q('.kareer-gall-content-img'), { height: ['0%', '100%'] }, { easing: 'linear', at: 0 }],
            [q('.kareer-gall-content-inner .kareer-gall-title-top'), { bottom: ["calc((100dvh - 38.5rem) / 2)", "100%"], transform: ["translate(-50%, 0)", "translate(-50%, 100%)"] }, { easing: 'linear', at: 0  }],
            [q('.kareer-gall-content-inner .kareer-gall-title-bot'), { top: ["calc((100dvh - 38.5rem) / 2)", "100%"], transform: ["translate(-50%, 0)", "translate(-50%, -100%)"] }, { easing: 'linear', at: 0  }],
        ]

        if (isDesktop) {
            scroll(timeline(sequenceDesktop), { target: ref.current, offset: ["65vh start", "end end"] })
        }
        else if (isTablet) {
            scroll(timeline(sequenceTablet), { target: ref.current, offset: ["65vh start", "end end"] })
        }
        else if (isMobile) {
            scroll(timeline(sequenceMobile), { target: ref.current, offset: ["65vh start", "end end"] })
        }
    }, [isDesktop, isTablet, isMobile]);
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
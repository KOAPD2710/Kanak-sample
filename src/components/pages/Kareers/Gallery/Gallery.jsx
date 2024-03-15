import './Gallery.scss'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react'
import useDevice from '@/components/hooks/useDevice';

function KareerGallery(props) {
    const { isDesktop, isTablet, isMobile } = useDevice();
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.kareer-gall',
                start: 'top top-=55%',
                end: 'bottom bottom',
                scrub: true
            }
        })
        tl
            .from('.kareer-gall-content-inner', { width: '0%', height: `${isDesktop ? 11 : isTablet ? 7.2 : 39.6}rem`, ease: 'none' })
            .from('.kareer-gall-content-inner img', { scale: '1.2', ease: 'none' }, 0)
            .to('.kareer-gall-content-inner .kareer-gall-title-left', {marginRight: '2.4rem', ease: 'none'}, 0)
            .to('.kareer-gall-content-inner .kareer-gall-title-right', {marginLeft: '2.4rem', ease: 'none'}, 0)

        isTablet && (
            tl
                .from('.kareer-gall-content-img', { height: '30%', ease: 'none' }, 0)
                .to('.kareer-gall-content-inner .kareer-gall-title-top', { yPercent: 100, ease: 'none'}, 0)
                .to('.kareer-gall-content-inner .kareer-gall-title-bot', { yPercent: -100, ease: 'none'}, 0)
        )
        isMobile && (
            tl
            .from('.kareer-gall-content-img', { height: '0%', ease: 'none' }, 0)
            .to('.kareer-gall-content-inner .kareer-gall-title-top', { bottom: "100%", yPercent: 100, ease: 'none'}, 0)
            .to('.kareer-gall-content-inner .kareer-gall-title-bot', { top: "100%", yPercent: -100, ease: 'none'}, 0)
        )
    }, { dependencies: [isDesktop, isTablet, isMobile] })
    return (
        <section className="kareer-gall">
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
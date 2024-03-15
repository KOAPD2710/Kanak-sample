import './Gallery.scss'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react'

function KareerGallery({...props}) {
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.timeline({
            scrollTrigger: {
                trigger: '.kareer-gall',
                start: 'top top-=55%',
                end: 'bottom bottom',
                scrub: true
            }
        })
        .from('.kareer-gall-content-inner', {width: '0%', height: '11rem', ease: 'none'})
        .from('.kareer-gall-content-inner img', {scale: '1.2', ease: 'none'}, 0)
        .from('.kareer-gall-title kareer-gall-title-left', {marginRight: '2.4rem', ease: 'none'}, 0)
        .from('.kareer-gall-title kareer-gall-title-right', {marginLeft: '2.4rem', ease: 'none'}, 0)
    })
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
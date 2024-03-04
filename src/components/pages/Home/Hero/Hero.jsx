import useDevice from '@/components/hooks/useDevice';
import './Hero.scss'

function HomeHero(props) {
    const { isMobile } = useDevice();
    return (
        <>
            <section className="home-hero">
                <div className="container grid">
                    <h1 className="heading h0 txt-black txt-up home-hero-title">
                        {props.title}
                    </h1>
                    <div className="grid home-hero-sub">
                        <div className="home-hero-sub-top">
                            <p className="txt txt-16 txt-med">
                                {props.sub_title}
                            </p>
                        </div>
                        <div className="home-hero-sub-btn-wrap">
                            <a href="./" className="btn btn-main">
                                <div className="txt txt-18 txt-med">Kontact us</div>
                            </a>
                        </div>
                        <div className="home-hero-sub-cta-wrap">
                            <div className="txt txt-18 txt-med">Scroll {isMobile ? 'Down' : 'to Explore'}</div>
                        </div>
                    </div>
                    <div className='home-hero-badge-wrap'>
                        <div className='home-hero-badge'>
                            <div className='home-hero-badge-inside'>
                                {props.icBadgeInside}
                            </div>
                            <div className='home-hero-badge-outside'>
                                {props.icBadgeOutside}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default HomeHero;
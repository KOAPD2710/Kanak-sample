import './HeroBadge.scss';
function HomeHeroBadge({...props}) {
    return (
        <div className='home-hero-badge-wrap'>
            <a href='#' className='home-hero-badge'>
                <div className='home-hero-badge-inside'>
                    <div className="overlay"></div>
                    {props.icBadgeInside}
                </div>
                <div className='home-hero-badge-outside'>
                    {props.icBadgeOutside}
                </div>
                <div className="home-hero-badge-ic">
                    <div className="ic ic-80 home-hero-badge-ic-inner">
                        {props.icPlay}
                    </div>
                </div>
            </a>
        </div>
    )
}
export default HomeHeroBadge
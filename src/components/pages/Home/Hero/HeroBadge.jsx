import './HeroBadge.scss';
function HomeHeroBadge({...props}) {
    return (
        <div className='home-hero-badge-wrap'>
            <a href='#' className='home-hero-badge'>
                <div className='home-hero-badge-inside'>
                    {props.icBadgeInside}
                </div>
                <div className='home-hero-badge-outside'>
                    {props.icBadgeOutside}
                </div>
            </a>
        </div>
    )
}
export default HomeHeroBadge
import './Badge.scss'
function VideoBadge(props) {
    return (
        <div className='video-badge-wrap'>
            <a href='#' className='video-badge'>
                <div className='video-badge-inside'>
                    <div className="overlay"></div>
                    {props.icBadgeInside}
                </div>
                <div className='video-badge-outside'>
                    {props.icBadgeOutside}
                </div>
                <div className="video-badge-ic">
                    <div className="ic ic-80 video-badge-ic-inner">
                        {props.icPlay}
                    </div>
                </div>
            </a>
        </div>
    )
}
export default VideoBadge
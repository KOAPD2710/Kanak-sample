import './PrembleBadge.scss';
function PrembleBadge({ ...props }) {
    return (
        <div className='kustomer-premble-badge-wrap'>
            <a href='#' className='kustomer-premble-badge'>
                <div className='kustomer-premble-badge-inside'>
                    {props.icBadgeInside}
                </div>
                <div className='kustomer-premble-badge-outside'>
                    {props.icBadgeOutside}
                </div>
            </a>
        </div>
    )
}
export default PrembleBadge
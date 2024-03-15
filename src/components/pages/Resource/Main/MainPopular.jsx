function ResourceMainPopular({ ...props }) {
    return (
        <div className="resource-main-pop">
            <h3 className="heading h4 txt-black txt-up resource-main-pop-title">popular news</h3>
            <div className="line resource-main-pop-line"></div>
            <div className="resource-main-pop-list">
                {props.popList.map((item, idx) => (
                    <div className="resource-main-pop-list-item" key={idx}>
                        <a href='#' className="resource-main-pop-list-item-cate">
                            <div className='ic ic-20'>
                                {props.folderIcon}
                            </div>
                            <div className="txt txt-20 txt-black resource-main-pop-list-item-cate-txt">
                                {item.category}
                            </div>
                        </a>
                        <a href={`./resources/${item.uid}`} className="heading h5 txt-black txt-up resource-main-pop-list-item-title">
                            {item.title}
                        </a>
                        <span className='txt txt-18 txt-med resource-main-pop-list-item-date'>{item.date}</span>
                        <div className="line"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ResourceMainPopular
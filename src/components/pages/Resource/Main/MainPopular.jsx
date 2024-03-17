import { convertDate } from "@utils/text.js"

function ResourceMainPopular(props) {
    return (
        <div className="resource-main-pop">
            <h3 className="heading h4 txt-black txt-up resource-main-pop-title">Popular news</h3>
            <div className="line resource-main-pop-line"></div>
            <div className="resource-main-pop-list">
                {props.data.map((item, idx) => (
                    <a href={`/resources/${item.uid}`} className="resource-main-pop-list-item" key={idx}>
                        <div className="resource-main-pop-list-item-cate">
                            <div className="txt txt-20 txt-bold resource-main-pop-list-item-cate-txt">
                                {item.data.category}
                            </div>
                        </div>
                        <h3 className="heading h5 txt-black txt-up resource-main-pop-list-item-title">
                            {item.data.title}
                        </h3>
                        <span className='txt txt-18 txt-med resource-main-pop-list-item-date'>{convertDate(item.last_publication_date)}</span>
                        <div className="line"></div>
                    </a>
                ))}
            </div>
        </div>
    )
}
export default ResourceMainPopular
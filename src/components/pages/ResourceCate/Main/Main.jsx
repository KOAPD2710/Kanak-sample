import { useEffect, useMemo, useState } from 'react';
import './Main.scss';

function ResourceCateList(props) {
    const allItem = props.list
    const [limit, setLimit] = useState(5);
    return (
        <>
            <div className={`resource-cate-main-grid ${limit >= allItem.length ? 'all-loaded' : ''}`}>
                {allItem.map((item, idx) => (
                    idx < limit ? <>
                        <a href={`/resources/${item.uid}`} className={`resource-cate-main-item ${idx == "0" ? "first-item" : ""}`} key={idx}>
                            <div className="resource-cate-main-item-img">
                                <img
                                    className='img img-fill'
                                    src={item.data.feature_image.url}
                                    alt={item.data.feature_image.alt}
                                    width={item.data.feature_image.dimensions.width}
                                    height={item.data.feature_image.dimensions.height}/>
                            </div>
                            <div className="resource-cate-main-item-content">
                                <div className="txt txt-20 txt-bold resource-cate-main-item-content-cate">{item.data.category}</div>
                                <h4 className="heading h5 txt-black txt-up resource-cate-main-item-content-title">{item.data.title}</h4>
                                <div className="txt txt-18 txt-med resource-cate-main-item-content-des">{item.data.sapo}</div>
                                <span className="txt txt-18 txt-med resource-cate-main-item-content-date">{item.last_publication_date}</span>
                            </div>
                            <div className="line"></div>
                            {(idx > 0 && (idx + 1) % 2 === 0) && (
                                <div className="line line-ver"></div>
                            )}
                        </a>
                        {idx == 0 && (
                            <div className="resource-cate-main-item fake-item" key={"fake-" + idx}></div>
                        )}
                    </> : <></>
                ))}
            </div>
            <div className={`line resource-cate-main-line ${limit >= allItem.length ? 'hidden' : ''}`}></div>
            <div className={`resource-cate-main-load ${limit >= allItem.length ? 'hidden' : ''}`}>
                <button className="resource-cate-main-load-btn" onClick={() => setLimit(limit + 4)}>
                    <div className="resource-cate-main-load-btn-ic">
                        <div className="ic ic-24">
                            {props.icArrowDown}
                        </div>
                    </div>
                    <div className="txt txt-20 txt-med resource-cate-main-load-btn-txt">
                        Load more
                    </div>
                </button>
            </div>
        </>
    )
}

export default ResourceCateList
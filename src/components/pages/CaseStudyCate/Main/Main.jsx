import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import './Main.scss';

function CaseItem({ ...props }) {
    return (
        <a href={`/kase-studies/${props.uid}`} className="case-list-item">
            <p className="txt txt-20 txt-bold case-list-item-label">
                {props.data.category}
            </p>
            <h2 className="heading h3 txt-up txt-black case-list-item-title">
                {props.data.title[0].text}
            </h2>
            <div className="case-list-item-bot">
                <div className="case-list-item-img">
                    <div className="case-list-item-img-inner">
                        <img className='img img-h' src={props.data.images[0].image_item.url} alt='' width={props.data.images[0].image_item.dimensions.width} height={props.data.images[0].image_item.dimensions.height} />
                    </div>
                </div>
                <div className="case-list-item-link">
                    <div className="txt txt-18 txt-bold case-list-item-link-txt">Read more</div>
                    <div className="ic ic-16 case-list-item-link-ic">
                        {props.icArrowExt}
                    </div>
                </div>
            </div>
            <div className="line line-bot"></div>
            <div className="line line-ver"></div>
        </a>
    )
}
function CaseMain({ ...props }) {
    const allItem = props.list.filter((item) => item.data.category == props.currentCate)

    const [itemList, setItemList] = useState(allItem);
    const [limit, setLimit] = useState(4);

    return (
        <section className="case-main">
            <div className="case-filter">
                <div className="container">
                    <div className="line line-bot"></div>
                </div>
            </div>
            <div className="case-list">
                <div className="container">
                    <motion.div layout transition={{ duration: 0.3 }} className={`case-list-inner ${limit >= itemList.length ? 'all-loaded' : ''}`}>
                        {itemList.map((item, idx) => (
                            idx < limit ? <CaseItem key={item.uid} {...item} icArrowExt={props.icArrowExt} /> : ''
                        ))}
                    </motion.div>
                    <div className={`case-list-load ${limit >= itemList.length ? 'hidden' : ''}`}>
                        <button className="case-list-load-btn" onClick={() => setLimit(limit + 4)}>
                            <div className="case-list-load-btn-ic">
                                <div className="ic ic-24">
                                    {props.icArrowDown}
                                </div>
                            </div>
                            <div className="txt txt-20 txt-med case-list-load-btn-txt">
                                Load more
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CaseMain
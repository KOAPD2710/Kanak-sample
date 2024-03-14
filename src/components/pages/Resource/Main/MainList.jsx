import "./Main.scss"
import { useEffect, useMemo, useState } from 'react';

function FilterItem({ ...props }) {
    return (
        <button className={`resource-main-list-head-filter-item ${props.isActive ? 'active' : ''}`} onClick={props.onClick} data-filter={props.name}>
            <div className="txt txt-20 txt-bold resource-main-list-head-filter-item-txt">
                {props.name}
            </div>
            <div className="txt txt-12 txt-medium resource-main-list-head-filter-item-count">
                [{props.count}]
            </div>
            <div className="line"></div>
        </button>
    )
}

function ResourceMainList({ ...props }) {
    const allItem = props.list

    const [filter, setFilter] = useState('All');
    const [itemList, setItemList] = useState(allItem);
    const [limit, setLimit] = useState(4);
    const [categoryToggle, setcategoryToggle] = useState(false)

    let cateList = []

    allItem.map((el, idx) => {
        !cateList.includes(el.category) && cateList.push(el.category)
    })

    const cateUI = useMemo(() => {
        return (
            <>
                {cateList.map((el, idx) => (
                    <FilterItem name={el}
                        count={allItem.filter((item) => item.category == el).length}
                        isActive={filter == el}
                        onClick={(e) => { filterList(e); setcategoryToggle(!categoryToggle) }}
                        key={idx} />
                ))}
            </>
        )
    }, [cateList])
    console.log(props.list);
    return (
        <div className="resource-main-list">
            <div className="resource-main-list-head">
                <h3 className="heading h4 txt-black txt-up resource-main-list-head-title">articles</h3>
                <div className="resource-main-list-head-filter">
                    <button className="resource-main-list-head-filter-toggle" onClick={() => { setcategoryToggle(!categoryToggle) }}>
                        <div className="txt txt-18 txt-bold resource-main-list-head-filter-toggle-txt">
                            {filter == 'All' ? 'All Categories' : filter}
                        </div>
                        <div className={`ic ic-20 resource-main-list-head-filter-toggle-ic ${categoryToggle ? 'open' : ''}`}>
                            {props.icDropdown}
                        </div>
                    </button>
                    <div className={`resource-main-list-head-filter-dropdown ${categoryToggle ? 'active' : ''}`}>
                        <FilterItem name={'All'}
                            count={allItem.length}
                            isActive={filter == 'All'}
                            onClick={(e) => { filterList(e), setcategoryToggle(!categoryToggle) }}
                        />
                        {cateUI}
                    </div>
                </div>
            </div>
            <div className="line"></div>
            <div className="resource-main-list-main">

                {/* <motion.div layout transition={{ duration: 0.3 }} className={`case-list-inner ${layout == 'list' ? 'layout-list' : ''} ${limit >= itemList.length ? 'all-loaded' : ''}`}>
                    {itemList.map((item, idx) => (
                        idx < limit ? <CaseItem key={item.uid} {...item} icArrowExt={props.icArrowExt} /> : ''
                    ))}
                </motion.div> */}
                {allItem.map((item, idx) => (
                    <a href="#" className="resource-main-list-main-item" key={idx}>
                        <div className="resource-main-list-main-item-img">
                            <div className="resource-main-list-main-item-img-inner">
                                {/* <img src={item.image.src} alt={item.image.alt}></img> */}
                                {props.featureImg}
                            </div>
                        </div>
                        <div className="resource-main-list-main-item-content">
                            <div href="#" className="txt txt-20 txt-bold resource-main-list-main-item-cate">
                                {item.category}
                            </div>
                            <h4 href="#" className="heading h5 txt-black txt-up resource-main-list-main-item-title">
                                {item.title}
                            </h4>
                            <p className="txt txt-18 txt-med resource-main-list-main-item-subtitle">
                                {item.content}
                            </p>
                            <span className="txt txt-18 txt-med resource-main-list-main-item-date">{item.date}</span>
                        </div>
                        <div className="line"></div>
                        {allItem.length % idx !== 0 ? (
                            <div className="line line-ver"></div>
                        ) : ""}
                    </a>
                ))}
            </div>
            <div className={`resource-main-list-load ${limit >= itemList.length ? 'hidden' : ''}`}>
                <button className="resource-main-list-load-btn" onClick={() => setLimit(limit + 4)}>
                    <div className="resource-main-list-load-btn-ic">
                        <div className="ic ic-24">
                            {props.icArrowDown}
                        </div>
                    </div>
                    <div className="txt txt-20 txt-med resource-main-list-load-btn-txt">
                        Load more
                    </div>
                </button>
            </div>
        </div>
    )
}
export default ResourceMainList
import "./Main.scss"
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';


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


function ArticleItem({ ...props }) {
    return (
        <a href="#" className="resource-main-list-main-item">
            <div className="resource-main-list-main-item-img">
                <div className="resource-main-list-main-item-img-inner">
                    <img className='img img-fill' src={props.imageUrl} alt="" />
                </div>
            </div>
            <div className="resource-main-list-main-item-content">
                <div href="#" className="txt txt-20 txt-bold resource-main-list-main-item-cate">
                    {props.category}
                </div>
                <h4 href="#" className="heading h5 txt-black txt-up resource-main-list-main-item-title">
                    {props.title}
                </h4>
                <p className="txt txt-18 txt-med resource-main-list-main-item-subtitle">
                    {props.content}
                </p>
                <span className="txt txt-18 txt-med resource-main-list-main-item-date">{props.date}</span>
            </div>
            <div className="line"></div>
            {props.idx % 2 == 0 ? (
                <div className="line line-ver"></div>
            ) : ""}
        </a>
    )
}
function ResourceMainList({ ...props }) {
    const allItem = props.list

    const [filter, setFilter] = useState('All');
    const [itemList, setItemList] = useState(allItem);
    const [limit, setLimit] = useState(6);
    const [categoryToggle, setcategoryToggle] = useState(false)

    const cateList = []

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


    function filterList(e) {
        let type = e.target.dataset.filter;
        setFilter(type)
    }

    useEffect(() => {
        window.location.hash && setFilter(decodeURI(window.location.hash).replace('#', ''))
    }, [])
    useEffect(() => {
        if (filter == 'All') {
            setItemList(allItem)
            history.replaceState({}, '', window.location.pathname)
        } else {
            let filterList = allItem.filter((item) => item.category == filter)
            setItemList(filterList)
            history.replaceState({}, '', window.location.pathname + `#${encodeURI(filter)}`)
        }
    }, [filter])

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
                            {props.icDropDown}
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
                <motion.div layout transition={{ duration: 0.3 }} className={`resource-main-list-main-inner ${limit >= itemList.length ? 'all-loaded' : ''}`}>
                    {itemList.map((item, idx) => (
                        idx < limit ? <ArticleItem key={idx} {...item} idx={idx} icArrowExt={props.icArrowExt} /> : ""
                    ))}
                </motion.div>
                <div className="line"></div>
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
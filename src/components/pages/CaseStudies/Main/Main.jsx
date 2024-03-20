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
function FilterItem({ ...props }) {
    return (
        <button className={`case-filter-item ${props.isActive ? 'active' : ''}`} onClick={props.onClick} data-filter={props.name}>
            <div className="txt txt-20 txt-bold case-filter-item-txt">
                {props.name}
            </div>
            <div className="txt txt-12 txt-medium case-filter-item-count">
                [{props.count}]
            </div>
            <div className="line"></div>
        </button>
    )
}
function CaseMain({ ...props }) {
    const { list: allItem } = props;
    const [layout, setLayout] = useState('grid');
    const [filter, setFilter] = useState('All');
    const [itemList, setItemList] = useState(allItem);
    const [limit, setLimit] = useState(4);
    const [categoryToggle, setCategoryToggle] = useState(false)
    const renderFilter = useMemo(() => {
        return (
            <>
                <FilterItem name={'All'}
                    count={allItem.length}
                    isActive={filter == 'All'}
                    onClick={(e) => { filterList(e), setCategoryToggle(!categoryToggle) }}
                />
                {props.cateList.map((el, idx) => (
                    <FilterItem name={el}
                        count={allItem.filter((item) => item.data.category == el).length}
                        isActive={filter == el}
                        onClick={(e) => { filterList(e); setCategoryToggle(!categoryToggle) }}
                        key={idx} />
                ))}
            </>
        )
    }, [filter])
    const renderCases = useMemo(() => (
        itemList.map((item, idx) => (
            idx < limit ? <CaseItem key={item.uid} {...item} icArrowExt={props.icArrowExt} /> : ''
        ))
    ), [itemList, limit])

    function filterList(e) {
        let type = e.target.dataset.filter;
        setFilter(type)
    }
    useEffect(() => {
        if (filter == 'All') {
            setItemList(allItem)
        } else {
            let filterList = allItem.filter((item) => item.data.category == filter)
            setItemList(filterList)
        }
    }, [filter])

    return (
        <section className="case-main">
            <div className="case-filter">
                <div className="container">
                    <div className="line line-top"></div>
                    <div className="case-filter-inner">
                        <div className="case-filter-list">
                            <button className="case-filter-list-toggle" onClick={() => { setCategoryToggle(!categoryToggle) }}>
                                <div className="txt txt-18 txt-bold case-filter-list-toggle-txt">
                                    {filter == 'All' ? 'All Categories' : filter}
                                </div>
                                <div className={`ic ic-20 case-filter-list-toggle-ic ${categoryToggle ? 'open' : ''}`}>
                                    {props.icDropdown}
                                </div>
                            </button>
                            <div className={`case-filter-list-dropdown ${categoryToggle ? 'active' : ''}`}>
                                {renderFilter}
                            </div>
                        </div>
                        <div className="case-filter-view">
                            <button className={`case-filter-view-item ${layout == 'list' && 'active'}`} onClick={() => setLayout('list')}>
                                <div className="ic ic-16">
                                    {props.icViewList}
                                </div>
                            </button>
                            <button className={`case-filter-view-item ${layout == 'grid' && 'active'}`} onClick={() => setLayout('grid')}>
                                <div className="ic ic-16">
                                    {props.icViewGrid}
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="line line-bot"></div>
                </div>
            </div>
            <div className="case-list">
                <div className="container">
                    <motion.div layout transition={{ duration: 0.3 }} className={`case-list-inner ${layout == 'list' ? 'layout-list' : ''} ${limit >= itemList.length ? 'all-loaded' : ''}`}>
                        {renderCases}
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
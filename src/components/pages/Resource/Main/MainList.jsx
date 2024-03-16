import "./Main.scss"
import { useEffect, useMemo, useState, useRef } from 'react';
import useOutsideAlerter from "@hooks/useOutsideAlerter";
import { convertDate } from "@utils/text.js"

function FilterItem(props) {
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


function ArticleItem({ data, idx }) {
    return (
        <a href={`/resources/${data.uid}`} className="resource-main-list-main-item">
            <div className="resource-main-list-main-item-img">
                <div className="resource-main-list-main-item-img-inner">
                    <img
                        className='img img-fill'
                        src={data.data.feature_image.url}
                        alt={data.data.feature_image.alt}
                        width={data.data.feature_image.dimensions.width}
                        height={data.data.feature_image.dimensions.height}/>
                </div>
            </div>
            <div className="resource-main-list-main-item-content">
                <div href="#" className="txt txt-20 txt-bold resource-main-list-main-item-cate">
                    {data.data.category}
                </div>
                <h4 href="#" className="heading h5 txt-black txt-up resource-main-list-main-item-title">
                    {data.data.title}
                </h4>
                <p className="txt txt-18 txt-med resource-main-list-main-item-subtitle">
                    {data.data.sapo}
                </p>
                <span className="txt txt-18 txt-med resource-main-list-main-item-date">{convertDate(data.last_publication_date)}</span>
            </div>
            <div className="line"></div>
            {idx % 2 == 0 ? (
                <div className="line line-ver"></div>
            ) : ""}
        </a>
    )
}
function ResourceMainList(props) {
    const { data: allItem } = props

    const [filter, setFilter] = useState('All');
    const [itemList, setItemList] = useState(allItem);
    const [limit, setLimit] = useState(6);
    const [categoryToggle, setCategoryToggle] = useState(false)
    const toggleRef = useRef();
    const cateList = []

    useOutsideAlerter(toggleRef, () => { setCategoryToggle(false) })

    allItem.map((el, idx) => {
        !cateList.includes(el.data.category) && cateList.push(el.data.category)
    })

    const renderFilter = useMemo(() => {
        return (
            <>
                <FilterItem name={'All'}
                    count={allItem.length}
                    isActive={filter == 'All'}
                    onClick={(e) => { filterList(e), setCategoryToggle(!categoryToggle) }}
                />
                {cateList.map((el, idx) => (
                    <FilterItem name={el}
                        count={allItem.filter(({ data }) => data.category == el).length}
                        isActive={filter == el}
                        onClick={(e) => { filterList(e); setCategoryToggle(!categoryToggle) }}
                        key={idx} />
                ))}
            </>
        )
    }, [cateList])

    const renderArticles = useMemo(() => (
        itemList.map((data, idx) => (
            (idx < limit) && <ArticleItem key={idx} data={data} idx={idx} />
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
            let filterList = allItem.filter(({ data }) => data.category == filter)
            setItemList(filterList)
        }
    }, [filter])

    return (
        <div className="resource-main-list">
            <div className="resource-main-list-head">
                <h3 className="heading h4 txt-black txt-up resource-main-list-head-title">Articles</h3>
                <div className="resource-main-list-head-filter">
                    <button className="resource-main-list-head-filter-toggle" onClick={() => { setCategoryToggle(!categoryToggle) }} ref={toggleRef}>
                        <div className="txt txt-18 txt-bold resource-main-list-head-filter-toggle-txt">
                            {filter == 'All' ? 'Categories' : filter}
                        </div>
                        <div className={`ic ic-20 resource-main-list-head-filter-toggle-ic ${categoryToggle ? 'open' : ''}`}>
                            {props.icDropDown}
                        </div>
                    </button>
                    <div className={`resource-main-list-head-filter-dropdown ${categoryToggle ? 'active' : ''}`}>
                        {renderFilter}
                    </div>
                </div>
            </div>
            <div className="line"></div>
            <div className="resource-main-list-main">
                <div className={`resource-main-list-main-inner ${limit >= itemList.length ? 'all-loaded' : ''}`}>
                    {renderArticles}
                </div>
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
import { useProductIndex } from "@contexts/StoreGlobal";
import useDebounceCallback from "@hooks/useDebounce";
import { useEffect } from 'react';
function KustomerCatalogList(props) {
    const { index, setIndex } = useProductIndex();
    const debounceHover = useDebounceCallback(setIndex, 200);
    const list = props.list.reduce((acc, curr) => acc.concat(curr.list), []);
    useEffect(() => {
        setIndex(0);
    }, []);
    return (
        <div className="kustomer-cata-main-content-wrap">
            {props.list.map((item, idx) => (
                <div className="kustomer-cata-main-content" key={idx}>
                    <div className="kustomer-cata-main-content-des">
                        <h3 className="heading h4 txt-black txt-up kustomer-cata-main-content-des-title">{item.title}</h3>
                        <p className="txt txt-18 txt-med kustomer-cata-main-content-des-subtitle">{item.subtitle}</p>
                    </div>
                    <div className="kustomer-cata-main-content-list">
                        {item.list.map((el, idx) => (
                            <a
                                key={el.uid}
                                href="#"
                                className={`kustomer-cata-main-content-list-item ${index == (list.findIndex(listItem => listItem.uid == el.uid)) ? "active" : ''}`}
                                onMouseEnter={() => debounceHover(list.findIndex(listItem => listItem.uid == el.uid))}>
                                <h3 className="heading h6 txt-black txt-up kustomer-cata-main-content-list-item-name">
                                    {el.name}
                                </h3>
                                <div className="txt txt-20 txt-bold kustomer-cata-main-content-list-item-count">
                                    {(idx + 1).toString().padStart(2, '0')}
                                </div>
                                <div className="line">
                                    <div className="line-inner"></div>
                                </div>
                                {idx === item.list.length - 1 && (
                                    <div className="line line-bot"></div>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default KustomerCatalogList;
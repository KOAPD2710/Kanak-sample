import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import { useProductIndex } from "@contexts/StoreGlobal";
import useDebounceCallback from "@hooks/useDebounce";
import { useEffect } from 'react';
import { formatData } from "@/components/utils/text";
function KustomerCatalogList(props) {
    const { index, setIndex } = useProductIndex();
    const debounceHover = useDebounceCallback(setIndex, 200);

    const itemGroup1 = props.grp1.list.map(({ item }) => props.list.filter(el => el.uid === item.uid)[0]);
    const itemGroup2 = props.grp2.list.map(({ item }) => props.list.filter(el => el.uid === item.uid)[0]);

    useEffect(() => {
        setIndex(0);

        const allItem = document.querySelectorAll('.kustomer-cata-main-content')
        allItem.forEach((el) => {
            const title = new SplitType(el.querySelector('.kustomer-cata-main-content-des-title'), { types: "lines, words", lineClass: 'split-line' })
            const subtitle = new SplitType(el.querySelector('.kustomer-cata-main-content-des-subtitle'), { types: "lines, words", lineClass: 'split-line' })

            animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(subtitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

            const sequence = [
                [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.015), at: 0 }],
                [subtitle.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.008), at: .15 }],
            ]
            const delayItem = .1
            const splitArray = []
            el.querySelectorAll('.kustomer-cata-main-content-list-item').forEach((listItem, idx) => {
                animate(listItem.querySelector('.line'), { transformOrigin: 'left', scaleX: 0 }, { duration: 0 })

                const title = new SplitType(listItem.querySelector('.kustomer-cata-main-content-list-item-name'), { types: "lines, words", lineClass: 'split-line' })
                animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
                animate(listItem.querySelector('.kustomer-cata-main-content-list-item-count'), { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

                sequence.push(
                    [listItem.querySelector('.line'), { scaleX: 1 }, { duration: .8, at: .3 + delayItem * idx }],
                    [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.015), at: "<" }],
                    [listItem.querySelector('.kustomer-cata-main-content-list-item-count'), { opacity: .4, transform: "none" }, { duration: .6, at: .5 + delayItem * idx }],
                )
                if (idx == el.querySelectorAll('.kustomer-cata-main-content-list-item').length - 1) {
                    animate(listItem.querySelector('.line-bot'), { transformOrigin: 'left', scaleX: 0 }, { duration: 0 })
                    sequence.push(
                        [listItem.querySelector('.line-bot'), { scaleX: 1 }, { duration: .8, at: "<" }],
                    )
                }
                splitArray.push(title)
            })

            inView(el, () => {
                timeline(sequence).finished.then(() => {
                    title.revert()
                    subtitle.revert()
                    splitArray.forEach(item => item.revert())
                    el.querySelectorAll('.line').forEach(item => item.removeAttribute('style'))
                    el.querySelector('.line-bot').removeAttribute('style')
                })
            }, { margin: "-10% 0px -10% 0px" })
        })
    }, []);
    return (
        <div className="kustomer-cata-main-content-wrap">
            {props.grp1 && (
                <div className="kustomer-cata-main-content">
                    <div className="kustomer-cata-main-content-des">
                        <h3 className="heading h4 txt-black txt-up kustomer-cata-main-content-des-title">{props.grp1.title[0].text.replace('/n', '<br/>')}</h3>
                        <p className="txt txt-18 txt-med kustomer-cata-main-content-des-subtitle">{props.grp1.sub}</p>
                    </div>
                    <div className="kustomer-cata-main-content-list">
                        {itemGroup1.map((item, idx) => (
                            <a
                                key={item.uid}
                                href={`/katalog?cate=${formatData(item.data.name)}`}
                                className={`kustomer-cata-main-content-list-item ${index == (props.list.findIndex(listItem => listItem.uid == item.uid)) ? "active" : ''}`}
                                onMouseEnter={() => debounceHover(props.list.findIndex(listItem => listItem.uid == item.uid))}>
                                <h3 className="heading h6 txt-black txt-up kustomer-cata-main-content-list-item-name">
                                    {item.data.name}
                                </h3>
                                <div className="txt txt-20 txt-bold kustomer-cata-main-content-list-item-count">
                                    {(idx + 1).toString().padStart(2, '0')}
                                </div>
                                <div className="line">
                                    <div className="line-inner"></div>
                                </div>
                                {idx === itemGroup1.length - 1 && (
                                    <div className="line-bot"></div>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            )}
            {props.grp2 && (
                <div className="kustomer-cata-main-content">
                    <div className="kustomer-cata-main-content-des">
                        <h3 className="heading h4 txt-black txt-up kustomer-cata-main-content-des-title">{props.grp2.title[0].text.replace('/n', '<br/>')}</h3>
                        <p className="txt txt-18 txt-med kustomer-cata-main-content-des-subtitle">{props.grp2.sub}</p>
                    </div>
                    <div className="kustomer-cata-main-content-list">
                        {itemGroup2.map((item, idx) => (
                            <a
                                key={item.uid}
                                href={`/katalog?cate=${formatData(item.data.name)}`}
                                className={`kustomer-cata-main-content-list-item ${index == (props.list.findIndex(listItem => listItem.uid == item.uid)) ? "active" : ''}`}
                                onMouseEnter={() => debounceHover(props.list.findIndex(listItem => listItem.uid == item.uid))}>
                                <h3 className="heading h6 txt-black txt-up kustomer-cata-main-content-list-item-name">
                                    {item.data.name}
                                </h3>
                                <div className="txt txt-20 txt-bold kustomer-cata-main-content-list-item-count">
                                    {(idx + 1).toString().padStart(2, '0')}
                                </div>
                                <div className="line">
                                    <div className="line-inner"></div>
                                </div>
                                {idx === itemGroup2.length - 1 && (
                                    <div className="line-bot"></div>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
export default KustomerCatalogList;
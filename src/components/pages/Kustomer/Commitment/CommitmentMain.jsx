import { useEffect, useState } from "react"
function CommitItem({ title, describle, ...props }) {
    return (
        <div className="kustomer-commit-main-item" {...props} >
            <h3 className="heading h4 txt-black txt-up kustomer-commit-main-item-title">{title}</h3>
            <p className="txt txt-18 txt-med kustomer-commit-main-item-des">{describle}</p>
            <div className="kustomer-commit-main-item-bg"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
    )
}

function KustomerCommitMain({ ...props }) {
    const allItem = props.listItem
    const thumbList = allItem.map(item => ({ tag: item.tag, thumb: item.thumb }));

    const [activeIc, setActiveIc] = useState('')

    useEffect(() => {
        console.log(activeIc);
    }, [activeIc])

    return (
        <div className="kustomer-commit-main">
            <div className="kustomer-commit-main-wrapper">
                {allItem.map((item, idx) =>
                    <CommitItem
                        title={item.title}
                        describle={item.describle}
                        key={idx}
                        onMouseEnter={() => { setActiveIc(item.tag) }}
                        onMouseLeave={() => { setActiveIc('') }}
                    />
                )}
            </div>
            <div className="kustomer-commit-main-thumb">
                <div className="kustomer-commit-main-thumb-wrapper">
                    {thumbList.map((thumb, thumbIdx) => (
                        <div className={`kustomer-commit-main-thumb-item ${activeIc == thumb.tag ? 'active' : ''}`} key={thumbIdx}>
                            <img src={thumb.thumb.src} alt="" className="img" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default KustomerCommitMain

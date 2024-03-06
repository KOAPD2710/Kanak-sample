import './Main.scss';
import caseDtlThumb from '@assets/casedtl-img.jpg';

function CaseMain({...props}) {
    return (
        <section className="case-main">
            <div className="case-filter">
                <div className="container">
                    <div className="line line-top"></div>
                    <div className="case-filter-inner">
                        <div className="case-filter-list">
                            <button className="case-filter-list-toggle">
                                <div className="txt txt-18 txt-bold case-filter-list-toggle-txt">
                                    Category
                                </div>
                                <div className="case-filter-list-toggle-ic">
                                    {props.icDropdown}
                                </div>
                            </button>
                            <div className="case-filter-list-dropdown">
                                <button className="case-filter-item active">
                                    <div className="txt txt-20 txt-bold case-filter-item-txt">
                                        All
                                    </div>
                                    <div className="txt txt-12 txt-medium case-filter-item-count">
                                        [39]
                                    </div>
                                </button>
                                <button className="case-filter-item">
                                    <div className="txt txt-20 txt-bold case-filter-item-txt">
                                        Retail
                                    </div>
                                    <div className="txt txt-12 txt-medium case-filter-item-count">
                                        [12]
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="case-filter-view">
                            <button className="case-filter-view-item active">
                                <div className="ic ic-16">
                                    {props.icViewList}
                                </div>
                            </button>
                            <button className="case-filter-view-item">
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
                    <div className="case-list-inner layout-list">
                        <a href="#" className="case-list-item">
                            <p className="txt txt-20 txt-bold case-list-item-label">
                                Food Service
                            </p>
                            <h2 className="heading h3 txt-up txt-black case-list-item-title">
                                How Kanak's Packaging Solutions Transformed a Local Restaurant Chain
                            </h2>
                            <div className="case-list-item-bot">
                                <div className="case-list-item-img">
                                    <div className="case-list-item-img-inner">
                                        <img className='img img-h' src={caseDtlThumb.src} alt=''/>
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
                        <a href="#" className="case-list-item">
                            <p className="txt txt-20 txt-bold case-list-item-label">
                                Food Service
                            </p>
                            <h2 className="heading h3 txt-up txt-black case-list-item-title">
                                A Look at How Kanak Revolutionized Packaging for Green Cafés
                            </h2>
                            <div className="case-list-item-bot">
                                <div className="case-list-item-img">
                                    <div className="case-list-item-img-inner">
                                        <img className='img img-h' src={caseDtlThumb.src} alt=''/>
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
                        <a href="#" className="case-list-item">
                            <p className="txt txt-20 txt-bold case-list-item-label">
                                Food Service
                            </p>
                            <h2 className="heading h3 txt-up txt-black case-list-item-title">
                                Kanak's Role in Elevating Packaging for a Gourmet Delivery Service
                            </h2>
                            <div className="case-list-item-bot">
                                <div className="case-list-item-img">
                                    <div className="case-list-item-img-inner">
                                        <img className='img img-h' src={caseDtlThumb.src} alt=''/>
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
                        <a href="#" className="case-list-item">
                            <p className="txt txt-20 txt-bold case-list-item-label">
                                Food Service
                            </p>
                            <h2 className="heading h3 txt-up txt-black case-list-item-title">
                                Crafting Eco-Conscious Packaging for Craft Beer Pubs
                            </h2>
                            <div className="case-list-item-bot">
                                <div className="case-list-item-img">
                                    <div className="case-list-item-img-inner">
                                        <img className='img img-h' src={caseDtlThumb.src} alt=''/>
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
                    </div>
                    <div className="case-list-load">
                        <button className="case-list-load-btn">
                            <div className="case-list-load-btn-ic">
                                {props.icArrowDown}
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
import './Procedure.scss'
import ArrowUpRight from "@components/globals/IcArrow/ArrowUpRight"

function ComplianceProcedure({ ...props }) {
    return (
        <section className='complian-proce'>
            <div className="line complian-proce-line"></div>
            <div className="container grid">
                <div className="heading h4 txt-black txt-up complian-proce-label">Excellence is Non-Negotiable</div>
                <h1 className="heading h0 txt-black txt-up complian-proce-title">Rigorous Testing Procedures </h1>
                <div className="complian-proce-sub-wrap">
                    <p className="txt txt-18 txt-med complian-proce-sub">Kanak's quality control team champions a thorough testing process that ensures each product we offer stands up to even the most challenging situations.</p>
                    <a href="/contact" className='txt txt-18 txt-bold complian-proce-link' data-cursor="txtLink" >
                        <div className="complian-proce-link-txt">Request a quote</div>
                        <div className="ic ic-16"><ArrowUpRight /></div>
                    </a>
                </div>
                <div className="complian-proce-main">
                    {/* <div className="complian-proce-main-inner"></div> */}
                    {[...Array(5)].map((el, idx) => (
                        <div className="complian-proce-main-item bg-light" key={idx} style={
                            {
                                '--idx': idx + 1,
                                '--pd-bot': 5 - idx - 1,
                                '--mg-top': idx == 0 ? 0 : 5 - idx
                            }
                        }>
                            <div className="complian-proce-main-item-inner">
                                <div className="line line-top"></div>
                                <div className="complian-proce-main-item-content">
                                    <div className="complian-proce-main-item-title">
                                        <div className="complian-proce-main-item-title-dot"></div>
                                        <h3 className="heading h1 txt-up txt-black complian-proce-main-item-title-txt">
                                            {/* {item.title} */}
                                            Seal Like a Pro Seal Like a Pro Seal Like a Pro
                                        </h3>
                                    </div>
                                    <p className="txt txt-20 txt-med complian-proce-main-item-sub">
                                        {/* {item.sub} */}
                                        No one likes a mess, especially when it comes to food delivery post-COVID. Our sealing and de-lidding tests are about as meticulous as they come. We test a variety of sealing films under diverse conditions—hot, cold, frozen, you name it—to guarantee the integrity of the seal through all stages, from oven to table.
                                    </p>
                                </div>
                                <div className="complian-proce-main-item-img">
                                    <div className="ic ic-120"><ArrowUpRight /></div>
                                    {/* <img src={item.image.url} alt={item.image.alt} width={item.image.dimensions.width} height={item.image.dimensions.height} className='img img-h' /> */}
                                </div>
                                {idx == 4 && (<div className="line line-bot"></div>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ComplianceProcedure
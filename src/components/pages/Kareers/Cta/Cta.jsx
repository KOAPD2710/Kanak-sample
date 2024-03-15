import './CTA.scss'

function KareersCta({...props}) {
    return (
        <section className="kareer-cta">
            <div className="container grid">
                <h2 className="heading h0 txt-up txt-black kareer-cta-title">
                    Discover Hip Openings Tailored for You
                </h2>
                <div className="kareer-cta-sub-wrap">
                    <p className="txt txt-20 txt-med kareer-cta-sub">
                        We are dedicated to fostering a dynamic and inclusive workplace where talent thrives, ideas flourish, and careers are built. If you are passionate about kanak and are seeking a rewarding and challenging career, consider becoming a part of our vibrant team.
                    </p>
                    <div className="kareer-cta-btn-wrap">
                        <a href="#" className="btn btn-lg">
                            <div className="txt txt-18 txt-up txt-med">
                                Views open positions
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default KareersCta
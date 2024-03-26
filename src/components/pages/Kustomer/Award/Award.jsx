import "./Award.scss"

function KustomerAward({ ...props }) {
    return (
        <section className="kustomer-award">
            <div className="container grid">
                <div className="kustomer-award-product">
                    <div className="kustomer-award-product-inner"></div>
                    <div className="kustomer-award-product-img">
                        {props.imgPlate}
                    </div>
                    <div className="kustomer-award-product-qr">
                        <div className="kustomer-award-product-qr-wrap">
                            {props.imgQr}
                        </div>
                    </div>
                </div>
                <div className="kustomer-award-content">
                    <div className="kustomer-award-content-img">
                        {props.imgAward}
                    </div>
                    <div className="heading h4 txt-black txt-up kustomer-award-content-label">
                        Award-Winning Excellence
                    </div>
                    <h1 className="heading h0 txt-black txt-up kustomer-award-content-title">
                        PLMA 2022 <span className="txt-green">Best Plate Award</span>
                    </h1>
                    <div className="txt txt-20 txt-med kustomer-award-content-des">
                        <p>Our Sustainables® 9” Octi-Square Plate has clinched the PLMA 2022 Best Plate Award in the Home & Household category standing out among thousands with its innovative, eco-friendly design.</p>
                        <p>Quality Confirmed by Experts and Consumers Judged for innovation, design, and value, our plate received top marks from industry experts and consumer panels, reaffirming our dedication to meeting the needs of eco-conscious customers.</p>
                    </div>
                    <div className="kustomer-award-content-btn">
                        <button className="btn kustomer-award-content-btn-inner">
                            <div className="txt txt-20 txt-med txt-up">VIEW ALL PLATES & PLATTERS</div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default KustomerAward
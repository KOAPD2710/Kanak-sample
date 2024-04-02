import "./Hero.scss"

function KustomerHero({ ...props }) {
    return (
        <section className="kustomer-hero bg-white">
            <div className="container grid">
                <div className="heading h6 txt-black txt-up kustomer-hero-subtitle">{props.label}</div>
                <h1 className="heading h0 txt-black txt-up kustomer-hero-title">{props.title}</h1>
                {/* <h1 className="heading h0 txt-black txt-up kustomer-hero-title">Sustainably Crafted, Retail Ready</h1> */}
            </div>
            <div className="kustomer-hero-img">
                <div className="kustomer-hero-img-middle">
                    {props.MiddleImg}
                </div>
                <div className="kustomer-hero-img-left">
                    {props.LeftImg}
                </div>
                <div className="kustomer-hero-img-right">
                    {props.RightImg}
                </div>
            </div>
        </section>
    )
}

export default KustomerHero
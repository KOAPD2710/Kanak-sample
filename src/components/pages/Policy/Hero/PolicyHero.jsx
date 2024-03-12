import './PolicyHero.scss'

function Hero({...props}) {
    return (
        <section className="policy-hero">
            <div className="container grid">
                <h1 className='heading h0 txt-black txt-up policy-hero-title'>{props.title}</h1>
            </div>
        </section>
    )
}

export default Hero
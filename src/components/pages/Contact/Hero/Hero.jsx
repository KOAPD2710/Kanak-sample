import './Hero.scss'

function ContactHero(props) {
    return (
        <>
            <section className="contact-hero">
                <div className="container grid">
                    <h1 className='heading h0 txt-black txt-up contact-hero-title'>{props.title}</h1>
                </div>
            </section>
            <section className="contact-info">
                <div className="container">
                    <div className='contact-info-list grid'>
                        {props.info_list.map((item,idx) => (
                            <div className="contact-info-item" key={idx}>
                                <div className="txt txt-18 txt-med">{item.label}</div>
                                {item.link.url ? (
                                    <a href={item.link.url} target={item.link.target} className="txt txt-20 txt-black txt-up txt-link">{item.content}</a>
                                ) : (
                                    <div className="txt txt-20 txt-black txt-up">{item.content}</div>
                                )}
                                
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactHero
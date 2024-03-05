import './Hero.scss'

function ContactHero() {
    return (
        <>
            <section className="contact-hero">
                <div className="container grid">
                    <h1 className='heading h0 txt-black txt-up contact-hero-title'>Let's build something amazing together!</h1>
                    </div>
            </section>
            <section className="contact-info">
                <div className="container grid">
                    <div className="line"></div>
                    <div className="contact-info-headquarters">
                        <p className="txt txt-18 txt-med">Headquarters</p>
                        <p className="txt txt-20 txt-black txt-up">321 Hovan Drive, Fort Wayne, IN 46825, US</p>
                    </div>
                    <div className="contact-info-getintouch">
                        <p className="txt txt-18 txt-med">Get in touch</p>
                        <p className="txt txt-20 txt-black txt-up">info@kanaknaturals.com</p>
                    </div>
                    <div className="contact-info-contact">
                        <p className="txt txt-18 txt-med">Contact</p>
                        <p className="txt txt-20 txt-black txt-up">+1 (260) 490 4790</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactHero
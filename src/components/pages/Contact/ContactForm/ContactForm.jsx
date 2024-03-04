import './ContactForm.scss'


function ContactForm({...data}) {
    return (
        <>
            <section title='contact-form'>
                <div className="line"></div>
                <div className="container grid">
                    <div className="contact-form-ic-wrapper">
                        <img src="../../../src/assets/contact-form-avatar.svg" alt="avatar" className="contact-form-ic active"/>
                        <img src="../../../src/assets/contact-form-email.svg" alt="email" className="contact-form-ic active"/>
                        <img src="../../../src/assets/contact-form-succ.svg" alt="succ" className="contact-form-ic active"/>
                    </div>
                    <div className="contact-form-main">
                        <div className="line line-hor"></div>
                        <form id="submit-form" action=""> 
                            <div className="txt-up contact-form-quote">
                                <h3 className="heading h3 txt-black contact-form-quote-title">Request a quote</h3>
                                <p className="txt txt-20 txt-black contact-form-quote-subtitle">By filling out the form below</p>
                                <div className="line"></div>
                            </div>
                            <div className="contact-form-input">
                                <div className="heading h5 txt-black txt-up contact-form-input-field-group firstname active">
                                    <input type="text" className="heading h5 txt-black txt-up" placeholder=" " required name="firstname"/>
                                    <label htmlFor="firstname">First name</label>
                                    <div className="line"></div>
                                </div>
                                <div className="heading h5 txt-black txt-up contact-form-input-field-group lastname">
                                    <input type="text" className="heading h5 txt-black txt-up" placeholder=" " required name="lastname"/>
                                    <label htmlFor="lastname">Last name</label>
                                    <div className="line"></div>
                                    <div className="line line-hor"></div>
                                </div>
                                <div className="heading h5 txt-black txt-up contact-form-input-field-group">
                                    <input type="email" className="heading h5 txt-black txt-up" placeholder=" " required name="email"/>
                                    <label htmlFor="email">Email Address</label>
                                    <div className="line"></div>
                                </div>
                                <div className="heading h5 txt-black txt-up contact-form-input-field-group">
                                    <input type="tel" className="heading h5 txt-black txt-up" placeholder=" " required name="phone"/>
                                    <label htmlFor="phone">Phone number</label>
                                    <div className="line"></div>
                                </div>
                                <div className="heading h5 txt-black txt-up contact-form-input-field-group">
                                    <input type="text" className="heading h5 txt-black txt-up" placeholder=" " required name="company"/>
                                    <label htmlFor="company">Company</label>
                                    <div className="line"></div>
                                </div>
                                <div className="heading h5 txt-black txt-up contact-form-input-field-group industry">
                                    <a href='#' className="contact-form-input-field-group-industry">
                                        <p className='contact-form-input-field-group-industry-txt'></p>
                                        <div className='contact-form-input-field-group-industry-ic'>
                                            <svg width="100%" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.35 0.316681L10 7.95001L17.65 0.316681L20 2.66668L10 12.6667L0 2.66668L2.35 0.316681Z" fill="currentColor"/>
                                            </svg>
                                        </div>
                                    </a>
                                    <label htmlFor="industry">Industry</label>
                                    <div className="line"></div>
                                </div>
                                <div className="contact-form-input-field-group-dropdown">
                                    <div className='heading h5 txt-black txt-up contact-form-input-field-group-dropdown-wrap'>
                                        <a href="#">Retails</a>
                                        <a href="#">Food service</a>
                                        <a href="#">Food processors </a>
                                        <a href="#">Education</a>
                                        <a href="#">Medical</a>
                                    </div>
                                </div>
                                <div className="heading h5 txt-black txt-up contact-form-input-field-group note">
                                    <textarea name="note" className="heading h5 txt-black txt-up" placeholder=" " cols="30" rows="6"></textarea>
                                    <label htmlFor="note">How can we help you?</label>
                                    <div className="line"></div>
                                </div>
                                <div className="heading h5 txt-black txt-up contact-form-input-field-group captcha">
                                </div>
                                <div className="heading h5 txt-black txt-up contact-form-input-field-group submit">
                                    <a href="#" data-btn="submit" className='contact-form-input-field-group-btn'>
                                        <p>Submit</p>
                                        <svg width="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.14468 4H6.14468V8H8.14468H21.1717L4.58594 24.5858L7.41436 27.4142L24.0006 10.828V23.8542V25.8542H28.0006V23.8542V6V4H26.0006H8.14468Z" fill="currentColor"/>
                                        </svg>
                                    </a>
                                    <div className="line line-hor"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="line"></div>
            </section>
        </>
    )
}

export default ContactForm;
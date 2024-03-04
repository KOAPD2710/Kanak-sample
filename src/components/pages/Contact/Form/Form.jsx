import './Form.scss';
import React, { useState } from 'react';

function ContactForm(props) {

    const [dropdown, setDropdown] = useState(false)
    
    const FieldForm = ({name, label, type, required = false, className}) => {
        return (
            <>
                <div className={`heading h5 txt-black txt-up contact-form-input-field-group ${className}`}>
                    {type === 'textarea' ? (
                        <textarea
                            name={name}
                            className="heading h5 txt-black txt-up"
                            placeholder=" "
                            cols="30"
                            rows="6"
                            required={required}
                        ></textarea>
                    ) : type === 'option' ? (
                        <>
                            <a href='#' className="contact-form-input-field-group-industry">
                                <p className='contact-form-input-field-group-industry-txt'></p>
                                <div className='contact-form-input-field-group-industry-ic'>
                                    <svg width="100%" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.35 0.316681L10 7.95001L17.65 0.316681L20 2.66668L10 12.6667L0 2.66668L2.35 0.316681Z" fill="currentColor"/>
                                    </svg>
                                </div>
                            </a>
                            <div className={`contact-form-input-field-group-dropdown ${dropdown? 'active' : 'inactive'} `}>
                                <div className='heading h5 txt-black txt-up contact-form-input-field-group-dropdown-wrap'>
                                    <a href="#">Retails</a>
                                    <a href="#">Food service</a>
                                    <a href="#">Food processors</a>
                                    <a href="#">Education</a>
                                    <a href="#">Medical</a>
                                </div>
                            </div>
                        </>
                    ) : (
                        <input
                            name={name}
                            type={type}
                            className="heading h5 txt-black txt-up"
                            placeholder=" "
                            required={required}
                        />
                    )}
                    <label htmlFor={name}>{label}</label>
                    <div className="line"></div>
                    <div className="line line-hor"></div>
                </div>
            </>
        )
    }
    return (
        <>
            <section title='contact-form'>
                <div className="line"></div>
                <div className="container grid">
                    <div className="contact-form-ic-wrapper">
                        {props.icAvatar}
                        {props.icEmail}
                        {props.icSuccess}
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
                                <FieldForm name="firstname" label="First name" type="text" required className="firstname" />
                                <FieldForm name="lastname" label="Last name" type="text" required className="lastname" />
                                <FieldForm name="email" label="Email Address" type="text" required />
                                <FieldForm name="phone" label="Phone number" type="tel" required />
                                <FieldForm name="company" label="Company" type="text" required />
                                <FieldForm name="industry" label="Industry" type="option" required className="industry"/>
                                <FieldForm name="note" label="How can we help you?" type="textarea" className="note"/>
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
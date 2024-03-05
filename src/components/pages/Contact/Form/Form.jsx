import './Form.scss';
import React, { useEffect ,useState } from 'react';

function DropDown() {
    return (
        <>
            <div className="contact-form-input-field-group-dropdown">
                <div className='heading h5 txt-black txt-up contact-form-input-field-group-dropdown-wrap'>
                    <a href="#" className="contact-form-input-field-group-dropdown-inner">Retails</a>
                    <a href="#" className="contact-form-input-field-group-dropdown-inner">Food service</a>
                    <a href="#" className="contact-form-input-field-group-dropdown-inner">Food processors</a>
                    <a href="#" className="contact-form-input-field-group-dropdown-inner">Education</a>
                    <a href="#" className="contact-form-input-field-group-dropdown-inner">Medical</a>
                </div>
                <div className="line"></div>
            </div>
        </>
    )
}

function TextArea({name, type, required = false}) {
    return (
        <>
            <textarea
                name={name}
                className="heading h5 txt-black txt-up"
                placeholder=" "
                rows="6"
            ></textarea>
        </>
    )
}
function Input({name, type, required = false}) {
    return (
        <>
            <input
                name={name}
                type={type}
                className="heading h5 txt-black txt-up"
                placeholder=" "
                required={required}
            />
        </>
    )
}

function FieldForm({name, label, type, lineVer = false ,required = false, className, error}) {
    return (
        <>
            <div className={`heading h5 txt-black txt-up contact-form-input-field-group ${className}`}  data-field={name}>
                {type === 'textarea' ? (
                    <TextArea name={name} type={type} required />
                ) : type === 'option' ? (
                    <a href='#' className="contact-form-input-field-group-industry">
                        <input
                            name={name}
                            type="text"
                            className="heading h5 txt-black txt-up"
                            placeholder=" "
                            required={required}
                        />
                        <div className='contact-form-input-field-group-industry-txt-wrap'>
                            <div className="contact-form-input-field-group-industry-txt"></div>
                        </div>
                        <div className='contact-form-input-field-group-industry-ic'>
                            <svg width="100%" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.35 0.316681L10 7.95001L17.65 0.316681L20 2.66668L10 12.6667L0 2.66668L2.35 0.316681Z" fill="currentColor"/>
                            </svg>
                            <svg width="100%" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.35 0.316681L10 7.95001L17.65 0.316681L20 2.66668L10 12.6667L0 2.66668L2.35 0.316681Z" fill="currentColor"/>
                            </svg>
                        </div>
                    </a>
                ) : (
                    <Input name={name} type={type} required />
                )}
                <label htmlFor={name}>{label}</label>
                <div className="line">
                    <div className="line-inner"></div>
                </div>
                {lineVer && (
                    <div className="line line-ver"></div>
                )}
                <div className="txt txt-16 contact-form-input-field-group-error">{error}</div>
            </div>
        </>
    )
}

function ContactForm(props) {

    const [dropdown, setDropdown] = useState(false)

    useEffect(() => {
        console.log('Run');
        function handleIcons() {
            document.querySelectorAll('.contact-form-input-field-group').forEach((el, idx) => {
                if (el.getAttribute('data-field') === "email") {
                    el.addEventListener("pointerenter", function(e) {
                        ChangeIc('email')
                    })
                    el.addEventListener("pointerleave", function(e) {
                        ChangeIc()
                    })
                } else if (el.getAttribute('data-field') === "submit") {
                    el.addEventListener("pointerenter", function(e) {
                        ChangeIc('sent')
                    })
                    el.addEventListener("pointerleave", function(e) {
                        ChangeIc()
                    })
                } 
            })

            function ChangeIc(data) {
                document.querySelector('.contact-form-ic.active').classList.remove('active')
                if (data) {
                    document.querySelector(`.contact-form-ic[data-ic=${data}]`).classList.add('active')
                } else {
                    document.querySelector(`.contact-form-ic[data-ic=avatar]`).classList.add('active')
                }
            }
        }
        handleIcons()
        
        function handleDropdown() {
            let industryBtn = document.querySelector('.contact-form-input-field-group-industry')
            let dropdownWrap = document.querySelector('.contact-form-input-field-group-dropdown')
            let dropdownItems = dropdownWrap.querySelectorAll('.contact-form-input-field-group-dropdown-inner')
            let uiInput = industryBtn.querySelector('.contact-form-input-field-group-industry-txt')
            industryBtn.addEventListener("click", function(e) {
                e.preventDefault()
                if (!dropdownWrap.classList.contains('active')) {
                    dropdownWrap.style.height = 'auto';
                    dropdownWrap.classList.add('active')
                    industryBtn.classList.add('dropdown')
                } else {
                    dropdownWrap.style.height = '0';
                    dropdownWrap.classList.remove('active')
                    industryBtn.classList.remove('dropdown')
                }
            })
            dropdownItems.forEach(el => {
                el.addEventListener("click", function(e) {
                    e.preventDefault()
                    if (document.querySelector('.contact-form-input-field-group-dropdown-inner.active')) {
                        document.querySelector('.contact-form-input-field-group-dropdown-inner.active').classList.remove('active')
                    }
                    el.classList.add('active')
                    industryBtn.classList.add('active')
                    setTimeout(() => {
                        uiInput.textContent = el.textContent;
                        industryBtn.querySelector('input').value = el.textContent;
                    }, 200);
                })
            });
        }
        handleDropdown()
        
        function handleTextArea() {
            function autoResizeTextarea(textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = (textarea.scrollHeight > textarea.clientHeight) ? textarea.scrollHeight + 'px' : '';
            }
            document.querySelector('textarea').addEventListener('input', function(e) {
                if (e.target.tagName.toLowerCase() === 'textarea') {
                    autoResizeTextarea(e.target);
                }
            });
        }
        handleTextArea()

        function submit() {
            let canSubmit = []
            let form = document.getElementById('submit-form')
            function handleForm(event) {
                event.preventDefault()
            }
            form.addEventListener('submit', handleForm)

            function checkFormat(target, data) {
                let value = target.value
                if (value !== "") {
                    switch (data) {
                        case 'text':
                            canSubmit = true
                            break;
    
                        case 'tel':
                            if (!/^\d+$/.test(value)) {
                                canSubmit = false
                            } else {
                                canSubmit = true
                            }
                            break;
    
                        case 'email':
                            if (!/^\S+@\S+\.\S+$/.test(value)) {
                                canSubmit = false
                            } else {
                                canSubmit = true
                            }
                            break;
                    
                        default:
                            break;
                    }
                } else {
                    canSubmit = false
                }
                return canSubmit;
            }

            function checkField() {
                let inputFields = document.querySelectorAll('input')
                inputFields.forEach(el => {
                    if (el.hasAttribute('required')) {
                        if (el.textContent !== "") {
                            canSubmit = false
                        } else {
                            checkFormat(el, el.getAttribute('type'))
                        }
                    }
                });
            }
            function onSuccess() {
                // form.submit()

                document.querySelector('.contact-form-quote').classList.add('success')
                document.querySelector('.contact-form-input').style.display = "none"
                document.querySelector('.contact-form-succ').style.display = "block"

                setTimeout(() => {
                    document.querySelector('.contact-form-ic.active').classList.remove('active')
                    document.querySelector(`.contact-form-ic[data-ic=sent]`).classList.add('active')
                }, 200)
                document.querySelector(`[data-name]`).textContent = document.querySelector(`input[name="lastname"]`).value + " " + document.querySelector(`input[name="firstname"]`).value
            }
            

            document.querySelector('[data-btn="submit"]').addEventListener('click', function(e) {
                e.preventDefault()
                checkField()
                const formData = new FormData(form)

                formData.forEach((value, key) => {
                    // console.log(`${key}: ${value}`);
                });
                console.log(canSubmit);
                if (canSubmit) {
                    onSuccess()
                }
            })
        }
        submit()
    })
    return (
        <>
            <section title='contact-form'>
                <div className="container grid">
                <div className="line contact-form-line"></div>
                    <div className="contact-form-ic-wrapper">
                        {props.icAvatar}
                        {props.icEmail}
                        {props.icSuccess}
                    </div>
                    <div className="contact-form-main">
                        <div className="line line-ver contact-form-main-line"></div>
                        <form id="submit-form" action=""> 
                            <div className="txt-up contact-form-quote">
                                <h3 className="heading h3 txt-black contact-form-quote-title">Request a quote</h3>
                                <h3 className="heading h3 txt-black contact-form-quote-title-succ">Successfully sent!</h3>
                                <p className="txt txt-20 txt-black contact-form-quote-subtitle">By filling out the form below</p>
                                <div className="line"></div>
                            </div>
                            <div className="contact-form-input">
                                <FieldForm name="firstname" label="First name" type="text" required className="firstname" error="Required"/>
                                <FieldForm name="lastname" label="Last name" type="text" required lineVer className="lastname" error="Required"/>
                                <FieldForm name="email" label="Email Address" type="text" required error="Check format"/>
                                <FieldForm name="phone" label="Phone number" type="tel" required error="Required"/>
                                <FieldForm name="company" label="Company" type="text" required error="Required"/>
                                <FieldForm name="industry" label="Industry" type="option" className="industry" required error="Select one"/>
                                <DropDown />
                                <FieldForm name="note" label="How can we help you?" type="textarea" className="note"/>
                                <div className="heading h5 txt-black txt-up contact-form-input-field-group captcha">
                                </div>
                                <div className="heading h5 txt-black txt-up contact-form-input-field-group submit" data-field="submit">
                                    <a href="#" data-btn="submit" className='contact-form-input-field-group-btn'>
                                        <p>Submit</p>
                                        {props.icArrowUpRight}
                                    </a>
                                    <div className="line line-ver"></div>
                                </div>  
                            </div>
                            <div className="contact-form-succ">
                                <div className='contact-form-succ-body'>

                                    <div className='heading h4 txt-black txt-up contact-form-succ-body-txt'>
                                        <p>Thanks <span data-name="#">David SMith</span>,</p>
                                        <p>Your message has been sent. we will check it and respond to you as soon as possible. 
                                        Hope to work with you in the future.</p>
                                    </div>
                                    <div className='txt-black txt-up contact-form-succ-body-footer'>
                                        <p className='heading h6'>Regards,</p>
                                        <p className='heading h4'>Kanak naturalS team</p>
                                    </div>
                                    <div className="line"></div>
                                </div>
                                <div className="heading h3 txt-black txt-up contact-form-succ-btn-wrap">
                                    <a href="./" className='contact-form-succ-btn'>
                                        <p>Back to Home</p>
                                        {props.icArrowUpRight}
                                    </a>
                                </div> 
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactForm;
import './Form.scss';
import React, { useEffect ,useRef,useState, useTransition } from 'react';
import { FormItem, FormField, FormLabel } from './Field';
import Input from './Input'
import TextArea from './TextArea';
import Select from './Select';
import useDebounceCallback from '@/components/hooks/useDebounce';
import cn from 'clsx';

function ContactForm(props) {
    const [isPending, startTransition] = useTransition();
    const [isSubmitted, setIsSubmitted] = useState()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        industry: "",
        message: "",
    });
    const [icon, setIcon] = useState('submit');
    const debounceForm = useDebounceCallback(setFormData, 200);

    const onSubmit = (e) => {
        e.preventDefault();
        // startTransition(async () => {
        //     const response = await fetch("fake/api", {
        //         method: "POST",
        //         body: JSON.stringify({
        //             data: formData,
        //             subject: "Kanak Kanak",
        //         }),
        //     })

        //     if (!response.ok) {
        //         switch (response.status) {
        //         case 409:
        //             console.log("You are already subscribed to our newsletter.")
        //             break
        //         case 422:
        //             console.log("Invalid input.")
        //             break
        //         case 429:
        //             console.log("The daily email limit has been reached.")
        //             break
        //         case 500:
        //             console.log("Something went wrong. Please try again later.")
        //             break
        //         default:
        //             console.log("Something went wrong. Please try again later.")
        //         }
        //         return
        //     }
        //     setIsSubmitted(true)
        //     form.reset()
        // })
        // Demo interaction
        setIcon('load')
        setTimeout(() => {
            setIcon('success')
            setIsSubmitted(true)
            form.reset()
        }, 2000);
    }

    useEffect(() => {
        console.log(formData);
    }, [JSON.stringify(formData)]);

    return (
        <>
            <section title='contact-form' className="contact-form">
                <div className="container grid">
                    <div className="line contact-form-line"></div>
                    <div className="contact-form-ic-wrapper">
                        <div className={cn('contact-form-ic', { "active": icon === 'avatar' })}>
                            {props.icAvatar}
                        </div>
                        <div className={cn('contact-form-ic', { "active": icon === 'email' })}>
                            {props.icEmail}
                        </div>
                        <div className={cn('contact-form-ic', { "active": icon === 'submit' })}>
                            {props.icSubmit}
                        </div>
                        <div className={cn('contact-form-ic', { "active": icon === 'phone' })}>
                            {props.icPhone}
                        </div>
                        <div className={cn('contact-form-ic', { "active": icon === 'industry' })}>
                            {props.icIndustry}
                        </div>
                        <div className={cn('contact-form-ic', { "active": icon === 'company' })}>
                            {props.icCompany}
                        </div>
                        <div className={cn('contact-form-ic', { "active": icon === 'chat' })}>
                            {props.icChat}
                        </div>
                        <div className={cn('contact-form-ic', { "active": icon === 'load' })}>
                            {props.icLoad}
                        </div>
                        <div className={cn('contact-form-ic', { "active": icon === 'success' })}>
                            {props.icSuccess}
                        </div>
                    </div>
                    <div className={`contact-form-main ${icon == 'load' && 'disable'}`}>
                        <div className="line line-ver"></div>
                        <div className={cn('txt-up contact-form-head', { "submitted": isSubmitted })}>
                            <div className='contact-form-head-wrap'>
                                <h3 className="heading h3 txt-black contact-form-head-title">{props.title}</h3>
                                <p className="txt txt-20 txt-black contact-form-head-subtitle">{props.sub_title}</p>
                            </div>
                            <div className='contact-form-head-wrap'>
                                <h3 className="heading h3 txt-black contact-form-head-title">SuccessfulLY sent!</h3>
                            </div>
                            <div className="line"></div>
                        </div>

                        { !isSubmitted ? (
                            <>
                                <form action=""
                                    className='contact-form-inside'
                                    onSubmit={onSubmit}
                                    autoComplete="off">
                                    <FormField>
                                        <FormItem 
                                            className='contact-form-field'
                                            onMouseEnter={() => setIcon('avatar')}
                                            onMouseLeave={() => setIcon('submit')}
                                        >
                                            <Input
                                                placeholder=" "
                                                defaultValue={formData.firstName}
                                                onChange={(e) => debounceForm({ ...formData, firstName: e.target.value })}
                                            />
                                            <FormLabel>First Name</FormLabel>
                                        </FormItem>
                                    </FormField>
                                    <FormField>
                                        <FormItem 
                                            className='contact-form-field'
                                            onMouseEnter={() => setIcon('avatar')}
                                            onMouseLeave={() => setIcon('submit')}
                                        >
                                            <Input
                                                placeholder=" "
                                                defaultValue={formData.lastName}
                                                onChange={(e) => debounceForm({ ...formData, lastName: e.target.value })}
                                            />
                                            <FormLabel>Last Name</FormLabel>
                                        </FormItem>
                                    </FormField>
                                    <FormField>
                                        <FormItem
                                            className='contact-form-field'
                                            onMouseEnter={() => setIcon('email')}
                                            onMouseLeave={() => setIcon('submit')}
                                        >
                                            <Input
                                                type="email"
                                                placeholder=" "
                                                defaultValue={formData.email}
                                                onChange={(e) => debounceForm({ ...formData, email: e.target.value })}
                                            />
                                            <FormLabel>Email Address</FormLabel>
                                        </FormItem>
                                    </FormField>
                                    <FormField>
                                        <FormItem 
                                            className='contact-form-field'
                                            onMouseEnter={() => setIcon('phone')}
                                            onMouseLeave={() => setIcon('submit')}
                                        >
                                            <Input
                                                type="tel"
                                                placeholder=" "
                                                defaultValue={formData.phone}
                                                onChange={(e) => debounceForm({ ...formData, phone: e.target.value })}
                                            />
                                            <FormLabel>Phone number</FormLabel>
                                        </FormItem>
                                    </FormField>
                                    <FormField>
                                        <FormItem 
                                            className='contact-form-field'
                                            onMouseEnter={() => setIcon('company')}
                                            onMouseLeave={() => setIcon('submit')}
                                        >
                                            <Input
                                                placeholder=" "
                                                defaultValue={formData.company}
                                                onChange={(e) => debounceForm({ ...formData, company: e.target.value })}
                                            />
                                            <FormLabel>Company</FormLabel>
                                        </FormItem>
                                    </FormField>
                                    <FormField>
                                        <FormItem 
                                            className='contact-form-field contact-form-field-select'
                                            onMouseEnter={() => setIcon('industry')}
                                            onMouseLeave={() => setIcon('submit')}
                                        >
                                            <Select
                                                value={formData.industry}
                                                onChange={(val) => debounceForm({ ...formData, industry: val })}
                                                options={props.list?.map((item) => item.data.title)}
                                            />
                                            <FormLabel>Industry</FormLabel>
                                        </FormItem>
                                    </FormField>
                                    <FormField>
                                        <FormItem 
                                            className='contact-form-field'
                                            onMouseEnter={() => setIcon('chat')}
                                            onMouseLeave={() => setIcon('submit')}
                                        >
                                            <TextArea
                                                placeholder=" "
                                                rows="6"
                                                defaultValue={formData.message}
                                                onChange={(e) => debounceForm({ ...formData, message: e.target.value })}
                                            />
                                            <FormLabel>How can I help you?</FormLabel>
                                        </FormItem>
                                    </FormField>
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        // onClick={() => { setIsSubmitted(true) }}
                                        className='contact-form-submit txt-link'>
                                        <span className='heading h3 txt-up txt-black'>{icon == 'load' ? 'Sending...' : 'Submit'}</span>
                                        {props.icArrowUpRight}
                                    </button>
                                </form>
                            </>
                            ) : (
                            <>
                                <div className='contact-form-success'>
                                    <div className="heading h4 txt-black txt-up contact-form-success-body">
                                        <div>Thanks {formData.firstName} {formData.lastName},</div>
                                        <p>Your message has been sent. we will check it and respond to you as soon as possible. <br/>Hope to work with you in the future.</p>
                                        <div className='contact-form-success-body-regard'>Regards,</div>
                                        <div>Kanak naturals team</div>
                                    </div>
                                    <div className='heading h3 txt-black txt-up contact-form-success-btn'>
                                        <div className="line"></div>
                                        <a href="/" >Back to home</a>
                                        {props.icArrowUpRight}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactForm;
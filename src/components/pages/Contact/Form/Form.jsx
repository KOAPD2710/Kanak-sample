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
    const [industry, setIndustry] = useState('');
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
    const [icon, setIcon] = useState('');
    const debounceForm = useDebounceCallback(setFormData, 200);

    const onSubmit = (e) => {
        e.preventDefault();
        startTransition(async () => {
            const response = await fetch("/api/email/newsletter", {
                method: "POST",
                body: JSON.stringify({
                data: formData,
                // This token is used as a search param in the email preferences page to identify the subscriber.
                token: crypto.randomUUID(),
                subject: "Kanak Kanak",
                }),
            })

            if (!response.ok) {
                switch (response.status) {
                case 409:
                    console.log("You are already subscribed to our newsletter.")
                    break
                case 422:
                    console.log("Invalid input.")
                    break
                case 429:
                    console.log("The daily email limit has been reached.")
                    break
                case 500:
                    console.log("Something went wrong. Please try again later.")
                    break
                default:
                    console.log("Something went wrong. Please try again later.")
                }
                return
            }
            form.reset()
        })
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
                        <div className={cn('contact-form-ic', { "active": icon.length === 0 })}>
                            {props.icAvatar}
                        </div>
                        <div className={cn('contact-form-ic', { "active": icon === 'email' })}>
                            {props.icEmail}
                        </div>
                        <div className={cn('contact-form-ic', { "active": icon === 'submit' })}>
                            {props.icSuccess}
                        </div>
                    </div>
                    <div className="contact-form-main">
                        <div className="line line-ver"></div>
                        <div className={cn('txt-up contact-form-head', { "submitted": isSubmitted })}>
                            <div className='contact-form-head-wrap'>
                                <h3 className="heading h3 txt-black contact-form-head-title">Request a quote</h3>
                                <p className="txt txt-20 txt-black contact-form-head-subtitle">By filling out the form below</p>
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
                                        <FormItem className='contact-form-field'>
                                            <Input
                                                placeholder=" "
                                                defaultValue={formData.firstName}
                                                onChange={(e) => debounceForm({ ...formData, firstName: e.target.value })}
                                            />
                                            <FormLabel>First Name</FormLabel>
                                        </FormItem>
                                    </FormField>
                                    <FormField>
                                        <FormItem className='contact-form-field'>
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
                                            onPointerEnter={() => setIcon('email')}
                                            onPointerLeave={() => setIcon('')}
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
                                        <FormItem className='contact-form-field'>
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
                                        <FormItem className='contact-form-field'>
                                            <Input
                                                placeholder=" "
                                                defaultValue={formData.company}
                                                onChange={(e) => debounceForm({ ...formData, company: e.target.value })}
                                            />
                                            <FormLabel>Company</FormLabel>
                                        </FormItem>
                                    </FormField>
                                    <FormField>
                                        <FormItem className='contact-form-field'>
                                            <Select
                                                value={formData.industry}
                                                onChange={(val) => debounceForm({ ...formData, industry: val })}
                                                options={props.list?.map((item) => item.data.title)}
                                            />
                                            <FormLabel>Industry</FormLabel>
                                        </FormItem>
                                    </FormField>
                                    <FormField>
                                        <FormItem className='contact-form-field'>
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
                                        onPointerEnter={() => setIcon('submit')}
                                        onPointerLeave={() => setIcon('')}
                                        disabled={isPending}
                                        onClick={() => { setIsSubmitted(true) }}
                                        className='contact-form-submit'>
                                        <span className='heading h3 txt-up txt-black txt-orange'>Submit</span>
                                        {props.icArrowUpRight}
                                    </button>
                                </form>
                            </>
                            ) : (
                            <>
                                <div className='contact-form-success'>
                                    <div className="heading h4 txt-black txt-up contact-form-success-body">
                                        <div>Thanks {`${formData.firstName} ${formData.lastName}`},</div>
                                        <p>Your message has been sent. we will check it and respond to you as soon as possible. Hope to work with you in the future.</p>
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
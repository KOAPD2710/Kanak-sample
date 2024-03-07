import './Form.scss';
import React, { useEffect ,useRef,useState, useTransition } from 'react';
import { FormItem, FormField, FormLabel } from './Field';
import Input from './Input'
import TextArea from './TextArea';
import Select from './Select';
import useDebounceCallback from '@/components/hooks/useDebounce';
import cn from 'clsx';

function ContactForm(props) {
    const contactFormRef = useRef();
    const [isPending, startTransition] = useTransition();
    const [industry, setIndustry] = useState('');
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
    const debounceForm = useDebounceCallback(setFormData, 400);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(new FormData(contactFormRef.current))
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
            <section title='contact-form'>
                <div className="line"></div>
                <div className="container grid">
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
                        <div className="txt-up contact-form-quote">
                            <h3 className="heading h3 txt-black contact-form-quote-title">Request a quote</h3>
                            <p className="txt txt-20 txt-black contact-form-quote-subtitle">By filling out the form below</p>
                            <div className="line"></div>
                        </div>

                        <form action=""
                            ref={contactFormRef}
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
                                        options={["Retails", "Food service", "Food processors", "Education", "Medical"]}
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
                                className='contact-form-submit'>
                                <span className='heading h3 txt-up txt-black txt-orange'>Submit</span>
                                {props.icArrowUpRight}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="line"></div>
            </section>
        </>
    )
}

export default ContactForm;
'use client'
import { useId, useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import parse from 'html-react-parser';

import chatbot from '../scripts/chatbot.js'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { Logo } from '@/components/Logo'

function TextInput({ label, ...props }) {
    let id = useId()

    return (
        <div className="group relative z-0 transition-all focus-within:z-10">
            <input
                type="text"
                id={id}
                {...props}
                placeholder=" "
                className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
            />
            <label
                htmlFor={id}
                className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
            >
                {label}
            </label>
        </div>
    )
}

function Spinner({ className }) {

    return (
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    )
}


function RadioInput({ label, checkedValue, ...props }) {
    // console.log(props.value, checkedValue, props.value === checkedValue);

    return (
        <label className="flex gap-x-3">
            <input
                type="radio"
                {...props}
                checked={props.value === checkedValue}
                className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
            />
            <span className="text-base/6 text-neutral-950">{label}</span>
        </label>
    )
}




const formInitialValues = {
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    budget: '25',
}

export function ContactForm() {

    const [formData, setFormData] = useState(formInitialValues);
    const [sent, setSent] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [gptResponse, setGptResponse] = useState('Thank you for your message. We will get back to you shortly.');

    const gptResponseRef = useRef(null);

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData(prev => ({ ...prev, [name]: value }));
        console.log(`Setting ${name} to ${value}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        try {
            setIsSending(true);
            
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.status === 200) {
                console.log('Email sent successfully');
                console.log(data.response);
                setGptResponse(data.response)
                setIsSending(false);
                setSent(true);
            } else {
                console.error('Failed to send email');
                console.error(data.error);
                setIsSending(false);
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
            setIsSending(false);
        }
    };
    // console.log(formData);
    useEffect(() => {
        if (sent && gptResponseRef.current) {
            gptResponseRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [gptResponse])
    return (
        <FadeIn className="lg:order-last">
            <form onSubmit={handleSubmit} ref={gptResponseRef}>
                <h2 className="font-display text-base font-semibold text-neutral-950" >
                    {sent ? 'Received ✓' : 'Work inquiries'}
                </h2>
                <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
                    {!sent && (<>
                        <TextInput
                            label="Name"
                            name="name"
                            autoComplete="name"
                            value={formData?.name}
                            onChange={handleChange}
                        />
                        <TextInput
                            label="Email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={formData?.email}
                            onChange={handleChange}
                        />
                        <TextInput
                            label="Company"
                            name="company"
                            value={formData?.company}
                            autoComplete="organization" onChange={handleChange}
                        />
                        <TextInput
                            label="Phone"
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            value={formData?.phone}
                            onChange={handleChange}
                        />
                        <TextInput
                            label="Message"
                            name="message"
                            as="textarea"
                            rows="4"
                            value={formData?.message}
                            onChange={handleChange}
                        />
                        <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
                            <fieldset onChange={handleChange}  >
                                <legend className="text-base/6 text-neutral-500">Budget</legend>
                                <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                                    <RadioInput label="$25K – $50K" name="budget" value="25" checkedValue={formData?.budget} onChange={handleChange} />
                                    <RadioInput label="$50K – $100K" name="budget" value="50" checkedValue={formData?.budget} onChange={handleChange} />
                                    <RadioInput label="$100K – $150K" name="budget" value="100" checkedValue={formData?.budget} onChange={handleChange} />
                                    <RadioInput label="More than $150K" name="budget" value="150" checkedValue={formData?.budget} onChange={handleChange} />
                                </div>
                            </fieldset>
                        </div>
                    </>
                    )}
                    {sent && (
                        <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
                            <h3 className="text-base/6 text-neutral-500" > {parse(gptResponse)} </h3>
                        </div>
                    )}
                </div>
                {!sent && <Button type="submit" className="mt-10">
                    {!isSending ? 'Let’s work together' : <div className='flex flex-row '>
                        <Spinner /> Sending...
                    </div>}
                </Button>}
                {sent && <Button type="submit" className="mt-10" onClick={() => setSent(false)}>
                    {!isSending ? 'Send another message' : <div className='flex flex-row '>
                        <Spinner /> Sending...
                    </div>}
                </Button>}
            </form>
        </FadeIn>
    )
}
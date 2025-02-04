'use client'
import React, { useState, useId } from 'react'
import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

// Input Components
function TextInput({ label, tooltip, error, ...props }) {
  let id = useId()
  const [showTooltip, setShowTooltip] = useState(true)

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className={`peer block w-full border ${
          error ? 'border-red-500' : 'border-neutral-300'
        } bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl`}
        onFocus={() => setShowTooltip(false)}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 ${
          error ? 'text-red-500' : 'text-neutral-500'
        } transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950`}
      >
        {label}
      </label>
      {tooltip && showTooltip && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="rounded-md bg-neutral-900 px-2 py-1 text-sm text-white">
            {tooltip}
          </div>
        </div>
      )}
      {error && (
        <p className="absolute bottom-0 left-6 mt-1 translate-y-full text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

function TextArea({ label, tooltip, error, ...props }) {
  let id = useId()
  const [showTooltip, setShowTooltip] = useState(true)

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <textarea
        id={id}
        {...props}
        placeholder=" "
        className={`peer block min-h-[150px] w-full resize-none border ${
          error ? 'border-red-500' : 'border-neutral-300'
        } bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl`}
        onFocus={() => setShowTooltip(false)}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-6 top-12 origin-left text-base/6 ${
          error ? 'text-red-500' : 'text-neutral-500'
        } transition-all duration-200 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950`}
      >
        {label}
      </label>
      {tooltip && showTooltip && (
        <div className="absolute right-4 top-8 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="max-w-xs rounded-md bg-neutral-900 px-2 py-1 text-sm text-white">
            {tooltip}
          </div>
        </div>
      )}
      {error && (
        <p className="absolute bottom-0 left-6 mt-1 translate-y-full text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

function SelectInput({ label, options, tooltip, error, ...props }) {
  let id = useId()
  const [showTooltip, setShowTooltip] = useState(true)

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <select
        id={id}
        {...props}
        className={`peer block w-full appearance-none border ${
          error ? 'border-red-500' : 'border-neutral-300'
        } rounded-none bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl`}
        onFocus={() => setShowTooltip(false)}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 ${
          error ? 'text-red-500' : 'text-neutral-500'
        } transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950`}
      >
        {label}
      </label>
      {tooltip && showTooltip && (
        <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="rounded-md bg-neutral-900 px-2 py-1 text-sm text-white">
            {tooltip}
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6">
        <svg
          className="h-5 w-5 text-neutral-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {error && (
        <p className="absolute bottom-0 left-6 mt-1 translate-y-full text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

function RadioInput({ label, checkedValue, ...props }) {
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

function CheckboxGroup({ label, options, values, onChange, tooltip, error }) {
  const [showTooltip, setShowTooltip] = useState(true)

  return (
    <div className="group relative space-y-4">
      <label
        className={`block text-base/6 ${
          error ? 'text-red-500' : 'text-neutral-500'
        }`}
      >
        {label}
      </label>
      <div className="space-y-3">
        {options.map((option) => (
          <label key={option.value} className="flex gap-x-3">
            <input
              type="checkbox"
              value={option.value}
              checked={values?.includes(option.value)}
              onChange={onChange}
              onFocus={() => setShowTooltip(false)}
              className="checked:bg-checkbox h-6 w-6 flex-none appearance-none rounded border border-neutral-950/20 outline-none checked:border-neutral-950 checked:bg-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
            />
            <span className="text-base/6 text-neutral-950">{option.label}</span>
          </label>
        ))}
      </div>
      {tooltip && showTooltip && (
        <div className="absolute right-6 top-0 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="rounded-md bg-neutral-900 px-2 py-1 text-sm text-white">
            {tooltip}
          </div>
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

const formInitialValues = {
  // Step 1: Project Scope
  projectType: '',
  businessGoals: '',
  estimatedUsers: '',
  targetMarket: '',

  // Step 2: Technical Features
  requiredFeatures: [],
  securityRequirements: [],

  // Step 3: Timeline & Budget
  timeline: '',
  developmentApproach: '',
  budget: '',

  // Step 4: Contact Details
  name: '',
  email: '',
  phone: '',
  company: '',
}

const stepTitles = {
  1: 'Tell Us About Your Project',
  2: 'Technical Requirements',
  3: 'Timeline & Budget',
  4: 'Contact Information',
}

export function QuotationForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(formInitialValues)
  const [sent, setSent] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [quote, setQuote] = useState('')
  const [readyToSubmit, setReadyToSubmit] = useState(false)
  const [errors, setErrors] = useState({})

  const validateStep = (stepNumber) => {
    const newErrors = {}

    switch (stepNumber) {
      case 1:
        if (!formData.projectType)
          newErrors.projectType = 'Please select project complexity'
        if (!formData.businessGoals)
          newErrors.businessGoals = 'Please describe your project'
        if (!formData.estimatedUsers)
          newErrors.estimatedUsers = 'Please select estimated users'
        if (!formData.targetMarket)
          newErrors.targetMarket = 'Please select target market'
        break

      case 2:
        if (!formData.requiredFeatures?.length)
          newErrors.requiredFeatures = 'Please select at least one feature'
        if (!formData.securityRequirements?.length)
          newErrors.securityRequirements = 'Please select security requirements'
        break

      case 3:
        if (!formData.timeline)
          newErrors.timeline = 'Please select development timeline'
        if (!formData.developmentApproach)
          newErrors.developmentApproach = 'Please select development approach'
        if (!formData.budget) newErrors.budget = 'Please select budget range'
        break

      case 4:
        if (!formData.name) newErrors.name = 'Please enter your name'
        if (!formData.email) newErrors.email = 'Please enter your email'
        if (!formData.company) newErrors.company = 'Please enter company name'
        if (!formData.phone) newErrors.phone = 'Please enter phone number'
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target
    const newValues = checked
      ? [...(formData[category] || []), value]
      : (formData[category] || []).filter((item) => item !== value)

    setFormData((prev) => ({
      ...prev,
      [category]: newValues,
    }))

    // Clear error when field is changed
    if (errors[category]) {
      setErrors((prev) => ({
        ...prev,
        [category]: undefined,
      }))
    }
  }

  const renderStep1 = () => (
    <div className="isolate -space-y-px rounded-2xl bg-white/50">
      <SelectInput
        label="Project Complexity"
        name="projectType"
        value={formData.projectType}
        onChange={handleChange}
        options={[
          {
            value: 'simple',
            label: 'Simple (Basic website, minimal features)',
          },
          {
            value: 'medium',
            label: 'Medium (Interactive site, user accounts)',
          },
          {
            value: 'complex',
            label: 'Complex (Large-scale, multiple functionalities)',
          },
          {
            value: 'innovative',
            label: 'Innovative (Cutting-edge, unique solution)',
          },
        ]}
        tooltip="Select the complexity level that best matches your project requirements"
        error={errors.projectType}
      />
      <TextArea
        label="Business Goals & Project Description"
        name="businessGoals"
        value={formData.businessGoals}
        onChange={handleChange}
        tooltip="Example: We want to create an e-commerce platform that can handle 10,000 daily users, integrate with multiple payment gateways, and provide real-time inventory management"
        error={errors.businessGoals}
      />
      <SelectInput
        label="Target Market"
        name="targetMarket"
        value={formData.targetMarket}
        onChange={handleChange}
        options={[
          { value: 'internal', label: 'Internal Tool (Company use only)' },
          {
            value: 'regional',
            label: 'Regional (Specific country/region)',
          },
          { value: 'global', label: 'Global (International audience)' },
        ]}
        tooltip="This helps determine scalability and localization requirements"
        error={errors.targetMarket}
      />
      <SelectInput
        label="Estimated Monthly Users"
        name="estimatedUsers"
        value={formData.estimatedUsers}
        onChange={handleChange}
        options={[
          { value: 'small', label: 'Under 1,000 users' },
          { value: 'medium', label: '1,000 - 10,000 users' },
          { value: 'large', label: '10,000 - 100,000 users' },
          { value: 'enterprise', label: 'Over 100,000 users' },
        ]}
        tooltip="This helps determine the required infrastructure and scalability needs"
        error={errors.estimatedUsers}
      />
    </div>
  )

  const renderStep2 = () => (
    <div className="isolate -space-y-px rounded-2xl bg-white/50">
      <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl">
        <CheckboxGroup
          label="Required Features"
          options={[
            { value: 'auth', label: 'User Authentication & Profiles' },
            { value: 'payments', label: 'Payment Processing' },
            { value: 'ai', label: 'AI/Machine Learning Features' },
            { value: 'realtime', label: 'Real-time Updates/Chat' },
            { value: 'analytics', label: 'Advanced Analytics/Reporting' },
            { value: 'mobile', label: 'Mobile App Integration' },
            { value: 'api', label: 'Third-party API Integrations' },
            { value: 'cms', label: 'Content Management System' },
            { value: 'seo', label: 'SEO Optimization' },
            { value: 'social', label: 'Social Media Integration' },
            { value: 'e-commerce', label: 'E-commerce Functionality' },
            { value: 'booking', label: 'Booking/Reservation System' },
            { value: 'notifications', label: 'Push Notifications' },
            { value: 'Not Sure', label: 'Not Sure' },
          ]}
          values={formData.requiredFeatures}
          onChange={(e) => handleCheckboxChange(e, 'requiredFeatures')}
          tooltip="Select all features your application requires"
          error={errors.requiredFeatures}
        />
      </div>
      <div className="border border-neutral-300 px-6 py-8">
        <CheckboxGroup
          label="Security Requirements"
          options={[
            { value: 'ssl', label: 'SSL/TLS Encryption' },
            { value: 'oauth', label: 'OAuth/SSO Integration' },
            { value: '2fa', label: 'Two-Factor Authentication' },
            { value: 'audit', label: 'Security Auditing' },
            { value: 'backup', label: 'Automated Backups' },
            { value: 'gdpr', label: 'GDPR Compliance' },
            { value: 'encryption', label: 'Data Encryption' },
            { value: 'Not Sure', label: 'Not Sure' },
          ]}
          values={formData.securityRequirements}
          onChange={(e) => handleCheckboxChange(e, 'securityRequirements')}
          tooltip="Select the security features required for your application"
          error={errors.securityRequirements}
        />
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="isolate -space-y-px rounded-2xl bg-white/50">
      <SelectInput
        label="Development Timeline"
        name="timeline"
        value={formData.timeline}
        onChange={handleChange}
        options={[
          { value: 'urgent', label: '1-3 months (Urgent)' },
          { value: 'standard', label: '3-6 months (Standard)' },
          { value: 'flexible', label: '6+ months (Flexible)' },
        ]}
        tooltip="Faster development typically requires more resources"
        error={errors.timeline}
      />
      <SelectInput
        label="Development Approach"
        name="developmentApproach"
        value={formData.developmentApproach}
        onChange={handleChange}
        options={[
          {
            value: 'mvp',
            label: 'MVP First (Basic features, quick launch)',
          },
          {
            value: 'full',
            label: 'Complete Product (All features at launch)',
          },
          {
            value: 'phased',
            label: 'Phased Development (Gradual rollout)',
          },
        ]}
        tooltip="Choose how you want to approach the development process"
        error={errors.developmentApproach}
      />
      <div className="border border-neutral-300 px-6 py-8">
        <fieldset onChange={handleChange}>
          <legend className="text-base/6 text-neutral-500">Budget Range</legend>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <RadioInput
              label="$25K – $50K"
              name="budget"
              value="25"
              checkedValue={formData.budget}
            />
            <RadioInput
              label="$50K – $100K"
              name="budget"
              value="50"
              checkedValue={formData.budget}
            />
            <RadioInput
              label="$100K – $150K"
              name="budget"
              value="100"
              checkedValue={formData.budget}
            />
            <RadioInput
              label="More than $150K"
              name="budget"
              value="150"
              checkedValue={formData.budget}
            />
          </div>
        </fieldset>
        {errors.budget && (
          <p className="mt-2 text-sm text-red-600">{errors.budget}</p>
        )}
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="isolate -space-y-px rounded-2xl bg-white/50">
      <TextInput
        label="Name"
        name="name"
        autoComplete="name"
        value={formData.name}
        onChange={handleChange}
        tooltip="Your full name"
        error={errors.name}
      />
      <TextInput
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
        tooltip="Your business email address"
        error={errors.email}
      />
      <TextInput
        label="Company"
        name="company"
        autoComplete="organization"
        value={formData.company}
        onChange={handleChange}
        tooltip="Your company or organization name"
        error={errors.company}
      />
      <TextInput
        label="Phone"
        type="tel"
        name="phone"
        autoComplete="tel"
        value={formData.phone}
        onChange={handleChange}
        tooltip="Your contact number"
        error={errors.phone}
      />
    </div>
  )

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!readyToSubmit) {
      if (validateStep(4)) {
        setReadyToSubmit(true)
      }
      return
    }

    setIsSending(true)
    try {
      const response = await fetch(
        'https://n8n.loyalleads.co.uk/webhook/185d1d33-bd20-465b-b3d7-78987c5ae38f',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      const data = await response.json()
      setQuote(data.quote)
      setSent(true)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <FadeIn className="lg:order-last">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-semibold text-neutral-950">
            {sent
              ? 'Quote Sent ✓'
              : readyToSubmit
              ? 'Review Your Details'
              : stepTitles[step]}
          </h2>
          {!sent && (
            <span className="text-sm text-neutral-500">Step {step} of 4</span>
          )}
        </div>

        {!sent && (
          <div className="mt-6">
            <div className="mb-10 h-2 w-full rounded-full bg-neutral-100">
              <div
                className="h-2 rounded-full bg-neutral-950 transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>

            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}

            <div className="mt-10 flex justify-between gap-4">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setStep((prev) => prev - 1)
                    setReadyToSubmit(false)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  ← Previous
                </Button>
              )}

              {step < 4 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className={step === 1 ? 'w-full' : 'ml-auto'}
                >
                  Next →
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="ml-auto flex items-center gap-2"
                >
                  {!isSending ? (
                    <>
                      {readyToSubmit ? 'Get Quote' : 'Review Details'}
                      {readyToSubmit && (
                        <PaperAirplaneIcon className="h-4 w-4" />
                      )}
                    </>
                  ) : (
                    <div className="flex items-center">
                      <svg
                        className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </div>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}

        {sent && (
          <div className="mt-6 rounded-2xl border border-neutral-300 px-6 py-8">
            <h3 className="text-base/6 text-neutral-500">{quote}</h3>
          </div>
        )}

        {sent && (
          <Button
            type="button"
            className="mt-10"
            onClick={() => {
              setSent(false)
              setStep(1)
              setReadyToSubmit(false)
              setFormData(formInitialValues)
              setErrors({})
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Get Another Quote
          </Button>
        )}
      </form>
    </FadeIn>
  )
}

export default QuotationForm

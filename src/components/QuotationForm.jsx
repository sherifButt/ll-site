'use client'
import React, { useState, useId, useRef } from 'react'
import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { renderHTML } from '@/lib/renderHTML'
import { renderMarkdown } from '@/lib/renderMarkdown'

const Tooltip = ({ children }) => {
  
  return (
    <div className="invisible absolute -top-[200px] left-1/2 w-[300px] -translate-x-1/2 opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100 md:-left-[308px] md:top-1/2 md:-translate-x-0 md:-translate-y-1/2">
      <div className="relative flex items-center">
        <div className="relative w-full rounded-lg border border-black bg-black px-2 py-2 text-sm text-neutral-100 backdrop-filter">
          {renderHTML(children)}
          {/* Arrow for desktop (right side) */}
          <div className="absolute -right-[20px] top-1/2 hidden -translate-y-1/2 border-[10px] border-transparent border-l-black md:block"></div>
          {/* Arrow for mobile/tablet (bottom left) */}
          <div className="absolute -bottom-[20px] left-4 block border-[10px] border-transparent border-t-black md:hidden"></div>
        </div>
      </div>
    </div>
  )
}

const TextInput = ({ label, tooltip, error, required, ...props }) => {
  let id = useId()

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
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 ${
          error ? 'text-red-500' : 'text-neutral-500'
        } transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
      {error && (
        <p className="absolute -top-7 left-6 mt-1 translate-y-full text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

function TextArea({ label, tooltip, error, ...props }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <textarea
        id={id}
        {...props}
        placeholder="Type your application description here..."
        className={`peer block min-h-[150px] w-full resize-none border ${
          error ? 'border-red-500' : 'border-neutral-300'
        } bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-6 top-12 origin-left text-base/6 ${
          error ? 'text-red-500' : 'text-neutral-500'
        } transition-all duration-200 -translate-y-8 scale-75 font-semibold text-neutral-950    `}
      >
        {label}
      </label>
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
      {error && (
        <p className="absolute -top-7 left-6 mt-1 translate-y-full text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

function SelectInput({ label, options, tooltip, error, ...props }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <select
        id={id}
        {...props}
        className={`peer block w-full appearance-none border ${
          error ? 'border-red-500' : 'border-neutral-300'
        } rounded-none bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl`}
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
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
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
        <p className="absolute -top-7 left-6 mt-1 translate-y-full text-sm text-red-500">
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
        className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
  )
}

function CheckboxGroup({ label, options, values, onChange, tooltip, error }) {
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
              className="checked:bg-checkbox h-6 w-6 flex-none appearance-none rounded border border-neutral-950/20 outline-none checked:border-neutral-950 checked:bg-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
            />
            <span className="text-base/6 text-neutral-950">{option.label}</span>
          </label>
        ))}
      </div>
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

const projectTypeDescriptions = {
  simple:
    'Basic website with standard features like contact forms, about pages, and simple content management. Perfect for small businesses or personal websites.',
  medium:
    'Interactive website with user accounts, basic e-commerce functionality, and customizable features. Suitable for growing businesses.',
  complex:
    'Large-scale application with multiple integrated systems, advanced user management, and complex business logic. Ideal for enterprises.',
  innovative:
    'Cutting-edge solution incorporating AI, machine learning, or blockchain technology. Perfect for startups disrupting their industry.',
}

const getFeaturesByComplexity = (complexity) => {
  const baseFeatures = [
    { value: 'static', label: 'Static Content Pages' },
    { value: 'contact', label: 'Contact Forms' },
    { value: 'basic-cms', label: 'Basic Content Management' },
    { value: 'responsive', label: 'Responsive Design' },
    { value: 'seo', label: 'Basic SEO' },
  ]

  const mediumFeatures = [
    { value: 'auth', label: 'User Authentication' },
    { value: 'cms', label: 'Advanced Content Management' },
    { value: 'payments', label: 'Payment Processing' },
    { value: 'analytics', label: 'Basic Analytics' },
    { value: 'api', label: 'Third-party API Integrations' },
    { value: 'search', label: 'Search Functionality' },
    { value: 'email', label: 'Email Notifications' },
  ]

  const complexFeatures = [
    { value: 'advanced-auth', label: 'Advanced User Management' },
    { value: 'realtime', label: 'Real-time Updates/Chat' },
    { value: 'mobile', label: 'Mobile App Integration' },
    { value: 'advanced-analytics', label: 'Advanced Analytics/Reporting' },
    { value: 'multi-api', label: 'Multiple API Integrations' },
    { value: 'notifications', label: 'Push Notifications' },
    { value: 'marketplace', label: 'Marketplace Features' },
    { value: 'subscription', label: 'Subscription Management' },
  ]

  const innovativeFeatures = [
    { value: 'ai', label: 'AI/Machine Learning Integration' },
    { value: 'blockchain', label: 'Blockchain Features' },
    { value: 'iot', label: 'IoT Integration' },
    { value: 'vr', label: 'VR/AR Features' },
    { value: 'custom-algo', label: 'Custom Algorithms' },
    { value: 'big-data', label: 'Big Data Processing' },
  ]

  switch (complexity) {
    case 'simple':
      return baseFeatures
    case 'medium':
      return mediumFeatures
    case 'complex':
      return complexFeatures
    case 'innovative':
      return innovativeFeatures
    default:
      return baseFeatures
  }
}

const getBudgetRangeByComplexity = (complexity) => {
  switch (complexity) {
    case 'simple':
      return [
        { value: '3', label: '£3K – £8K' },
        { value: '8', label: '£8K – £15K' },
      ]
    case 'medium':
      return [
        { value: '15', label: '£15K – £35K' },
        { value: '35', label: '£35K – £60K' },
      ]
    case 'complex':
      return [
        { value: '60', label: '£60K – £150K' },
        { value: '150', label: '£150K – £250K' },
      ]
    case 'innovative':
      return [
        { value: '250', label: '£250K – £500K' },
        { value: '500', label: 'More than £500K' },
      ]
    default:
      return []
  }
}

const getTimelineByComplexity = (complexity) => {
  switch (complexity) {
    case 'simple':
      return [
        { value: 'fast', label: '3-6 weeks' },
        { value: 'standard', label: '6-8 weeks' },
      ]
    case 'medium':
      return [
        { value: 'standard', label: '4-12 weeks' },
        { value: 'flexible', label: '12-16 weeks' },
      ]
    case 'complex':
      return [
        { value: 'standard', label: '6-8 months' },
        { value: 'flexible', label: '8-12 months' },
      ]
    case 'innovative':
      return [
        { value: 'flexible', label: '8-12 months' },
        { value: 'extensive', label: '12+ months' },
      ]
    default:
      return []
  }
}

const getSecurityRequirementsByComplexity = (complexity) => {
  switch (complexity) {
    case 'simple':
      return [
        { value: 'ssl', label: 'SSL/TLS Encryption' },
        { value: 'backup', label: 'Automated Backups' },
        { value: 'gdpr', label: 'GDPR Compliance' },
        { value: 'Not Sure', label: 'Not Sure' },
      ]
    case 'medium':
      return [
        { value: 'ssl', label: 'SSL/TLS Encryption' },
        { value: 'backup', label: 'Automated Backups' },
        { value: 'gdpr', label: 'GDPR Compliance' },
        { value: 'encryption', label: 'Data Encryption' },
        { value: 'Not Sure', label: 'Not Sure' },
      ]
    case 'complex':
      return [
        { value: 'ssl', label: 'SSL/TLS Encryption' },
        { value: 'oauth', label: 'OAuth/SSO Integration' },
        { value: '2fa', label: 'Two-Factor Authentication' },
        { value: 'audit', label: 'Security Auditing' },
        { value: 'backup', label: 'Automated Backups' },
        { value: 'gdpr', label: 'GDPR Compliance' },
        { value: 'encryption', label: 'Data Encryption' },
        { value: 'Not Sure', label: 'Not Sure' },
      ]
    case 'innovative':
      return [
        { value: 'ssl', label: 'SSL/TLS Encryption' },
        { value: 'oauth', label: 'OAuth/SSO Integration' },
        { value: '2fa', label: 'Two-Factor Authentication' },
        { value: 'audit', label: 'Security Auditing' },
        { value: 'backup', label: 'Automated Backups' },
        { value: 'gdpr', label: 'GDPR Compliance' },
        { value: 'encryption', label: 'Data Encryption' },
        { value: 'Not Sure', label: 'Not Sure' },
      ]
    default:
      return []
  }
}

const stepTitles = {
  1: 'Project Complexity',
  2: 'Project Details',
  3: 'Technical Requirements',
  4: 'Timeline & Budget',
  5: 'Contact Information',
}

const formInitialValues = {
  // Step 1: Project Complexity
  projectType: '',

  // Step 2: Project Details
  businessGoals: '',
  estimatedUsers: '',
  targetMarket: '',

  // Step 3: Technical Features
  requiredFeatures: [],
  securityRequirements: [],

  // Step 4: Timeline & Budget
  timeline: '',
  developmentApproach: '',
  budget: '',

  // Step 5: Contact Details
  name: '',
  email: '',
  phone: '',
  company: '',
}

export function QuotationForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(formInitialValues)
  const [sent, setSent] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [quote, setQuote] = useState('')
  const [readyToSubmit, setReadyToSubmit] = useState(false)
  const [ errors, setErrors ] = useState( {} )
  const [ isStarted, setIsStarted ] = useState( false )
  
  const formTitleRef = useRef( null )
  

  const scrollToTitle = () => {
    formTitleRef.current?.scrollIntoView({ behavior: 'smooth' })
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

  const validateStep = (stepNumber) => {
    const newErrors = {}

    switch (stepNumber) {
      case 1:
        if (!formData.projectType)
          newErrors.projectType = 'Please select project complexity'
        break

      case 2:
        if (!formData.businessGoals)
          newErrors.businessGoals = 'Please describe your project'
        if (!formData.estimatedUsers)
          newErrors.estimatedUsers = 'Please select estimated users'
        if (!formData.targetMarket)
          newErrors.targetMarket = 'Please select target market'
        break

      case 3:
        if (!formData.requiredFeatures?.length)
          newErrors.requiredFeatures = 'Please select at least one feature'
        if (!formData.securityRequirements?.length)
          newErrors.securityRequirements = 'Please select security requirements'
        break

      case 4:
        if (!formData.timeline)
          newErrors.timeline = 'Please select development timeline'
        if (!formData.developmentApproach)
          newErrors.developmentApproach = 'Please select development approach'
        if (!formData.budget) newErrors.budget = 'Please select budget range'
        break

      case 5:
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

  const InitialStep = () => (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      <div className="text-center">
        <p className="text-4xl">↓</p>
        {/* <h2 className="font-display text-3xl font-semibold text-neutral-950">
          Get Your Project Quote
        </h2> */}
        <p className="mt-2 text-lg text-neutral-500">
          Answer a few questions to receive a detailed project estimate
        </p>
      </div>
      <Button type="button" onClick={() => setIsStarted(true)} className="mt-8">
        Start Questionnaire →
      </Button>
    </div>
  )

  const renderStep1 = () => (
    <div className="isolate -space-y-px rounded-2xl bg-white">
      <SelectInput
        label="Project Complexity"
        name="projectType"
        value={formData.projectType}
        onChange={handleChange}
        required
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
        tooltip="Select the complexity level that best matches your project requirements, based on your project's scope and features.<hr> <b>'Simple'</b>  for a basic company website,<br> <b>'Medium'</b> for an e-commerce site,<br> <b>'Complex'</b> for a large marketplace,<br><b>'Innovative'</b>  for AI-driven platforms."
        error={errors.projectType}
      />
      {formData.projectType && (
        <div className="mt-4 rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-600">
            {projectTypeDescriptions[formData.projectType]}
          </p>
        </div>
      )}
    </div>
  )

  const renderStep2 = () => (
    <div className="isolate -space-y-px rounded-2xl bg-white">
      <TextArea
        label="Business Goals & Project Description:"
        placeholder="Describe your project's purpose, target audience, and key objectives."
        name="businessGoals"
        value={formData.businessGoals}
        onChange={handleChange}
        required
        tooltip="Describe your project's purpose, target audience, and key objectives.<hr><b>Example:</b><br>We need an online booking system for our dental practice that can handle 500 monthly appointments, allow patients to select services, and integrate with our existing patient database."
        error={errors.businessGoals}
      />
      <SelectInput
        label="Target Market"
        name="targetMarket"
        value={formData.targetMarket}
        onChange={handleChange}
        required
        options={[
          { value: 'internal', label: 'Internal Tool (Company use only)' },
          { value: 'regional', label: 'Regional (Specific country/region)' },
          { value: 'global', label: 'Global (International audience)' },
        ]}
        tooltip="Choose your primary user base. This affects localization and hosting requirements.<hr><b>Internal:</b> employee portals, company tools<br><b>Regional:</b> country-specific services<br><b>Global:</b> worldwide platforms"
        error={errors.targetMarket}
      />
      <SelectInput
        label="Estimated Monthly Users"
        name="estimatedUsers"
        value={formData.estimatedUsers}
        onChange={handleChange}
        required
        options={
          formData.projectType === 'simple'
            ? [
                { value: 'minimal', label: 'Under 100 monthly users' },
                { value: 'small', label: '100 - 500 monthly users' },
              ]
            : formData.projectType === 'medium'
            ? [
                { value: 'small', label: '500 - 5,000 monthly users' },
                { value: 'medium', label: '5,000 - 20,000 monthly users' },
              ]
            : formData.projectType === 'complex'
            ? [
                { value: 'large', label: '20,000 - 100,000 monthly users' },
                { value: 'enterprise', label: '100,000+ monthly users' },
              ]
            : formData.projectType === 'innovative'
            ? [
                { value: 'enterprise', label: '100,000+ monthly users' },
                { value: 'massive', label: 'Millions of monthly users' },
              ]
            : []
        }
        tooltip="Estimate your expected user base to determine server capacity and infrastructure needs.<hr><b>Consider:</b><br>• Initial launch users<br>• Growth potential<br>• Peak usage times"
        error={errors.estimatedUsers}
      />
    </div>
  )

  const renderStep3 = () => (
    <div className="isolate -space-y-px rounded-2xl bg-white">
      <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl">
        <CheckboxGroup
          label="Required Features"
          options={getFeaturesByComplexity(formData.projectType)}
          values={formData.requiredFeatures}
          onChange={(e) => handleCheckboxChange(e, 'requiredFeatures')}
          required
          tooltip="Select core functionalities needed for your project.<hr><b>Note:</b> Focus on essential features that directly support your business goals. Additional features can be added in future updates."
          error={errors.requiredFeatures}
        />
      </div>
      <div className="border border-neutral-300 px-6 py-8">
        <CheckboxGroup
          label="Security Requirements"
          options={getSecurityRequirementsByComplexity(formData.projectType)}
          values={formData.securityRequirements}
          onChange={(e) => handleCheckboxChange(e, 'securityRequirements')}
          required
          tooltip="Choose security features based on your data sensitivity and compliance needs.<hr><b>Examples:</b><br>• E-commerce: SSL, payment security<br>• Healthcare: HIPAA compliance<br>• Enterprise: SSO, audit trails"
          error={errors.securityRequirements}
        />
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="isolate -space-y-px rounded-2xl bg-white">
      <SelectInput
        label="Development Timeline"
        name="timeline"
        value={formData.timeline}
        onChange={handleChange}
        required
        options={getTimelineByComplexity(formData.projectType)}
        tooltip="Estimated development duration based on project complexity.<hr><b>Factors:</b><br>• Feature complexity<br>• Team size<br>• Testing requirements<br><b>Note:</b> Faster development may require more resources"
        error={errors.timeline}
      />
      <SelectInput
        label="Development Approach"
        name="developmentApproach"
        value={formData.developmentApproach}
        onChange={handleChange}
        required
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
        tooltip="Choose your preferred development strategy.<hr><b>MVP First:</b> Quick launch with core features<br><b>Complete Product:</b> All features at launch<br><b>Phased:</b> Gradual feature rollout based on feedback"
        error={errors.developmentApproach}
      />
      <div className="border border-neutral-300 px-6 py-8">
        <fieldset onChange={handleChange}>
          <legend className="text-base/6 text-neutral-500">
            Budget Range <span className="text-red-500">*</span>
          </legend>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {getBudgetRangeByComplexity(formData.projectType).map((option) => (
              <RadioInput
                key={option.value}
                label={option.label}
                name="budget"
                value={option.value}
                checkedValue={formData.budget}
              />
            ))}
          </div>
        </fieldset>
        {errors.budget && (
          <p className="mt-2 text-sm text-red-600">{errors.budget}</p>
        )}
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="isolate -space-y-px rounded-2xl bg-white">
      <TextInput
        label="Name"
        name="name"
        autoComplete="name"
        value={formData.name}
        onChange={handleChange}
        required
        
        error={errors.name}
      />
      <TextInput
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
        required
        
        error={errors.email}
      />
      <TextInput
        label="Company"
        name="company"
        autoComplete="organization"
        value={formData.company}
        onChange={handleChange}
        required
        
        error={errors.company}
      />
      <TextInput
        label="Phone"
        type="tel"
        name="phone"
        autoComplete="tel"
        value={formData.phone}
        onChange={handleChange}
        required
        
        error={errors.phone}
      />
    </div>
  )

  const handleNextStep = () => {
    // Only validate current step if we're not moving to the final step
    if (step === 4 || validateStep(step)) {
      setStep((prev) => prev + 1)
      scrollToTitle()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!readyToSubmit) {
      if (validateStep(5)) {
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
    <form onSubmit={handleSubmit}>
      {!isStarted ? (
        <InitialStep />
      ) : (
        <>
          <div className="flex items-center justify-between" ref={formTitleRef}>
            <h2 className="font-display text-base font-semibold text-neutral-950">
              <p className="text-4xl">↓</p>
              {/* <p className="text-sm font-normal">Start Now:</p> */}
              {sent
                ? `Quote Sent to your email ${formData.email} ✓`
                : readyToSubmit
                ? 'Review Your Details'
                : stepTitles[step]}
            </h2>
            {!sent && (
              <span className="text-sm text-neutral-500">Step {step} of 5</span>
            )}
          </div>

          {!sent && (
            <div className="mt-6">
              <div className="border-1 mb-10 h-2 w-full rounded-full border-neutral-100 bg-neutral-100">
                <div
                  className="h-2 rounded-full bg-neutral-950 transition-all duration-300"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>

              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}
              {step === 5 && renderStep5()}

              <div className="mt-10 flex justify-between gap-4">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setStep((prev) => prev - 1)
                      setReadyToSubmit(false)
                      scrollToTitle()
                    }}
                  >
                    ← Previous
                  </Button>
                )}

                {step < 5 ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="ml-auto"
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
            <div className="mt-6 rounded-2xl border border-neutral-300 bg-white px-6 py-8">
              <h3 className="text-base/6">{renderMarkdown(quote)}</h3>
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
                scrollToTitle()
                setIsStarted(false) // Added this line to return to initial step
              }}
            >
              Get Another Quote
            </Button>
          )}
        </>
      )}
    </form>
  )
}

export default QuotationForm

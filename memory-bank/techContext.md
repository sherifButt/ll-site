# Technical Context: Loyal Leads Website

## Core Technologies

### Frontend
- **Next.js**: Core framework (App Router)
- **React**: UI library
- **Tailwind CSS**: Styling framework
- **MDX**: For blog content and documentation pages

### Backend
- **Next.js API Routes**: Server-side functionality
- **Node.js**: Runtime environment

### Integrations
- **ChatGPT API**: For chat functionality
- **Email Service**: For form submissions
- **Zapier**: For workflow automation
- **n8n**: For additional workflow automation

## Development Setup
- **Package Manager**: npm
- **Build Tool**: Next.js built-in build system
- **Deployment**: Likely using Vercel (based on Next.js usage)
- **Environment Variables**: .env file for configuration

## File Structure
```
/src
  /app - Next.js App Router pages
  /components - Reusable React components
  /images - Static images
  /lib - Utility functions
  /styles - CSS and Tailwind styles
/public - Static assets
/docs - Documentation
/scripts - Utility scripts
```

## Dependencies
Key dependencies include:
- next
- react/react-dom
- tailwindcss
- MDX-related packages
- API integration libraries

## Development Patterns
- Component-based architecture
- CSS modules for component-specific styling
- Utility functions in `/lib` directory
- API routes for backend functionality

## Technical Constraints
- SEO considerations for content pages
- Performance optimization for images and page loading
- Responsive design requirements for mobile compatibility
- API rate limits for external services

## Build & Deployment
- Development server: `npm run dev`
- Production build: `npm run build`
- Likely deployed to Vercel or similar platform
- Environment variables for configuration

This document provides the technical foundation and context for the Loyal Leads website, outlining the technologies, patterns, and constraints that influence development decisions.

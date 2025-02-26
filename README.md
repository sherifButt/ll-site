# Loyalleads

Loyalleads is a [Tailwind UI](https://tailwindui.com) site template built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Features

- Responsive design using Tailwind CSS
- Blog and work case studies with MDX content
- Dynamic content API for adding new content via n8n workflows
- Contact form with email integration
- SEO optimized with metadata

## Getting started

To get started with this template, first install the npm dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Customizing

You can start editing this template by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

## License

This site template is a commercial product and is licensed under the [Tailwind UI license](https://tailwindui.com/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Framer Motion](https://www.framer.com/docs/) - the official Framer Motion documentation
- [MDX](https://mdxjs.com/) - the official MDX documentation
- [n8n](https://docs.n8n.io/) - the official n8n documentation

## Dynamic Content API

This site includes a dynamic content API that allows you to add new blog posts and work case studies programmatically using n8n workflows. This enables you to:

1. Create new content via API endpoints
2. Upload associated images
3. Automatically revalidate the site to make new content visible immediately
4. Optionally commit changes to the git repository

### Documentation

For detailed information on using the dynamic content API, see the following documentation:

- [Dynamic Content Guide](./docs/dynamic-content-guide.md) - Overview of the dynamic content API
- [n8n Workflow Guide](./docs/n8n-workflow-guide.md) - Step-by-step guide for setting up n8n workflows
- [Troubleshooting Guide](./docs/troubleshooting.md) - Solutions for common issues

### Environment Variables

To use the dynamic content API, add the following environment variables to your `.env` file:

```
CONTENT_API_KEY=your-secure-api-key
NEXT_PUBLIC_BASE_URL=https://your-site.com
ENABLE_GIT_OPERATIONS=true
GIT_USER_NAME=your-git-username
GIT_USER_EMAIL=your-git-email
```

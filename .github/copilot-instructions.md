# GitHub Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a SPA (Single Page Application) for product management built with Next.js, TypeScript, and Zustand.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **State Management**: Zustand with persist middleware
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **API**: Fake Store API for demo data
- **Deployment**: GitHub Pages (static export)

## Code Style Guidelines

- Use functional components with hooks
- Implement proper TypeScript typing
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling
- Implement responsive design (mobile-first)
- Use Zustand for state management
- Validate forms with React Hook Form

## Component Structure

- Keep components in `/src/components/`
- Use 'use client' directive for client components
- Export components as named exports
- Implement proper error handling
- Include loading states where appropriate

## State Management

- Use Zustand store in `/src/store/`
- Implement persist middleware for data persistence
- Type all store actions and state
- Keep state minimal and normalized

## Routing

- Use Next.js App Router
- Implement dynamic routes for product details
- Use proper navigation with Next.js Link and useRouter
- Handle 404 states gracefully

## API Integration

- Use Fake Store API for external data
- Implement proper error handling
- Show loading states during data fetching
- Handle network errors gracefully

## Accessibility

- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation
- Maintain color contrast standards

## Performance

- Optimize images with Next.js Image component
- Implement pagination for large lists
- Use proper caching strategies
- Minimize bundle size

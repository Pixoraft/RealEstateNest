# Real Estate Portal - Replit Project Guide

## Overview

This is a full-stack real estate portal application featuring property listings, contact forms, EMI calculator, and property search functionality. The application targets the Indian real estate market with features like Vastu compliance, BHK configurations, and Indian pricing formats.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with Shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Pattern**: RESTful API endpoints
- **Session Management**: Express sessions with PostgreSQL store

### Component Structure
- Modern component-based architecture using functional components
- Custom hooks for reusable logic
- Shadcn/ui components for consistent design system
- Responsive design with mobile-first approach

## Key Components

### Database Schema
The application uses two main tables:
- **Properties**: Stores property details including pricing, location, amenities, and features
- **Contact Inquiries**: Manages user inquiries and contact form submissions

### Property Features
- Indian market-specific attributes (BHK config, Vastu compliance, carpet area)
- Premium, luxury, and featured property categorization
- Comprehensive property details including images and contact information

### User Interface Components
- Header with smooth scrolling navigation
- Hero section with call-to-action buttons
- Property listing cards with filtering
- EMI calculator for loan calculations
- Contact form with validation
- Testimonials and realtor bio sections
- Google Maps integration for office location
- WhatsApp integration for instant communication

### API Endpoints
- `GET /api/properties` - Retrieve all properties
- `GET /api/properties/featured` - Get featured properties
- `GET /api/properties/:id` - Get specific property details
- `GET /api/properties/search` - Search properties with filters
- `POST /api/contact` - Submit contact inquiry

## Data Flow

1. **Property Data**: Stored in PostgreSQL, served via Express API, consumed by React frontend
2. **User Interactions**: Form submissions handled by React Hook Form, validated with Zod schemas
3. **Search/Filtering**: Query parameters sent to backend, filtered results returned
4. **Real-time Updates**: TanStack Query manages caching and background updates

## External Dependencies

### Core Dependencies
- **Database**: Drizzle ORM with PostgreSQL dialect
- **UI Components**: Radix UI primitives with Shadcn/ui styling
- **Validation**: Zod for runtime type checking and form validation
- **Date Handling**: date-fns for date manipulation
- **Styling**: Tailwind CSS with custom Indian color palette

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **ESBuild**: Fast bundling for production builds
- **Vite**: Development server with hot module replacement

### Third-party Integrations
- **WhatsApp**: Direct messaging integration for property inquiries
- **Google Maps**: Office location and directions
- **Image Hosting**: Unsplash URLs for property images (placeholder)

## Deployment Strategy

### Build Process
- Frontend: Vite builds static assets to `dist/public`
- Backend: ESBuild bundles server code to `dist/index.js`
- Database: Drizzle Kit handles schema migrations

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)

### Development Workflow
- `npm run dev`: Start development server with hot reload
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run db:push`: Push database schema changes

### Production Considerations
- Static file serving through Express for SPA routing
- Error handling middleware for API endpoints
- Database connection pooling through Neon serverless
- Environment-specific logging and debugging tools

The application follows a monorepo structure with shared TypeScript types and schemas between frontend and backend, ensuring type safety across the entire stack.
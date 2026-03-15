# Meta Finding Houses

A modern web application for discovering, comparing, and saving homes. Browse listings, explore neighborhoods, and manage your favorite properties with an intuitive interface.

## Features

- **Home Discovery** - Browse available home listings with detailed information
- **Neighborhood Insights** - Explore neighborhood details and community activity
- **HomeBoard** - Save and compare your favorite properties side-by-side
- **Verified Q&A** - Access questions and answers from verified residents
- **Responsive Design** - Optimized for mobile and desktop devices
- **Smooth Transitions** - Page transitions and skeleton loaders for a polished UX

## Tech Stack

- **React** 18.3 - UI library
- **TypeScript** - Type-safe development
- **Vite** 6.0 - Fast build tool with HMR
- **React Router** - Client-side routing
- **Tailwind CSS** 4.0 - Utility-first styling
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality:

```bash
npm run lint
```

## Project Structure

```
src/
├── pages/
│   ├── Home.tsx          - Home listings page
│   ├── Discover.tsx      - Property discovery
│   ├── Neighborhood.tsx  - Neighborhood information
│   └── HomeBoard.tsx     - Saved properties comparison
├── components/
│   ├── BottomNav.tsx     - Navigation bar
│   ├── PageTransition.tsx - Page transition effects
│   └── SkeletonLoader.tsx - Loading skeleton UI
└── App.tsx               - Main application component
```

## Available Routes

- `/` - Home page with featured listings
- `/discover` - Property discovery page
- `/neighborhood` - Neighborhood explorer
- `/homeboard` - Saved homes comparison
- `/search` - Search functionality
- `/saved` - Saved properties
- `/messages` - Messaging system
- `/profile` - User profile

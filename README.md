# Ox Blog

[Ox Blog](https://dec-oxoi.com/) is my personal website and a project I built while learning React.js.

Rather than creating a collection of isolated tutorial exercises, I use this website as a practical playground for exploring how a React application is structured, how data moves between components, and how external content can be transformed into a static web experience.

The project is still evolving alongside my understanding of React, TypeScript, frontend architecture, and web tooling.

## What I Am Learning

This project has given me hands-on experience with the following concepts:

### React fundamentals

- Building the interface from small, reusable components
- Composing larger page sections from nested components
- Rendering different UI states conditionally
- Separating application structure, data collection, routing, and presentation
- Using React Strict Mode during development

### React Hooks

- `useEffect` for synchronising application data and route state
- `useRef` for preserving values between renders without causing another render
- `useId` for generating identifiers
- React Router hooks such as `useLocation` and `useNavigate`

### Routing and URL state

The website uses React Router for client-side navigation. Page state can be represented through URL parameters, allowing article selections and navigation state to survive refreshes and direct links.

The routing layer also translates older paths into the current URL format.

### Shared application data

I created a small event-driven `DataHub` as an experiment in sharing data between otherwise separate parts of the component tree.

It stores values by key and notifies registered listeners when data changes. This helped me understand the problems that state-management libraries and React Context are designed to solve.

### Rendering and hydration

The application supports both:

- `createRoot` for normal client-side rendering
- `hydrateRoot` when the root element already contains generated HTML

This allowed me to explore the difference between rendering a React application from scratch and attaching React to existing markup.

### Working with external data

The website collects content from two main sources:

- WordPress REST API for blog posts, tags, and categories
- GitHub REST API for repository information, README files, and codebase trees

Node.js scripts download this information before development or production builds and save it as JSON snapshots. The React application then reads the generated local data instead of requesting every item from the browser at runtime.

This approach taught me about:

- REST API requests
- Pagination
- Concurrent asynchronous operations
- Build-time data generation
- JSON transformation
- Static snapshots and client-side consumption

### TypeScript

TypeScript is used throughout the frontend to model application data and make component behaviour more explicit.

The project includes typed payload objects, maps, route parameters, component state, and shared utilities.

## Website Features

- Personal profile and portfolio sections
- Blog content loaded from WordPress
- Article filtering through categories and tags
- Article pages with Markdown and GitHub Flavoured Markdown support
- GitHub repository information and README rendering
- Navigable repository file trees
- Client-side routing with linkable application state
- Build-time WordPress and GitHub snapshots
- Animated interface elements

## Technology Stack

| Area | Technology |
| --- | --- |
| UI | React 19 |
| Language | TypeScript |
| Build tool | Vite |
| Routing | React Router |
| Styling | CSS and styled-components |
| Animation | Motion |
| Markdown | react-markdown, remark-gfm, rehype-raw |
| Content | WordPress REST API |
| Repository data | GitHub REST API |
| Data generation | Node.js scripts |

## Project Structure

The source directory is organised into numbered application sections so that the major layers remain visually grouped:

```text
src/
├── 01-App/                  # Application root and data initialisation
├── 02-AppRoutesController/  # URL and navigation synchronisation
├── 03-Header/               # Header components
├── 04-BodyArea/             # Main page and content sections
├── 99-generated/            # Generated WordPress and GitHub snapshots
├── 99-shared/               # Shared data models and utilities
└── 99-css/                  # Shared and WordPress-related styles
```

The numbering is an organisational experiment rather than a standard React convention.

## Getting Started

### Requirements

- Node.js
- npm
- A GitHub access token for generating the GitHub snapshot

### Installation

```bash
git clone https://github.com/Oxoi5583/ox-blog.git
cd ox-blog
npm install
```

The GitHub snapshot script reads its token from `auth/github.json`. This file is excluded from Git and must never be committed.

The project currently expects the following structure:

```json
{
  "accessToekn": "YOUR_GITHUB_ACCESS_TOKEN"
}
```

Then start the development server:

```bash
npm run dev
```

Before Vite starts, the project generates fresh WordPress and GitHub snapshots.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Generate data snapshots and start the Vite development server |
| `npm run snapshot` | Generate the WordPress and GitHub JSON snapshots |
| `npm run build` | Generate snapshots, run the TypeScript build, and create a production bundle |
| `npm run lint` | Run ESLint across the project |
| `npm run preview` | Preview the production build locally |

## Project Status

This is an active learning project and my personal website, not a finished React framework or a reference architecture.

Some parts intentionally reflect experiments with component organisation, shared state, routing, build pipelines, and data handling. I expect the implementation to change as I learn better approaches and understand more of React's underlying behaviour.

# REALMS-OF-GOD
A modern, AI-powered web application built for the REALMS-OF-GOD NGO.

# 📖 Overview
The REALMS-OF-GOD repository houses the frontend and server architecture for an NGO website. Built with cutting-edge web technologies and deeply integrated with Google AI Studio (Gemini API), this application provides a robust, fast, and intelligent platform to support the organization's global mission.

This project utilizes a Vite + TypeScript frontend environment, coupled with a customized Node server architecture, ensuring strict type safety, lightning-fast HMR (Hot Module Replacement), and scalable production builds.

# Tech Stack
Core: TypeScript (99.2% of the codebase)

Bundler/Tooling: Vite

Package Management: NPM / Bun (includes bun.lock and package.json)

AI Integration: Google Gemini API (via Google AI Studio)

Backend/Serving: Custom Node setup (server.ts)

# Project Structure

REALMS-OF-GOD/
├── public/             # Static assets (images, favicons, etc.)
├── src/                # Application source code (components, logic, styles)
├── .env.local          # Environment variables (git-ignored)
├── bun.lock            # Bun lockfile for deterministic dependency resolution
├── index.html          # Main HTML entry point
├── package.json        # Project metadata and npm scripts
├── server.ts           # Custom server configuration
├── tsconfig.json       # TypeScript compiler configuration
└── vite.config.ts      # Vite bundler configuration
Getting Started
Follow these instructions to set up the project locally for development and testing.

Prerequisites
Ensure you have the following installed on your local machine:

Node.js (v18.0.0 or higher recommended)

npm (or Bun, as the project supports both)

A valid Google Gemini API Key

1. Clone the Repository
Bash
git clone https://github.com/Damilola145/REALMS-OF-GOD.git
cd REALMS-OF-GOD
2. Install Dependencies
You can use standard NPM (as per the default scripts) or Bun if you prefer a faster installation utilizing the existing bun.lock.

Bash
npm install
# OR
bun install
3. Environment Configuration
This application requires a Google Gemini API key to function.
Create a .env.local file in the root directory of the project and add your key:

Bash
touch .env.local
Inside .env.local, add the following:

Code snippet
GEMINI_API_KEY=your_gemini_api_key_here
4. Run the Development Server
Start the Vite development server with Hot Module Replacement:

Bash
npm run dev
# OR
bun run dev
The application will be available at http://localhost:5173 (or the port specified by Vite in your terminal).

☁️ Deployment & AI Studio Integration
This application is seamlessly connected to Google AI Studio.

Live App Workspace: You can view, manage, and configure the underlying AI models directly in your AI Studio Dashboard.

Production Build: To prepare the app for deployment, run npm run build. This will compile the TypeScript and generate static assets in a dist/ directory, ready to be served by any static hosting provider (Vercel, Netlify, Cloudflare Pages, etc.).

🤝 Contributing
Fork the project.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📄 License
Distributed under the MIT License. See LICENSE for more information.

Maintained by @Damilola145

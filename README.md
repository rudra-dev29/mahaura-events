# Mah'aura Events

A premium event management and gallery platform built with React, TypeScript, and Firebase. Mah'aura Events provides a stunning user interface for browsing events, viewing galleries, and includes an admin dashboard for managing event content and images.

## Features

- **Responsive Landing Page** - Beautiful hero section with luxury and nebula backgrounds
- **Image Gallery** - Dynamic gallery showcase with Cloudinary integration
- **Admin Dashboard** - Secure admin panel for managing gallery content
- **Admin Authentication** - Secure login system for admin access
- **Image Upload** - Upload and manage images via Cloudinary
- **AI Integration** - Google Genai API integration for enhanced functionality
- **Real-time Database** - Firebase Firestore for data management
- **Cloud Functions** - Serverless backend with Firebase Cloud Functions
- **Express Server** - Custom server for API routes and file handling

## Prerequisites

- **Node.js** (v24 or higher)
- **npm** or **yarn** package manager
- **Firebase Account** with a Firestore project
- **Cloudinary Account** for image hosting and management
- **Google Genai API Key** for AI features
- Git (for version control)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd mahaura-events
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Cloud Functions dependencies:**
   ```bash
   cd functions
   npm install
   cd ..
   ```

## Setup

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_API_KEY=your_cloudinary_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### Firebase Configuration

1. Create a `.env.local` file in the `functions` directory with your Firebase credentials
2. Ensure your Firebase project has:
   - Firestore Database enabled
   - Cloud Functions enabled
   - Hosting configured

### Admin Authentication

Configure admin credentials in your Firestore database for the admin login system.

## Usage

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create an optimized production build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Lint

Check TypeScript types and identify potential issues:

```bash
npm run lint
```

### Cloud Functions

**Build Cloud Functions:**
```bash
cd functions
npm run build
```

**Run Functions Emulator locally:**
```bash
npm run serve
```

**Deploy Functions to Firebase:**
```bash
npm run deploy
```

**View Function Logs:**
```bash
npm run logs
```

## Project Structure

```
mah'aura-events/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── About.tsx
│   │   ├── CloudinaryImage.tsx
│   │   ├── Contact.tsx
│   │   ├── CTA.tsx
│   │   ├── Edge.tsx
│   │   ├── Footer.tsx
│   │   ├── Gallery.tsx
│   │   ├── GalleryGrid.tsx
│   │   ├── Hero.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── LuxuryBackground.tsx
│   │   ├── Navbar.tsx
│   │   ├── NebulaBackground.tsx
│   │   └── Services.tsx
│   ├── pages/               # Page components
│   │   ├── AdminGallery.tsx
│   │   ├── AdminLogin.tsx
│   │   └── LandingPage.tsx
│   ├── App.tsx              # Main application component
│   ├── firebase.ts          # Firebase configuration
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles
│   └── types.ts             # TypeScript type definitions
├── functions/               # Firebase Cloud Functions
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── public/                  # Static assets
│   └── index.html
├── firebase.json            # Firebase configuration
├── vite.config.ts           # Vite build configuration
├── tsconfig.json            # TypeScript configuration
├── server.ts                # Express server
├── package.json
└── README.md
```

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS
- **Backend:** Firebase Cloud Functions, Express.js
- **Database:** Firestore
- **Hosting:** Firebase Hosting
- **Image Management:** Cloudinary
- **AI:** Google Genai API
- **Styling:** Tailwind CSS, Motion animations
- **File Upload:** Multer
- **Routing:** React Router v7

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

Please ensure:
- Code follows the project's TypeScript strict mode
- Changes are tested locally
- Commit messages are clear and descriptive

## Build & Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
npm run build
firebase deploy
```

This will:
1. Build the Vite frontend bundle
2. Deploy Cloud Functions
3. Deploy the static site to Firebase Hosting

## Troubleshooting

- **Dependencies issues:** Delete `node_modules` and `package-lock.json`, then run `npm install`
- **Build errors:** Ensure TypeScript compilation passes with `npm run lint`
- **Firebase errors:** Verify `.env.local` contains all required Firebase credentials
- **Image issues:** Check Cloudinary credentials and API permissions

## License

This project is proprietary. All rights reserved.

## Support

For issues, questions, or feature requests, please contact the development team or open an issue in the repository.

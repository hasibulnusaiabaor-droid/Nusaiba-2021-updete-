# Nusaiba App - Video Platform

A modern video platform built with React, TypeScript, and Tailwind CSS, featuring high-quality video playback and HD streaming capabilities.

## Features

### 🎥 Video Quality Settings
- **HD Quality Control**: Choose from Auto, 1080p Full HD, 720p HD, or 480p SD
- **Smart Auto-Detection**: Automatically selects the best quality based on your connection
- **HD Enhancement**: AI-powered video upscaling for better visual quality
- **Low Latency Mode**: Optimized streaming for live content and gaming
- **Quality Indicators**: Visual badges showing current video quality

### 🎬 Video Components
- **VideoCard**: Displays videos in both regular (YouTube-style) and short (TikTok-style) formats
- **VideoPlayer**: Full-screen video player with advanced controls
- **Quality Settings Panel**: Accessible via settings button on each video

### 🎛️ How to Use Quality Settings

1. **Access Settings**: Click the settings gear icon (⚙️) on any video card
2. **Select Quality**: Choose your preferred video quality from the dropdown
3. **Toggle Features**: Enable/disable HD enhancement and low latency modes
4. **Auto Mode**: Let the system automatically choose the best quality for your connection

### 🎨 UI Components
- Modern, responsive design with Tailwind CSS
- Shadcn/ui component library
- Smooth animations and transitions
- Mobile-friendly interface

### 🔧 Technical Features
- React 18 with TypeScript
- Vite build system
- Tailwind CSS for styling
- Lucide React icons
- Responsive design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the app

## Video Quality Settings

The app includes comprehensive video quality controls:

- **Auto HD**: Smart quality selection (recommended)
- **1080p Full HD**: Maximum quality for high-speed connections
- **720p HD**: Balanced quality and performance
- **480p SD**: Lower quality for slower connections
- **HD Enhancement**: AI-powered video upscaling
- **Low Latency**: Optimized for live streaming

## Component Structure

```
src/
├── components/
│   ├── Video/
│   │   ├── VideoCard.tsx      # Video display with quality settings
│   │   └── VideoPlayer.tsx    # Full-screen video player
│   └── ui/                    # Shadcn/ui components
├── hooks/                     # Custom React hooks
├── types/                     # TypeScript type definitions
└── pages/                     # Application pages
```

## Contributing

Feel free to contribute to improve the video quality features or add new functionality!

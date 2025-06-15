# All-In: 3D Virtual Space for Couples

A private 3D virtual space designed for couples to spend quality time together, share memories, and plan their future.

## Features

- 🎮 Real-time 3D movement with avatars
- 💬 Proximity-based voice and text chat
- 🎵 Shared music player
- ⏰ Timezone-aware clock
- 📅 Couple calendar with milestones
- 🖼️ Memory gallery
- 📚 Virtual bookshelf for love letters

## Tech Stack

- Frontend: React + Three.js (@react-three/fiber)
- Styling: Tailwind CSS
- Animations: Framer Motion
- Backend: Firebase
- Real-time: Socket.IO / WebRTC
- State Management: Zustand

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/         # React components
│   ├── avatar/        # Avatar-related components
│   ├── calendar/      # Calendar components
│   ├── chat/          # Chat components
│   ├── gallery/       # Memory gallery components
│   ├── music/         # Music player components
│   └── ui/            # Shared UI components
├── scenes/            # Three.js scenes
├── models/            # 3D models and assets
├── hooks/             # Custom React hooks
├── store/             # Zustand store
├── services/          # Firebase and other services
├── utils/             # Utility functions
└── types/             # TypeScript type definitions
```

## License

MIT
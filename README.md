# Eco-Sync Dashboard Frontend

A modern, beautiful energy monitoring dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- 🌙 Dark theme with modern aesthetics
- 📊 Real-time energy consumption analytics
- 📱 Responsive design for all devices
- 🎨 Smooth animations and transitions
- 📈 Interactive charts and visualizations
- 🔄 Real-time data updates
- 🎯 Room-wise consumption breakdown
- 💡 Power consumer analysis

## 🎤 Voice Assistant Features

- **Real Backend Integration**: Controls actual virtual appliances stored in backend
- **Multilingual Support**: Speak in English, Hindi, Spanish, French, German, and more
- **Smart Device Control**: Control fans, lights, AC, and other appliances with voice
- **Natural Language Processing**: Powered by Google's Gemini AI
- **Respectful Communication**: Uses proper honorifics and polite language (आप, sir/madam, etc.)
- **Real-time Feedback**: Visual and audio confirmation of commands
- **Live State Sync**: Device states update in real-time across the system
- **Backend Health Monitoring**: Shows connection status and device count

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

## 🚀 Quick Start (Full System)

### Option 1: Automated Startup
Run the full system (backend + frontend) with one command:
```bash
# Windows
start-full-system.bat

# This will start:
# - Backend server on http://localhost:3000
# - Frontend dev server on http://localhost:5173
```

### Option 2: Manual Startup

1. **Start Backend Server:**
   ```bash
   cd backend
   node index.js
   ```

2. **Start Frontend (in new terminal):**
   ```bash
   npm run dev
   ```

## 🎤 Voice Assistant Usage

### Setup
1. Navigate to `/voice-demo` page
2. Enter your Gemini API key in settings
3. Grant microphone permissions when prompted

### Voice Commands Examples

**English (Polite):**
- "Please turn on the ceiling fan"
- "Could you switch off the bedroom light?"
- "What's my energy usage, please?"

**Hindi (Respectful with आप):**
- "आप पंखा चालू कर दीजिए" (Please turn on the fan)
- "आप बत्ती बंद कर दीजिए" (Please turn off the light)
- "आप मेरा बिजली का बिल बताइए" (Please tell me my electricity bill)

**Spanish (Formal):**
- "Por favor, enciende el ventilador"
- "¿Podría apagar las luces?"

**French (Polite):**
- "Pouvez-vous allumer le ventilateur?"
- "Éteignez les lumières, s'il vous plaît"

**German (Respectful):**
- "Könnten Sie bitte den Ventilator einschalten?"
- "Schalten Sie bitte das Licht aus"

### Testing
- Use "Test API Connection" to verify Gemini AI setup
- Use "Test Backend Integration" to verify voice → appliance control
- Check browser console for detailed test results

### Backend Integration

The frontend is configured to connect to the backend server running on `localhost:3000`. Make sure your backend server is running before starting the frontend.

## Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── Dashboard.tsx          # Main dashboard component
│   │   ├── DashboardHeader.tsx    # Header with user info and time
│   │   ├── OverviewCards.tsx      # Overview metric cards
│   │   ├── PowerConsumersChart.tsx # Power consumption pie chart
│   │   └── RoomConsumptionList.tsx # Room-wise consumption list
│   └── UI/
│       ├── Card.tsx               # Reusable card component
│       └── Icon.tsx               # Icon wrapper component
├── hooks/
│   └── useDashboardData.ts        # Data fetching hook
├── types/
│   └── dashboard.types.ts         # TypeScript type definitions
├── App.tsx                        # Main app component
├── index.tsx                      # App entry point
└── index.css                      # Global styles
```

## API Endpoints

The frontend expects the following API endpoints from the backend:

- `GET /api/dashboard/overview` - Dashboard overview data
- `GET /api/consumption/rooms` - Room consumption data
- `GET /api/consumption/top-consumers` - Top power consumers
- `GET /api/user/profile` - User profile data

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## Customization

### Colors

The color scheme can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#00d4ff',
    dark: '#0ea5e9',
  },
  secondary: {
    DEFAULT: '#10b981',
    light: '#22c55e',
  },
  // ... more colors
}
```

### Data Structure

The dashboard expects data in the format defined in `src/types/dashboard.types.ts`. Modify the mock data in `useDashboardData.ts` to match your backend API response.

## Deployment

1. Build the production version:
   ```bash
   npm run build
   ```

2. The build folder contains the production-ready files that can be deployed to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

# 🌱 KrishiPragati AI - Smart Agriculture Monitoring PWA

A **Progressive Web App (PWA)** built with **React.js** and **Tailwind CSS** for real-time agricultural field monitoring. Track soil conditions, crop health, and environmental parameters to make data-driven farming decisions.

![KrishiPragati AI Dashboard](https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=400&fit=crop)

## ✨ Features

### 🚀 Progressive Web App (PWA)
- **Offline Access**: Works without internet connectivity using service worker caching
- **Mobile Installation**: Install directly on mobile devices like a native app
- **Background Sync**: Automatic data synchronization when connection is restored
- **Push Notifications**: Firebase Cloud Messaging integration ready (placeholder implemented)

### 🌾 Agriculture-Focused Dashboard
- **Soil Monitoring**: Real-time soil moisture, temperature, and pH tracking
- **Crop Health**: Plant vitals, leaf moisture, and growth stage monitoring  
- **Field Management**: Multi-section field tracking with crop type identification
- **Environmental Data**: Weather conditions, humidity, and irrigation scheduling

### 📊 Data Visualization
- **Interactive Charts**: Real-time trend analysis using Recharts
- **Field Statistics**: Min/max/average calculations with trend indicators
- **Status Monitoring**: Visual alerts for irrigation needs and crop conditions
- **Historical Data**: 24-hour data retention with automatic refresh every 10 seconds

### 🎨 Modern UI/UX
- **Agriculture Theme**: Green/brown/yellow color palette inspired by farming
- **Responsive Design**: Mobile-first approach optimized for field use
- **Dark/Light Mode**: Adaptive themes for various lighting conditions
- **Touch-Friendly**: Large buttons and intuitive navigation for outdoor use

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Charts**: Recharts for data visualization
- **State Management**: TanStack Query for server state
- **Routing**: React Router v6
- **PWA**: Service Worker, Web App Manifest
- **Icons**: Lucide React (agriculture-themed icons)
- **Backend Integration**: FastAPI endpoints with Firebase data
- **Notifications**: Firebase Cloud Messaging (FCM) ready

## 📡 API Integration

### Backend Endpoints
- `GET /Sensor`: Retrieves soil monitoring data from Firebase `/sensors` node
- `GET /Sensor_1`: Retrieves crop health data from Firebase `/sensors_1` node

### Mock Data
Includes comprehensive mock agriculture data for development:
- Soil moisture, temperature, and pH sensors
- Crop health metrics with field section tracking
- Weather condition integration
- Irrigation scheduling data

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- FastAPI backend running (optional - mock data included)
- Modern web browser with PWA support

### Installation

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd krishipragati-ai-frontend
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your FastAPI backend URL
   ```

3. **Development Server**
   ```bash
   npm run dev
   # Access at http://localhost:5173
   ```

4. **PWA Testing**
   ```bash
   npm run build
   npm run preview
   # Test PWA features in production mode
   ```

### 📱 PWA Installation
1. Open the app in Chrome/Edge on mobile
2. Tap "Add to Home Screen" when prompted
3. The app will install like a native mobile app
4. Works offline after initial installation

## 🔧 Configuration

### Environment Variables (.env)
```bash
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:8000

# Firebase Configuration (for FCM - optional)
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# App Configuration
VITE_APP_NAME=KrishiPragati AI
VITE_APP_VERSION=1.0.0
```

### PWA Manifest Configuration
The `public/manifest.json` includes:
- Agriculture-themed branding and icons
- Standalone display mode for native app feel
- Theme colors matching the agriculture design system
- Offline capability declarations

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Navigation, AppLayout)
│   ├── sensors/        # Sensor-specific components
│   └── ui/            # Base UI components (shadcn/ui)
├── hooks/             # Custom React hooks
│   └── useSensorData.ts # Sensor data fetching hook
├── pages/             # Page components
│   ├── Dashboard.tsx   # Main agriculture dashboard
│   ├── SensorPage.tsx  # Soil monitoring page
│   └── Sensor1Page.tsx # Crop health page
├── services/          # API services
│   └── api.ts         # API client with agriculture mock data
├── types/             # TypeScript type definitions
│   └── sensor.ts      # Agriculture sensor data types
├── utils/             # Utility functions
│   ├── pwa.ts         # PWA service worker utilities
│   └── fcm.ts         # Firebase Cloud Messaging setup
├── lib/               # Helper functions
├── App.tsx           # Main application component
├── main.tsx          # Application entry point with PWA init
└── index.css         # Agriculture design system and styles
```

## 🌐 Deployment

### Build for Production
```bash
npm run build
# Creates optimized build in `dist/` directory
```

### Deployment Platforms

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Configure environment variables in Vercel dashboard
```

#### Netlify
```bash
# Build command: npm run build
# Publish directory: dist
# Add environment variables in Netlify dashboard
```

#### PWA-Specific Deployment Notes
- Ensure HTTPS is enabled (required for PWA features)
- Service worker will cache resources automatically
- Test offline functionality after deployment
- Configure proper headers for manifest.json

### 🔔 Firebase Cloud Messaging Setup

The app includes FCM integration placeholders. To enable push notifications:

1. **Firebase Project Setup**
   ```bash
   # Create Firebase project at https://console.firebase.google.com
   # Enable Cloud Messaging in project settings
   ```

2. **Configuration**
   ```typescript
   // Update src/utils/fcm.ts with your Firebase config
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

3. **Backend Integration**
   ```python
   # In your FastAPI backend, add FCM admin SDK
   # Send notifications for critical agricultural alerts:
   # - Soil moisture below threshold
   # - Temperature extremes
   # - Irrigation system failures
   # - Pest detection alerts
   ```

## 🧪 Testing

### Development Testing
```bash
# Run with mock data (no backend required)
npm run dev

# Test PWA features
npm run build && npm run preview
```

### Offline Testing
1. Load the app in Chrome
2. Open DevTools > Application > Service Workers
3. Check "Offline" checkbox
4. Refresh the page to test offline functionality
5. Data from last session should be available

### PWA Testing Checklist
- [ ] Installable on mobile devices
- [ ] Works offline after initial load
- [ ] Shows cached data when offline
- [ ] Displays proper agriculture branding
- [ ] Touch-friendly interface on mobile
- [ ] Service worker updates automatically

## 🌾 Agriculture Features

### Sensor Types Supported
- **Soil Sensors**: Moisture, temperature, pH, nutrient levels
- **Environmental**: Air temperature, humidity, light intensity
- **Crop Health**: Leaf wetness, growth stage indicators
- **Irrigation**: Water flow, pressure, scheduling

### Field Management
- Multi-section field tracking
- Crop type identification and monitoring
- Soil type classification
- Weather condition integration
- Irrigation scheduling and alerts

### Data Insights
- Real-time trend analysis
- Historical data comparison
- Threshold-based alerting
- Predictive analytics ready
- Export capabilities for reporting

## 🔌 Backend Integration

### FastAPI Endpoints

The application expects these agriculture-focused endpoints:

```python
# Soil monitoring data
GET /Sensor
Response: {
  "sensorId": "soil_001",
  "name": "Soil Monitor - Field A",
  "type": "soil",
  "readings": [
    {
      "id": "reading_001",
      "timestamp": "2024-01-15T10:30:00Z",
      "value": 65.2,
      "unit": "%",
      "status": "online",
      "location": "Field A - Section 1",
      "fieldSection": "A1",
      "cropType": "Wheat",
      "soilType": "Clay Loam",
      "weatherCondition": "Sunny"
    }
  ],
  "lastUpdated": "2024-01-15T10:30:00Z",
  "isOnline": true,
  "metadata": {
    "minValue": 20,
    "maxValue": 80,
    "threshold": 40,
    "fieldId": "field_a",
    "cropType": "Wheat",
    "soilType": "Clay Loam",
    "plantingDate": "2024-01-01",
    "irrigationSchedule": "Every 2 days"
  }
}

# Crop health data
GET /Sensor_1
Response: {
  "sensorId": "crop_001",
  "name": "Crop Health Monitor",
  "type": "crop",
  "readings": [...],
  "lastUpdated": "2024-01-15T10:30:00Z",
  "isOnline": true,
  "metadata": {...}
}
```

### CORS Configuration

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-krishipragati-ai-app.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🎨 Customization

### Agriculture Design System

The application uses an agriculture-themed design system:

```css
:root {
  /* Agriculture color palette */
  --primary: 120 60% 50%;        /* Forest Green */
  --secondary: 39 100% 50%;      /* Golden Yellow */
  --accent: 15 75% 45%;          /* Earthy Brown */
  --success: 142 76% 36%;        /* Growth Green */
  --warning: 45 93% 58%;         /* Harvest Orange */
  --destructive: 0 84% 60%;      /* Alert Red */
}
```

### Adding New Agricultural Sensors

1. **Update Types**: Add new sensor types in `src/types/sensor.ts`
2. **Create API Endpoint**: Add new endpoint in `src/services/api.ts`
3. **Add Agriculture Mock Data**: Include field-specific mock data
4. **Create Sensor Page**: Build agriculture-focused page component
5. **Update Navigation**: Add route with agriculture icons
6. **Add Field Information**: Include crop type, soil data, etc.

## 🐛 Troubleshooting

### PWA Issues

**App Not Installing**
- Ensure HTTPS is enabled
- Check manifest.json is accessible
- Verify service worker is registered
- Test in Chrome DevTools > Application

**Offline Mode Not Working**
- Check service worker status in DevTools
- Verify cache strategy in `public/sw.js`
- Ensure API responses are being cached

**Push Notifications Not Working**
- Configure Firebase properly
- Enable notifications in browser
- Check FCM token generation
- Verify backend FCM integration

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/agriculture-enhancement`
3. Commit changes: `git commit -m 'Add irrigation alerts'`
4. Push to branch: `git push origin feature/agriculture-enhancement`
5. Open a Pull Request

### Agriculture Development Guidelines

- Use agriculture-specific terminology and icons
- Consider farmer workflows and field conditions
- Optimize for outdoor mobile usage
- Include proper units for agricultural measurements
- Test with various weather and lighting conditions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Recharts](https://recharts.org/) for agricultural data visualization
- [Tailwind CSS](https://tailwindcss.com/) for responsive design system
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Lucide React](https://lucide.dev/) for agriculture-themed icons
- [TanStack Query](https://tanstack.com/query) for robust data management

## 📞 Support

For agriculture-specific features and farming integration support:
- Create an issue in the GitHub repository
- Check PWA debugging in browser DevTools
- Review the agriculture sensor documentation
- Test with provided mock farm data

---

**Built with 🌱 for modern agriculture using React, TypeScript, and PWA technologies**
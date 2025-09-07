# SensorHub - IoT Dashboard

A modern, real-time IoT sensor monitoring dashboard built with React.js, TypeScript, and Tailwind CSS. This application integrates with a FastAPI backend to display sensor data from Firebase in beautiful, responsive charts and cards.

![SensorHub Dashboard](https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=400&fit=crop)

## 🚀 Features

- **Real-time Monitoring**: Automatic data refresh every 10 seconds with manual refresh capability
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile
- **Interactive Charts**: Beautiful data visualization using Recharts with trend analysis
- **Multiple Sensors**: Support for temperature and humidity sensor monitoring
- **Error Handling**: Comprehensive error handling with loading states and fallback UI
- **Mock Data**: Built-in mock data for testing without backend connectivity
- **Modern UI**: Dark theme with glassmorphism effects and smooth animations
- **Firebase Integration**: Seamless connection to FastAPI backend with Firebase

## 🛠️ Technology Stack

- **Frontend**: React.js 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: React Router v6
- **HTTP Client**: Native Fetch API with error handling
- **UI Components**: Custom components with Radix UI primitives
- **Build Tool**: Vite
- **Package Manager**: npm/yarn

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- FastAPI backend running (optional - mock data available)
- Modern web browser with ES6+ support

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd sensorhub-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000

# Optional: Enable development features
VITE_DEV_MODE=true
```

**Environment Variables:**
- `VITE_API_BASE_URL`: Your FastAPI backend URL (defaults to `http://localhost:8000`)

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080`

### 5. Build for Production

```bash
npm run build
# or
yarn build
```

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
│   ├── Dashboard.tsx   # Main dashboard
│   ├── SensorPage.tsx  # Temperature sensor page
│   └── Sensor1Page.tsx # Humidity sensor page
├── services/          # API services
│   └── api.ts         # API client with mock data
├── types/             # TypeScript type definitions
│   └── sensor.ts      # Sensor data types
├── lib/               # Utility functions
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles and design system
```

## 🔌 Backend Integration

### FastAPI Endpoints

The application expects these endpoints from your FastAPI backend:

```python
# Temperature sensor data
GET /Sensor
Response: {
  "sensorId": "string",
  "name": "string",
  "type": "string",
  "readings": [...],
  "lastUpdated": "ISO string",
  "isOnline": boolean,
  "metadata": {...}
}

# Humidity sensor data  
GET /Sensor_1
Response: {
  "sensorId": "string", 
  "name": "string",
  "type": "string", 
  "readings": [...],
  "lastUpdated": "ISO string",
  "isOnline": boolean,
  "metadata": {...}
}
```

### CORS Configuration

Ensure your FastAPI backend has CORS configured:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Mock Data

The application includes comprehensive mock data that automatically activates when the backend is unavailable. This allows for:
- Frontend development without backend dependency
- Testing and demonstration purposes
- Offline functionality

## 🎨 Customization

### Design System

The application uses a custom design system defined in `src/index.css`:

```css
:root {
  /* Primary colors - customize for your brand */
  --primary: 189 100% 50%;        /* Cyan */
  --secondary: 217 91% 60%;       /* Blue */
  --accent: 270 95% 75%;          /* Purple */
  
  /* Status colors */
  --success: 142 76% 36%;         /* Green */
  --warning: 45 93% 58%;          /* Orange */
  --destructive: 0 84% 60%;       /* Red */
}
```

### Adding New Sensors

1. **Update Types**: Add new sensor types in `src/types/sensor.ts`
2. **Create API Endpoint**: Add new endpoint in `src/services/api.ts`
3. **Add Mock Data**: Include mock data for testing
4. **Create Page Component**: Build sensor-specific page
5. **Update Navigation**: Add route in `src/components/layout/Navigation.tsx`
6. **Update Routing**: Add route in `src/App.tsx`

### Custom Charts

Extend `src/components/sensors/SensorChart.tsx` with new chart types:

```tsx
// Add new chart type
type ChartType = 'line' | 'area' | 'bar' | 'gauge';

// Implement in component
{type === 'bar' && (
  <BarChart data={chartData}>
    {/* Chart configuration */}
  </BarChart>
)}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

1. Build the project: `npm run build`
2. Deploy `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "preview"]
```

## 🧪 Testing

### Mock Data Testing

The application includes comprehensive mock data that simulates:
- Temperature readings (18-35°C range)
- Humidity readings (30-80% range)
- Various sensor statuses (online, warning, offline)
- Realistic timestamps and trends

### Testing Without Backend

```bash
# Start with mock data (default behavior)
npm run dev

# The app will automatically use mock data if backend is unavailable
```

## 🐛 Troubleshooting

### Common Issues

**CORS Errors**
- Ensure FastAPI backend has CORS middleware configured
- Check that frontend URL is in allowed origins

**Environment Variables Not Loading**
- Ensure `.env` file is in project root
- Restart development server after changes
- Variables must start with `VITE_`

**Build Errors**
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check TypeScript errors: `npm run type-check`

**Chart Not Rendering**
- Check data format matches expected structure
- Ensure Recharts dependencies are installed
- Verify responsive container parent element

### Debug Mode

Enable debug logging by setting:

```env
VITE_DEV_MODE=true
```

This will:
- Show additional console logs
- Display API response details
- Enable React Query devtools

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add JSDoc comments for complex functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Recharts](https://recharts.org/) for beautiful charts
- [Tailwind CSS](https://tailwindcss.com/) for styling system
- [Radix UI](https://www.radix-ui.com/) for accessibility primitives
- [Lucide React](https://lucide.dev/) for icons
- [TanStack Query](https://tanstack.com/query) for server state management

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check existing documentation and README
- Review the troubleshooting section above

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
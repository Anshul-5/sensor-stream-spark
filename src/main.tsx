import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerServiceWorker, setupInstallPrompt, requestNotificationPermission } from "./utils/pwa";
import { initializeFCM } from "./utils/fcm";

// Initialize PWA features
const initializePWA = async () => {
  console.log('[AgriSense] Initializing PWA features...');
  
  // Register service worker
  const registration = await registerServiceWorker();
  
  if (registration) {
    console.log('[AgriSense] PWA ready with offline support');
  }
  
  // Setup install prompt
  setupInstallPrompt();
  
  // Request notification permission (non-intrusive)
  setTimeout(async () => {
    const hasPermission = await requestNotificationPermission();
    if (hasPermission) {
      console.log('[AgriSense] Notifications enabled');
      // Initialize FCM when ready
      await initializeFCM();
    }
  }, 5000); // Wait 5 seconds before requesting permission
};

// Initialize app
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Initialize PWA features after app renders
initializePWA().catch(console.error);

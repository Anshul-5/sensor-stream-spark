import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerServiceWorker, setupInstallPrompt, requestNotificationPermission } from "./utils/pwa";
import { initializeFCM } from "./utils/fcm";

// Initialize PWA features
const initializePWA = async () => {
<<<<<<< HEAD
  console.log('[KrishiPragati AI] Initializing PWA features...');
=======
  console.log('[AgriSense] Initializing PWA features...');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
  
  // Register service worker
  const registration = await registerServiceWorker();
  
  if (registration) {
<<<<<<< HEAD
    console.log('[KrishiPragati AI] PWA ready with offline support');
=======
    console.log('[AgriSense] PWA ready with offline support');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
  }
  
  // Setup install prompt
  setupInstallPrompt();
  
  // Request notification permission (non-intrusive)
  setTimeout(async () => {
    const hasPermission = await requestNotificationPermission();
    if (hasPermission) {
<<<<<<< HEAD
      console.log('[KrishiPragati AI] Notifications enabled');
=======
      console.log('[AgriSense] Notifications enabled');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
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

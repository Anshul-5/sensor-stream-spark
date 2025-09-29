// Firebase Cloud Messaging (FCM) Configuration
// This is a placeholder implementation for future FCM integration

/**
<<<<<<< HEAD
 * KrishiPragati AI FCM Integration Guide
=======
 * AgriSense FCM Integration Guide
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
 * 
 * To enable push notifications for agricultural alerts:
 * 
 * 1. Install Firebase SDK:
 *    npm install firebase
 * 
 * 2. Create Firebase project and enable FCM
 * 
 * 3. Add Firebase config to environment variables:
 *    VITE_FIREBASE_API_KEY=your_api_key
 *    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
 *    VITE_FIREBASE_PROJECT_ID=your_project_id
 *    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
 *    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
 *    VITE_FIREBASE_APP_ID=your_app_id
 *    VITE_FIREBASE_VAPID_KEY=your_vapid_key
 * 
 * 4. Create firebase-messaging-sw.js in public folder
 * 
 * 5. Implement the functions below
 */

// Placeholder types for FCM
export interface FCMConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  vapidKey: string;
}

export interface AgricultureNotification {
  type: 'soil_moisture' | 'temperature_alert' | 'irrigation_reminder' | 'weather_warning' | 'pest_alert';
  title: string;
  body: string;
  fieldId?: string;
  sensorId?: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  actionRequired?: boolean;
  timestamp: string;
}

// Placeholder FCM configuration
const FCM_CONFIG: Partial<FCMConfig> = {
  // These should come from environment variables
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
};

/**
 * Initialize Firebase Cloud Messaging
 * 
 * Uncomment and implement when ready to add FCM:
 * 
 * import { initializeApp } from 'firebase/app';
 * import { getMessaging, getToken, onMessage } from 'firebase/messaging';
 */
export const initializeFCM = async (): Promise<string | null> => {
<<<<<<< HEAD
  console.log('[KrishiPragati AI FCM] FCM initialization placeholder');
  console.log('[KrishiPragati AI FCM] To enable FCM, follow the integration guide in src/utils/fcm.ts');
=======
  console.log('[AgriSense FCM] FCM initialization placeholder');
  console.log('[AgriSense FCM] To enable FCM, follow the integration guide in src/utils/fcm.ts');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
  
  // TODO: Implement when Firebase is configured
  /*
  try {
    const app = initializeApp(FCM_CONFIG);
    const messaging = getMessaging(app);
    
    const token = await getToken(messaging, {
      vapidKey: FCM_CONFIG.vapidKey
    });
    
<<<<<<< HEAD
    console.log('[KrishiPragati AI FCM] Registration token:', token);
    return token;
  } catch (error) {
    console.error('[KrishiPragati AI FCM] Failed to initialize:', error);
=======
    console.log('[AgriSense FCM] Registration token:', token);
    return token;
  } catch (error) {
    console.error('[AgriSense FCM] Failed to initialize:', error);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    return null;
  }
  */
  
  return null;
};

/**
 * Request notification permission and get FCM token
 */
export const requestFCMPermission = async (): Promise<string | null> => {
<<<<<<< HEAD
  console.log('[KrishiPragati AI FCM] FCM permission request placeholder');
=======
  console.log('[AgriSense FCM] FCM permission request placeholder');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
  
  // TODO: Implement when Firebase is configured
  /*
  try {
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
<<<<<<< HEAD
      console.log('[KrishiPragati AI FCM] Notification permission granted');
      return await initializeFCM();
    } else {
      console.log('[KrishiPragati AI FCM] Notification permission denied');
      return null;
    }
  } catch (error) {
    console.error('[KrishiPragati AI FCM] Permission request failed:', error);
=======
      console.log('[AgriSense FCM] Notification permission granted');
      return await initializeFCM();
    } else {
      console.log('[AgriSense FCM] Notification permission denied');
      return null;
    }
  } catch (error) {
    console.error('[AgriSense FCM] Permission request failed:', error);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    return null;
  }
  */
  
  return null;
};

/**
 * Handle incoming FCM messages
 */
export const setupFCMMessageListener = (callback: (notification: AgricultureNotification) => void) => {
<<<<<<< HEAD
  console.log('[KrishiPragati AI FCM] Message listener setup placeholder');
=======
  console.log('[AgriSense FCM] Message listener setup placeholder');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
  
  // TODO: Implement when Firebase is configured
  /*
  const messaging = getMessaging();
  
  onMessage(messaging, (payload) => {
<<<<<<< HEAD
    console.log('[KrishiPragati AI FCM] Message received:', payload);
    
    const notification: AgricultureNotification = {
      type: payload.data?.type as any || 'irrigation_reminder',
      title: payload.notification?.title || 'KrishiPragati AI Alert',
=======
    console.log('[AgriSense FCM] Message received:', payload);
    
    const notification: AgricultureNotification = {
      type: payload.data?.type as any || 'irrigation_reminder',
      title: payload.notification?.title || 'AgriSense Alert',
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
      body: payload.notification?.body || 'Check your field conditions',
      fieldId: payload.data?.fieldId,
      sensorId: payload.data?.sensorId,
      urgency: payload.data?.urgency as any || 'medium',
      actionRequired: payload.data?.actionRequired === 'true',
      timestamp: new Date().toISOString()
    };
    
    callback(notification);
  });
  */
};

/**
 * Send FCM token to your backend
 */
export const sendTokenToServer = async (token: string): Promise<boolean> => {
<<<<<<< HEAD
  console.log('[KrishiPragati AI FCM] Token registration placeholder');
=======
  console.log('[AgriSense FCM] Token registration placeholder');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
  
  // TODO: Implement API call to your FastAPI backend
  /*
  try {
    const response = await fetch(`${API_BASE_URL}/fcm/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        userId: 'current-user-id', // Replace with actual user ID
        deviceInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
        }
      })
    });
    
    if (response.ok) {
<<<<<<< HEAD
      console.log('[KrishiPragati AI FCM] Token registered successfully');
      return true;
    } else {
      console.error('[KrishiPragati AI FCM] Token registration failed');
      return false;
    }
  } catch (error) {
    console.error('[KrishiPragati AI FCM] Token registration error:', error);
=======
      console.log('[AgriSense FCM] Token registered successfully');
      return true;
    } else {
      console.error('[AgriSense FCM] Token registration failed');
      return false;
    }
  } catch (error) {
    console.error('[AgriSense FCM] Token registration error:', error);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    return false;
  }
  */
  
  return false;
};

/**
 * Predefined agriculture notification types
 */
export const AGRICULTURE_NOTIFICATIONS = {
  SOIL_MOISTURE_LOW: {
    type: 'soil_moisture' as const,
    title: 'Low Soil Moisture Alert',
    urgency: 'high' as const,
    actionRequired: true,
  },
  TEMPERATURE_HIGH: {
    type: 'temperature_alert' as const,
    title: 'High Temperature Warning',
    urgency: 'medium' as const,
    actionRequired: false,
  },
  IRRIGATION_DUE: {
    type: 'irrigation_reminder' as const,
    title: 'Irrigation Schedule Reminder',
    urgency: 'medium' as const,
    actionRequired: true,
  },
  WEATHER_WARNING: {
    type: 'weather_warning' as const,
    title: 'Severe Weather Alert',
    urgency: 'critical' as const,
    actionRequired: true,
  },
  PEST_DETECTED: {
    type: 'pest_alert' as const,
    title: 'Pest Activity Detected',
    urgency: 'high' as const,
    actionRequired: true,
  },
} as const;

/**
 * Example usage in your FastAPI backend:
 * 
 * ```python
 * from pyfcm import FCMNotification
 * 
 * push_service = FCMNotification(api_key="your_server_key")
 * 
 * def send_soil_moisture_alert(device_token: str, field_id: str):
 *     result = push_service.notify_single_device(
 *         registration_id=device_token,
 *         message_title="Low Soil Moisture Alert",
 *         message_body=f"Field {field_id} requires immediate irrigation",
 *         data_message={
 *             "type": "soil_moisture",
 *             "fieldId": field_id,
 *             "urgency": "high",
 *             "actionRequired": "true"
 *         }
 *     )
 *     return result
 * ```
 */
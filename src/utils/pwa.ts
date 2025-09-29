// PWA Service Worker Registration and Management

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
<<<<<<< HEAD
      console.log('[KrishiPragati AI PWA] Registering service worker...');
=======
      console.log('[AgriSense PWA] Registering service worker...');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
      
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

<<<<<<< HEAD
      console.log('[KrishiPragati AI PWA] Service worker registered:', registration);

      // Listen for service worker updates
      registration.addEventListener('updatefound', () => {
        console.log('[KrishiPragati AI PWA] New service worker found');
=======
      console.log('[AgriSense PWA] Service worker registered:', registration);

      // Listen for service worker updates
      registration.addEventListener('updatefound', () => {
        console.log('[AgriSense PWA] New service worker found');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
        const newWorker = registration.installing;
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
<<<<<<< HEAD
              console.log('[KrishiPragati AI PWA] New content is available');
=======
              console.log('[AgriSense PWA] New content is available');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
              // Notify user about update
              showUpdateNotification();
            }
          });
        }
      });

      // Handle messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
<<<<<<< HEAD
        console.log('[KrishiPragati AI PWA] Message from service worker:', event.data);
        
        if (event.data.type === 'SYNC_COMPLETE') {
          console.log('[KrishiPragati AI PWA] Data sync completed');
=======
        console.log('[AgriSense PWA] Message from service worker:', event.data);
        
        if (event.data.type === 'SYNC_COMPLETE') {
          console.log('[AgriSense PWA] Data sync completed');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
          // Could trigger a UI refresh here
        }
      });

      return registration;
    } catch (error) {
<<<<<<< HEAD
      console.error('[KrishiPragati AI PWA] Service worker registration failed:', error);
      return null;
    }
  } else {
    console.log('[KrishiPragati AI PWA] Service workers not supported');
=======
      console.error('[AgriSense PWA] Service worker registration failed:', error);
      return null;
    }
  } else {
    console.log('[AgriSense PWA] Service workers not supported');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    return null;
  }
};

// Show update notification to user
const showUpdateNotification = () => {
  if (Notification.permission === 'granted') {
<<<<<<< HEAD
    new Notification('KrishiPragati AI Update Available', {
      body: 'New features and improvements are ready. Refresh to update.',
      icon: '/icons/icon-192x192.png',
      tag: 'krishipragati-ai-update'
=======
    new Notification('AgriSense Update Available', {
      body: 'New features and improvements are ready. Refresh to update.',
      icon: '/icons/icon-192x192.png',
      tag: 'agrisense-update'
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    });
  }
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
<<<<<<< HEAD
    console.log('[KrishiPragati AI PWA] Notifications not supported');
=======
    console.log('[AgriSense PWA] Notifications not supported');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
<<<<<<< HEAD
    console.log('[KrishiPragati AI PWA] Notification permission denied');
=======
    console.log('[AgriSense PWA] Notification permission denied');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
<<<<<<< HEAD
    console.log('[KrishiPragati AI PWA] Notification permission:', permission);
    return permission === 'granted';
  } catch (error) {
    console.error('[KrishiPragati AI PWA] Failed to request notification permission:', error);
=======
    console.log('[AgriSense PWA] Notification permission:', permission);
    return permission === 'granted';
  } catch (error) {
    console.error('[AgriSense PWA] Failed to request notification permission:', error);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    return false;
  }
};

// Check if app is running as PWA
export const isPWA = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
};

// Install PWA prompt management
let deferredPrompt: any = null;

export const setupInstallPrompt = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
<<<<<<< HEAD
    console.log('[KrishiPragati AI PWA] Install prompt available');
=======
    console.log('[AgriSense PWA] Install prompt available');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    e.preventDefault();
    deferredPrompt = e;
  });

  window.addEventListener('appinstalled', () => {
<<<<<<< HEAD
    console.log('[KrishiPragati AI PWA] App was installed');
=======
    console.log('[AgriSense PWA] App was installed');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    deferredPrompt = null;
  });
};

export const showInstallPrompt = async (): Promise<boolean> => {
  if (!deferredPrompt) {
<<<<<<< HEAD
    console.log('[KrishiPragati AI PWA] No install prompt available');
=======
    console.log('[AgriSense PWA] No install prompt available');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    return false;
  }

  try {
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
<<<<<<< HEAD
    console.log('[KrishiPragati AI PWA] Install prompt result:', result);
=======
    console.log('[AgriSense PWA] Install prompt result:', result);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    
    deferredPrompt = null;
    return result.outcome === 'accepted';
  } catch (error) {
<<<<<<< HEAD
    console.error('[KrishiPragati AI PWA] Install prompt failed:', error);
=======
    console.error('[AgriSense PWA] Install prompt failed:', error);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    return false;
  }
};

// Background sync registration
export const registerBackgroundSync = async (registration: ServiceWorkerRegistration) => {
  if ('sync' in registration) {
    try {
      // @ts-ignore - sync is available in browsers that support it
<<<<<<< HEAD
      await registration.sync.register('krishipragati-ai-sync');
      console.log('[KrishiPragati AI PWA] Background sync registered');
    } catch (error) {
      console.error('[KrishiPragati AI PWA] Background sync registration failed:', error);
=======
      await registration.sync.register('agrisense-sync');
      console.log('[AgriSense PWA] Background sync registered');
    } catch (error) {
      console.error('[AgriSense PWA] Background sync registration failed:', error);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    }
  }
};

// Cache management
export const clearCache = async () => {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
<<<<<<< HEAD
      console.log('[KrishiPragati AI PWA] All caches cleared');
    } catch (error) {
      console.error('[KrishiPragati AI PWA] Failed to clear caches:', error);
=======
      console.log('[AgriSense PWA] All caches cleared');
    } catch (error) {
      console.error('[AgriSense PWA] Failed to clear caches:', error);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    }
  }
};

// Get cache size
export const getCacheSize = async (): Promise<number> => {
  if ('caches' in window && 'storage' in navigator && 'estimate' in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate();
      return estimate.usage || 0;
    } catch (error) {
<<<<<<< HEAD
      console.error('[KrishiPragati AI PWA] Failed to get cache size:', error);
=======
      console.error('[AgriSense PWA] Failed to get cache size:', error);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
      return 0;
    }
  }
  return 0;
<<<<<<< HEAD
};
=======
};
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec

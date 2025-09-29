// PWA Service Worker Registration and Management

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      console.log('[KrishiPragati AI PWA] Registering service worker...');
      
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('[KrishiPragati AI PWA] Service worker registered:', registration);

      // Listen for service worker updates
      registration.addEventListener('updatefound', () => {
        console.log('[KrishiPragati AI PWA] New service worker found');
        const newWorker = registration.installing;
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[KrishiPragati AI PWA] New content is available');
              // Notify user about update
              showUpdateNotification();
            }
          });
        }
      });

      // Handle messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('[KrishiPragati AI PWA] Message from service worker:', event.data);
        
        if (event.data.type === 'SYNC_COMPLETE') {
          console.log('[KrishiPragati AI PWA] Data sync completed');
          // Could trigger a UI refresh here
        }
      });

      return registration;
    } catch (error) {
      console.error('[KrishiPragati AI PWA] Service worker registration failed:', error);
      return null;
    }
  } else {
    console.log('[KrishiPragati AI PWA] Service workers not supported');
    return null;
  }
};

// Show update notification to user
const showUpdateNotification = () => {
  if (Notification.permission === 'granted') {
    new Notification('KrishiPragati AI Update Available', {
      body: 'New features and improvements are ready. Refresh to update.',
      icon: '/icons/icon-192x192.png',
      tag: 'krishipragati-ai-update'
    });
  }
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('[KrishiPragati AI PWA] Notifications not supported');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    console.log('[KrishiPragati AI PWA] Notification permission denied');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    console.log('[KrishiPragati AI PWA] Notification permission:', permission);
    return permission === 'granted';
  } catch (error) {
    console.error('[KrishiPragati AI PWA] Failed to request notification permission:', error);
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
    console.log('[KrishiPragati AI PWA] Install prompt available');
    e.preventDefault();
    deferredPrompt = e;
  });

  window.addEventListener('appinstalled', () => {
    console.log('[KrishiPragati AI PWA] App was installed');
    deferredPrompt = null;
  });
};

export const showInstallPrompt = async (): Promise<boolean> => {
  if (!deferredPrompt) {
    console.log('[KrishiPragati AI PWA] No install prompt available');
    return false;
  }

  try {
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    console.log('[KrishiPragati AI PWA] Install prompt result:', result);
    
    deferredPrompt = null;
    return result.outcome === 'accepted';
  } catch (error) {
    console.error('[KrishiPragati AI PWA] Install prompt failed:', error);
    return false;
  }
};

// Background sync registration
export const registerBackgroundSync = async (registration: ServiceWorkerRegistration) => {
  if ('sync' in registration) {
    try {
      // @ts-ignore - sync is available in browsers that support it
      await registration.sync.register('krishipragati-ai-sync');
      console.log('[KrishiPragati AI PWA] Background sync registered');
    } catch (error) {
      console.error('[KrishiPragati AI PWA] Background sync registration failed:', error);
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
      console.log('[KrishiPragati AI PWA] All caches cleared');
    } catch (error) {
      console.error('[KrishiPragati AI PWA] Failed to clear caches:', error);
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
      console.error('[KrishiPragati AI PWA] Failed to get cache size:', error);
      return 0;
    }
  }
  return 0;
};

<<<<<<< HEAD
// KrishiPragati AI Service Worker - Offline Agriculture Monitoring
const CACHE_NAME = 'krishipragati-ai-v1.0.0';
const API_CACHE_NAME = 'krishipragati-ai-api-v1.0.0';
=======
// AgriSense Service Worker - Offline Agriculture Monitoring
const CACHE_NAME = 'agrisense-v1.0.0';
const API_CACHE_NAME = 'agrisense-api-v1.0.0';
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec

// Resources to cache for offline functionality
const STATIC_RESOURCES = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add other essential static assets
];

// API endpoints to cache
const API_ENDPOINTS = [
  '/Sensor',
  '/Sensor_1'
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
<<<<<<< HEAD
  console.log('[KrishiPragati AI SW] Installing service worker...');
=======
  console.log('[AgriSense SW] Installing service worker...');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
<<<<<<< HEAD
        console.log('[KrishiPragati AI SW] Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      })
      .then(() => {
        console.log('[KrishiPragati AI SW] Service worker installed and activated');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[KrishiPragati AI SW] Failed to install:', error);
=======
        console.log('[AgriSense SW] Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      })
      .then(() => {
        console.log('[AgriSense SW] Service worker installed and activated');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[AgriSense SW] Failed to install:', error);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
<<<<<<< HEAD
  console.log('[KrishiPragati AI SW] Activating service worker...');
=======
  console.log('[AgriSense SW] Activating service worker...');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
<<<<<<< HEAD
              console.log('[KrishiPragati AI SW] Deleting old cache:', cacheName);
=======
              console.log('[AgriSense SW] Deleting old cache:', cacheName);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
<<<<<<< HEAD
        console.log('[KrishiPragati AI SW] Service worker activated');
=======
        console.log('[AgriSense SW] Service worker activated');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
        return self.clients.claim();
      })
  );
});

// Fetch event - handle network requests with caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests with network-first strategy (with offline fallback)
  if (isApiRequest(url)) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Handle static resources with cache-first strategy
  if (isStaticResource(url)) {
    event.respondWith(handleStaticResource(request));
    return;
  }

  // Handle navigation requests (pages)
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
    return;
  }
});

// Check if request is for API data
function isApiRequest(url) {
  return url.pathname.startsWith('/Sensor') || 
         url.pathname.includes('api') ||
         (url.origin !== location.origin && url.pathname.includes('sensor'));
}

// Check if request is for static resources
function isStaticResource(url) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.woff', '.woff2'];
  return staticExtensions.some(ext => url.pathname.endsWith(ext)) ||
         url.pathname.includes('/icons/') ||
         url.pathname.includes('/static/');
}

// Handle API requests - Network first with cache fallback
async function handleApiRequest(request) {
  const cache = await caches.open(API_CACHE_NAME);
  
  try {
<<<<<<< HEAD
    console.log('[KrishiPragati AI SW] Fetching fresh API data:', request.url);
=======
    console.log('[AgriSense SW] Fetching fresh API data:', request.url);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
<<<<<<< HEAD
      console.log('[KrishiPragati AI SW] API data cached:', request.url);
=======
      console.log('[AgriSense SW] API data cached:', request.url);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
      
      return networkResponse;
    }
    
    throw new Error(`Network response not ok: ${networkResponse.status}`);
    
  } catch (error) {
<<<<<<< HEAD
    console.log('[KrishiPragati AI SW] Network failed, checking cache:', error.message);
=======
    console.log('[AgriSense SW] Network failed, checking cache:', error.message);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    
    // Fallback to cache
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
<<<<<<< HEAD
      console.log('[KrishiPragati AI SW] Serving cached API data:', request.url);
      
      // Add offline indicator header
      const headers = new Headers(cachedResponse.headers);
      headers.set('X-Served-By', 'KrishiPragati-AI-SW-Cache');
=======
      console.log('[AgriSense SW] Serving cached API data:', request.url);
      
      // Add offline indicator header
      const headers = new Headers(cachedResponse.headers);
      headers.set('X-Served-By', 'AgriSense-SW-Cache');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
      headers.set('X-Cache-Date', new Date().toISOString());
      
      return new Response(cachedResponse.body, {
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        headers: headers
      });
    }
    
    // Return mock agricultural data if no cache available
<<<<<<< HEAD
    console.log('[KrishiPragati AI SW] No cache available, serving mock data');
=======
    console.log('[AgriSense SW] No cache available, serving mock data');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    return createMockResponse(request);
  }
}

// Handle static resources - Cache first
async function handleStaticResource(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
<<<<<<< HEAD
    console.log('[KrishiPragati AI SW] Serving cached resource:', request.url);
=======
    console.log('[AgriSense SW] Serving cached resource:', request.url);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
<<<<<<< HEAD
    console.log('[KrishiPragati AI SW] Failed to fetch resource:', request.url);
=======
    console.log('[AgriSense SW] Failed to fetch resource:', request.url);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    // Return offline page or placeholder if available
    return new Response('Resource not available offline', { status: 503 });
  }
}

// Handle navigation requests
async function handleNavigation(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
<<<<<<< HEAD
    console.log('[KrishiPragati AI SW] Navigation failed, serving cached version');
    
    const cachedResponse = await cache.match('/');
    return cachedResponse || new Response('Offline mode - KrishiPragati AI', {
=======
    console.log('[AgriSense SW] Navigation failed, serving cached version');
    
    const cachedResponse = await cache.match('/');
    return cachedResponse || new Response('Offline mode - AgriSense', {
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Create mock agricultural sensor data for offline use
function createMockResponse(request) {
  const url = new URL(request.url);
  
  let mockData;
  if (url.pathname.includes('Sensor_1')) {
    // Crop health monitoring data (humidity, leaf wetness, etc.)
    mockData = {
      sensorId: 'field-crop-001',
      name: 'Crop Health Monitor',
      type: 'environmental',
      isOnline: false, // Offline mode
      lastUpdated: new Date().toISOString(),
      readings: generateMockReadings('humidity', '%', 45, 20),
      metadata: {
        minValue: 30,
        maxValue: 80,
        threshold: 70,
        calibrationDate: '2024-01-15',
        location: 'Field Section B',
        cropType: 'Wheat'
      }
    };
  } else {
    // Soil monitoring data (moisture, temperature)
    mockData = {
      sensorId: 'field-soil-001',
      name: 'Soil Conditions Monitor',
      type: 'soil',
      isOnline: false, // Offline mode  
      lastUpdated: new Date().toISOString(),
      readings: generateMockReadings('temperature', '°C', 22, 8),
      metadata: {
        minValue: 15,
        maxValue: 35,
        threshold: 30,
        calibrationDate: '2024-01-15',
        location: 'Field Section A',
        soilType: 'Clay Loam'
      }
    };
  }
  
  return new Response(JSON.stringify(mockData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
<<<<<<< HEAD
      'X-Served-By': 'KrishiPragati-AI-SW-Mock',
=======
      'X-Served-By': 'AgriSense-SW-Mock',
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
      'X-Cache-Date': new Date().toISOString()
    }
  });
}

// Generate mock sensor readings for agriculture
function generateMockReadings(type, unit, baseValue, range) {
  const readings = [];
  const now = Date.now();
  
  for (let i = 19; i >= 0; i--) {
    const timestamp = new Date(now - (i * 5 * 60 * 1000)).toISOString();
    const variation = (Math.random() - 0.5) * range;
    const seasonalEffect = Math.sin((Date.now() / (1000 * 60 * 60 * 24)) * 2 * Math.PI) * (range * 0.3);
    
    readings.push({
      id: `reading-${i}`,
      timestamp,
      value: baseValue + variation + seasonalEffect,
      unit,
      status: Math.random() > 0.1 ? 'online' : 'warning',
      location: `Field Section ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`,
      description: `${type} monitoring - offline data`
    });
  }
  
  return readings;
}

// Background sync for when connection is restored
self.addEventListener('sync', (event) => {
<<<<<<< HEAD
  if (event.tag === 'krishipragati-ai-sync') {
    console.log('[KrishiPragati AI SW] Background sync triggered');
=======
  if (event.tag === 'agrisense-sync') {
    console.log('[AgriSense SW] Background sync triggered');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    event.waitUntil(syncSensorData());
  }
});

// Sync sensor data when connection is restored
async function syncSensorData() {
<<<<<<< HEAD
  console.log('[KrishiPragati AI SW] Syncing sensor data...');
=======
  console.log('[AgriSense SW] Syncing sensor data...');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
  try {
    // Clear old API cache and fetch fresh data
    await caches.delete(API_CACHE_NAME);
    
    // Notify clients that sync is complete
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_COMPLETE',
        message: 'Sensor data synchronized'
      });
    });
  } catch (error) {
<<<<<<< HEAD
    console.error('[KrishiPragati AI SW] Sync failed:', error);
=======
    console.error('[AgriSense SW] Sync failed:', error);
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
  }
}

// Push notification handling (for future FCM integration)
self.addEventListener('push', (event) => {
<<<<<<< HEAD
  console.log('[KrishiPragati AI SW] Push notification received');
=======
  console.log('[AgriSense SW] Push notification received');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
  
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'Agricultural monitoring alert',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
<<<<<<< HEAD
      tag: 'krishipragati-ai-alert',
=======
      tag: 'agrisense-alert',
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
      data: data,
      actions: [
        {
          action: 'view',
          title: 'View Details'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };
    
    event.waitUntil(
<<<<<<< HEAD
      self.registration.showNotification(data.title || 'KrishiPragati AI Alert', options)
=======
      self.registration.showNotification(data.title || 'AgriSense Alert', options)
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
    );
  }
});

<<<<<<< HEAD
console.log('[KrishiPragati AI SW] Service worker script loaded successfully');
=======
console.log('[AgriSense SW] Service worker script loaded successfully');
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec

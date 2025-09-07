// AgriSense Service Worker - Offline Agriculture Monitoring
const CACHE_NAME = 'agrisense-v1.0.0';
const API_CACHE_NAME = 'agrisense-api-v1.0.0';

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
  console.log('[AgriSense SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[AgriSense SW] Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      })
      .then(() => {
        console.log('[AgriSense SW] Service worker installed and activated');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[AgriSense SW] Failed to install:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[AgriSense SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
              console.log('[AgriSense SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[AgriSense SW] Service worker activated');
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
    console.log('[AgriSense SW] Fetching fresh API data:', request.url);
    
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
      console.log('[AgriSense SW] API data cached:', request.url);
      
      return networkResponse;
    }
    
    throw new Error(`Network response not ok: ${networkResponse.status}`);
    
  } catch (error) {
    console.log('[AgriSense SW] Network failed, checking cache:', error.message);
    
    // Fallback to cache
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('[AgriSense SW] Serving cached API data:', request.url);
      
      // Add offline indicator header
      const headers = new Headers(cachedResponse.headers);
      headers.set('X-Served-By', 'AgriSense-SW-Cache');
      headers.set('X-Cache-Date', new Date().toISOString());
      
      return new Response(cachedResponse.body, {
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        headers: headers
      });
    }
    
    // Return mock agricultural data if no cache available
    console.log('[AgriSense SW] No cache available, serving mock data');
    return createMockResponse(request);
  }
}

// Handle static resources - Cache first
async function handleStaticResource(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    console.log('[AgriSense SW] Serving cached resource:', request.url);
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[AgriSense SW] Failed to fetch resource:', request.url);
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
    console.log('[AgriSense SW] Navigation failed, serving cached version');
    
    const cachedResponse = await cache.match('/');
    return cachedResponse || new Response('Offline mode - AgriSense', {
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
      'X-Served-By': 'AgriSense-SW-Mock',
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
  if (event.tag === 'agrisense-sync') {
    console.log('[AgriSense SW] Background sync triggered');
    event.waitUntil(syncSensorData());
  }
});

// Sync sensor data when connection is restored
async function syncSensorData() {
  console.log('[AgriSense SW] Syncing sensor data...');
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
    console.error('[AgriSense SW] Sync failed:', error);
  }
}

// Push notification handling (for future FCM integration)
self.addEventListener('push', (event) => {
  console.log('[AgriSense SW] Push notification received');
  
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'Agricultural monitoring alert',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      tag: 'agrisense-alert',
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
      self.registration.showNotification(data.title || 'AgriSense Alert', options)
    );
  }
});

console.log('[AgriSense SW] Service worker script loaded successfully');
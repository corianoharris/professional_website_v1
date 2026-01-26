// Service Worker - Currently inactive
// This file exists to prevent 404 errors when browsers look for service workers
// To enable service worker functionality, uncomment and configure below

self.addEventListener('install', (event) => {
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Take control of all pages immediately
  event.waitUntil(self.clients.claim());
});

// No fetch event handler - service worker is inactive
// Uncomment below to enable caching:
/*
self.addEventListener('fetch', (event) => {
  // Add your caching strategy here
  event.respondWith(fetch(event.request));
});
*/

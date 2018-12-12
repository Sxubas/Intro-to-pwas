const CACHE_NAME = 'task-list-v1';

const endpoints = [
  '/',
  '/js/app.js',
  '/css/style.css'
];

console.log('Hola desde el service worker');

self.addEventListener('install', event => {
  console.log('[SW] Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then( cache => {
        console.log("[SW] Cache abierta exitosamente");
        return cache.addAll(endpoints);
      })
      .catch( err => console.log("[SW] Error abriendo la cache"))      
  );
});

self.addEventListener('fetch', event =>{
  console.log("[SW] Petición");
  event.respondWith(
    caches.match(event.request)
      .then( response => {
        if(response){
          console.log("[SW] En caché: " + event.request.url);
          return response;          
        }
        else{
          console.log("[SW] No está en caché: " + event.request.url);
          return fetch(event.request);
        }
      })
      .catch( err => console.log("[SW] Error matching request")
      )
  );
});

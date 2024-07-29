const fetch = require('node-fetch');

const pages = [
  '/',          // Add your pages here
  '/index/type/id/1',
  '/index/type/id/2',
  '/index/type/id/3',
  '/index/type/id/4',
  '/index/type/id/5',
  '/index/type/id/6',
  '/index/type/id/7',
  '/index/type/id/99',
  '/topic/index/page',
  '/vod/show/by/time/id/1'
  // Add more pages as needed
];

async function cachePages() {
  const baseUrl = 'https://shayutv.com'; // Your live domain

  for (const page of pages) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Add delay between requests to prevent overload
      const res = await fetch(`${baseUrl}${page}`, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (res.ok) {
        console.log(`Cached: ${page}`);
      } else {
        console.error(`Failed to cache ${page}: ${res.statusText}`);
      }
    } catch (error) {
      console.error(`Error caching ${page}:`, error);
    }
  }
}

cachePages()
  .then(() => console.log('Pages cached successfully'))
  .catch(error => console.error('Error caching pages:', error));

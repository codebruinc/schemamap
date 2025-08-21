import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', (event) => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  try {
    // Serve static assets from KV
    return await getAssetFromKV(event, {
      mapRequestToAsset: (request) => {
        // Handle trailing slashes and default to index.html
        const url = new URL(request.url);
        const pathname = url.pathname;
        
        // If path ends with /, append index.html
        if (pathname.endsWith('/')) {
          url.pathname = pathname + 'index.html';
        }
        // If path has no extension, try adding .html
        else if (!pathname.includes('.') && pathname !== '/') {
          url.pathname = pathname + '.html';
        }
        
        return new Request(url.toString(), request);
      },
    });
  } catch (e) {
    // If asset not found, return 404
    if (e.status === 404) {
      return new Response('Not Found', { status: 404 });
    }
    // Return error for other cases
    return new Response('Internal Server Error', { status: 500 });
  }
}
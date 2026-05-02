import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Foto First Film Development',
    short_name: 'Foto First Film',
    description: 'Film Development and order Management.',
    start_url: '/admin',
    display: 'minimal-ui', 
    background_color: '#121212', 
    theme_color: '#41B544',      
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
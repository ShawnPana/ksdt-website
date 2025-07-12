'use client'

import * as THREE from 'three'

interface AlbumProps {
  coverUrl?: string;     // Path to album cover image (relative to /public/albums) - optional if using Spotify
  title?: string;        // Album title for accessibility
  artist?: string;       // Artist name
  link?: string;         // Optional link to open when clicked
  position: { x: number; y: number; z: number };
  scale?: number;        // Optional scale factor
  spotifyData?: {        // NEW: Spotify data option
    artist: string;
    album: string;
  };
}

// Shared token cache for all album requests
let tokenCache: { token: string; expires: number } | null = null;

// NEW: Get or fetch Spotify token with caching
async function getSpotifyToken(): Promise<string> {
  const now = Date.now();
  
  // Check if we have a valid cached token
  if (tokenCache && tokenCache.expires > now) {
    return tokenCache.token;
  }
  
  const response = await fetch('/api/spotify/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to get Spotify token');
  }
  
  const data = await response.json();
  
  // Cache token client-side as well
  tokenCache = {
    token: data.access_token,
    expires: now + (data.expires_in * 1000) - 60000 // Subtract 1 minute for safety
  };
  
  return data.access_token;
}

// NEW: Parallel album data fetching
export async function fetchAlbumData(albums: AlbumProps[]): Promise<{
  coverUrl: string;
  spotifyUrl?: string;
  originalProps: AlbumProps;
}[]> {
  try {
    // Get token once for all albums
    const token = await getSpotifyToken();
    
    // Create parallel promises for all Spotify albums
    const albumDataPromises = albums.map(async (album) => {
      try {
        if (album.spotifyData && !album.coverUrl) {
          const spotifyResult = await searchSpotifyAlbum(
            album.spotifyData.artist,
            album.spotifyData.album,
            token
          );
          
          if (spotifyResult) {
            return {
              coverUrl: spotifyResult.coverUrl,
              spotifyUrl: spotifyResult.spotifyUrl,
              originalProps: album
            };
          }
        }
        
        // Fallback to local image or placeholder
        return {
          coverUrl: album.coverUrl || 'conradave.png',
          spotifyUrl: album.link,
          originalProps: album
        };
      } catch (error) {
        console.warn(`Failed to fetch data for ${album.title}:`, error);
        return {
          coverUrl: album.coverUrl || 'conradave.png',
          spotifyUrl: album.link,
          originalProps: album
        };
      }
    });
    
    // Wait for all album data to be fetched in parallel
    return await Promise.all(albumDataPromises);
  } catch (error) {
    console.error('Failed to fetch album data:', error);
    // Return fallback data for all albums
    return albums.map(album => ({
      coverUrl: album.coverUrl || 'conradave.png',
      spotifyUrl: album.link,
      originalProps: album
    }));
  }
}

async function searchSpotifyAlbum(artist: string, album: string, token: string): Promise<{
  coverUrl: string;
  spotifyUrl: string;
} | null> {
  const query = encodeURIComponent(`artist:${artist} album:${album}`);
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=album&limit=1`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to search Spotify');
  }
  
  const data = await response.json();
  
  if (data.albums.items.length > 0) {
    const album = data.albums.items[0];
    return {
      coverUrl: album.images[0]?.url || '',
      spotifyUrl: album.external_urls.spotify,
    };
  }
  
  return null;
}

// Album component now just returns the Three.js mesh, doesn't manage its own scene
export function createAlbumMesh({
  coverUrl,
  position,
  scale = 1,
  spotifyData
}: AlbumProps): Promise<THREE.Mesh> {
  return new Promise(async (resolve, reject) => {
    try {
      let finalCoverUrl = coverUrl;
      
      // If Spotify data is provided, fetch from Spotify API
      if (spotifyData && !coverUrl) {
        try {
          const token = await getSpotifyToken();
          const spotifyResult = await searchSpotifyAlbum(
            spotifyData.artist, 
            spotifyData.album, 
            token
          );
          
          if (spotifyResult) {
            finalCoverUrl = spotifyResult.coverUrl;
          } else {
            // Fallback to local placeholder if Spotify search fails
            finalCoverUrl = 'conradave.png'; // Use existing image as fallback
          }
        } catch (error) {
          console.warn('Spotify API failed, using fallback:', error);
          finalCoverUrl = 'conradave.png'; // Use existing image as fallback
        }
      }
      
      // Default fallback if no cover URL provided
      if (!finalCoverUrl) {
        finalCoverUrl = 'conradave.png';
      }
      
      const textureLoader = new THREE.TextureLoader();
      
      // Handle both local files and external URLs
      const textureUrl = finalCoverUrl?.startsWith('http') 
        ? finalCoverUrl 
        : `/albums/${finalCoverUrl}`;
    
    textureLoader.load(
      textureUrl,
      (texture) => {
        // OPTIMIZATION 4: Texture optimizations
        texture.generateMipmaps = false
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        
        // Create album geometry
        const albumWidth = 1.8 * scale
        const albumHeight = 1.8 * scale
        const albumDepth = 0.05 * scale
        
        const geometry = new THREE.BoxGeometry(albumWidth, albumHeight, albumDepth)
        
        // Create materials for each side of the album
        const materials = [
          new THREE.MeshStandardMaterial({ color: 0x111111 }), // Right side
          new THREE.MeshStandardMaterial({ color: 0x111111 }), // Left side
          new THREE.MeshStandardMaterial({ color: 0x111111 }), // Top
          new THREE.MeshStandardMaterial({ color: 0x111111 }), // Bottom
          new THREE.MeshStandardMaterial({ map: texture }), // Front (album cover)
          new THREE.MeshStandardMaterial({ color: 0x222222 }) // Back
        ]
        
        // Create album mesh
        const album = new THREE.Mesh(geometry, materials)
        album.position.set(position.x, position.y, position.z)
        
        resolve(album)
      },
      undefined,
      (error) => {
        console.error('Error loading album cover:', error)
        reject(error)
      }
    )
    } catch (error) {
      reject(error)
    }
  })
}

// NEW: Enhanced mesh creation for parallel processing
export async function createAlbumMeshFromData({
  coverUrl,
  position,
  scale = 1,
}: {
  coverUrl: string;
  position: { x: number; y: number; z: number };
  scale?: number;
}): Promise<THREE.Mesh> {
  return new Promise((resolve, reject) => {
    const textureLoader = new THREE.TextureLoader();
    
    const textureUrl = coverUrl?.startsWith('http') 
      ? coverUrl 
      : `/albums/${coverUrl}`;
    
    textureLoader.load(
      textureUrl,
      (texture) => {
        // OPTIMIZATION 4: Texture optimizations
        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        
        // Create album geometry
        const albumWidth = 1.8 * scale;
        const albumHeight = 1.8 * scale;
        const albumDepth = 0.05 * scale;
        
        const geometry = new THREE.BoxGeometry(albumWidth, albumHeight, albumDepth);
        
        // Create materials for each side of the album
        const materials = [
          new THREE.MeshStandardMaterial({ color: 0x111111 }), // Right side
          new THREE.MeshStandardMaterial({ color: 0x111111 }), // Left side
          new THREE.MeshStandardMaterial({ color: 0x111111 }), // Top
          new THREE.MeshStandardMaterial({ color: 0x111111 }), // Bottom
          new THREE.MeshStandardMaterial({ map: texture }), // Front (album cover)
          new THREE.MeshStandardMaterial({ color: 0x222222 }) // Back
        ];
        
        // Create album mesh
        const album = new THREE.Mesh(geometry, materials);
        album.position.set(position.x, position.y, position.z);
        
        resolve(album);
      },
      undefined,
      (error) => {
        console.error('Error loading album cover:', error);
        reject(error);
      }
    );
  });
}

// Simple Album component that just holds metadata
export default function Album({
  coverUrl,
  title,
  artist,
  link,
  position,
  scale = 1,
  spotifyData
}: AlbumProps) {
  return null // This component doesn't render anything itself
}

export type { AlbumProps }

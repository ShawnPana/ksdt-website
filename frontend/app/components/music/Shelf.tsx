'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { createAlbumMesh } from './Album'

// Album data structure
interface AlbumData {
  id: string;
  coverUrl: string;
  title: string;
  artist: string;
  link?: string;
}

// Sample album data featuring Conrad Ave's self-titled album
const FEATURED_ALBUMS: AlbumData[] = [
  {
    id: '1',
    coverUrl: 'conradave.png',
    title: 'Conrad Ave',
    artist: 'Conrad Ave',
    link: 'https://open.spotify.com/album/28rcgwlTKex131MR3ZoJH8?si=ucfFFlYaQVetqn2LWhTqOQ'
  },
  {
    id: '2',
    coverUrl: 'conradave.png',
    title: 'Conrad Ave',
    artist: 'Conrad Ave',
    link: 'https://open.spotify.com/album/28rcgwlTKex131MR3ZoJH8?si=ucfFFlYaQVetqn2LWhTqOQ'
  },
  {
    id: '3',
    coverUrl: 'conradave.png',
    title: 'Conrad Ave',
    artist: 'Conrad Ave',
    link: 'https://open.spotify.com/album/28rcgwlTKex131MR3ZoJH8?si=ucfFFlYaQVetqn2LWhTqOQ'
  },
  {
    id: '4',
    coverUrl: 'conradave.png',
    title: 'Conrad Ave',
    artist: 'Conrad Ave',
    link: 'https://open.spotify.com/album/28rcgwlTKex131MR3ZoJH8?si=ucfFFlYaQVetqn2LWhTqOQ'
  },
  {
    id: '5',
    coverUrl: 'conradave.png',
    title: 'Conrad Ave',
    artist: 'Conrad Ave',
    link: 'https://open.spotify.com/album/28rcgwlTKex131MR3ZoJH8?si=ucfFFlYaQVetqn2LWhTqOQ'
  }
];

interface ShelfProps {
  title?: string;
  albums?: AlbumData[];
  showTitle?: boolean;
}

export default function Shelf({ title = "Featured Albums", albums: propAlbums, showTitle = true }: ShelfProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [albums] = useState<AlbumData[]>(propAlbums || FEATURED_ALBUMS)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    // Set up scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 3) // Closer view for book spine effect
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    containerRef.current.appendChild(renderer.domElement)
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)
    
    // Raycaster for hover and click detection
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    const albumMeshes: { 
      mesh: THREE.Mesh; 
      originalY: number; 
      originalX: number;
      originalZ: number;
      originalRotationY: number;
      isHovered: boolean;
      isSelected: boolean;
    }[] = []
    
    // Load and position albums side by side like ||||| (book spines)
    const loadAlbums = async () => {
      const albumSpacing = 0.05 // Very close together like book spines
      const startX = -(albums.length - 1) * albumSpacing / 2 // Center the group
      
      for (let i = 0; i < albums.length; i++) {
        try {
          const albumMesh = await createAlbumMesh({
            coverUrl: albums[i].coverUrl,
            title: albums[i].title,
            artist: albums[i].artist,
            link: albums[i].link,
            position: {
              x: startX + (i * albumSpacing),
              y: 0,
              z: 0
            },
            scale: 0.8
          })
          
          // Rotate 90 degrees on Y axis to show like book spines
          albumMesh.rotation.y = Math.PI / 2
          
          // Store reference to mesh with original position and hover state
          albumMeshes.push({ 
            mesh: albumMesh, 
            originalY: albumMesh.position.y,
            originalX: albumMesh.position.x,
            originalZ: albumMesh.position.z,
            originalRotationY: albumMesh.rotation.y,
            isHovered: false,
            isSelected: false
          })
          
          scene.add(albumMesh)
        } catch (error) {
          console.error(`Failed to load album ${albums[i].title}:`, error)
        }
      }
      
      setIsLoading(false)
    }
    
    // Mouse move handler for hover detection
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return
      
      // Calculate pointer position in normalized device coordinates
      const rect = containerRef.current.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      
      // Set raycaster from camera and pointer
      raycaster.setFromCamera(pointer, camera)
      
      // Calculate objects intersecting the picking ray
      const meshes = albumMeshes.map(item => item.mesh)
      const intersects = raycaster.intersectObjects(meshes)
      
      // Reset all hover states
      albumMeshes.forEach(albumItem => {
        albumItem.isHovered = false
      })
      
      // Set hover state for intersected object
      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object
        const albumItem = albumMeshes.find(item => item.mesh === hoveredMesh)
        if (albumItem) {
          albumItem.isHovered = true
        }
      }
    }
    
    // Click handler for album selection
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current) return
      
      event.preventDefault()
      
      // Calculate pointer position in normalized device coordinates
      const rect = containerRef.current.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      
      // Set raycaster from camera and pointer
      raycaster.setFromCamera(pointer, camera)
      
      // Calculate objects intersecting the picking ray
      const meshes = albumMeshes.map(item => item.mesh)
      const intersects = raycaster.intersectObjects(meshes)
      
      if (intersects.length > 0) {
        // Album was clicked
        const clickedMesh = intersects[0].object
        const albumItem = albumMeshes.find(item => item.mesh === clickedMesh)
        
        if (albumItem) {
          if (albumItem.isSelected && albumItem.isHovered) {
            // Clicking on an already selected album while hovering - redirect to link
            const albumIndex = albumMeshes.indexOf(albumItem)
            const albumData = albums[albumIndex]
            if (albumData && albumData.link) {
              window.open(albumData.link, '_blank', 'noopener,noreferrer')
            }
          } else if (!albumItem.isSelected) {
            // Reset all other albums first
            albumMeshes.forEach(item => {
              item.isSelected = false
            })
            
            // Select the clicked album
            albumItem.isSelected = true
          }
        }
      } else {
        // Clicked elsewhere - reset all albums
        albumMeshes.forEach(albumItem => {
          albumItem.isSelected = false
        })
      }
    }
    
    // Add event listeners
    containerRef.current.addEventListener('mousemove', handleMouseMove)
    containerRef.current.addEventListener('click', handleClick)
    const currentContainer = containerRef.current
    
    loadAlbums()
    
    // Animation loop with hover and selection effects
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Animate hover and selection effects
      albumMeshes.forEach(albumItem => {
        // Hover effect (only if not selected)
        const hoverTargetY = albumItem.isHovered && !albumItem.isSelected ? 
          albumItem.originalY + 0.2 : albumItem.originalY
        
        // Selection effect - move to center front view
        const targetX = albumItem.isSelected ? 0 : albumItem.originalX // Move to center (x = 0)
        const targetZ = albumItem.isSelected ? 1 : 0 // Move forward in front of other albums
        const targetRotationY = albumItem.isSelected ? 0 : albumItem.originalRotationY
        const targetY = albumItem.isSelected ? albumItem.originalY : hoverTargetY
        
        // Smooth transitions
        const lerpFactor = 0.1
        albumItem.mesh.position.y += (targetY - albumItem.mesh.position.y) * lerpFactor
        albumItem.mesh.position.x += (targetX - albumItem.mesh.position.x) * lerpFactor
        albumItem.mesh.position.z += (targetZ - albumItem.mesh.position.z) * lerpFactor
        albumItem.mesh.rotation.y += (targetRotationY - albumItem.mesh.rotation.y) * lerpFactor
      })
      
      renderer.render(scene, camera)
    }
    
    animate()
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('mousemove', handleMouseMove)
        currentContainer.removeEventListener('click', handleClick)
        if (currentContainer.contains(renderer.domElement)) {
          currentContainer.removeChild(renderer.domElement)
        }
      }
      window.removeEventListener('resize', handleResize)
      
      renderer.dispose()
      
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose()
          
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        }
      })
    }
  }, [albums])
  
  return (
    <div className="w-full mb-12">
      {showTitle && title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      <div className="relative">
        <div 
          ref={containerRef} 
          className="w-full h-[400px] bg-white rounded-lg overflow-hidden cursor-pointer"
        >
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 z-10">
              <div className="w-12 h-12 border-t-2 border-white rounded-full animate-spin"></div>
              <p className="text-white mt-2">Loading albums...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

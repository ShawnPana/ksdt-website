'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default function RadioPlayer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const modelRef = useRef<THREE.Group | null>(null)
  
  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return
    
    // Set up scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff) // White background
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    )
    camera.position.set(0, 0.5, 2)
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.shadowMap.enabled = false // Disable shadow mapping for clean white background
    containerRef.current.appendChild(renderer.domElement)
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)  // Increased intensity
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)  // Position light properly away from origin
    directionalLight.castShadow = false  // Disable shadows for cleaner white background
    scene.add(directionalLight)
    
    // Load 3D model using GLTF
    try {
      const gltfLoader = new GLTFLoader()
      gltfLoader.load(
        '/models/boombox.glb',
        (gltf) => {
          // Success callback
          const model = gltf.scene
          model.scale.set(0.75,0.75,0.75) // Adjust scale as needed
          
          // Apply material settings - disable shadows for clean white background
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = false
              child.receiveShadow = false
            }
          })
          
          modelRef.current = model
          scene.add(model)
          setIsLoading(false)
        },
        (progress) => {
          // Loading progress
          if (progress.total > 0) {
            const progressPercentage = (progress.loaded / progress.total) * 100
            setLoadingProgress(progressPercentage)
          }
        },
        (error) => {
          console.error('Error loading GLTF model:', error)
          setIsLoading(false)
          
          // Create a fallback cube if model fails to load
          const geometry = new THREE.BoxGeometry(1, 0.5, 0.3)
          const material = new THREE.MeshStandardMaterial({ color: 0x333333 })
          const fallbackModel = new THREE.Mesh(geometry, material)
          scene.add(fallbackModel)
        }
      )
    } catch (err) {
      console.error('Exception loading model:', err)
      setIsLoading(false)
    }
    
    // Remove ground plane to keep perfect white background
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Slowly rotate the model if it's loaded
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.005 // Adjust speed as needed - lower values for slower rotation
      }
      
      renderer.render(scene, camera)
    }
    
    // Start animation loop
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
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener('resize', handleResize)
      
      // Dispose Three.js resources
      renderer.dispose()
      
      // Dispose geometries and materials
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
  }, [])
  
  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className="w-full h-[500px] bg-white rounded-lg overflow-hidden"
      >
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
            <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white" 
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-white mt-2">Loading model... {Math.round(loadingProgress)}%</p>
          </div>
        )}
      </div>
    </div>
  )
}

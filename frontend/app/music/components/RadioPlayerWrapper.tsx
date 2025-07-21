'use client'

import dynamic from 'next/dynamic'

// Import dynamic component with no SSR to avoid Three.js issues with server-side rendering
const RadioPlayer = dynamic(() => import('./RadioPlayer'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-[500px] bg-gray-100/10 rounded-lg">Loading 3D Radio...</div>
})

export default function RadioPlayerWrapper() {
  return <RadioPlayer />
}

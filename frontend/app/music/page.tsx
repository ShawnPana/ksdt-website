'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
// import RadioPlayerWrapper from './components/RadioPlayerWrapper'
import Shelf from './components/Shelf'
import TwitchPlayer from './components/TwitchPlayer'
import MusicPlayer from './components/MusicPlayer'
import NowPlaying from './components/NowPlaying'

export default function MusicPage() {
  const [isShelfVisible, setIsShelfVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading)
  }

  const springTransition = {
    type: "spring" as const,
    damping: 25,
    stiffness: 200
  }

  return (
    <div className="container mx-auto px-4 pt-20 h-screen relative">
      {/* Discover Button - Fixed position */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setIsShelfVisible(!isShelfVisible)}
          disabled={isLoading}
          className={`px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 ${
            isLoading
              ? 'bg-gray-600 cursor-not-allowed opacity-50'
              : 'bg-[#bc2026] hover:bg-[#a01b21] cursor-pointer'
          }`}
        >
          {isShelfVisible ? 'Hide' : 'Discover'}
        </button>
      </div>

      {/* Twitch Live Stream - Animates up when shelf is visible */}
      <motion.section
        className="flex items-center justify-center z-0 flex-wrap gap-4 py-4"
        animate={{
          y: isShelfVisible ? -300 : 0
        }}
        transition={springTransition}
      >
        <TwitchPlayer />
        <MusicPlayer />
        <NowPlaying />
      </motion.section>

      {/* Featured Albums Section - Slides up from bottom */}
      <motion.section
        className="fixed bottom-0 left-0 right-0 z-10"
        initial={{ y: "100%" }}
        animate={{ y: isShelfVisible ? 0 : "100%" }}
        transition={springTransition}
        style={{ height: '45vh' }}
      >
        <div className="container mx-auto px-4 py-8 h-full">
          <Shelf showTitle={false} onLoadingChange={handleLoadingChange} />
        </div>
      </motion.section>
    </div>
  )
}

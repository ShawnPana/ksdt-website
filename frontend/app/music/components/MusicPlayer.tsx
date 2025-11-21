'use client'

export default function MusicPlayer() {

  return (
    <div className="w-full h-full overflow-hidden">
      <iframe
        src="https://embed.radio.co/player/d70721f.html"
        className="w-full h-100 border-none block overflow-hidden"
        title="KSDT Music Radio Player"
        scrolling="no"
      />
    </div>
  )
}

'use client'

export default function MusicPlayer() {

  return (
    <div className="overflow-hidden relative pb-4">
      <div className="absolute top-[1px] left-[5px] text-white">
        <a href="https://s4.radio.co/s2c33c7adb/listen">RADIO.CO STREAM</a>
      </div>
      <iframe
        src="https://embed.radio.co/player/d70721f.html"
        className="w-[391px] h-[391px] border-none block overflow-hidden white"
        title="KSDT Music Radio.co Player"
        scrolling="no"
      />
    </div>
  )
}

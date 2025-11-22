'use client'

export default function MusicPlayer() {

  return (
    <div className="overflow-hidden relative">
      <div className="absolute top-[1px] left-[5px] text-white">
        <a href="https://s4.radio.co/s2c33c7adb/listen">RADIO.CO STREAM</a>
      </div>
      <iframe
        src="https://embed.radio.co/player/9d40a17.html"
        className="w-[334px] h-[334px] border-none block overflow-hidden white"
        title="KSDT Music Radio.co Player"
        scrolling="no"
      />
    </div>
  )
}

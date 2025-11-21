'use client'

export default function NowPlaying() {

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <iframe
        src="https://lastfm-recently-played.vercel.app/api?user=KSDT-RADIO&nowplaying=true"
        className="w-100 h-88"
        title="KSDT Radio Last.fm"
        scrolling="no"
      />
    </div>
  )
}

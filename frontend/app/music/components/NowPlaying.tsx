'use client'

export default function NowPlaying() {

  return (
    <div className="overflow-hidden">
      <iframe
        src="https://lastfm-recently-played.vercel.app/api?user=KSDT-RADIO&nowplaying=true&count=6&show_user=header"
        className="w-100 h-102"
        title="KSDT Radio Last.fm"
        scrolling="no"
      />
    </div>
  )
}

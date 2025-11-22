'use client'

export default function NowPlaying() {

  return (
    <div className="flex flex-start overflow-hidden pb-4">
      <iframe
        src="https://lastfm-recently-played.vercel.app/api?user=KSDT-RADIO&nowplaying=true&count=6&show_user=header&width=391"
        className="w-98 h-98 top-0 block align-top"
        title="KSDT Radio Last.fm"
        scrolling="no"
      />
    </div>
  )
}

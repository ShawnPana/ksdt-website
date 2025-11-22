'use client'

export default function NowPlaying() {

  return (
    <div className="overflow-hidden">
      <iframe
        src="https://lastfm-recently-played.vercel.app/api?user=KSDT-RADIO&nowplaying=true&count=5&show_user=header&width=334"
        className="w-[334px] h-[334px]"
        title="KSDT Radio Last.fm"
        scrolling="no"
      />
    </div>
  )
}

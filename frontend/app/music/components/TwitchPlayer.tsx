'use client'

export default function TwitchPlayer() {
  // Multiple parent domains for Twitch embeds to work across all environments
  const parentDomains = [
    'localhost',
    'ksdtradio.com',
    'www.ksdtradio.com',
    'ksdt-git-frontend-shawn-panas-projects.vercel.app'
  ]

  // Build parent parameter string for Twitch URLs
  const parentParams = parentDomains.map(domain => `parent=${domain}`).join('&')

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Twitch Video Player */}
        <div className="flex-1">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
            <iframe
              src={`https://player.twitch.tv/?channel=ksdtradio&${parentParams}&muted=true`}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allowFullScreen
              style={{ border: 'none' }}
              title="KSDT Radio Twitch Stream"
            />
          </div>
        </div>

        {/* Optional Twitch Chat - Hidden on mobile, shown on larger screens */}
        <div className="hidden lg:block lg:w-[350px]">
          <div className="relative w-full h-[480px]">
            <iframe
              src={`https://www.twitch.tv/embed/ksdtradio/chat?${parentParams}`}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              style={{ border: 'none' }}
              title="KSDT Radio Twitch Chat"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

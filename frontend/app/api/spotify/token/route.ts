import { NextResponse } from 'next/server';

// In-memory cache for the Spotify token and its expiry
let cachedToken: { token: string; expires: number } | null = null;

export async function POST() {
  try {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    
    if (!client_id || !client_secret) {
      return NextResponse.json(
        { error: 'Spotify credentials not configured' },
        { status: 500 }
      );
    }

    // Check cache: if token exists and not expired, return it
    const now = Date.now();
    if (cachedToken && cachedToken.expires > now) {
      return NextResponse.json({
        access_token: cachedToken.token,
        token_type: 'Bearer',
        expires_in: Math.floor((cachedToken.expires - now) / 1000)
      });
    }
    
    // Otherwise, fetch a new token from Spotify
    
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    });
    
    if (!response.ok) {
      throw new Error('Failed to get Spotify token');
    }
    
    const data = await response.json();

    // Cache the token for 55 minutes (token is valid for 1 hour)
    cachedToken = {
      token: data.access_token,
      expires: now + (55 * 60 * 1000)
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Spotify token error:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate with Spotify' },
      { status: 500 }
    );
  }
}

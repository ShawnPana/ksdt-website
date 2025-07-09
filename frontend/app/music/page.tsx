import { Metadata } from 'next'
import RadioPlayerWrapper from '../components/music/RadioPlayerWrapper'

export const metadata: Metadata = {
  title: 'Music | KSDT Radio',
  description: 'Listen to live radio and explore music from KSDT Radio',
}

export default function MusicPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      {/* <h1 className="text-4xl font-bold mb-8">KSDT Live Radio</h1> */}
      
      {/* Three.js Radio Player Component */}
      <div className="mb-16">
        <RadioPlayerWrapper />
      </div>
      
      {/* Additional content sections */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Recent Shows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Show cards */}
          {[1, 2, 3].map((show) => (
            <div key={show} className="bg-white/5 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Show Title {show}</h3>
              <p className="text-gray-400 mb-3">DJ Name • Wednesdays 8-10pm</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.</p>
              <button className="mt-4 px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors">
                Listen to Archive
              </button>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Weekly Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white/5">
            <thead>
              <tr className="bg-white/10">
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Monday</th>
                <th className="py-3 px-4 text-left">Tuesday</th>
                <th className="py-3 px-4 text-left">Wednesday</th>
                <th className="py-3 px-4 text-left">Thursday</th>
                <th className="py-3 px-4 text-left">Friday</th>
              </tr>
            </thead>
            <tbody>
              {/* Example schedule rows */}
              <tr>
                <td className="py-3 px-4 border-t border-gray-700">8:00 PM</td>
                <td className="py-3 px-4 border-t border-gray-700">Jazz Hour</td>
                <td className="py-3 px-4 border-t border-gray-700">Rock Block</td>
                <td className="py-3 px-4 border-t border-gray-700">Electronic Dreams</td>
                <td className="py-3 px-4 border-t border-gray-700">Hip Hop Heaven</td>
                <td className="py-3 px-4 border-t border-gray-700">Friday Mix</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-t border-gray-700">9:00 PM</td>
                <td className="py-3 px-4 border-t border-gray-700">Blues Brothers</td>
                <td className="py-3 px-4 border-t border-gray-700">Indie Hour</td>
                <td className="py-3 px-4 border-t border-gray-700">World Music</td>
                <td className="py-3 px-4 border-t border-gray-700">Classical Night</td>
                <td className="py-3 px-4 border-t border-gray-700">DJ Showcase</td>
              </tr>
              {/* Add more schedule rows as needed */}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

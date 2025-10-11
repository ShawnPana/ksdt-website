import { Metadata } from 'next'
// import RadioPlayerWrapper from './components/RadioPlayerWrapper'
import Shelf from './components/Shelf'

export const metadata: Metadata = {
  title: 'Music | KSDT Radio',
  description: 'Listen to live radio and explore music from KSDT Radio',
}

export default function MusicPage() {
  return (
    <div className="container mx-auto px-4 pt-20 pb-12 min-h-screen">
      {/* <h1 className="text-4xl font-bold mb-8">KSDT Live Radio</h1> */}

      {/* Three.js Radio Player Component */}
      {/* <div className="mb-16">
        <RadioPlayerWrapper />
      </div> */}

      {/* Featured Albums Section */}
      <section className="mb-16">
        <Shelf title="Featured Albums" showTitle={true} />
      </section>
    </div>
  )
}

import { Metadata } from 'next'
import SportsPlayer from './components/SportsPlayer'

export const metadata: Metadata = {
  title: 'Sports | KSDT Radio',
  description: 'Listen to KSDT Sports Radio live broadcasts',
}

export default function SportsPage() {
  return (
    <div className="fixed pt-30 top-20 inset-x-0 bottom-0 bg-white overflow-hidden">
      <SportsPlayer />
    </div>
  )
}

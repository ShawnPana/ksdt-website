import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Booking | KSDT Radio',
  description: 'Book your event or show with KSDT Radio',
}

export default function BookingPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl lg:text-6xl font-black text-black mb-4">
              BOOKING
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Get in touch with us to book events, shows, or collaborations with KSDT Radio.
            </p>
          </div>
          
          <div className="max-w-4xl">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
              <p className="text-gray-600">
                Our booking system is currently under development. In the meantime, please contact us directly for any booking inquiries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
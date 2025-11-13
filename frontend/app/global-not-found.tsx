import "./globals.css";

// import Link from 'next/link';
// import Header from "@/app/components/Header";

// export const metadata = {
//   title: "Error 404 - Page not found"
// };
 
// export default function NotFound() {
//   return (
//     <div>
//       <Header/>
//       <h2>404-Not Found</h2>
//       <p>Could not find requested resource</p>
//       <Link href="/">Return Home</Link>
//     </div>
//   );
// }
import Link from "next/link";
import Header from "@/app/components/Header";

export const metadata = {
  title: "Error 404 - Page not Found",
};

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-8"> 
          <Header /> 
          <h2 className="text-3xl font-bold mt-8">404 - Not Found</h2>
          <p className="text-gray-600 mt-4">Could not find the requested resource.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4">
            Return Home
          </Link>
        </div>
      </body>
    </html>
  );
}

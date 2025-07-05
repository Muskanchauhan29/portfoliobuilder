import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Portfolio Builder",
  description: "Build your portfolio in minutes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 relative min-h-screen`}
      >
        {/* Beautiful background image */}
        <div className="fixed inset-0 -z-10">
  {/* Vibrant abstract background image */}
  <img 
    src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
    alt="Vibrant abstract background" 
    className="w-full h-full object-cover object-center blur-xl scale-105 opacity-70 transition-all duration-700" 
  />
  {/* Animated gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 opacity-80 mix-blend-lighten animate-pulse" />
  {/* Animated SVG blobs for flair */}
  <svg className="absolute left-[-10%] top-[-10%] w-[40vw] h-[40vw] opacity-40 animate-blob1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path fill="#a5b4fc" d="M43.4,-65.2C55.2,-57.1,62.7,-41.3,66.7,-26.1C70.7,-10.9,71.2,3.7,66.6,16.3C62,28.9,52.3,39.4,41.1,50.3C29.9,61.2,17.2,72.5,2.4,71.2C-12.4,69.9,-24.8,56.1,-38.7,45.2C-52.6,34.2,-68,26.1,-72.9,13.6C-77.8,1.1,-72.2,-15.8,-62.2,-28.6C-52.2,-41.4,-37.9,-50.1,-23.3,-57.3C-8.7,-64.5,6.2,-70.2,21.6,-71.8C36.9,-73.3,51.7,-70.1,43.4,-65.2Z" transform="translate(100 100)" />
  </svg>
  <svg className="absolute right-[-10%] bottom-[-10%] w-[35vw] h-[35vw] opacity-30 animate-blob2" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path fill="#fbcfe8" d="M53.5,-70.7C68.7,-60.2,78.7,-40.1,78.7,-21.1C78.7,-2.1,68.7,15.8,59.3,31.7C49.9,47.6,41.1,61.5,28.4,66.5C15.7,71.5,-0.9,67.6,-15.3,61.7C-29.7,55.8,-41.7,47.8,-56.5,36.9C-71.3,26,-88.8,12,-85.4,-1.6C-82,-15.2,-57.7,-28.5,-41.1,-40.2C-24.5,-51.9,-12.2,-62,4.7,-67.2C21.7,-72.3,43.4,-72.3,53.5,-70.7Z" transform="translate(100 100)" />
  </svg>
</div>

        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

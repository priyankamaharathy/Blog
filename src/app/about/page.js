import { Great_Vibes, Raleway } from 'next/font/google';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaPinterest, FaTwitter } from 'react-icons/fa';

const heading = Great_Vibes({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const body = Raleway({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-16 px-8 md:px-16 flex items-center justify-center">
        <div className="bg-[#F0E7E5]/40 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12 max-w-2xl w-full">
          <section className="text-center">
            <h1 className={`${heading.className} text-5xl mb-8 animate-gradient bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent bg-300% animate-gradient`}
                style={{
                  animation: 'gradient 8s linear infinite'
                }}
            >About Us</h1>
            <p className={`${body.className} text-gray-600 leading-relaxed text-lg mb-12`}>
              Born from a passion for sharing delightful recipes, our journey began with 
              a simple idea: making cooking accessible and enjoyable for everyone. We believe 
              that cooking is an art that brings people together, and our mission is to inspire 
              creativity in the kitchen and share the joy of cooking with food lovers everywhere.
            </p>
            <div className="mb-10">
              <h2 className={`${heading.className} text-3xl text-gray-800 mb-6 animate-gradient bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent bg-300% animate-gradient`}
               style={{
                animation: 'gradient 8s linear infinite'
              }}>
                Follow Us On
              </h2>
              <div className="flex justify-center space-x-8">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-pink-600 transition-colors"
                >
                  <FaInstagram size={24} />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FaFacebook size={24} />
                </a>
                <a 
                  href="https://pinterest.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-red-600 transition-colors"
                >
                  <FaPinterest size={24} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-400 transition-colors"
                >
                  <FaTwitter size={24} />
                </a>
              </div>
            </div>
            <Link 
              href="/" 
              className={`${body.className} text-gray-700 hover:text-gray-900 transition-colors`}
            > ← Return to Home</Link>
          </section>
        </div>
      </main>
    </div>
  );
} 
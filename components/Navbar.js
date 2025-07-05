'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsFillGridFill, BsEye, BsEnvelope } from 'react-icons/bs';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-5xl w-[97%]">
      <div className="flex items-center justify-between bg-white rounded-full shadow-md px-8 py-3 w-full">
        {/* Brand */}
        <Link href="/" className="flex flex-col items-start mr-8 select-none" style={{minWidth: 90}}>
          <span className="text-purple-600 font-bold text-xl leading-none">Portfolio</span>
          <span className="text-black font-extrabold text-lg leading-none">Builder</span>
        </Link>
        {/* Nav Links */}
        <div className="flex flex-row items-center gap-x-8 flex-1 justify-center">
          <Link href="/templates" className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 font-semibold text-base
            ${(pathname === '/templates' || pathname === '/form')
              ? 'text-white bg-gradient-to-r from-purple-500 to-indigo-600 shadow-md scale-105'
              : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'}
          `}>
            <BsFillGridFill className="text-lg" />
            <span className="hidden sm:inline">Build Portfolio</span>
          </Link>
          <Link href="/live-preview" className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 font-semibold text-base
            ${(pathname === '/live-preview')
              ? 'text-white bg-gradient-to-r from-purple-500 to-indigo-600 shadow-md scale-105'
              : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'}
          `}>
            <BsEye className="text-lg" />
            <span className="hidden sm:inline">Preview</span>
          </Link>
          <Link href="/contact" className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 font-semibold text-base
            ${pathname === '/contact'
              ? 'text-white bg-gradient-to-r from-purple-500 to-indigo-600 shadow-md scale-105'
              : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'}
          `}>
            <BsEnvelope className="text-lg" />
            <span className="hidden sm:inline">Contact</span>
          </Link>
        </div>
        {/* Auth/Profile Actions */}
        <div className="flex flex-row items-center gap-2 ml-8">
          {user ? (
            <>
              <span className="hidden sm:inline text-gray-700 font-semibold max-w-[120px] truncate" title={user.name}>Welcome, {user.name}</span>
              <button onClick={logout} className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white rounded-full shadow hover:from-indigo-700 hover:to-fuchsia-600 transition font-semibold text-sm sm:text-base">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="flex items-center gap-2 px-4 py-2 rounded-full text-indigo-700 font-semibold hover:bg-indigo-50 transition text-base">
                <FiLogIn className="text-lg" />
                <span className="hidden sm:inline">Login</span>
              </Link>
              <Link href="/register" className="flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition text-base shadow">
                <FiUserPlus className="text-lg" />
                <span className="hidden sm:inline">Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}


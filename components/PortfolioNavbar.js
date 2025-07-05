"use client";

export default function PortfolioNavbar() {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl shadow-md border-b border-white/40 py-3 px-6 flex justify-center gap-8 rounded-b-xl" style={{scrollBehavior: 'smooth'}}>
      {navLinks.map(link => (
        <a
          key={link.href}
          href={link.href}
          className="font-semibold text-indigo-700 hover:text-purple-600 transition-all duration-300 px-2 py-1 rounded hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 active:scale-95"
          tabIndex={0}
          onClick={e => {
            e.preventDefault();
            const el = document.querySelector(link.href);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

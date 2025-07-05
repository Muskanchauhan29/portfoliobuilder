// components/TemplateThumbnails.js
// Static, visually stunning mini-thumbnails for each template
export const TEMPLATE_THUMBNAILS = {
  card: {
    label: 'Glass Card',
    img: '/thumbnails/glasscard.png',
    bg: 'from-white/80 to-blue-100/80',
    svg: (
      <svg width="220" height="170" viewBox="0 0 220 170" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="16" width="204" height="140" rx="18" fill="url(#glass-bg)" fillOpacity="0.7"/>
        <rect x="40" y="40" width="65" height="40" rx="10" fill="#fff" fillOpacity="0.6"/>
        <rect x="120" y="60" width="60" height="20" rx="8" fill="#e0e7ef" fillOpacity="0.7"/>
        <circle cx="60" cy="65" r="8" fill="#c7d2fe" />
        <rect x="60" y="110" width="100" height="15" rx="7" fill="#f3f4f6"/>
        <text x="30" y="32" fill="#7c3aed" fontSize="16" fontWeight="bold">Glass Card</text>
        <defs>
          <linearGradient id="glass-bg" x1="8" y1="16" x2="212" y2="156" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f0f9ff"/>
            <stop offset="1" stopColor="#dbeafe"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  modern: {
    label: 'Modern Gradient',
    img: '/thumbnails/modern.png',
    bg: 'from-pink-100/90 to-purple-100/80',
    svg: (
      <svg width="220" height="170" viewBox="0 0 220 170" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="16" width="204" height="140" rx="18" fill="url(#modern-bg)"/>
        <rect x="40" y="50" width="140" height="30" rx="10" fill="#fff" fillOpacity="0.7"/>
        <rect x="60" y="95" width="100" height="15" rx="7" fill="#f3e8ff"/>
        <text x="30" y="32" fill="#c026d3" fontSize="16" fontWeight="bold">Modern Gradient</text>
        <defs>
          <linearGradient id="modern-bg" x1="8" y1="16" x2="212" y2="156" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fbcfe8"/>
            <stop offset="1" stopColor="#e0e7ff"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  grid: {
    label: 'Grid Professional',
    img: '/thumbnails/grid.png',
    bg: 'from-blue-100/90 to-green-100/80',
    svg: (
      <svg width="220" height="170" viewBox="0 0 220 170" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="16" width="204" height="140" rx="18" fill="url(#grid-bg)"/>
        <rect x="30" y="40" width="60" height="90" rx="12" fill="#fff" fillOpacity="0.7"/>
        <rect x="105" y="50" width="90" height="20" rx="8" fill="#bbf7d0"/>
        <rect x="105" y="80" width="90" height="20" rx="8" fill="#bae6fd"/>
        <rect x="105" y="110" width="90" height="20" rx="8" fill="#e0e7ef"/>
        <text x="30" y="32" fill="#2563eb" fontSize="16" fontWeight="bold">Grid Professional</text>
        <defs>
          <linearGradient id="grid-bg" x1="8" y1="16" x2="212" y2="156" gradientUnits="userSpaceOnUse">
            <stop stopColor="#dbeafe"/>
            <stop offset="1" stopColor="#bbf7d0"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  elegant: {
    label: 'Elegant Portfolio',
    img: '/thumbnails/elegant.png',
    bg: 'from-pink-100/90 to-yellow-100/80',
    svg: (
      <svg width="220" height="170" viewBox="0 0 220 170" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="16" width="204" height="140" rx="18" fill="url(#elegant-bg)"/>
        <ellipse cx="110" cy="86" rx="75" ry="40" fill="#fef3c7" fillOpacity="0.5"/>
        <rect x="50" y="60" width="120" height="30" rx="12" fill="#fff" fillOpacity="0.7"/>
        <rect x="70" y="105" width="80" height="15" rx="7" fill="#fce7f3"/>
        <text x="30" y="32" fill="#be185d" fontSize="16" fontWeight="bold">Elegant Portfolio</text>
        <defs>
          <linearGradient id="elegant-bg" x1="8" y1="16" x2="212" y2="156" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fbcfe8"/>
            <stop offset="1" stopColor="#fef9c3"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
};

// You should place beautiful PNG previews at public/thumbnails/ for each template.
// These can be exported from Figma, Canva, or a screenshot tool for pixel-perfect results.

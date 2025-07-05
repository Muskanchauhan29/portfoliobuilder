"use client";

// Inline SVG icons for modern look (Heroicons style)
const icons = {
  location: (
    <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7-7.5 11.25-7.5 11.25S4.5 17.5 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
  ),
  email: (
    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 7.5v9a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 16.5v-9m19.5 0A2.25 2.25 0 0019.5 5.25H4.5A2.25 2.25 0 002.25 7.5m19.5 0v.243a2.25 2.25 0 01-.879 1.775l-7.5 5.625a2.25 2.25 0 01-2.742 0l-7.5-5.625A2.25 2.25 0 012.25 7.743V7.5"/></svg>
  ),
  phone: (
    <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h2.086c.414 0 .81.168 1.103.464l2.027 2.027a1.5 1.5 0 01.44 1.272l-.217 1.627a.75.75 0 00.214.672l2.457 2.457a.75.75 0 00.672.214l1.627-.217a1.5 1.5 0 011.272.44l2.027 2.027c.296.293.464.689.464 1.103v2.086a2.25 2.25 0 01-2.25 2.25c-8.284 0-15-6.716-15-15z"/></svg>
  ),
};

export default function ContactInfoRow({ location, email, phone }) {
  if (!location && !email && !phone) return null;
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-2 animate-fade-in delay-300">
      {location && (
        <span className="inline-flex items-center px-4 py-1 bg-white/70 backdrop-blur-md border border-indigo-100 shadow-sm rounded-full text-sm font-medium text-indigo-700 hover:shadow-lg transition-all">
          {icons.location}
          <span>{location}</span>
        </span>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center px-4 py-1 bg-white/70 backdrop-blur-md border border-green-100 shadow-sm rounded-full text-sm font-medium text-green-700 hover:shadow-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
        >
          {icons.email}
          <span>{email}</span>
        </a>
      )}
      {phone && (
        <a
          href={`tel:${phone}`}
          className="inline-flex items-center px-4 py-1 bg-white/70 backdrop-blur-md border border-yellow-100 shadow-sm rounded-full text-sm font-medium text-yellow-700 hover:shadow-lg hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-all"
        >
          {icons.phone}
          <span>{phone}</span>
        </a>
      )}
    </div>
  );
}

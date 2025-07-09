'use client';

import { motion } from 'framer-motion';
import ContactForm from '../../components/ContactForm';

const ContactPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tighter mb-4 text-gray-900">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            We&apos;d love to hear from you! Whether you have a question about features, templates, support, or anything else, our team is ready to answer all your questions.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            {/* Use working ContactForm component. Remove ownerId for demo or pass a dummy string if required */}
            <div className="flex justify-center">
              <ContactForm ownerId={"000000000000000000000000"} />
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
            {/* Address with Google Map */}
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                <p className="text-gray-700 mb-2">Gurugram, Haryana</p>
                <div className="rounded-2xl border-2 border-purple-300 shadow-xl aspect-video overflow-hidden my-2">
                  <iframe
                    title="Gurugram Haryana Map"
                    src="https://www.google.com/maps?q=gurugram+haryana&output=embed"
                    width="100%"
                    height="100%"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-60 min-h-[200px]"
                    style={{ border: 0 }}
                  ></iframe>
                </div>
              </div>
            </div>
            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V8a4 4 0 10-8 0v4m8 0v4a4 4 0 01-8 0v-4"></path></svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                <a href="mailto:muskchauhan296@gmail.com" className="text-purple-700 underline hover:text-purple-900 transition">muskchauhan296@gmail.com</a>
              </div>
            </div>
            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h2l.4 2M7 13h10l1.2-6H6.4M7 13l-1.2 6M17 13l1.2 6M9 17h6"></path></svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                <a href="tel:9717991348" className="text-purple-700 underline hover:text-purple-900 transition">9717991348</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

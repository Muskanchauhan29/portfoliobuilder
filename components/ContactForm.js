"use client";
import { useState } from "react";

/**
 * ContactForm component
 * @param {string} ownerId - The portfolio owner's user id (MongoDB ObjectId as string)
 */
export default function ContactForm({ ownerId }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submit intercepted, no reload should happen.");
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ownerId }),
      });
      if (res.ok) {
        setStatus("Thank you! Your message has been sent.");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(''), 4000); // Auto-hide success after 4s
      } else {
        setStatus("Sorry, something went wrong. Please try again later.");
      }
    } catch {
      setStatus("Sorry, something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white/90 rounded-2xl shadow-lg p-6 w-full max-w-md">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="px-4 py-2 rounded border border-indigo-200 focus:ring-2 focus:ring-indigo-400 outline-none"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        className="px-4 py-2 rounded border border-indigo-200 focus:ring-2 focus:ring-indigo-400 outline-none"
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        rows={5}
        value={form.message}
        onChange={handleChange}
        className="px-4 py-2 rounded border border-indigo-200 focus:ring-2 focus:ring-indigo-400 outline-none"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-semibold shadow hover:scale-105 transition-transform disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
      {status && (
        <div className={`mt-2 text-center text-sm ${status.includes('Thank you') ? 'text-green-600' : 'text-red-600'}`}>
          {status}
        </div>
      )}
    </form>
  );
}

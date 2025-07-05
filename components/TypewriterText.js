"use client";
import React, { useEffect, useRef, useState } from "react";

export default function TypewriterText({ words = [], speed = 80, pause = 1400, className = "" }) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const timeoutRef = useRef();

  useEffect(() => {
    let timeout;
    const currentWord = words[wordIdx] || "";
    if (!isDeleting && charIdx < currentWord.length) {
      timeout = setTimeout(() => setCharIdx(charIdx + 1), speed);
    } else if (isDeleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(charIdx - 1), speed / 2);
    } else if (!isDeleting && charIdx === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && charIdx === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIdx((wordIdx + 1) % words.length);
      }, 400);
    }
    setDisplayed(currentWord.slice(0, charIdx));
    timeoutRef.current = timeout;
    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, wordIdx, words, speed, pause]);

  return (
    <span className={className}>
      {displayed}
      <span className="blinking-cursor">|</span>
      <style jsx>{`
        .blinking-cursor {
          animation: blink 1s steps(1) infinite;
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}

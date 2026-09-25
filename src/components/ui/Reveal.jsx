"use client";

import { useEffect, useRef, useState } from "react";

// Fades and lifts its children in the first time they scroll into view.
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...props }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      style={{ "--reveal-delay": `${delay}ms` }}
      className={`reveal ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

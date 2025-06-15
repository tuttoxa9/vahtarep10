"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedHeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  delay?: number;
  once?: boolean;
  highlightWords?: string[];
  highlightClass?: string;
}

export default function AnimatedHeading({
  children,
  as: Component = "h2",
  className,
  delay = 0,
  once = true,
  highlightWords = [],
  highlightClass = "text-accent"
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once });

  // Функция для выделения слов в тексте
  const highlightText = (text: string) => {
    if (highlightWords.length === 0) return text;

    let result = text;
    highlightWords.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      result = result.replace(regex, `<span class="${highlightClass}">$1</span>`);
    });

    return result;
  };

  const textContent = typeof children === 'string' ? children : '';
  const highlightedText = highlightText(textContent);

  return (
    <Component
      ref={ref}
      className={cn(
        "relative transition-all duration-1000 ease-out",
        isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      dangerouslySetInnerHTML={
        typeof children === 'string' ? { __html: highlightedText } : undefined
      }
    >
      {typeof children !== 'string' ? children : null}
    </Component>
  );
}

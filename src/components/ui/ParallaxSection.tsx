"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number; // Скорость параллакса (1 - нормальная, <1 - медленнее, >1 - быстрее)
  direction?: "up" | "down" | "left" | "right";
  overflow?: "visible" | "hidden";
}

export default function ParallaxSection({
  children,
  className,
  speed = 0.5,
  direction = "up",
  overflow = "hidden"
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Создаем трансформации напрямую в компоненте
  const yUp = useTransform(scrollYProgress, [0, 1], ["0%", `${-30 * speed}%`]);
  const yDown = useTransform(scrollYProgress, [0, 1], ["0%", `${30 * speed}%`]);
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", `${-20 * speed}%`]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["0%", `${20 * speed}%`]);

  // Определяем нужную трансформацию в зависимости от направления
  const getTransformStyle = () => {
    switch (direction) {
      case "up":
        return { y: yUp };
      case "down":
        return { y: yDown };
      case "left":
        return { x: xLeft };
      case "right":
        return { x: xRight };
      default:
        return { y: yUp };
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative",
        { "overflow-hidden": overflow === "hidden" },
        { "overflow-visible": overflow === "visible" },
        className
      )}
    >
      <motion.div style={getTransformStyle()}>
        {children}
      </motion.div>
    </div>
  );
}

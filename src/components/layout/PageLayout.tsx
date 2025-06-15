"use client";

import { type ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({ children, className }: PageLayoutProps) {
  const [mounted, setMounted] = useState(false);

  // Это необходимо для клиентских компонентов, чтобы избежать гидратации
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main
      className={cn(
        "min-h-screen w-full",
        className
      )}
    >
      {children}
    </main>
  );
}

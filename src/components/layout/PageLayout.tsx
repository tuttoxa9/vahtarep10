"use client";

import { type ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({ children, className }: PageLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Это необходимо для клиентских компонентов, чтобы избежать гидратации
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Определяем, нужно ли показывать градиент
  // Показываем градиент только на страницах со списком вакансий (/vacancies)
  // но НЕ на индивидуальных страницах вакансий (/vacancies/[id])
  const shouldShowGradient = pathname === '/vacancies';

  return (
    <>
      {shouldShowGradient && <div className="page-background" />}
      <main
        className={cn(
          "min-h-screen w-full relative",
          className
        )}
      >
        {children}
      </main>
    </>
  );
}

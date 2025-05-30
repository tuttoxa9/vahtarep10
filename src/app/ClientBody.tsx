"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import PageTransition from "@/components/ui/PageTransition";
import SideNav from "@/components/layout/SideNav";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  BriefcaseIcon,
  InfoIcon,
  PhoneIcon
} from "lucide-react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("");

  const navItems = [
    {
      label: "Главная",
      href: "/",
      icon: <HomeIcon className="h-6 w-6" />,
      section: "hero-section"
    },
    {
      label: "Вакансии",
      href: "/vacancies",
      icon: <BriefcaseIcon className="h-6 w-6" />,
      section: "popular-vacancies"
    },
    {
      label: "О нас",
      href: "/about",
      icon: <InfoIcon className="h-6 w-6" />,
      section: "features-section"
    },
    {
      label: "Контакты",
      href: "/contact",
      icon: <PhoneIcon className="h-6 w-6" />,
      section: "how-it-works"
    },
  ];

  const isItemActive = (item: any) => {
    if (pathname === '/' && activeSection && item.section) {
      return activeSection === item.section;
    }
    return pathname === item.href;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const sections = document.querySelectorAll<HTMLElement>('section[id]');

      if (pathname === '/' && sections.length > 0) {
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          const sectionTop = section.offsetTop;

          if (scrollPosition >= sectionTop) {
            setActiveSection(section.id);
            break;
          }
        }
      } else {
        setActiveSection("");
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      {/* Боковая панель - теперь поверх контента */}
      <div className="hidden md:block">
        <SideNav />
      </div>

      {/* Основной контент - с отступом от меню */}
      <div className="w-full overflow-hidden pb-20 md:pb-0 md:pl-20">
        <PageTransition>{children}</PageTransition>
      </div>

      {/* Мобильная нижняя навигация */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[10010] bg-white/95 backdrop-blur-md border-t border-border/30 shadow-2xl">
        <div className="flex items-center justify-around py-3 px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 min-w-[60px]",
                "hover:bg-accent/10",
                isItemActive(item)
                  ? "text-accent"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium leading-none">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

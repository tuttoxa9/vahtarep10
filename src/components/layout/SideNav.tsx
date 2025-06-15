"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  BriefcaseIcon,
  InfoIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  MenuIcon,
  PhoneIcon,
  BuildingIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  section?: string;
}

export default function SideNav() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreenMenuOpen, setIsFullscreenMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const navItems: NavItem[] = [
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
      label: "Работодателям",
      href: "/employers",
      icon: <BuildingIcon className="h-6 w-6" />
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

  // Очистка timeout при размонтировании компонента
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    const timeout = setTimeout(() => {
      setIsExpanded(true);
    }, 150); // Небольшая задержка перед открытием
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    const timeout = setTimeout(() => {
      setIsExpanded(false);
    }, 300); // Задержка перед закрытием
    setHoverTimeout(timeout);
  };

  const toggleFullscreenMenu = () => {
    setIsFullscreenMenuOpen(!isFullscreenMenuOpen);
  };

  const isItemActive = (item: NavItem) => {
    if (pathname === '/' && activeSection && item.section) {
      return activeSection === item.section;
    }
    return pathname === item.href;
  };

  const sidebarVariants = {
    expanded: {
      width: "16rem"
    },
    collapsed: {
      width: "5rem"
    },
  };

  const navItemVariants = {
    hidden: {
      opacity: 0,
      x: -10
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
  };

  const fullscreenMenuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
  };

  const fullscreenNavItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Боковая навигация - видима только на десктопе */}
      <nav
        className={cn(
          "fixed left-0 top-0 h-full bg-white/90 backdrop-blur-md border-r border-border/50 z-[9999] p-4 shadow-xl shadow-black/5 flex flex-col transition-all duration-300 ease-in-out",
          isExpanded ? "w-64" : "w-20"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col justify-center items-center mb-8 mt-4 h-24 relative">
          <Logo />
          <span
            className={cn(
              "text-sm font-medium text-foreground/60 transition-all duration-300 whitespace-nowrap absolute bottom-0",
              isExpanded ? "opacity-100" : "opacity-0"
            )}
          >
            vahta1.ru
          </span>
        </div>

        <div className="flex flex-col gap-4 mt-6 flex-grow">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
                "hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-accent",
                isItemActive(item)
                  ? "bg-accent/15 text-accent font-medium shadow-md"
                  : "text-foreground/80 hover:text-foreground hover:shadow-sm"
              )}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span
                className={cn(
                  "text-base font-medium transition-all duration-300 whitespace-nowrap",
                  isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 w-0 overflow-hidden"
                )}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Подсказка для наведения */}
        {!isExpanded && (
          <div className="flex justify-center mt-auto mb-2 w-full">
            <div className="p-2 rounded-lg text-foreground/40 flex items-center justify-center">
              <ChevronRightIcon className="h-4 w-4 animate-pulse" />
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

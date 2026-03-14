"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ChevronDown } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n";

type NavLabels = {
  home?: string;
  about: string;
  experiences: string;
  whatWeDo: string;
  collaborate: string;
};

type SiteNavbarProps = {
  locale: Locale;
  labels: NavLabels;
};

function getLocalizedPath(pathname: string, locale: Locale): string {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return `/${locale}`;

  if (locales.includes(parts[0] as Locale)) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${locale}/${rest}` : `/${locale}`;
  }

  return `/${locale}/${parts.join("/")}`;
}

export function SiteNavbar({ locale, labels }: SiteNavbarProps) {
  const pathname = usePathname();
  const hasMounted = useRef(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileLanguageOpen, setMobileLanguageOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const localeLabel: Record<Locale, string> = {
    en: "English",
    es: "Español",
    sk: "Slovensky",
  };

  const navLinks = [
    { href: `/${locale}`, label: labels.home ?? "Home" },
    { href: `/${locale}/about`, label: labels.about },
    { href: `/${locale}/experiences`, label: labels.experiences },
    { href: `/${locale}/what-we-do`, label: labels.whatWeDo },
    { href: `/${locale}/collaborate`, label: labels.collaborate },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (window.location.hash) return;

    // Force route changes to start at top immediately.
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleNavRouteClick = () => {
    setMobileOpen(false);
    setLanguageOpen(false);
    setMobileLanguageOpen(false);
  };

  const handleHardNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    handleNavRouteClick();
    window.location.href = href;
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b border-white/40 bg-surface/35 backdrop-blur-xl backdrop-saturate-150 relative ${isScrolled ? "shadow-[0_8px_24px_rgba(15,23,42,0.06)]" : ""}`}
    >
      <div className="relative mx-auto flex w-full max-w-[1800px] items-center justify-between px-4 py-4 sm:px-6 lg:h-16 lg:py-0 lg:px-8">
        <a
          href={`/${locale}`}
          onClick={(event) => handleHardNavigate(event, `/${locale}`)}
          className="inline-flex items-center text-xs font-semibold tracking-wide text-slate-900"
        >
          <Image
            src="/logo-amawa-mark.svg"
            alt="Amawa"
            width={28}
            height={28}
            className="h-7 w-auto lg:hidden"
            priority
          />
          <Image
            src="/logo-amawa-nav.svg"
            alt="Amawa Ventures"
            width={180}
            height={32}
            className="hidden h-8 max-h-4 w-auto lg:block"
            priority
          />
        </a>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-primary lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <span className="text-2xl leading-none">✕</span>
          ) : (
            <span className="text-3xl leading-none">☰</span>
          )}
        </button>

        <nav className="hidden lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2 lg:items-center lg:gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleHardNavigate(event, link.href)}
              className={`inline-flex px-2 py-2 text-base font-normal transition-colors ${
                isActive(link.href)
                  ? "text-primary underline underline-offset-8 decoration-2 decoration-primary"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="relative hidden lg:block">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md px-2 py-2 text-base font-normal text-slate-700 hover:bg-black/5"
              onClick={() => setLanguageOpen((prev) => !prev)}
              aria-expanded={languageOpen}
              aria-haspopup="menu"
            >
              <span>{localeLabel[locale]}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {languageOpen ? (
              <div className="absolute right-0 top-full mt-2 min-w-36 rounded-md border border-black/10 bg-surface p-1 shadow-md">
                {locales
                  .filter((item) => item !== locale)
                  .map((item, index, arr) => {
                    const localizedPath = getLocalizedPath(pathname, item);
                    return (
                    <a
                      key={item}
                      href={localizedPath}
                      className={`block rounded px-2 py-1.5 text-sm text-slate-700 hover:bg-black/5 hover:text-slate-900 ${
                        index < arr.length - 1 ? "border-b border-black/10" : ""
                      }`}
                      onClick={(event) => handleHardNavigate(event, localizedPath)}
                    >
                      {localeLabel[item]}
                    </a>
                    );
                  })}
              </div>
            ) : null}
        </div>
      </div>

      {mobileOpen ? (
        <div className="absolute left-0 right-0 top-full z-50 border-t border-black/10 bg-surface-alt lg:hidden">
          <nav className="mx-auto flex w-full max-w-[1800px] flex-col items-center gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`w-full max-w-sm rounded-md px-3 py-3 text-center text-base transition-colors hover:bg-black/5 hover:text-slate-900 ${
                  isActive(link.href)
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-slate-700"
                }`}
                onClick={(event) => handleHardNavigate(event, link.href)}
              >
                {link.label}
              </a>
            ))}

            <div className="mt-2 flex w-full max-w-sm items-center justify-center px-2">
              <div className="w-full">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-1 rounded-md px-3 py-3 text-base font-normal text-slate-700 hover:bg-black/5"
                  onClick={() => setMobileLanguageOpen((prev) => !prev)}
                  aria-expanded={mobileLanguageOpen}
                  aria-haspopup="menu"
                >
                  <span>{localeLabel[locale]}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {mobileLanguageOpen ? (
                  <div className="mt-1 w-full rounded-md border border-black/10 bg-surface p-1">
                    {locales
                      .filter((item) => item !== locale)
                      .map((item, index, arr) => {
                        const localizedPath = getLocalizedPath(pathname, item);
                        return (
                        <a
                          key={item}
                          href={localizedPath}
                          className={`block w-full rounded px-2 py-2 text-center text-sm text-slate-700 hover:bg-black/5 hover:text-slate-900 ${
                            index < arr.length - 1 ? "border-b border-black/10" : ""
                          }`}
                          onClick={(event) => handleHardNavigate(event, localizedPath)}
                        >
                          {localeLabel[item]}
                        </a>
                        );
                      })}
                  </div>
                ) : null}
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

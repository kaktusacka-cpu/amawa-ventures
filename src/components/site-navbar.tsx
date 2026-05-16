"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
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

type LocaleString = Record<Locale, string>;

const a11yLabels: Record<"openMenu" | "closeMenu" | "changeLanguage", LocaleString> = {
  openMenu: { en: "Open menu", es: "Abrir menú", sk: "Otvoriť menu" },
  closeMenu: { en: "Close menu", es: "Cerrar menú", sk: "Zavrieť menu" },
  changeLanguage: { en: "Change language", es: "Cambiar idioma", sk: "Zmeniť jazyk" },
};

const localeLabel: LocaleString = {
  en: "English",
  es: "Español",
  sk: "Slovensky",
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileLanguageOpen, setMobileLanguageOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: `/${locale}`, label: labels.home ?? "Home" },
    { href: `/${locale}/about`, label: labels.about },
    { href: `/${locale}/experiences`, label: labels.experiences },
    { href: `/${locale}/what-we-do`, label: labels.whatWeDo },
    { href: `/${locale}/collaborate`, label: labels.collaborate },
  ];

  const isActive = (href: string) => {
    const homeHref = `/${locale}`;
    if (href === homeHref) {
      if (pathname === homeHref) return true;
      // Home stays active for any route that isn't another main nav item
      // (e.g., /privacy, /docs, /404 — supplementary pages not in the navbar).
      const otherNavHrefs = navLinks
        .filter((link) => link.href !== homeHref)
        .map((link) => link.href);
      return !otherNavHrefs.some(
        (other) => pathname === other || pathname.startsWith(`${other}/`),
      );
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open menus when the route changes. State reset driven by an
  // external signal (pathname) is the canonical pattern for closing UI on
  // navigation.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    setLanguageOpen(false);
    setMobileLanguageOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!languageOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLanguageOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [languageOpen]);

  return (
    <>
    <header
      className={`sticky top-0 z-40 border-b border-border-glass bg-surface/35 backdrop-blur-xl backdrop-saturate-150 relative ${isScrolled ? "shadow-[0_8px_24px_rgba(15,23,42,0.06)]" : ""}`}
    >
      <div className="relative mx-auto flex w-full max-w-[1800px] items-center justify-between px-4 py-4 sm:px-6 lg:h-16 lg:py-0 lg:px-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center text-xs font-semibold tracking-wide text-foreground"
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
            src="/logo-amawa-full.svg"
            alt="Amawa Ventures"
            width={180}
            height={24}
            className="hidden h-4 w-auto lg:block"
            priority
          />
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-primary lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? a11yLabels.closeMenu[locale] : a11yLabels.openMenu[locale]}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-7 w-7" />}
        </button>

        <nav className="hidden lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2 lg:items-center lg:gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex px-2 py-2 text-base font-normal transition-colors ${
                isActive(link.href)
                  ? "text-primary underline underline-offset-8 decoration-2 decoration-primary"
                  : "text-foreground-body hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div ref={languageMenuRef} className="relative hidden lg:block">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md px-2 py-2 text-base font-normal text-foreground-body hover:bg-surface-hover"
            onClick={() => setLanguageOpen((prev) => !prev)}
            aria-expanded={languageOpen}
            aria-haspopup="menu"
            aria-label={a11yLabels.changeLanguage[locale]}
          >
            <span>{localeLabel[locale]}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {languageOpen ? (
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 min-w-36 rounded-md border border-border bg-surface p-1 shadow-md"
            >
              {locales
                .filter((item) => item !== locale)
                .map((item, index, arr) => {
                  const localizedPath = getLocalizedPath(pathname, item);
                  return (
                    <Link
                      key={item}
                      href={localizedPath}
                      role="menuitem"
                      className={`block rounded px-2 py-1.5 text-sm text-foreground-body hover:bg-surface-hover hover:text-foreground ${
                        index < arr.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      {localeLabel[item]}
                    </Link>
                  );
                })}
            </div>
          ) : null}
        </div>
      </div>
    </header>

    {mobileOpen ? (
      <div className="fixed inset-x-0 bottom-0 top-[60px] z-50 overflow-y-auto border-t border-border bg-surface-alt lg:hidden reveal-scale-in">
          <nav className="mx-auto flex w-full max-w-[1800px] flex-col items-center gap-1 px-4 py-8 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`w-full max-w-sm rounded-md px-3 py-3 text-center text-base font-normal transition-colors hover:bg-surface-hover hover:text-foreground ${
                  isActive(link.href)
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-foreground-body"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 flex w-full max-w-sm items-center justify-center px-2">
              <div className="w-full">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-1 rounded-md px-3 py-3 text-base font-normal text-foreground-body hover:bg-surface-hover"
                  onClick={() => setMobileLanguageOpen((prev) => !prev)}
                  aria-expanded={mobileLanguageOpen}
                  aria-haspopup="menu"
                  aria-label={a11yLabels.changeLanguage[locale]}
                >
                  <span>{localeLabel[locale]}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {mobileLanguageOpen ? (
                  <div role="menu" className="mt-1 w-full rounded-md border border-border bg-surface p-1">
                    {locales
                      .filter((item) => item !== locale)
                      .map((item, index, arr) => {
                        const localizedPath = getLocalizedPath(pathname, item);
                        return (
                          <Link
                            key={item}
                            href={localizedPath}
                            role="menuitem"
                            className={`block w-full rounded px-2 py-2 text-center text-sm text-foreground-body hover:bg-surface-hover hover:text-foreground ${
                              index < arr.length - 1 ? "border-b border-border" : ""
                            }`}
                          >
                            {localeLabel[item]}
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}

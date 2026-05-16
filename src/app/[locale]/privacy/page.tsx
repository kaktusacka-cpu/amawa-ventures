import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const copy: Record<Locale, {
  title: string;
  lastUpdated: string;
  intro: string;
  contactHeading: string;
  contactBody: string;
  draftNotice: string;
  sections: Array<{ heading: string; body: string }>;
}> = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: 16 May 2026",
    intro:
      "Amawa Ventures s. r. o. (\"we\", \"us\") is the controller of personal data processed through this website. This policy describes what we collect, why, and your rights under the General Data Protection Regulation (GDPR).",
    contactHeading: "Contact",
    contactBody:
      "For privacy questions or to exercise your rights, contact us at info@amawaventures.com or by post at Hemerkova 1320/12, 040 23 Košice, Slovakia.",
    draftNotice:
      "This page is a working draft. Review with legal counsel before publishing.",
    sections: [
      {
        heading: "Data we collect",
        body:
          "When you contact us, we collect the information you provide (name, email, message). When you browse the site, our analytics providers (Vercel Analytics and, where enabled, Google Analytics) collect aggregated usage data such as page views and device type.",
      },
      {
        heading: "Why we collect it",
        body:
          "To respond to your enquiries, to operate and improve the website, and to comply with legal obligations.",
      },
      {
        heading: "Legal basis",
        body:
          "We rely on your consent (for analytics), the performance of a contract or pre-contractual steps (for enquiries you initiate), and our legitimate interests (for security and basic site operation).",
      },
      {
        heading: "Sharing",
        body:
          "We share data with the processors required to run the site: our hosting provider (Vercel), our content management system (Notion), and our analytics providers. We do not sell personal data.",
      },
      {
        heading: "Retention",
        body:
          "We keep enquiry data for as long as is necessary to handle your request and meet any related legal obligations. Aggregated analytics data is retained per the provider's defaults.",
      },
      {
        heading: "Your rights",
        body:
          "You have the right to access, rectify, erase, restrict, or object to processing of your personal data, and to data portability. You can also lodge a complaint with the Slovak Data Protection Authority (Úrad na ochranu osobných údajov SR).",
      },
      {
        heading: "Cookies",
        body:
          "We use only the cookies strictly necessary to operate the site and, where enabled, analytics cookies that help us understand how the site is used. You can manage cookies via your browser settings.",
      },
    ],
  },
  es: {
    title: "Política de Privacidad",
    lastUpdated: "Última actualización: 16 de mayo de 2026",
    intro:
      "Amawa Ventures s. r. o. (\"nosotros\") es la responsable del tratamiento de los datos personales recogidos a través de este sitio web. Esta política describe qué datos recopilamos, por qué, y tus derechos conforme al Reglamento General de Protección de Datos (RGPD).",
    contactHeading: "Contacto",
    contactBody:
      "Para consultas sobre privacidad o para ejercer tus derechos, escríbenos a info@amawaventures.com o por correo postal a Hemerkova 1320/12, 040 23 Košice, Eslovaquia.",
    draftNotice:
      "Esta página es un borrador. Revísala con asesoría legal antes de publicarla.",
    sections: [
      {
        heading: "Qué datos recogemos",
        body:
          "Cuando nos contactas, recogemos la información que nos facilitas (nombre, correo, mensaje). Cuando navegas por el sitio, nuestros proveedores de analítica (Vercel Analytics y, cuando está activado, Google Analytics) recogen datos agregados como páginas visitadas y tipo de dispositivo.",
      },
      {
        heading: "Por qué los recogemos",
        body:
          "Para responder a tus consultas, operar y mejorar el sitio, y cumplir con obligaciones legales.",
      },
      {
        heading: "Base jurídica",
        body:
          "Tu consentimiento (para analítica), la ejecución de un contrato o medidas precontractuales (para consultas que tú inicies) y nuestro interés legítimo (para seguridad y funcionamiento básico).",
      },
      {
        heading: "Comunicación a terceros",
        body:
          "Compartimos datos con los proveedores necesarios para operar el sitio: nuestro proveedor de hosting (Vercel), nuestro CMS (Notion) y nuestros proveedores de analítica. No vendemos datos personales.",
      },
      {
        heading: "Conservación",
        body:
          "Conservamos los datos de tus consultas el tiempo necesario para gestionarlas y cumplir las obligaciones legales asociadas. Los datos analíticos agregados se conservan según los plazos por defecto del proveedor.",
      },
      {
        heading: "Tus derechos",
        body:
          "Tienes derecho a acceder, rectificar, suprimir, limitar u oponerte al tratamiento de tus datos, y a la portabilidad. También puedes presentar una reclamación ante la Autoridad Eslovaca de Protección de Datos (Úrad na ochranu osobných údajov SR).",
      },
      {
        heading: "Cookies",
        body:
          "Utilizamos únicamente las cookies estrictamente necesarias para el funcionamiento del sitio y, cuando se activan, cookies de analítica que nos ayudan a entender cómo se usa. Puedes gestionarlas desde la configuración de tu navegador.",
      },
    ],
  },
  sk: {
    title: "Ochrana osobných údajov",
    lastUpdated: "Naposledy aktualizované: 16. máj 2026",
    intro:
      "Amawa Ventures s. r. o. („my\") je prevádzkovateľom osobných údajov spracúvaných prostredníctvom tejto webstránky. Tieto zásady opisujú, aké údaje zhromažďujeme, prečo, a aké máte práva podľa Všeobecného nariadenia o ochrane údajov (GDPR).",
    contactHeading: "Kontakt",
    contactBody:
      "S otázkami týkajúcimi sa ochrany osobných údajov alebo na uplatnenie vašich práv nás kontaktujte na info@amawaventures.com alebo poštou na adrese Hemerkova 1320/12, 040 23 Košice, Slovensko.",
    draftNotice:
      "Táto stránka je pracovná verzia. Pred zverejnením ju overte s právnikom.",
    sections: [
      {
        heading: "Aké údaje zhromažďujeme",
        body:
          "Keď nás kontaktujete, zhromažďujeme údaje, ktoré nám poskytnete (meno, e-mail, správa). Pri prehliadaní stránky naši poskytovatelia analytiky (Vercel Analytics a, ak je povolené, Google Analytics) zbierajú agregované údaje o používaní, ako sú zobrazenia stránok a typ zariadenia.",
      },
      {
        heading: "Prečo údaje spracúvame",
        body:
          "Aby sme mohli reagovať na vaše otázky, prevádzkovať a zlepšovať túto stránku a plniť právne povinnosti.",
      },
      {
        heading: "Právny základ",
        body:
          "Váš súhlas (pre analytiku), plnenie zmluvy alebo predzmluvných opatrení (pre vaše otázky) a oprávnený záujem (pre bezpečnosť a základnú prevádzku stránky).",
      },
      {
        heading: "Zdieľanie údajov",
        body:
          "Údaje zdieľame s poskytovateľmi nevyhnutnými na prevádzku stránky: poskytovateľom hostingu (Vercel), CMS (Notion) a poskytovateľmi analytiky. Osobné údaje nepredávame.",
      },
      {
        heading: "Doba uchovávania",
        body:
          "Údaje z vašich otázok uchovávame tak dlho, ako je potrebné na ich vybavenie a splnenie súvisiacich právnych povinností. Agregované analytické údaje sa uchovávajú podľa štandardných nastavení poskytovateľa.",
      },
      {
        heading: "Vaše práva",
        body:
          "Máte právo na prístup, opravu, výmaz, obmedzenie spracúvania, namietanie a prenosnosť údajov. Sťažnosť môžete podať aj na Úrade na ochranu osobných údajov SR.",
      },
      {
        heading: "Cookies",
        body:
          "Používame iba cookies nevyhnutné na prevádzku stránky a, ak je to povolené, analytické cookies, ktoré nám pomáhajú porozumieť používaniu stránky. Cookies môžete spravovať v nastaveniach prehliadača.",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return { title: "Privacy Policy" };
  return { title: copy[locale as Locale].title };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = copy[locale as Locale];

  return (
    <main className="bg-surface text-slate-900">
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-[120px] pb-[120px] flex flex-col items-center">
        <div className="mx-auto w-full max-w-[760px]">
          <h1 className="font-display text-[32px] sm:text-5xl text-slate-900">{c.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{c.lastUpdated}</p>

          <p className="mt-8 text-base leading-7 text-slate-700">{c.intro}</p>

          <div className="mt-12 space-y-10">
            {c.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl text-slate-900">{section.heading}</h2>
                <p className="mt-3 text-base leading-7 text-slate-700">{section.body}</p>
              </section>
            ))}

            <section>
              <h2 className="font-display text-2xl text-slate-900">{c.contactHeading}</h2>
              <p className="mt-3 text-base leading-7 text-slate-700">{c.contactBody}</p>
            </section>
          </div>

          <p className="mt-16 rounded-lg border border-border bg-surface-alt p-4 text-sm text-muted-foreground">
            {c.draftNotice}
          </p>
        </div>
      </section>
    </main>
  );
}

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // load translations via HTTP
  .use(LanguageDetector) // detect user language
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/locales/translation.{{lng}}.json", // path to your JSON files
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      caches: ["sessionStorage"],
      order: ["sessionStorage", "navigator"], // detect order
    },
    react: {
      useSuspense: true, // <--- enable suspense
    },
  });

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "bs",
    supportedLngs: ["bs", "en"],
    lng: "bs",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          register: "Register",
          login: "Sign in",
          "emailID/userID": "Email or user ID",
          password: "Password",
          notifications: "Notifications",
          aboutUs: "About us",
          contact: "Contact us",
          stores: "Online stores",
          legalInformation: "Legal information",
          dashboard: "Dashboard",
        },
      },
      bs: {
        translation: {
          register: "Registriraj se",
          login: "Prijavi se",
          "emailID/userID": "Email ili korisnički ID",
          password: "Lozinka",
          notifications: "Notifikacije",
          aboutUs: "O nama",
          contact: "Kontaktiraj nas",
          stores: "Online trgovine",
          legalInformation: "Pravne informacije",
          dashboard: "Korisnički panel",
        },
      },
    },
  });

export default i18n;

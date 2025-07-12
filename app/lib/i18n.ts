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
          individual: "Individual",
          business: "Business",
          register: "Register",
          login: "Sign in",
          emailID: "Email or user ID",
          password: "Password",
          notifications: "Notifications",
          aboutUs: "About us",
          contact: "Contact us",
          stores: "Online stores",
          legalInformation: "Legal information",
          dashboard: "Dashboard",
          wrongCredentials: "Wrong credentials",
          memberRegistration: "Member Registration",
          accountType: "Account Type",
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email",
          gender: "Gender",
          male: "Male",
          female: "Female",
          profileImage: "Profile Image",
          uploadImageHelp: "Upload png, jpg, or gif file under 1MB",
          address1: "Address 1",
          address2: "Address 2",
          country: "Country",
          state: "State",
          citySelect: "City (Select City)",
          postalCode: "Postal Code",
          bosniaHerzegovinaCode: "Bosnia Herzegovina (+387)",
          phoneNumber: "Phone Number",
          confirmPassword: "Confirm Password",
          acceptTerms: "I accept the terms and conditions",
        },
      },
      bs: {
        translation: {
          individual: "Fizičko lice",
          business: "Biznis",
          register: "Registriraj se",
          login: "Prijavi se",
          emailID: "Email ili korisnički ID",
          password: "Lozinka",
          notifications: "Notifikacije",
          aboutUs: "O nama",
          contact: "Kontaktiraj nas",
          stores: "Online trgovine",
          legalInformation: "Pravne informacije",
          dashboard: "Korisnički panel",
          wrongCredentials: "Pogrešni podaci",
          memberRegistration: "Registracija",
          accountType: "Vrsta računa",
          firstName: "Ime",
          lastName: "Prezime",
          email: "Email",
          gender: "Spol",
          male: "Muško",
          female: "Žensko",
          profileImage: "Profilna slika",
          uploadImageHelp:
            "Upload tipa ekstenzije png, jpg i gif ispod 1Mb fajla",
          address1: "Adresa 1",
          address2: "Adresa 2",
          country: "Zemlja",
          state: "Država",
          citySelect: "Grad",
          postalCode: "Poštanski broj",
          bosniaHerzegovinaCode: "Bosna i Hercegovina (+387)",
          phoneNumber: "Broj telefona",
          confirmPassword: "Potvrdite lozinku",
          acceptTerms: "Prihvatam uslove korištenja",
        },
      },
    },
  });

export default i18n;

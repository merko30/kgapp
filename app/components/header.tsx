import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useSession from "~/hooks/useSession";

const Header = () => {
  const { t, i18n } = useTranslation();

  const { session, loading } = useSession();

  return (
    <header className="py-6 shadow-lg sticky top-0 bg-white z-10">
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-12 md:w-24">
            <img src="/logo.png" alt="Kupi Global Logo" />
          </div>
          <div className="w-56">
            <h1 className="text-2xl font-bold text-primary">Kupi Global</h1>
            <h2 className="text-lg font-semibold text-gray-700 leading-tight">
              International shipping service
            </h2>
          </div>
        </Link>

        <nav>
          <div className="flex items-center gap-4 mb-4 justify-end">
            <span
              onClick={() => i18n.changeLanguage("bs")}
              className="cursor-pointer"
            >
              <img src="/bosnian.png" alt="Bosnian flag" />
            </span>
            <span
              onClick={() => i18n.changeLanguage("en")}
              className="cursor-pointer"
            >
              <img src="/usa.png" alt="USA flag" />
            </span>
          </div>
          <ul className="flex space-x-4">
            {loading && (
              <li>
                <span className="block w-24 h-6 bg-gray-50"></span>
              </li>
            )}
            {!loading && !session?.user && (
              <li>
                <a
                  href="/register"
                  className="tracking-widest uppercase text-sm"
                >
                  {t("register")}
                </a>
              </li>
            )}
            {!loading && session?.user && (
              <li>
                <a
                  href="/profile"
                  className="tracking-widest uppercase text-sm"
                >
                  Profil
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

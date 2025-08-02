import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LuChevronDown } from "react-icons/lu";
import { IoLanguage } from "react-icons/io5";

const languages = [
  { code: "en", name: "English" },
  { code: "pt", name: "Português" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center gap-2">
          <span className="capitalize flex items-center gap-2 text-white">
            <IoLanguage />
            {i18n.language}
            <LuChevronDown />
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`px-3 py-1 rounded capitalize ${
              i18n.language === lang.code ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {lang.code}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

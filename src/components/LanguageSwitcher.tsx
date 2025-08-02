'use client';

import { useLanguage } from '../contexts/LanguageContext';

const localeNames = {
  fr: 'Français',
  en: 'English',
  ar: 'العربية',
};

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleLocaleChange = (newLocale: string) => {
    setLanguage(newLocale as 'fr' | 'en' | 'ar');
  };

  return (
    <div className="relative">
      <select
        value={language}
        onChange={e => handleLocaleChange(e.target.value)}
        className="px-3 py-2 bg-white/90 dark:bg-gray-800/90 border border-slate-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100 text-slate-700 dark:text-gray-100 backdrop-blur-sm shadow-sm"
      >
        {Object.entries(localeNames).map(([locale, name]) => (
          <option key={locale} value={locale}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

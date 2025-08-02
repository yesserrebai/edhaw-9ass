'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export type Language = 'fr' | 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  // eslint-disable-next-line no-unused-vars
  setLanguage: (language: Language) => void;
  // eslint-disable-next-line no-unused-vars
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
}

const translations = {
  fr: {
    'app.title': 'Edhaw 9as',
    'app.description':
      "Application de signalement de coupures d'électricité en Tunisie",
    'location.requesting': 'Demande de votre localisation...',
    'location.error': 'Erreur lors de la récupération de la localisation',
    'location.geocodingError': "Erreur lors de la récupération de l'adresse",
    'outage.reportButton': 'Signaler une Coupure',
    'outage.selectTime': "Sélectionner l'heure de la coupure",
    'outage.now': 'Maintenant',
    'outage.recent': 'Récemment (1-2h)',
    'outage.earlier': 'Plus tôt (3-6h)',
    'outage.muchEarlier': 'Beaucoup plus tôt (>6h)',
    'reports.title': 'Rapports de Coupures',
    'reports.noReports': 'Aucun rapport pour le moment',
    'reports.table.time': 'Heure',
    'reports.table.category': 'Catégorie',
    'reports.table.address': 'Adresse',
    'reports.table.coordinates': 'Coordonnées',
    'chart.title': 'Statistiques des Coupures',
    'chart.noData': 'Aucune donnée disponible',
    'theme.toggle': 'Basculer le thème',
    'theme.select': 'Sélectionner le thème',
    'theme.light': 'Clair',
    'theme.dark': 'Sombre',
    'theme.system': 'Système',
    'theme.switchToDark': 'Passer au mode sombre',
    'theme.switchToLight': 'Passer au mode clair',
  },
  en: {
    'app.title': 'Edhaw 9as',
    'app.description': 'Electricity outage reporting application in Tunisia',
    'location.requesting': 'Requesting your location...',
    'location.error': 'Error retrieving location',
    'location.geocodingError': 'Error retrieving address',
    'outage.reportButton': 'Report Outage',
    'outage.selectTime': 'Select outage time',
    'outage.now': 'Now',
    'outage.recent': 'Recently (1-2h)',
    'outage.earlier': 'Earlier (3-6h)',
    'outage.muchEarlier': 'Much earlier (>6h)',
    'reports.title': 'Outage Reports',
    'reports.noReports': 'No reports yet',
    'reports.table.time': 'Time',
    'reports.table.category': 'Category',
    'reports.table.address': 'Address',
    'reports.table.coordinates': 'Coordinates',
    'chart.title': 'Outage Statistics',
    'chart.noData': 'No data available',
    'theme.toggle': 'Toggle theme',
    'theme.select': 'Select theme',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
    'theme.switchToDark': 'Switch to dark mode',
    'theme.switchToLight': 'Switch to light mode',
  },
  ar: {
    'app.title': 'عدة 9',
    'app.description': 'تطبيق الإبلاغ عن انقطاعات الكهرباء في تونس',
    'location.requesting': 'طلب موقعك...',
    'location.error': 'خطأ في استرجاع الموقع',
    'location.geocodingError': 'خطأ في استرجاع العنوان',
    'outage.reportButton': 'الإبلاغ عن انقطاع',
    'outage.selectTime': 'اختر وقت الانقطاع',
    'outage.now': 'الآن',
    'outage.recent': 'مؤخراً (1-2 ساعة)',
    'outage.earlier': 'أبكر (3-6 ساعات)',
    'outage.muchEarlier': 'أبكر بكثير (>6 ساعات)',
    'reports.title': 'تقارير الانقطاعات',
    'reports.noReports': 'لا توجد تقارير بعد',
    'reports.table.time': 'الوقت',
    'reports.table.category': 'الفئة',
    'reports.table.address': 'العنوان',
    'reports.table.coordinates': 'الإحداثيات',
    'chart.title': 'إحصائيات الانقطاعات',
    'chart.noData': 'لا توجد بيانات متاحة',
    'theme.toggle': 'تبديل المظهر',
    'theme.select': 'اختر المظهر',
    'theme.light': 'فاتح',
    'theme.dark': 'داكن',
    'theme.system': 'النظام',
    'theme.switchToDark': 'التبديل إلى الوضع الداكن',
    'theme.switchToLight': 'التبديل إلى الوضع الفاتح',
  },
};

export function LanguageProvider({
  children,
  defaultLanguage = 'fr',
  storageKey = 'language',
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newLanguage);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem(storageKey) as Language;
      if (savedLanguage && ['fr', 'en', 'ar'].includes(savedLanguage)) {
        setLanguage(savedLanguage);
      }
    }
  }, [storageKey]);

  const value: LanguageContextType = {
    language,
    setLanguage: handleSetLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

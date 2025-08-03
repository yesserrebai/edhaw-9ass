'use client';
import { useState,useEffect } from 'react';
import LocationPrompt from '../components/LocationPrompt';
import OutageButton from '../components/OutageButton';
import ReportChart from '../components/ReportChart';
import ReportTable from '../components/ReportTable';
import LocationsPieCharts from '../components/LocationsPieCharts';
import {Location,Report} from '../types/types'
import { useTheme } from 'next-themes';
import { LightSwitchOn,LightSwitchOff } from '@/components/LightSwitches';


export default function HomePage() {
  const [location, setLocation] = useState<Location | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const { theme, setTheme } = useTheme();

  const submitReport = (timeCategory: Report['timeCategory']) => {
    if (!location) return alert('Location not set');

    const report: Report = {
      timestamp: new Date().toISOString(),
      timeCategory,
      location,
    };

    setReports((prev) => [...prev, report]);
  };
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme('dark');
    }
  }, []);

  const togglePower = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  }

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className='flex justify-between mb-[25px] border-b border-gray-700 dark:border-gray-200 pb-2'>
      <h1 className="text-2xl font-bold pt-2">
       Edhaw 9as
      </h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center text-sm px-4 py-2 rounded-4xl bg-white p-2 border dark:text-black group transition-all duration-300">
            Edhaw yekhdem 3ana 😎 <span
              className="ml-2 flex items-center transition-all duration-300 group-hover:scale-x-110 group-hover:translate-x-2 group-hover:text-gray-400"
              style={{ transformOrigin: 'right' }}
            >
              {'>'}
            </span>
        </div>
        <button
          type="button"
          aria-label="Power"
          onClick={togglePower}
          className="focus:outline-none"
        >
          {theme === 'light' ? (
        <LightSwitchOn size={48} className="hover:opacity-80" />
          ) : (
        <LightSwitchOff size={48} className="hover:opacity-80" />
          )}
        </button>
      </div>
      </div>
      <LocationPrompt onLocationSet={setLocation} location={location} />
      {location && <OutageButton onSelect={submitReport} />}
      <div className="flex flex-col md:flex-row mb-8">
        <ReportChart reports={reports} />
        <LocationsPieCharts reports={reports} />
      </div>
      <ReportTable reports={reports} />
    </div>
  );
}
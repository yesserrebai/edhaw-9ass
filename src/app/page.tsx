'use client';
import { useState } from 'react';
import LocationPrompt from '../components/LocationPrompt';
import OutageButton from '../components/OutageButton';
import ReportChart from '../components/ReportChart';
import ReportTable from '../components/ReportTable';
import LocationsPieCharts from '../components/LocationsPieCharts';
import {Location,Report} from '../types/types'

export default function HomePage() {
  const [location, setLocation] = useState<Location | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  const submitReport = (timeCategory: Report['timeCategory']) => {
    if (!location) return alert('Location not set');

    const report: Report = {
      timestamp: new Date().toISOString(),
      timeCategory,
      location,
    };

    setReports((prev) => [...prev, report]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between mb-4'>
      <h1 className="text-2xl font-bold mb-4">
       Edhaw 9as
      </h1>
      <button
        type="button"
        className={`ml-2 px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 transition ml-auto w-fit`}
        aria-label="Power"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-700">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v9m6.364-4.364a9 9 0 11-12.728 0" />
        </svg>
       </button>
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
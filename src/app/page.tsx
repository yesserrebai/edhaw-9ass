'use client';
import { useEffect, useState } from 'react';
import LocationPrompt from '../components/LocationPrompt';
import OutageButton from '../components/OutageButton';
import ReportChart from '../components/ReportChart';
import ReportTable from '../components/ReportTable';

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
      <h1 className="text-2xl font-bold mb-4">Edhaw 9as</h1>
      <LocationPrompt onLocationSet={setLocation} />
      {location && <OutageButton onSelect={submitReport} />}
      <ReportChart reports={reports} />
      <ReportTable reports={reports} />
    </div>
  );
}
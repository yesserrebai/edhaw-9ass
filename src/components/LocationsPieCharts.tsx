import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useMemo } from 'react';
import { Report } from '@/types/types';
ChartJS.register(ArcElement, Tooltip, Legend);

interface ReportChartProps {
  readonly reports: ReadonlyArray<Report>;
}

export default function ReportChart({ reports }: ReportChartProps) {
  const top3frequencies = useMemo(() => {
    let locationsFrequency: { [key: string]: number } = {};

    reports.forEach(report => {
      const locationKey = `${report.location.region}`;
      locationsFrequency[locationKey] = (locationsFrequency[locationKey] || 0) + 1;
    });
    const sortedEntries = Object.entries(locationsFrequency).sort((a, b) => a[1] - b[1]);
    const sortedLabels = sortedEntries.map(([key]) => key);
    const sortedData = sortedEntries.map(([, value]) => value);
    
    return {
      labels: sortedLabels.slice(-3),
      data: sortedData.slice(-3),
    };
  }, [reports]);

  return (
    <div className="mb-8 w-[22em] ml-[7em] md:ml-auto flex flex-col items-center md:items-center">
      <h2 className="text-lg font-semibold mb-4 text-center">Most reported regions</h2>
      <Pie
        data={{
          labels: top3frequencies.labels,
          datasets: [
            {
              label: 'Reports',
              data: top3frequencies.data,
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Top 3 Reported Regions',
            },
          },
        }}
      />
    </div>
  );
}
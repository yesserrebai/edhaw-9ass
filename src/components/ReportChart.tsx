import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useMemo } from 'react';
import { Report } from '@/types/types';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface ReportChartProps {
  reports: Report[];
}

export default function ReportChart({ reports }: ReportChartProps) {
  const data = useMemo(() => {
    const now = new Date();
    const buckets: { [key: string]: number } = {};

    for (let i = 23; i >= 0; i--) {
      const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
      const label = hour.toISOString().slice(11, 13) + ':00';
      buckets[label] = 0;
    }

    reports.forEach(report => {
      const hour = new Date(report.timestamp).toISOString().slice(11, 13) + ':00';
      if (buckets[hour] !== undefined) {
        buckets[hour]++;
      }
    });

    return {
      labels: Object.keys(buckets),
      datasets: [
        {
          label: 'Reports',
          data: Object.values(buckets),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  }, [reports]);

  return (
    <div className="w-[20em] md:w-[40em]">
      <h2 className="text-lg font-semibold mb-4">Reports in the Last 24 Hours</h2>
      <Line data={data} />
    </div>
  );
}
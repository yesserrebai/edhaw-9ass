interface ReportTableProps {
  reports: Report[];
}
import { Report } from "@/types/types";
export default function ReportTable({ reports }: ReportTableProps) {
  const filtered = reports.filter(r => {
    const now = new Date();
    const timestamp = new Date(r.timestamp);
    return now.getTime() - timestamp.getTime() <= 24 * 60 * 60 * 1000;
  });

  const sorted = [...filtered].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Reports by Location</h2>
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100 text-black">
          <tr>
            <th className="border px-4 py-2 text-left">Time</th>
            <th className="border px-4 py-2 text-left">Location</th>
            <th className="border px-4 py-2 text-left">Post Code</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((report, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2"> {new Date(report.timestamp).toLocaleString('en-GB', { hour: '2-digit',minute: '2-digit',hour12: false,})}</td>
              <td className="border px-4 py-2">{report.location.city}, {report.location.region}</td>
              <td className="border px-4 py-2">{report.location.postCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
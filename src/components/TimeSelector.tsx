interface TimeSelectorProps {
  onSelect: (category: 'now' | '<1h' | '>1h') => void;
}

export default function TimeSelector({ onSelect }: TimeSelectorProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">When did the issue start?</h2>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => onSelect('now')}
        >
          Now
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => onSelect('<1h')}
        >
          Less than 1 hour ago
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => onSelect('>1h')}
        >
          More than 1 hour ago
        </button>
      </div>
    </div>
  );
}
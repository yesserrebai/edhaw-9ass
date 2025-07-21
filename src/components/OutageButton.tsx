// src/components/TimeSelector.tsx
"use client";

import { Report } from '../types/types';

interface TimeSelectorProps {
  onSelect: (category: Report['timeCategory']) => void;
}

export default function TimeSelector({ onSelect }: TimeSelectorProps) {
  return (
    <div className="mb-6">
      <button
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={() => onSelect('now')}
      >
        Report an Outage
      </button>
    </div>
  );
}

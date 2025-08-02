export interface TimeBucket {
  label: string;
  hoursAgo: number;
}

export function getTimeBuckets(): TimeBucket[] {
  return [
    { label: 'Maintenant', hoursAgo: 0 },
    { label: '1-2h', hoursAgo: 2 },
    { label: '3-6h', hoursAgo: 6 },
    { label: '6-12h', hoursAgo: 12 },
    { label: '12-24h', hoursAgo: 24 },
  ];
}

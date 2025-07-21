'use client';

import { useEffect } from 'react';

import { Location } from '@/types/types';

interface Props {
  onLocationSet: (loc: Location) => void;
}

export default function LocationPrompt({ onLocationSet }: Props) {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const loc: Location = {
          city: data.address.state_district,
          region: data.address.state ,
          postCode : data.address.postcode,
        };
        onLocationSet(loc);
      } catch (err) {
        console.error('Failed to reverse geocode:', err);
      }
    }, (err) => {
      console.error('Geolocation error:', err);
    });
  }, [onLocationSet]);

  return (
    <div className="mb-4 text-sm text-gray-600">
      Requesting your location...
    </div>
  );
}
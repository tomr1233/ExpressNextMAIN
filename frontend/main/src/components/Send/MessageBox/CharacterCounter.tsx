import React from 'react';

interface CharacterCounterProps {
  characterCount: number;
  segmentCount: number;
}

export default function CharacterCounter({
  characterCount,
  segmentCount,
}: CharacterCounterProps) {
  return (
    <div className="text-sm text-gray-500 mt-1">
      Approx. {characterCount} characters / {segmentCount} SMS per recipient
    </div>
  );
}
import { useState, useCallback } from 'react';

export function usePlanHighlight() {
  const [highlightedPlan, setHighlightedPlan] = useState<string | null>(null);

  const highlightPlan = useCallback((planTitle: string) => {
    setHighlightedPlan(planTitle);
    const table = document.querySelector('.features-table');
    if (table) {
      table.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return { highlightedPlan, highlightPlan };
}
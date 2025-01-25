export function formatNumber(num: number | undefined): string {
    if (num === undefined) return '-';
    return new Intl.NumberFormat().format(num);
  }
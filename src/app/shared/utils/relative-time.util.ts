export function relativeTime(date: string | Date): string {

  const now = new Date();
  const target = new Date(date);

  const seconds = Math.floor((target.getTime() - now.getTime()) / 1000);

  const formatter = new Intl.RelativeTimeFormat('es', {
    numeric: 'auto'
  });

  const intervals = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'week', seconds: 604800 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
  ] as const;

  for (const interval of intervals) {

    const value = Math.trunc(seconds / interval.seconds);

    if (Math.abs(value) >= 1) {
      return formatter.format(value, interval.unit);
    }

  }

  return 'Ahora';
}
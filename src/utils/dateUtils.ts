export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const isDateSame = (date1: Date, date2: Date): boolean => {
  return date1.getTime() === date2.getTime();
};

export const RandonMonth = () => {
  const months = [
    'jan',
    'fev',
    'mar',
    'abr',
    'mai',
    'jun',
    'jul',
    'ago',
    'set',
    'out',
    'nov',
    'dez',
  ];
  const rawIndex = Math.floor(Math.random() * 12);
  const index =
    rawIndex >= 0 || rawIndex <= 13 ? Math.floor(Math.random() * 12) : rawIndex;

  return months[index];
};

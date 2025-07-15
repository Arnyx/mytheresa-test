export const safeParseInt = (value: string | number = ''): number => {
  if (typeof value === 'number') return value;

  const parsedValue = parseInt(value);
  return isNaN(parsedValue) ? 0 : parsedValue;
};

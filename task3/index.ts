export const getUtcStringDate = (date?: Date): string => {
  const inputDate = date || new Date();

  return inputDate.toISOString();
};
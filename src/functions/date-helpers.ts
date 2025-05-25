import { parseISO } from 'date-fns/parseISO';
import { differenceInYears } from 'date-fns/differenceInYears';

// In date-helpers.ts
export const calculateAge = (dateString: string): number | null => {
  try {
    const date = parseISO(dateString);
    if (Number.isNaN(date.getTime())) {
      return null;
    }
    return differenceInYears(new Date(), date);
  } catch (error) {
    console.error("Error calculating age:", error);
    return null;
  }
};
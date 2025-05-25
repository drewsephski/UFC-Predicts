import { parseISO } from 'date-fns/parseISO';
import { differenceInYears } from 'date-fns/differenceInYears';

export const calculateAge = (dateString: string): number | string => {
  try {
    const date = parseISO(dateString);
    if (Number.isNaN(date.getTime())) {
      return 'N/A';
    }
    return differenceInYears(new Date(), date);
  } catch (error) {
    console.error("Error calculating age:", error);
    return 'N/A';
  }
}; 
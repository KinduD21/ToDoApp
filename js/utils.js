import { format, parseISO } from "date-fns";

export function formatDate(date) {
  return format(parseISO(date), "d MMM yyyy");
}

export const formattedCurrentDate = format( new Date(), "yyyy-MM-dd");
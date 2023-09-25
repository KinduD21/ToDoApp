import { format } from "date-fns";

export function formatDate(date) {
  return format(date, "d MMM yyyy");
}

export const formattedCurrentDate = format( new Date(), "yyyy-MM-dd");
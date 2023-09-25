import { format } from "date-fns";

export function formatDate(date) {
  return format(date, "d MMM yyyy");
}

const currentDate = new Date();

export const formattedCurrentDate = `${currentDate.getFullYear()}-${(
  currentDate.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
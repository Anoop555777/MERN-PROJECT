import { formatDistance, parseISO } from "date-fns";

export function formatCurrency(value) {
  const options = {
    style: "currency",
    currency: "INR",
  };
  return new Intl.NumberFormat("en", options).format(value);
}

export const subtractDates = (dateStr1, dateStr2) => {
  const date1 = new Date(dateStr1).getTime();
  const date2 = new Date(dateStr2).getTime();

  const date = date2 - date1;

  return Math.round(date / (1000 * 60 * 60 * 24));
};

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

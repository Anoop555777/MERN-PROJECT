export function formatCurrency(value) {
  const options = {
    style: "currency",
    currency: "INR",
  };
  return new Intl.NumberFormat("en", options).format(value);
}

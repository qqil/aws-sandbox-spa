export const formatPrice = (price: string, currency = "$") =>
  `${Number.parseFloat(price).toFixed(2)}${currency}`;

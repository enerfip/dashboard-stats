export const convertNumberToEuro = (collectedAmount) => {
  if (typeof collectedAmount !== "number") {
    throw new Error("Amount must be a number");
  }

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  
  }).format(collectedAmount);
}
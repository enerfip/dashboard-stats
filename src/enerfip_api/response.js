export const parseEnerfipResponse = (rawData) => {
  const rows = rawData?.query_result?.data?.rows;
  if (rows === undefined || rows.length === 0) {
    throw new Error("No data available");
  }

  return rows;
};

export const parseEnerfipAmountData = (rawData) => {
  const rows = parseEnerfipResponse(rawData);
  return rows[0].collected_amount;
};

export const parseEnerfipInsuredAmountData = (rawData) => {
  const amount = parseEnerfipResponse(rawData)[0].insured_amount;
  if (amount === null) {
    return null;
  }
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount < 0) {
    throw new Error("Invalid insured amount");
  }
  return amount;
};

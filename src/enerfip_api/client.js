import axios from "axios";

export { parseEnerfipResponse, parseEnerfipAmountData, parseEnerfipInsuredAmountData } from './response.js';

const baseURL = import.meta.env.VITE_API_URL;

export const getEnerfipQueryResult = async (queryId, apiKey) => {
  try {
    const response = await axios.get(`${baseURL}/api/queries/${queryId}/results`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        "refresh": 10,
        "api_key": apiKey,
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Unable to retrieve Redash query ${queryId}`);
    throw error;
  }
};

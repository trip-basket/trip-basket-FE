import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiBaseUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export const apiClient = axios.create({
  // biome-ignore lint/style/useNamingConvention: axios API property
  baseURL: apiBaseUrl,
  withCredentials: true,
});

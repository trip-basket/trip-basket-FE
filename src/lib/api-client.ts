import axios from "axios";

export const apiClient = axios.create({
  // biome-ignore lint/style/useNamingConvention: axios API property
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

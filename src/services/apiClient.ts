import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://pandin-group-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://213.199.53.100:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

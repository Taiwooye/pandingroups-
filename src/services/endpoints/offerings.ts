import { apiClient } from "../apiClient";

const BASE_PATH = "/api/v1/offerings";

export async function list(params?: Record<string, unknown>) {
  const { data } = await apiClient.get(BASE_PATH, { params });
  return data;
}

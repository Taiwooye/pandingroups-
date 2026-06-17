import { apiClient } from "../apiClient";

const BASE_PATH = "/api/v1/gallery";

export async function list(params?: Record<string, unknown>) {
  const { data } = await apiClient.get(BASE_PATH, { params });
  return data;
}

export async function getById(id: string) {
  const { data } = await apiClient.get(`${BASE_PATH}/${id}`);
  return data;
}

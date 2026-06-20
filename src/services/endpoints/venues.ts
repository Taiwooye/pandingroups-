import { apiClient } from "../apiClient";

const BASE_PATH = "/api/v1/venues";

export async function list(params?: Record<string, unknown>) {
  const { data } = await apiClient.get(BASE_PATH, { params });
  return data;
}

export async function getBySlug(slug: string) {
  const { data } = await apiClient.get(`${BASE_PATH}/${slug}`);
  return data;
}

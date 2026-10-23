import { apiClient } from "../apiClient";

const BASE_PATH = "/api/v1/policies";

export async function list(params?: Record<string, unknown>) {
  const { data } = await apiClient.get(BASE_PATH, { params });
  return data;
}

export async function listDamageCharges(params?: Record<string, unknown>) {
  const { data } = await apiClient.get(`${BASE_PATH}/damage-charges`, { params });
  return data;
}

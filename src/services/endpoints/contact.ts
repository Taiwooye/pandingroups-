import { apiClient } from "../apiClient";

const BASE_PATH = "/api/v1/contact";

export async function submit(payload: unknown) {
  const { data } = await apiClient.post(BASE_PATH, payload);
  return data;
}

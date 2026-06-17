import { useQuery } from "@tanstack/react-query";
import * as recreationApi from "@/services/endpoints/recreation";

const RECREATION_KEY = ["recreation"];

export function useRecreationList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...RECREATION_KEY, params],
    queryFn: () => recreationApi.list(params),
  });
}

export function useRecreationItem(id: string) {
  return useQuery({
    queryKey: [...RECREATION_KEY, id],
    queryFn: () => recreationApi.getById(id),
    enabled: !!id,
  });
}

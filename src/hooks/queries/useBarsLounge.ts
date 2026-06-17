import { useQuery } from "@tanstack/react-query";
import * as barsLoungeApi from "@/services/endpoints/barsLounge";

const BARS_LOUNGE_KEY = ["barsLounge"];

export function useBarsLoungeList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...BARS_LOUNGE_KEY, params],
    queryFn: () => barsLoungeApi.list(params),
  });
}

export function useBarsLoungeItem(id: string) {
  return useQuery({
    queryKey: [...BARS_LOUNGE_KEY, id],
    queryFn: () => barsLoungeApi.getById(id),
    enabled: !!id,
  });
}

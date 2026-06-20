import { useQuery } from "@tanstack/react-query";
import * as barsLoungeApi from "@/services/endpoints/barsLounge";

const BARS_KEY = ["bars"];

export function useBarsLoungeList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...BARS_KEY, params],
    queryFn: () => barsLoungeApi.list(params),
  });
}

export function useBarsLoungeItem(slug: string) {
  return useQuery({
    queryKey: [...BARS_KEY, slug],
    queryFn: () => barsLoungeApi.getBySlug(slug),
    enabled: !!slug,
  });
}

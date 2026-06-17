import { useQuery } from "@tanstack/react-query";
import * as contentApi from "@/services/endpoints/content";

const CONTENT_KEY = ["content"];

export function useContentList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...CONTENT_KEY, params],
    queryFn: () => contentApi.list(params),
  });
}

export function useContentItem(id: string) {
  return useQuery({
    queryKey: [...CONTENT_KEY, id],
    queryFn: () => contentApi.getById(id),
    enabled: !!id,
  });
}

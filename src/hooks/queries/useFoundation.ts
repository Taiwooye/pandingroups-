import { useQuery } from "@tanstack/react-query";
import * as foundationApi from "@/services/endpoints/foundation";

const FOUNDATION_KEY = ["foundation"];

export function useFoundationList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...FOUNDATION_KEY, params],
    queryFn: () => foundationApi.list(params),
  });
}

export function useFoundationProgram(id: string) {
  return useQuery({
    queryKey: [...FOUNDATION_KEY, id],
    queryFn: () => foundationApi.getById(id),
    enabled: !!id,
  });
}

import { useQuery } from "@tanstack/react-query";
import * as roomsApi from "@/services/endpoints/rooms";

const ROOMS_KEY = ["rooms"];

export function useRoomList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...ROOMS_KEY, params],
    queryFn: () => roomsApi.list(params),
  });
}

export function useRoom(slug: string) {
  return useQuery({
    queryKey: [...ROOMS_KEY, slug],
    queryFn: () => roomsApi.getBySlug(slug),
    enabled: !!slug,
  });
}

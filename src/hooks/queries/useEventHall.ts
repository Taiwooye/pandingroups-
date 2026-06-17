import { useQuery } from "@tanstack/react-query";
import * as eventHallsApi from "@/services/endpoints/eventHalls";

const EVENTHALLS_KEY = ["eventHalls"];

export function useEventHallList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...EVENTHALLS_KEY, params],
    queryFn: () => eventHallsApi.list(params),
  });
}

export function useEventHall(id: string) {
  return useQuery({
    queryKey: [...EVENTHALLS_KEY, id],
    queryFn: () => eventHallsApi.getById(id),
    enabled: !!id,
  });
}

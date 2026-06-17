import { useQuery } from "@tanstack/react-query";
import * as venuesApi from "@/services/endpoints/venues";

const VENUES_KEY = ["venues"];

export function useVenueList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...VENUES_KEY, params],
    queryFn: () => venuesApi.list(params),
  });
}

export function useVenue(id: string) {
  return useQuery({
    queryKey: [...VENUES_KEY, id],
    queryFn: () => venuesApi.getById(id),
    enabled: !!id,
  });
}

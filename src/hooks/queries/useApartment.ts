import { useQuery } from "@tanstack/react-query";
import * as apartmentsApi from "@/services/endpoints/apartments";

const APARTMENTS_KEY = ["apartments"];

export function useApartmentList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...APARTMENTS_KEY, params],
    queryFn: () => apartmentsApi.list(params),
  });
}

export function useApartment(slug: string) {
  return useQuery({
    queryKey: [...APARTMENTS_KEY, slug],
    queryFn: () => apartmentsApi.getBySlug(slug),
    enabled: !!slug,
  });
}

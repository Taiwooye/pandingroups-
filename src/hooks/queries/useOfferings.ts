import { useQuery } from "@tanstack/react-query";
import * as offeringsApi from "@/services/endpoints/offerings";

const OFFERINGS_KEY = ["offerings"];

export function useOfferingsList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...OFFERINGS_KEY, params],
    queryFn: () => offeringsApi.list(params),
  });
}

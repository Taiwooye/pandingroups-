import { useQuery } from "@tanstack/react-query";
import * as policiesApi from "@/services/endpoints/policies";

const POLICIES_KEY = ["policies"];

export function usePolicyList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...POLICIES_KEY, params],
    queryFn: () => policiesApi.list(params),
  });
}

export function useDamageChargeList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...POLICIES_KEY, "damage-charges", params],
    queryFn: () => policiesApi.listDamageCharges(params),
  });
}

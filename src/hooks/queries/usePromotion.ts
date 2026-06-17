import { useQuery } from "@tanstack/react-query";
import * as promotionsApi from "@/services/endpoints/promotions";

const PROMOTIONS_KEY = ["promotions"];

export function usePromotionList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...PROMOTIONS_KEY, params],
    queryFn: () => promotionsApi.list(params),
  });
}

export function usePromotion(id: string) {
  return useQuery({
    queryKey: [...PROMOTIONS_KEY, id],
    queryFn: () => promotionsApi.getById(id),
    enabled: !!id,
  });
}

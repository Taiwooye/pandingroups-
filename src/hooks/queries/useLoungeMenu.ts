import { useQuery } from "@tanstack/react-query";
import * as loungeMenuApi from "@/services/endpoints/loungeMenu";

const LOUNGE_MENU_KEY = ["loungeMenu"];

export function useLoungeMenuList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...LOUNGE_MENU_KEY, params],
    queryFn: () => loungeMenuApi.list(params),
  });
}

export function useLoungeMenuItem(id: string) {
  return useQuery({
    queryKey: [...LOUNGE_MENU_KEY, id],
    queryFn: () => loungeMenuApi.getById(id),
    enabled: !!id,
  });
}

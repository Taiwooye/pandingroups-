import { useQuery } from "@tanstack/react-query";
import * as testimonialsApi from "@/services/endpoints/testimonials";

const TESTIMONIALS_KEY = ["testimonials"];

export function useTestimonialList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...TESTIMONIALS_KEY, params],
    queryFn: () => testimonialsApi.list(params),
  });
}

export function useTestimonial(id: string) {
  return useQuery({
    queryKey: [...TESTIMONIALS_KEY, id],
    queryFn: () => testimonialsApi.getById(id),
    enabled: !!id,
  });
}

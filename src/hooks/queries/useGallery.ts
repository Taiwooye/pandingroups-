import { useQuery } from "@tanstack/react-query";
import * as galleryApi from "@/services/endpoints/gallery";

const GALLERY_KEY = ["gallery"];

export function useGalleryList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...GALLERY_KEY, params],
    queryFn: () => galleryApi.list(params),
  });
}

export function useGalleryItem(id: string) {
  return useQuery({
    queryKey: [...GALLERY_KEY, id],
    queryFn: () => galleryApi.getById(id),
    enabled: !!id,
  });
}

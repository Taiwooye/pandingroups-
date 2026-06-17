import { useMutation } from "@tanstack/react-query";
import * as contactApi from "@/services/endpoints/contact";

export function useSubmitContact() {
  return useMutation({
    mutationFn: contactApi.submit,
  });
}

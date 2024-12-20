import { FormState } from "@/lib/form-utils";
import { useEffect } from "react";
import { toast } from "sonner";

function useFormStatusToast(formState: FormState, pending?: boolean) {
  useEffect(() => {
    if (formState) {
      if (formState.status === "ERROR") {
        toast.error(formState.message, {
          position: "top-right",
          richColors: true,
        });
      } else if (formState.status === "SUCCESS") {
        toast.success(formState.message, {
          position: "top-right",
          richColors: true,
        });
      }
    }

    if (pending) {
      toast.loading("Loading...", {
        position: "top-right",
        richColors: true,
      });
    } else {
      toast.dismiss();
    }
  }, [formState, pending]);
}

export default useFormStatusToast;

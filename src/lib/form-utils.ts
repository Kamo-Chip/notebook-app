import { ZodError } from "zod";

export type FormState = {
  status: "UNSET" | "SUCCESS" | "ERROR";
  message: string;
  data: any;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
};

export const EMPTY_FORM_STATE: FormState = {
  status: "UNSET" as const,
  message: "",
  data: {},
  fieldErrors: {},
  timestamp: Date.now(),
};

export const fromErrorToFormState = (error: unknown, message?: string) => {
  if (error instanceof ZodError) {
    return {
      status: "ERROR" as const,
      message: message || "",
      data: null,
      fieldErrors: error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: "ERROR" as const,
      message: error.message,
      data: null,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  } else {
    return {
      status: "ERROR" as const,
      message: "An unknown error occurred",
      data: null,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  }
};

export const toFormState = (
  status: FormState["status"],
  message: string = "Success",
  data: {} = {}
): FormState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
    data,
  };
};

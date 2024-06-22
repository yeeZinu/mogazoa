export type ToastType = "success" | "caution" | "error" | "info";

export type Message = {
  id: string;
  message: string;
  type: ToastType;
};

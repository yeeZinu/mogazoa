import { Toast } from "@/components/Toast";

export const copyToClipboard = async () => {
  try {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    const toast = Toast.getInstance();
    toast.success("클립보드에 복사되었습니다.");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

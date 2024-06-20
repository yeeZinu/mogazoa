export const copyToClipboard = async () => {
  try {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

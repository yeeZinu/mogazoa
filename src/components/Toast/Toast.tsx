import { createRoot, Root } from "react-dom/client";
import { v4 as uuid } from "uuid";
import { ToastList } from "./ToastList";
import { Message, ToastType } from "./type";

const TOAST_DURATION = 3000;
const MAX_TOAST = 5;

class Toast {
  private static instance: Toast;

  private static root: Root | null = null;

  private messages: Message[] = [];

  private timeoutIds: { [key: string]: number } = {};

  private constructor() {
    if (!Toast.root) {
      const rootElement = document.getElementById("toast");
      if (!rootElement) {
        const newRootElement = document.createElement("div");
        newRootElement.id = "toast";
        document.body.appendChild(newRootElement);
        Toast.root = createRoot(newRootElement);
      } else {
        Toast.root = createRoot(rootElement);
      }
    }

    this.closeToast = this.closeToast.bind(this);
  }

  static getInstance(): Toast {
    if (!Toast.instance) {
      Toast.instance = new Toast();
    }
    return Toast.instance;
  }

  private closeToast(deleteId: string) {
    const deleteIndex = this.messages.findIndex(({ id }) => id === deleteId);
    if (deleteIndex !== -1) {
      clearTimeout(this.timeoutIds[deleteId]);
      delete this.timeoutIds[deleteId];
      this.messages.splice(deleteIndex, 1);
      this.renderToasts();
    }
  }

  private renderToasts() {
    if (Toast.root) {
      Toast.root.render(
        <ToastList
          messages={this.messages}
          closeToast={this.closeToast}
        />,
      );
    }
  }

  private autoCloseToast(id: string) {
    this.timeoutIds[id] = window.setTimeout(() => {
      this.closeToast(id);
    }, TOAST_DURATION);
  }

  private showToast(message: string, type: ToastType) {
    if (this.messages.length >= MAX_TOAST) {
      const oldestToast = this.messages.shift();

      if (oldestToast) {
        clearTimeout(this.timeoutIds[oldestToast.id]);
        delete this.timeoutIds[oldestToast.id];
      }
    }

    const id = uuid();
    this.messages.push({
      id,
      message,
      type,
    });
    this.renderToasts();
    this.autoCloseToast(id);
  }

  success(message: string) {
    this.showToast(message, "success");
  }

  caution(message: string) {
    this.showToast(message, "caution");
  }

  error(message: string) {
    this.showToast(message, "error");
  }

  info(message: string) {
    this.showToast(message, "info");
  }
}

export default Toast;

import { createRoot, Root } from "react-dom/client";
import { v4 as uuid } from "uuid";
import { ToastList } from "./ToastList";
import { Message } from "./type";

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
    }, 3000);
  }

  success(message: string) {
    const id = uuid();
    this.messages.push({
      id,
      message,
      type: "success",
    });
    this.renderToasts();
    this.autoCloseToast(id);
  }

  caution(message: string) {
    const id = uuid();
    this.messages.push({
      id,
      message,
      type: "caution",
    });
    this.renderToasts();
    this.autoCloseToast(id);
  }

  error(message: string) {
    const id = uuid();
    this.messages.push({
      id,
      message,
      type: "error",
    });
    this.renderToasts();
    this.autoCloseToast(id);
  }

  info(message: string) {
    const id = uuid();
    this.messages.push({
      id,
      message,
      type: "info",
    });
    this.renderToasts();
    this.autoCloseToast(id);
  }
}

export default Toast;

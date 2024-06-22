import { createRoot } from "react-dom/client";
import { v4 as uuid } from "uuid";
import { ToastList } from "./ToastList";
import { Message } from "./type";

class Toast {
  private rootElement: HTMLElement;

  private root: ReturnType<typeof createRoot>;

  private messages: Message[];

  constructor() {
    this.rootElement = document.getElementById("toast") as HTMLElement;
    this.root = createRoot(this.rootElement);
    this.messages = [];

    this.closeToast = this.closeToast.bind(this);
  }

  private closeToast(deleteId: string) {
    const deleteIndex = this.messages.findIndex(({ id }) => id === deleteId);
    this.messages.splice(deleteIndex, 1);
    this.root.render(
      <ToastList
        messages={this.messages}
        closeToast={this.closeToast}
      />,
    );
  }

  private renderToasts() {
    this.root.render(
      <ToastList
        messages={this.messages}
        closeToast={this.closeToast}
      />,
    );
  }

  private autoCloseToast(id: string) {
    setTimeout(
      () => {
        this.closeToast(id);
      },
      3000,
      this,
    );
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

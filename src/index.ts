const ORIGIN =
  localStorage.dev != "yes"
    ? "https://connect.mynumber.dev"
    : "http://localhost:8080";

const width = 500;
const height = 650;
interface Message {
  type: string;
  data: any;
}

export class Popup {
  events: { [name: string]: Array<(data: any) => void> } = {};
  target = null;
  appName = "";
  windowTimer = null;
  constructor({ appName }) {
    this.appName = appName;

    window.addEventListener("message", (e) => {
      if (e.origin === ORIGIN) {
        this.emit(e.data.type, e.data.data);
      }
    });
  }

  emit(typeName: string, data: object) {
    this.events[typeName]?.forEach((e: (data: any) => void) => e(data));
  }
  on(typeName: string, callback: (data: any) => void) {
    if (this.events[typeName]) {
      (this.events[typeName] as Array<(data: any) => void>).push(callback);
    } else {
      this.events[typeName] = [callback];
    }
  }
  off(typeName: string, handler: (data: any) => void) {
    const evt = this.events[typeName];
    if (!evt || !evt.length) {
      return;
    }
    this.events[typeName] = evt.filter((fn) => fn == handler);
  }
  waitOnce(typeName: string): Promise<Message> {
    return new Promise((resolve, reject) => {
      const handler = (data) => {
        this.off(typeName, handler);
        resolve(data);
      };
      this.on(typeName, handler);
    });
  }
  send(typeName: string, data = {}) {
    if (!this.target) {
      return;
    }
    this.target.postMessage(
      {
        type: typeName,
        data,
      },
      ORIGIN
    );
  }

  open(commandType: string, data: object = {}) {
    this.target = window.open(
      ORIGIN,
      "mynaconnect",
      `width=${width},height=${height},top=${
        window.screenY + (window.outerHeight - height) / 2
      },left=${window.screenX + (window.outerWidth - width) / 2}`
    );

    this.on("childReady", () => {
      this.send("parentReady", {
        remoteOrigin: location.origin,
        appName: this.appName,
        commandType,
        ...data,
      });
    });

    this.on("result", () => {
      this.close();
    });
    this.windowTimer = setInterval(() => {
      this.target && this.target.closed && this.close(true);
    }, 400);

    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      this.close();
    });
  }
  close(emitEvent = false) {
    emitEvent &&
      this.emit("exit", {
        success: false,
        cancelled: true,
      });
    this.windowTimer && clearInterval(this.windowTimer);
    this.target?.close();
    this.target = null;
  }
  async getResult(): Promise<object> {
    return await Promise.race([this.waitOnce("result"), this.waitOnce("exit")]);
  }
}

// shortcut functions(currently implemented only)
export async function signWithAuth(appName: string, sigHash: string) {
  const popup = new Popup({
    appName,
  });
  popup.open("signWithAuth", { sigHash });
  return await popup.getResult();
}
export async function getAuthCert(appName: string) {
  const popup = new Popup({
    appName,
  });
  popup.open("getAuthCert");
  return await popup.getResult();
}

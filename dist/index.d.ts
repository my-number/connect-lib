interface Message {
    type: string;
    data: any;
}
export declare class Popup {
    events: {
        [name: string]: Array<(data: any) => void>;
    };
    target: any;
    appName: string;
    windowTimer: any;
    constructor({ appName }: {
        appName: any;
    });
    emit(typeName: string, data: object): void;
    on(typeName: string, callback: (data: any) => void): void;
    off(typeName: string, handler: (data: any) => void): void;
    waitOnce(typeName: string): Promise<Message>;
    send(typeName: string, data?: {}): void;
    open(commandType: string, data?: object): void;
    close(emitEvent?: boolean): void;
    getResult(): Promise<object>;
}
export declare function signWithAuth(appName: string, sigHash: string): Promise<object>;
export declare function getAuthCert(appName: string): Promise<object>;
export {};

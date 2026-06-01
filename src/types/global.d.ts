export {};

declare global {
  interface Window {
    qbOpen?: () => void;
    qbClose?: () => void;
    qbNext?: () => void;
    qbPrev?: () => void;
    qbSend?: (channel: string) => void;
    spaGo?: (section: string) => void;
  }
}

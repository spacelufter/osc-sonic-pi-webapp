declare module 'osc' {
    export class UDPPort {
      constructor(options: { localAddress: string; localPort: number });
      open(): void;
      send(message: { address: string; args: any[] }): void;
    }
  }
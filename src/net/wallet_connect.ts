// Wallet transport intentionally absent in this offline product starter.
export interface WalletConnectState {
  address: string | null;
  chain: string | null;
}

export interface WalletConnectClient {
  current(): WalletConnectState;
  refresh(): WalletConnectState;
  connect(): Promise<WalletConnectState>;
  disconnect(): Promise<void>;
  signMessageBase58(message: string): Promise<string>;
  signAndSendTransactionBase64(transactionBase64: string): Promise<string>;
  onChange(listener: (state: WalletConnectState) => void): () => void;
}

export async function createWalletConnectClient(_projectId: string): Promise<WalletConnectClient> {
  throw new Error('Wallet integration is not configured in RPG Core');
}

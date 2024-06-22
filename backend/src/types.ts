export interface TransactionData {
  hash: string;
  to: string;
  contractAddress: string;
  timestamp: number;
}

export interface ContractData {
  bytecode: string;
}

export interface TransactionData {
  hash: string; // トランザクションのハッシュ
  to: string;
  // 他の必要なフィールドをここに追加します
}

export interface ContractData {
  bytecode: string;
  // 他の必要なフィールドをここに追加します
}

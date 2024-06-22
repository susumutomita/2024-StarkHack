import { HttpClient } from '../utils/HttpClient';
import { TransactionData } from '../types';

interface TransactionResponse {
  items: TransactionData[];
  lastPage: number;
}

export class TransactionRepository {
  private httpClient: HttpClient;

  constructor(baseURL: string) {
    this.httpClient = new HttpClient(baseURL);
  }

  public async getTransactionData(txHash: string): Promise<TransactionData> {
    const url = `/txns/${txHash}`;
    return this.httpClient.get(url);
  }

  public async getLatestTransactions(): Promise<TransactionData[]> {
    const url = `/txns?ps=10&p=1`; // 最新のトランザクションを取得するURLに変更
    const response: TransactionResponse = await this.httpClient.get(url);
    return response.items;
  }
}

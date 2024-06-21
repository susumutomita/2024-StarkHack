import { HttpClient } from '../utils/HttpClient';
import { TransactionData } from '../types';

export class TransactionRepository {
  private httpClient: HttpClient;

  constructor(baseURL: string) {
    this.httpClient = new HttpClient(baseURL);
  }

  public async getTransactionData(txHash: string): Promise<TransactionData> {
    const url = `/txns/${txHash}`;
    return this.httpClient.get(url);
  }
}

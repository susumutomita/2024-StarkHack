import { HttpClient } from '../utils/HttpClient';
import { ContractData } from '../types';

export class ContractRepository {
  private httpClient: HttpClient;

  constructor(baseURL: string) {
    this.httpClient = new HttpClient(baseURL);
  }

  public async getContractBytecode(contractAddress: string): Promise<string> {
    const url = `/contracts/${contractAddress}`;
    const data: ContractData = await this.httpClient.get(url);
    return data.bytecode;
  }
}

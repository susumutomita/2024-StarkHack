import { HttpClient } from '../utils/HttpClient';
import { ContractData } from '../types';

export class ContractRepository {
  private httpClient: HttpClient;

  constructor(baseURL: string) {
    this.httpClient = new HttpClient(baseURL);
  }

  public async getContractBytecode(contractAddress: string): Promise<string | undefined> {
    const url = `/contracts/${contractAddress}`;
    const data: ContractData = await this.httpClient.get(url);
    console.log(`Contract data for address ${contractAddress}: ${JSON.stringify(data)}`);
    return data.bytecode ?? undefined;
  }
}

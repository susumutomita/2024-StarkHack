import { TransactionRepository } from '../repositories/TransactionRepository';
import { ContractRepository } from '../repositories/ContractRepository';
import { TransactionData } from '../types';

const OPCODE_MAPPING: { [key: string]: string } = {
  '00': 'STOP', '01': 'ADD', '02': 'MUL', '03': 'SUB', '04': 'DIV',
  // 必要に応じて他のオペコードも追加してください
};

export class OpcodeService {
  private transactionRepository: TransactionRepository;
  private contractRepository: ContractRepository;

  constructor(apiBaseURL: string) {
    this.transactionRepository = new TransactionRepository(apiBaseURL);
    this.contractRepository = new ContractRepository(apiBaseURL);
  }

  private bytecodeToOpcodes(bytecode: string): string[] {
    console.log('Converting bytecode to opcodes');
    bytecode = bytecode.replace(/^0x/, '');
    const opcodes: string[] = [];
    for (let i = 0; i < bytecode.length; i += 2) {
      const byte = bytecode.slice(i, i + 2);
      const opcode = OPCODE_MAPPING[byte] || 'UNKNOWN';
      opcodes.push(opcode);
    }
    return opcodes;
  }

  public async getOpcodes(txHash: string): Promise<string[]> {
    try {
      console.log(`Fetching opcodes for transaction: ${txHash}`);
      const txData = await this.transactionRepository.getTransactionData(txHash);
      console.log(`Transaction data: ${JSON.stringify(txData)}`);
      const contractAddress = txData.contractAddress;
      if (!contractAddress) {
        throw new Error('Contract address is undefined');
      }
      const bytecode = await this.contractRepository.getContractBytecode(contractAddress);
      if (!bytecode) {
        console.warn('Bytecode is undefined, skipping opcode conversion');
        return ['UNKNOWN']; // バイトコードがない場合は 'UNKNOWN' を返す
      }
      console.log(`Contract bytecode: ${bytecode}`);
      return this.bytecodeToOpcodes(bytecode);
    } catch (error) {
      const err = error as any;
      console.error(`Error in getOpcodes: ${err.message}`);
      throw err;
    }
  }

  public async getLatestTransactionOpcodes(): Promise<{ txHash: string, opcodes: string[] }[]> {
    try {
      console.log('Fetching latest transactions');
      const transactions = await this.transactionRepository.getLatestTransactions();
      console.log(`Transactions: ${JSON.stringify(transactions)}`);
      const result = [];
      for (const tx of transactions) {
        const opcodes = await this.getOpcodes(tx.hash);
        result.push({ txHash: tx.hash, opcodes });
      }
      return result;
    } catch (error) {
      const err = error as any;
      console.error(`Error in getLatestTransactionOpcodes: ${err.message}`);
      throw err;
    }
  }
}

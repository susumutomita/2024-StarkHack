import { TransactionRepository } from '../repositories/TransactionRepository';
import { ContractRepository } from '../repositories/ContractRepository';

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
    const txData = await this.transactionRepository.getTransactionData(txHash);
    const contractAddress = txData.to;
    const bytecode = await this.contractRepository.getContractBytecode(contractAddress);
    return this.bytecodeToOpcodes(bytecode);
  }
}

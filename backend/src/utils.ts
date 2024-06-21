import axios from 'axios';
import { TransactionData, ContractData } from './types';
import dotenv from 'dotenv';

dotenv.config();

const VOYAGER_API_KEY = process.env.VOYAGER_API_KEY;
const VOYAGER_API_URL = 'https://voyager.online/api';

console.log('VOYAGER_API_KEY:', VOYAGER_API_KEY);
const OPCODE_MAPPING: { [key: string]: string } = {
  '00': 'STOP', '01': 'ADD', '02': 'MUL', '03': 'SUB', '04': 'DIV',
  // 必要に応じて他のオペコードも追加してください
};

export const bytecodeToOpcodes = (bytecode: string): string[] => {
  bytecode = bytecode.replace(/^0x/, '');
  const opcodes: string[] = [];
  for (let i = 0; i < bytecode.length; i += 2) {
    const byte = bytecode.slice(i, i + 2);
    const opcode = OPCODE_MAPPING[byte] || 'UNKNOWN';
    opcodes.push(opcode);
  }
  return opcodes;
};

export const getTransactionData = async (txHash: string): Promise<TransactionData> => {
  const url = `${VOYAGER_API_URL}/tx/${txHash}`;
  const headers = {
    'Authorization': `Bearer ${VOYAGER_API_KEY}`
  };
  const response = await axios.get(url, { headers });
  return response.data;
};

export const getContractBytecode = async (contractAddress: string): Promise<string> => {
  const url = `${VOYAGER_API_URL}/contract/${contractAddress}`;
  const headers = {
    'Authorization': `Bearer ${VOYAGER_API_KEY}`
  };
  const response = await axios.get(url, { headers });
  const data: ContractData = response.data;
  return data.bytecode;
};

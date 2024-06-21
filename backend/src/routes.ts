import { Router } from 'express';
import { getTransactionData, getContractBytecode, bytecodeToOpcodes } from './utils';

const router = Router();

router.get('/get_opcodes', async (req, res) => {
  const txHash = req.query.tx_hash as string;
  if (!txHash) {
    return res.status(400).json({ error: 'tx_hash is required' });
  }

  try {
    const txData = await getTransactionData(txHash);
    const contractAddress = txData.to;
    const bytecode = await getContractBytecode(contractAddress);
    const opcodes = bytecodeToOpcodes(bytecode);
    return res.json({ opcodes });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ error: err.message });
  }
});

export default router;

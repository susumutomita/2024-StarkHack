import { Router } from 'express';
import { OpcodeService } from './services/OpcodeService';

const router = Router();
const isProduction = process.env.NODE_ENV === 'production';
const apiBaseURL = isProduction ? 'https://api.voyager.online/beta' : 'https://sepolia-api.voyager.online/beta';

const opcodeService = new OpcodeService(apiBaseURL);

router.get('/opcodes', async (req, res) => {
  const txHash = req.query.tx_hash as string;
  if (!txHash) {
    return res.status(400).json({ error: 'tx_hash is required' });
  }

  try {
    const opcodes = await opcodeService.getOpcodes(txHash);
    return res.json({ opcodes });
  } catch (error) {
    const err = error as any;
    console.error('Error fetching opcodes:', err);
    return res.status(500).json({ error: err.message });
  }
});

router.get('/latest_opcodes', async (req, res) => {
  try {
    const opcodes = await opcodeService.getLatestTransactionOpcodes();
    return res.json({ opcodes });
  } catch (error) {
    const err = error as any;
    console.error('Error fetching latest opcodes:', err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;

import { Router } from 'express';
import { OpcodeService } from './services/OpcodeService';

const router = Router();
const apiBaseURL = 'https://sepolia-api.voyager.online/beta';  // ここでAPIのベースURLを指定

const opcodeService = new OpcodeService(apiBaseURL);

router.get('/get_opcodes', async (req, res) => {
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

export default router;

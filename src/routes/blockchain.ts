import express, { Response } from "express";
const router = express.Router();
import blockChain from "../blockchain";

// GET Routes
router.route("/get_chain").get((_, res: Response) => {
  return res.status(200).json({
    chain: blockChain.chain,
    length: blockChain.chain.length,
  });
});

router.route("/mine_block").get((_, res: Response) => {
  const previousBlock = blockChain.getPreviousBlock();
  const previousProof = previousBlock.proof;
  const proof = blockChain.proofOfWork(previousProof);
  const previousHash = blockChain.hash(previousBlock);
  const block = blockChain.createBlock(proof, previousHash);

  return res.status(200).json(block);
});

router.route("/is_chain_valid").get((_, res: Response) => {
  const isValid = blockChain.isChainValid(blockChain.chain);
  return isValid
    ? res.status(200).json({
        result: "The blockchain is valid",
      })
    : res.status(400).json({
        result: "The blockhain is invalid",
      });
});

export default router;

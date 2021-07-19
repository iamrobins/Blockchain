import crypto from "crypto";

export interface Block {
  index: number;
  previous_hash: string;
  proof: number;
  timestamp: string;
}

class Blockchain {
  readonly chain: Block[];

  constructor() {
    this.chain = [];
    this.createBlock(1, "0");
  }

  // Creates a new block
  createBlock(proof: number, previous_hash: string) {
    const block: Block = {
      index: this.chain.length + 1,
      previous_hash: previous_hash,
      proof: proof,
      timestamp: new Date().toJSON(),
    };
    this.chain.push(block);
    return block;
  }

  // Get the previous block from the chain
  getPreviousBlock() {
    return this.chain[this.chain.length - 1];
  }

  // The proof of work challenge for golden nonce
  proofOfWork(previousProof: number) {
    let newProof: number = 1;
    let checkProof: boolean = false;
    while (checkProof === false) {
      const hashOpeartion: string = crypto
        .createHash("sha256")
        .update((newProof ** 2 - previousProof ** 2).toString())
        .digest("hex");

      if (hashOpeartion.substring(0, 4) === "0000") checkProof = true;
      else newProof += 1;
    }
    return newProof;
  }

  // Generate hash
  hash(block: Block) {
    const encodedBlock = JSON.stringify(block);
    return crypto.createHash("sha256").update(encodedBlock).digest("hex");
  }

  // Check if chain is valid or not
  isChainValid(chain: Block[]) {
    let previousBlock: Block = chain[0];
    let blockIndex: number = 1;

    while (blockIndex < chain.length) {
      const block = chain[blockIndex];
      if (block.previous_hash !== this.hash(previousBlock)) return;

      const hashOperation = crypto
        .createHash("sha256")
        .update((block.proof ** 2 - previousBlock.proof ** 2).toString())
        .digest("hex");

      if (hashOperation.substring(0, 4) !== "0000") return false;

      previousBlock = block;
      blockIndex += 1;
    }

    return true;
  }
}

const blockChain = new Blockchain();

export default blockChain;

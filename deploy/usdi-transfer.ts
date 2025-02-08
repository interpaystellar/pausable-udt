import { ccc } from "@ckb-ccc/ccc";
import { signer } from "@ckb-ccc/playground";

// USDI constants
const usdiScriptTypeIDArgs = "0xf0bad0541211603bf14946e09ceac920dd7ed4f862f0ffd53d0d477d6e1d0f0b";

const usdiScriptTypeID = ccc.Script.from({
  codeHash:
    "0x00000000000000000000000000000000000000000000000000545950455f4944",
  hashType: "type",
  args: usdiScriptTypeIDArgs,
});

const usdiTokenArgs = "0x71fd1985b2971a9903e4d8ed0d59e6710166985217ca0681437883837b86162f";

const ssriServerUrl = "http://localhost:9090";

// Find USDI script cell
const scriptCell = await signer.client.findSingletonCellByType(usdiScriptTypeID);
if (!scriptCell) {
  throw new Error("USDI script cell not found");
}

const usdiOutPoint: ccc.OutPointLike = {
  txHash: scriptCell.outPoint.txHash,
  index: scriptCell.outPoint.index,
};

console.log("usdi script outpoint: ", usdiOutPoint)

// calculate usdi code hash
const usdiCodeHash = usdiScriptTypeID?.hash();

console.log("usdi code hash: ", usdiCodeHash);


// calculate usdi token identity
const usdiType = ccc.Script.from({
  codeHash: usdiCodeHash,
  hashType: "type",
  args: usdiTokenArgs,
});

const usdiTokenIdentity = usdiType.hash();

console.log("usdi token identity: ", usdiTokenIdentity);


// Create USDI ssri instance
const executor = new ccc.ssri.ExecutorJsonRpc(ssriServerUrl);
const usdi = new ccc.udt.UdtPausable(usdiOutPoint, usdiType, { executor });


// Generate transfer transaction
const receiverAddress =
  "ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsq2jk6pyw9vlnfakx7vp4t5lxg0lzvvsp3c5adflu";

const { script: lockA } = await ccc.Address.fromString(
  receiverAddress,
  signer.client
);

const usdiTransferTx = (await usdi.transfer(signer, [
  {
    to: lockA,
    amount: 1000000000,
  },
])).res;

await usdi.completeBy(usdiTransferTx, signer);
await usdiTransferTx.completeFeeBy(signer);

const txHash = await signer.sendTransaction(usdiTransferTx);
console.log("The transaction hash is", txHash);


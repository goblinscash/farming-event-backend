import { sleep, unstake } from "../utils/api.utils.js";
import { contractInstance, providerInstance } from "../utils/web3.utils.js";

export function unStake() {
    try {
        tokenUnStaked(56)
        tokenUnStaked(8453)
        // tokenUnStaked(10000)
    } catch (error) {
        console.log(error, "unstake")
    }
}

async function tokenUnStaked(chainId) {
    const contract = contractInstance(chainId)
    contract.on("TokenUnstaked", async (tokenId, incentiveId, event) => {
        try {
            console.log("TokenUnstaked Event Detected:", `[${new Date().toISOString()}]`);
            await sleep(3000)
            const provider = providerInstance(chainId)
            const tx = await provider.getTransaction(event.log.transactionHash);

            await unstake(chainId, incentiveId, tx.from)
            console.log(`Token Unstaked:
                 Wallet: ${tx.from}
                Token ID: ${tokenId},
                Incentive ID: ${incentiveId}`);
        } catch (error) {
            console.error("Error fetching transaction details:", error);
        };

    });
}


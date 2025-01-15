import { deposit } from "../utils/api.utils.js";
import { contractInstance, providerInstance } from "../utils/web3.utils.js";

export function stake() {
    try {
        tokenStaked(56)
        tokenStaked(8453)
        // tokenStaked(10000)
    } catch (error) {
        console.log(error, "stake")
    }
}

async function tokenStaked(chainId) {
    const contract = contractInstance(chainId)
    const provider = providerInstance(chainId)
    contract.on("TokenStaked", async (tokenId, incentiveId, liquidity, event) => {
        try {
            console.log("TokenStaked Event Detected:");
            console.log(event?.log?.transactionHash)
            const tx = await provider.getTransaction(event.log.transactionHash);
            await deposit(chainId, incentiveId, tokenId.toString(), tx.from)

            console.log(`Token Staked: 
                Wallet: ${tx.from}
                TokenId: ${tokenId.toString()}, 
                IncentiveId: ${incentiveId}`);

        } catch (error) {
            console.error("Error fetching transaction details:", error);
        };

    });
}

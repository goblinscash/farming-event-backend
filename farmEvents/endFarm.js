import { deleteFarm } from "../utils/api.utils.js";
import { contractInstance } from "../utils/web3.utils.js";

export function endIncentive() {
    try {
        endFarm(8453)
        endFarm(56)
        // endFarm(10000)
    } catch (error) {
        console.log(error, "end farm")
    }
}

async function endFarm(chainId) {
    const contract = contractInstance(chainId)

    contract.on("IncentiveEnded", async (incentiveId, refund) => {
        console.log("End farm Event Detected:", `[${new Date().toISOString()}]`); 
        await deleteFarm(chainId, incentiveId)
        console.log("Incentive ID:", incentiveId);
        console.log("Refund Amount:", refund);
      });
}


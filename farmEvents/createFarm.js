import { saveFarm } from "../utils/api.utils.js";
import { contractInstance, getDecimal } from "../utils/web3.utils.js";

export function createIncentive(chainId) {
    try {
        createFarm(chainId)
        createFarm(chainId)
        // createFarm(10000)
    } catch (error) {
        console.log(error, "ceate farm")
    }
}

async function createFarm(chainId) {
    const contract = contractInstance(chainId)
    contract.on("IncentiveCreated", async(rewardToken, pool, startTime, endTime, refundee, minimumWidth, reward) => {
        console.log("Create farm Event Detected:", `[${new Date().toISOString()}]`);
        const decimal = await getDecimal(chainId, rewardToken)
        const farmData = {
            chainId: chainId,
            createdData: {
                rewardToken:  rewardToken,
                pool: pool.toLowerCase(),
                startTime: Number(startTime),
                endTime: Number(endTime),
                refundee: refundee,
                minWidth: Number(minimumWidth),
                reward: Number(reward) / 10**decimal
            }
        }
        console.log(farmData)
        await saveFarm(farmData)
    });
}
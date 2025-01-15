import { ethers } from "ethers";
import { farmConfig } from "./config.utils.js";
import { nftStakerABI } from "../abi/abi.js";
import { tokenABI } from "../abi/tokenABI.js"


function createFallbackProvider(rpcUrls) {
    const providers = rpcUrls
        .map((url) => {
            try {
                // const provider = new ethers.getDefaultProvider(url);
                const provider = new ethers.WebSocketProvider(url);
                return provider;
            } catch (error) {
                return null;
            }
        })
        .filter((provider) => provider !== null);
    if (providers.length === 0) {
        throw new Error("No valid providers were created.");
    }
    return providers[0];
}

export const contractInstance = (chainId) => {
    try {
        const provider = createFallbackProvider(farmConfig[chainId].rpc)
        const contract = new ethers.Contract(farmConfig[chainId].contract, nftStakerABI, provider);
        return contract
    } catch (error) {
        throw error;
    }
}

export const providerInstance = (chainId) => {
    try {
        const provider = new ethers.getDefaultProvider(farmConfig[chainId].rpcUrl)
        return provider
    } catch (error) {
        throw error;
    }
}

export const parseTransactionData = async(chainId, transactionHash) => {
    try {
        const provider = providerInstance(chainId)
        const tx = await provider.getTransaction(transactionHash)
        stakeData.chainId = chainId;
        stakeData.wallet = tx.from
        const iface = new ethers.Interface(nftStakerABI);
        const decodedMulticall = iface.parseTransaction({data: tx.data})

        console.log(decodedMulticall, "decodedMulticall")
        const calls = decodedMulticall.args[0];
          try {
            console.log(`Decoded Call + 1 :`, iface.decodeFunctionData("stakeToken", calls[0]));
          } catch (error) {
            console.log(`Error decoding call`, error.message);
          }
          return stakeData
    } catch (error) {
        console.log("error++", error)
    }
}

export const getDecimal = async(chainId, token) => {
    const provider = providerInstance(chainId)
    const contract = new ethers.Contract(token, tokenABI, provider);
    const decimal = await contract.decimals();
    console.log(Number(decimal))
    return Number(decimal)
}
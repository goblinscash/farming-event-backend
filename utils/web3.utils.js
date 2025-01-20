import { ethers } from "ethers";
import { farmConfig } from "./config.utils.js";
import { nftStakerABI } from "../abi/abi.js";
import { tokenABI } from "../abi/tokenABI.js"

import { stake, unStake, createIncentive, endIncentive } from "../farmEvents/index.js";

const restart = (chainId) => {
  // createIncentive(chainId);
  stake(chainId);
  unStake(chainId);
  // endIncentive(chainId);
}

const WS_URLS = {
  56: farmConfig[56].rpc[0], // Binance Smart Chain
  8453: farmConfig[8453].rpc[0],   // Base Chain
  //   10000:farmConfig[10000].rpc[0],  // SmartBCH
};

const providers = {};

const initializeProvider = (chainId) => {
  const provider = new ethers.WebSocketProvider(
    WS_URLS[chainId]
  );

  provider.websocket.on("close", (code, reason) => {
    console.error(
      `WebSocket connection for chain ID ${chainId} closed. Code: ${code}, Reason: ${reason}. Reconnecting...`
    );
    reconnect(chainId);
  });

  provider.websocket.on("error", (error) => {
    console.error(
      `WebSocket error for chain ID ${chainId}. Reconnecting...`,
      error
    );
    reconnect(chainId);
  });

  return provider;
};

const reconnect = (chainId) => {
  restart(Number(chainId))
  // setTimeout(() => {
  //   try {
  //     providers[chainId] = initializeProvider(Number(chainId));
  //     console.log(`Reconnected to WebSocket for chain ID ${chainId}`);
  //   } catch (error) {
  //     console.error(`Failed to reconnect for chain ID ${chainId}`, error);
  //     reconnect(chainId); // Retry until successful
  //   }
  // }, 5000); // Retry after 5 seconds
};

// Initialize all providers
Object.keys(WS_URLS).forEach((chainId) => {
  providers[chainId] = initializeProvider(Number(chainId));
});

const getProvider = (chainId) => {
  const provider = providers[chainId];
  return provider;
};



// function createFallbackProvider(rpcUrls) {
//     const providers = rpcUrls
//         .map((url) => {
//             try {
//                 // const provider = new ethers.getDefaultProvider(url);
//                 let provider = new ethers.WebSocketProvider(url);
//                 provider.websocket.close = (event) => {
//                     console.error("WebSocket connection closed. Reconnecting...", event, url);
//                     // setTimeout(() => {
//                     //     provider = new ethers.WebSocketProvider("wss://base-rpc.publicnode.com");
//                     // }, 5000); // Retry after 5 seconds
//                 };
//                 return provider;
//             } catch (error) {
//                 return null;
//             }
//         })
//         .filter((provider) => provider !== null);
//     if (providers.length === 0) {
//         throw new Error("No valid providers were created.");
//     }
//     return providers[0];
// }

export const contractInstance = (chainId) => {
  try {
    const provider = getProvider(chainId) // createFallbackProvider(farmConfig[chainId].rpc)
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

export const parseTransactionData = async (chainId, transactionHash) => {
  try {
    const provider = providerInstance(chainId)
    const tx = await provider.getTransaction(transactionHash)
    stakeData.chainId = chainId;
    stakeData.wallet = tx.from
    const iface = new ethers.Interface(nftStakerABI);
    const decodedMulticall = iface.parseTransaction({ data: tx.data })

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

export const getDecimal = async (chainId, token) => {
  const provider = providerInstance(chainId)
  const contract = new ethers.Contract(token, tokenABI, provider);
  const decimal = await contract.decimals();
  console.log(Number(decimal))
  return Number(decimal)
}
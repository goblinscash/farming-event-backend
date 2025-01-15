import axios from "axios";
import { BASE_URL } from "./config.utils.js";

const getFarmIdUrl = `${BASE_URL}/farm/id`
const stakeUrl = `${BASE_URL}/farm/deposit`
const unstakeUrl = `${BASE_URL}/farm/unstake`
const createFarmUrl = `${BASE_URL}/farm/create`
const deleteFarmUrl = `${BASE_URL}/farm/delete`


export const getFarmId = async (chainId, incentiveId) => {
    try {
        const {data} = await axios.get(getFarmIdUrl, {
            params: {
                chainId,
                incentiveId
            }
        });
        return data.id
    } catch (error) {
        console.log(error)
    }
}

export const saveFarm = async(farmData) => {
    try {
        const {data} = await axios.post(createFarmUrl, farmData)
        console.log(data.msg, "createFarm ++")
    } catch (error) {
        console.log(error, "createFarm")
    }
}

export const deleteFarm = async(chainId, incentiveId) => {
    try {
        const farmId = await getFarmId(chainId, incentiveId)
        const {data} = await axios.post(deleteFarmUrl, {chainId, farmId})
        console.log(data.msg, "endFarm ++")
    } catch (error) {
        console.log(error, "endFarm")
    }
}

export const deposit = async(chainId, incentiveId, tokenId, wallet) => {
    try {
        const farmId = await getFarmId(chainId, incentiveId)
        const {data} = await axios.post(stakeUrl, {
            chainId, wallet, farmId, tokenId
        })
        console.log(data.msg, "staked++")
    } catch (error) {
        console.log(error)
    }
}

export const unstake = async(chainId, incentiveId, wallet) => {
    try {
        const farmId = await getFarmId(chainId, incentiveId)
        const {data} = await axios.post(unstakeUrl, {
            chainId, wallet, farmId
        })
        console.log(data.msg, "unstaked data++")
    } catch (error) {
        console.log(error)
    }
}


import { maxUint256, maxUint32, maxUint64 } from "viem";
import type { BetInfo } from "./interface";

export const truncateAddress = (address: `0x${string}`) => {
    return address.slice(0, 6) + '...' + address.slice(address.length - 4);
}

export const BLOCK_EXPLORERS: {[chainid: number] : string } = {
    1: 'https://etherscan.io/',
    8453: 'https://basescan.org/'
}

export const B128 = BigInt(128)
export const B64 = BigInt(64)
export const B32  = BigInt(32)
export const B31  = BigInt(31)
export const B30  = BigInt(30)
export const B29 = BigInt(29) 
export const ONE = BigInt(1)
export const ONE_MASK = ~(maxUint256 << ONE)

export const MOCK20 = "0xB97183D2e5FA8954dcf7fbf16FC065d343278593"
export const SEP_FACTORY_ADDRESS = "0x064AA994e3D69c9d5531BcA7502E2F35df09EB25"
export const SEP_DEPLOY_BLOCK = 4623428

export const FUJI_FACTORY_ADDRESS = "0x451ee42a0FF7b4b706D2A3665c1F8327744c6f40"
export const FUJI_DEPLOY_BLOCK = 27440179
export const parseBetInfo = (betInfo: bigint) : BetInfo => {
    /*
    wager = betInfo >> 128;
    match_id = (betInfo >> 64) & 0xffffffffffffffff;
    margin = (betInfo >> 32) & 0xffffffff;
    winner = (betInfo >> 31) & 1 == 1;
    _cover = (betInfo >> 30) & 1 == 1;
    finished = (betInfo >> 29) & 1 == 1;
    */
    return {
        wager: betInfo >> B128,
        matchId: parseInt(((betInfo >> B64) & maxUint64).toString()),
        margin: parseInt(((betInfo >> B32) & maxUint32).toString()),
        winner: ((betInfo >> B31) & ONE) == ONE,
        cover: ((betInfo >> B30) & ONE) == ONE,
        finished: ((betInfo >> B29) & ONE) == ONE,
    }
}
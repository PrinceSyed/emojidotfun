import { getContract } from "thirdweb";
import { client } from "../client";
import { baseSepolia, defineChain } from "thirdweb/chains";
import { wishlistABI } from "./wishlistABI";

const contractAddress = "0x6624D1fDe05c96cE7B63A030105Ff61E2f10E474";

export const wishlistcontract = getContract({
    client: client,
    chain: defineChain(baseSepolia),
    address: contractAddress,
    abi: wishlistABI,
});
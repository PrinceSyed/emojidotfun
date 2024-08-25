import { getContract } from "thirdweb";
import { client } from "../client";
import { baseSepolia, defineChain } from "thirdweb/chains";
import { contractABI } from "./contractABI";

const contractAddress = "0xA88fD63c7c22e335B2B581d8C0f6830b0B94519d";

export const contract = getContract({
    client: client,
    chain: defineChain(baseSepolia),
    address: contractAddress,
    abi: contractABI,
});
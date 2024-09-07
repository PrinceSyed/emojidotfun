import { getContract } from "thirdweb";
import { client } from "../client";
import { base, defineChain } from "thirdweb/chains";
import { wishlistABI } from "./wishlistABI";

const contractAddress = "0x2b01F5205f9eC485aA99439CA6801E2e0DE1FAc4";

export const wishlistcontract = getContract({
    client: client,
    chain: defineChain(base),
    address: contractAddress,
    abi: wishlistABI,
});
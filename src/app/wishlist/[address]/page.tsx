"use client";

import {
    ConnectButton,
    useReadContract,
} from "thirdweb/react";
import { useState, useEffect } from "react";
import { prepareContractCall } from "thirdweb";
import { wishlistcontract } from "@/app/utils/wishlistcontract";
import { client } from "@/app/client";
import { createWallet } from "thirdweb/wallets";
import { baseSepolia, defineChain } from "thirdweb/chains";
import ProductList from "@/app/components/ProductList";

interface Product {
    id: string;
    creator: string;
    title: string;
    price: string;
    createdAt: number; // Changed to `number` to match the other page
    isSold: boolean;
    buyer: string;
}

const WishlistByAddressPage = ({ params }: { params: { address: string } }) => {
    const { address } = params;
    const wallets = [createWallet("com.coinbase.wallet"), createWallet("io.metamask")];
    const [products, setProducts] = useState<Product[]>([]);

    const { data: productList, isLoading, refetch: refetchProducts } = useReadContract({
        contract: wishlistcontract,
        method: "getUserProducts",
        params: [address],
    });

    useEffect(() => {
        if (productList) {
            const fetchedProducts = productList.map((product: any) => ({
                id: product.id?.toString(),
                creator: product.creator,
                title: product.title,
                price: product.price?.toString(),
                createdAt: Number(product.createdAt), // Ensure it's treated as a number
                isSold: product.isSold,
                buyer: product.buyer || '',
            }));

            setProducts(fetchedProducts);
        }
    }, [productList]);

    const handleBuyProduct = (productId: string, productPrice: string) => {
        return prepareContractCall({
            contract: wishlistcontract,
            method: "buyProduct",
            params: [BigInt(productId)],
            value: BigInt(productPrice),
        });
    };

    return (
        <div className="flex w-full p-10 align-middle justify-center max-w-[500px] items-center mx-auto">
            <div className="w-full">
                <h2>Products by {address}</h2>
                <div>
                    <ConnectButton
                        client={client}
                        wallets={wallets}
                        chain={defineChain(baseSepolia)}
                    />
                </div>

                <ProductList
                    //@ts-ignore
                    products={products}
                    //@ts-ignore
                    handleBuyProduct={handleBuyProduct}
                    refetchProducts={refetchProducts}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default WishlistByAddressPage;

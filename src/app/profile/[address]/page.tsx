"use client";

import { useState, useEffect } from "react";
import { prepareContractCall } from "thirdweb";
import { wishlistcontract } from "@/app/utils/wishlistcontract";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import ProductList from "@/app/components/ProductList";

interface Product {
    id: string;
    creator: string;
    title: string;
    price: string;
    createdAt: number; // Ensure it's treated as a number
    isSold: boolean;
    buyer: string;
}

const ProfilePage = ({ params }: { params: { address: string } }) => {
    const { address } = params;
    const [products, setProducts] = useState<Product[]>([]);
    const account = useActiveAccount();

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
        <div className="container">
            <div className="w-full">
                <h2 className="text-center">Products by {address}</h2>
                

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

export default ProfilePage;

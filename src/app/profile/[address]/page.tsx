"use client";

import { useState, useEffect } from "react";
import { prepareContractCall } from "thirdweb";
import { wishlistcontract } from "@/app/utils/wishlistcontract";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import ProductList from "@/app/components/ProductList";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component
import { useToast } from "@/hooks/use-toast";
import { Copy } from 'lucide-react';
import { motion } from "framer-motion";
import Link from "next/link";
import { ethers } from "ethers"; // Import ethers.js

interface Product {
    id: string;
    creator: string;
    title: string;
    price: string;
    createdAt: number;
    isSold: boolean;
    buyer: string;
}

const ProfilePage = ({ params }: { params: { address: string } }) => {
    const { address } = params;
    const [products, setProducts] = useState<Product[]>([]);
    const account = useActiveAccount();
    const { toast } = useToast();

    const [ensName, setEnsName] = useState<string | null>(null); // State to hold ENS name

    const { data: productList, isLoading, refetch: refetchProducts } = useReadContract({
        contract: wishlistcontract,
        method: "getUserProducts",
        params: [address],
    });

    useEffect(() => {
        if (productList) {
            const fetchedProducts: Product[] = productList.map((product: any) => ({
                id: product.id?.toString(),
                creator: product.creator,
                title: product.title,
                price: product.price?.toString(),
                createdAt: Number(product.createdAt),
                isSold: product.isSold,
                buyer: product.buyer || '',
            }));

            const sortedProducts = fetchedProducts.sort((a, b) => b.createdAt - a.createdAt);
            setProducts(sortedProducts);
        }
    }, [productList]);

    // Function to resolve ENS name for the profile address
    useEffect(() => {
        const resolveENSName = async () => {
            try {
                const provider = ethers.getDefaultProvider(); // Use default provider or specify one
                const name = await provider.lookupAddress(address);
                setEnsName(name);
            } catch (error) {
                console.error('Error resolving ENS name:', error);
            }
        };

        resolveENSName();
    }, [address]);

    const handleBuyProduct = (productId: string, productPrice: string) => {
        return prepareContractCall({
            contract: wishlistcontract,
            method: "buyProduct",
            params: [BigInt(productId)],
            value: BigInt(productPrice),
        });
    };

    const handleCopyUrl = () => {
        const profileUrl = `${window.location.origin}/profile/${address}`;
        navigator.clipboard.writeText(profileUrl)
            .then(() => {
                toast({
                    title: "URL Copied",
                    description: "Profile URL has been copied to your clipboard.",
                    className: "bg-n0 text-n7 rounded-lg border border-n1",
                });
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <div className="container mb-6">
            <div className="w-full">
                <div className="flex flex-col justify-center align-middle text-center">
                    <h2 className="text-n9 text-2xl font-medium mt-4"> Profile For: </h2>
                    <p className="mt-1">
                        <span className="text-sm font-medium p-4 text-n4">
                            {ensName || address} {/* Display ENS name or fallback to address */}
                        </span>
                    </p>
                    <div className="flex justify-center">

                        <motion.button
                            onClick={handleCopyUrl}
                            className="flex text-p1 flex-row mt-1 px-2 max-w-[300px] text-center items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <span className="mr-1">
                                <Copy size={16} />
                            </span>
                            <span>Copy Profile URL</span>
                        </motion.button>

                    </div>

                    {/* Show the Create button if the logged-in user is viewing their own profile */}
                    {account?.address === address && (
                        <div className="flex justify-center mt-4 -mb-2">
                            <Link href="/create">
                                <button className="text-md font-bold bg-p1 text-n1 px-6 py-2 rounded-full hover:bg-n9 transition-colors">
                                    Create Wish
                                </button>
                            </Link>
                        </div>
                    )}

                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="flex flex-col w-full justify-center gap-4 rounded-md p-4 mb-4"
                            >
                                <Skeleton className="h-[125px] w-full rounded-xl bg-n1" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full bg-n1" />
                                    <Skeleton className="h-4 w-full bg-n1" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <ProductList
                        //@ts-ignore
                        products={products}
                        //@ts-ignore
                        handleBuyProduct={handleBuyProduct}
                        refetchProducts={refetchProducts}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </div>
    );
};

export default ProfilePage;

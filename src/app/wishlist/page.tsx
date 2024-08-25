"use client";

import {
    TransactionButton,
    useReadContract,
} from "thirdweb/react";
import { prepareContractCall, toWei } from "thirdweb";
import { useState, useEffect } from "react";
import { wishlistcontract } from "../utils/wishlistcontract";
import ProductList from "../components/ProductList";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";

interface Product {
    id: string;
    creator: string;
    title: string;
    price: string;
    createdAt: number;
    isSold: boolean;
    buyer: string;
}

const WishlistPage = () => {
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

    const { data: productList, refetch: refetchProducts } = useReadContract({
        contract: wishlistcontract,
        method: "getAllProducts",
        params: [],
    });

    useEffect(() => {
        if (productList) {
            setProducts(productList as unknown as Product[]);
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

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setTitle((prev) => prev + emojiData.emoji);
        setShowEmojiPicker(false);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const emojiRegex = /^[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1F200}-\u{1F2FF}]+$/u;

        if (value === "" || emojiRegex.test(value)) {
            setTitle(value);
        }
    };

    return (
        <div className="flex w-full p-10 align-middle justify-center max-w-[500px] items-center mx-auto">
            <div className="w-full">
                <h2>Create Product</h2>

                <div className="mt-4 mb-2">
                    <div className="flex flex-col">
                        <label className="text-sm">Title</label>
                        <div className="relative">
                            <input
                                className="bg-n2 border border-n3 text-n7 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2 text-lg"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                                😀
                            </button>
                        </div>
                        {showEmojiPicker && (
                            <div className="absolute z-10 mt-2">
                                <EmojiPicker
                                    onEmojiClick={handleEmojiClick}
                                    theme={Theme.DARK}  // Set the theme to dark
                                />
                            </div>
                        )}

                        <label className="mt-4 text-sm">Price (ETH)</label>
                        <input
                            className="bg-n2 border-n3 text-n7 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />

                        <TransactionButton className="mt-8"
                            transaction={() =>
                                prepareContractCall({
                                    contract: wishlistcontract,
                                    method: "createProduct",
                                    params: [title, BigInt(toWei(price))],
                                })
                            }
                            onTransactionConfirmed={() => {
                                alert("Product Created Successfully!");
                                setTitle("");
                                setPrice("");
                                refetchProducts();
                            }}
                        >
                            Create Product
                        </TransactionButton>
                    </div>
                </div>

                <ProductList
                 //@ts-ignore
                    products={products}
                     //@ts-ignore
                    handleBuyProduct={handleBuyProduct}
                    refetchProducts={refetchProducts}
                />
            </div>
        </div>
    );
};

export default WishlistPage;

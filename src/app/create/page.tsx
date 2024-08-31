"use client";

import { TransactionButton } from "thirdweb/react";
import { prepareContractCall, toWei } from "thirdweb";
import { useState } from "react";
import { wishlistcontract } from "../utils/wishlistcontract";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";

const CreateWish = () => {
    const [title, setTitle] = useState<string>(""); 
    const [price, setPrice] = useState<string>("");
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1F200}-\u{1F2FF}]/gu;

    const countEmojis = (text: string) => {
        return (text.match(emojiRegex) || []).length;
    };

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        if (countEmojis(title) < 5) {
            setTitle((prev) => prev + emojiData.emoji);
        }
        setShowEmojiPicker(false);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        const emojiCount = countEmojis(value);

        // Only allow changes if they match emoji pattern and are within the 5 emoji limit
        if (emojiRegex.test(value) || value === "") {
            if (emojiCount <= 5) {
                setTitle(value);
            } else {
                // If pasted, restrict to first 5 emojis
                const firstFiveEmojis = value.match(emojiRegex)?.slice(0, 5).join('') || '';
                setTitle(firstFiveEmojis);
            }
        }
    };

    const handleCreateProduct = () => {
        return prepareContractCall({
            contract: wishlistcontract,
            method: "createProduct",
            params: [title, BigInt(toWei(price))],
        });
    };

    return (
        <>
            <div className="container">
                <h3 className="text-n9 text-2xl font-medium text-center mt-4"> Create A Wish </h3>
            </div>
            <div className="flex w-full p-10 align-middle justify-center lg:max-w-[500px] items-center mx-auto border rounded-lg border-n2 mt-8">
                <div className="w-full">
                    <div className="mt-4 mb-2">
                        <div className="flex flex-col">
                            <label className="text-sm mb-1">Emojis</label>
                            <div className="relative">
                                <input
                                    className="appearance-none bg-transparent border border-n3 text-n7 text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-p1 block w-full p-2.5"
                                    type="text"
                                    value={title}
                                    placeholder="Enter up to 5 emojis here"
                                    onChange={handleTitleChange}
                                    onPaste={(e) => {
                                        e.preventDefault();
                                    }}
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
                                        theme={Theme.DARK}
                                    />
                                </div>
                            )}

                            <label className="mt-4 text-sm mb-1">Price (ETH)</label>
                            <input
                                className="appearance-none bg-transparent border border-n3 text-n7 text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-p1 block w-full p-2.5 mb-6"
                                type="number"
                                value={price}
                                placeholder="Enter your asking price here"
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />

                            <div className="flex justify-center">
                                <TransactionButton
                                    className="mt-8 button-primary"
                                    transaction={handleCreateProduct}
                                    onTransactionConfirmed={() => {
                                        alert("Product Created Successfully!");
                                        setTitle("");
                                        setPrice("");
                                    }}
                                >
                                    Create Wish
                                </TransactionButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateWish;
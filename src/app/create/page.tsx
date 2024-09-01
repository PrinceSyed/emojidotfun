"use client";

import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { prepareContractCall, toWei} from "thirdweb";
import { useState } from "react";
import { wishlistcontract } from "../utils/wishlistcontract";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import Link from "next/link";

const CreateWish = () => {
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const account = useActiveAccount();  // Access the user's account here

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

        if (emojiRegex.test(value) || value === "") {
            if (emojiCount <= 5) {
                setTitle(value);
            } else {
                const firstFiveEmojis = value.match(emojiRegex)?.slice(0, 5).join('') || '';
                setTitle(firstFiveEmojis);
            }
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const isValidPrice = /^(\d+(\.\d{0,8})?)?$/.test(value);

        if (isValidPrice) {
            setPrice(value);
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
            <div className="container">
                <div className="flex w-full p-6 align-middle justify-center max-w-[500px] items-center mx-auto border rounded-lg border-n2 mt-6">
                    <div className="w-full">
                        <div className="mt-4 mb-2">
                            <div className="flex flex-col">
                                <label className="text-lg mb-1">Emojis</label>
                                <div className="relative">
                                    <input
                                        className="appearance-none bg-n0 border border-n0 text-n7 text-2xl rounded-lg focus:outline-none focus:ring-0 focus:border-n2 block w-full py-3 px-3 placeholder:text-base"
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
                                        className="absolute right-0 top-0 text-2xl bg-p1 p-3 rounded-lg hover:bg-n8 transition-colors duration-300"
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

                                <label className="mt-4 text-lg mb-1">Price (ETH)</label>
                                <input
                                    className="appearance-none bg-n0 border border-n0 text-n7 text-lg rounded-lg focus:outline-none focus:ring-0 focus:border-n2 block w-full py-4 px-3 mb-6 placeholder:text-base"
                                    type="number"
                                    step="0.00000001"
                                    value={price}
                                    placeholder="Enter your asking price here"
                                    onChange={handlePriceChange}
                                    required
                                />

                                <div className="flex justify-center">
                                    <TransactionButton
                                        className="mt-8 button-primary text-lg"
                                        transaction={handleCreateProduct}
                                        onTransactionConfirmed={() => {
                                            setIsDialogOpen(true);
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
            </div>

            {/* Dialog Component */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-nb border border-n1">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-medium">Transaction Complete!</DialogTitle>
                        <DialogDescription className="text-n5">
                            Your wish was successfully created. Head over to {" "}
                            {account?.address && (
                                <Link href={`/profile/${account.address}`} className="text-p1 underline">
                                   your profile
                                </Link>
                            )}{" "}
                            to view it.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <button className="button-primary px-4 py-2 bg-p1 text-white rounded-lg">Got It! </button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateWish;

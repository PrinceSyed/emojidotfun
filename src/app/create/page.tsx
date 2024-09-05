"use client";

import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { prepareContractCall, toWei } from "thirdweb";
import { useState, useEffect } from "react";
import { wishlistcontract } from "../utils/wishlistcontract";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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

    // Handle adding emojis via picker
    const handleEmojiClick = (emojiData: EmojiClickData) => {
        if (countEmojis(title) < 5) {
            setTitle((prev) => prev + emojiData.emoji);
        }
        setShowEmojiPicker(false);
    };

    // Prevent typing in the input field, but allow backspace and delete
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Backspace" && e.key !== "Delete") {
            e.preventDefault(); // Prevent any typing
        }
    };

    // Handle changes in the input field (for deleting emojis)
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const emojiCount = countEmojis(value);

        // Limit input to 5 emojis
        if (emojiCount <= 5) {
            setTitle(value);
        } else {
            // Restrict to first 5 emojis if exceeded
            const firstFiveEmojis = value.match(emojiRegex)?.slice(0, 5).join('') || '';
            setTitle(firstFiveEmojis);
        }
    };

    // Prevent pasting non-emoji content
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedText = e.clipboardData.getData("text");
        if (!emojiRegex.test(pastedText)) {
            e.preventDefault(); // Block non-emoji content from being pasted
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

    // Disable the Emoji Picker search bar auto-focus
    useEffect(() => {
        if (showEmojiPicker) {
            const searchInput = document.querySelector('.EmojiPickerReact input');
            if (searchInput) {
                (searchInput as HTMLInputElement).blur();
            }
        }
    }, [showEmojiPicker]);

    // Check if both emoji and price fields are filled
    const isFormValid = title !== "" && price !== "";

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
                                        onKeyDown={handleKeyDown}  // Prevent typing
                                        onChange={handleTitleChange}  // Allow backspace and delete
                                        onPaste={handlePaste}  // Prevent pasting non-emoji content
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
                                        transaction={handleCreateProduct}
                                        onTransactionConfirmed={() => {
                                            setIsDialogOpen(true);
                                            setTitle("");
                                            setPrice("");
                                        }}
                                        onError={(error) => {
                                            console.error("Transaction failed", error);
                                        }}
                                        disabled={!isFormValid}  // Disable button if form is not valid
                                        className="mt-8 button-primary text-lg"
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

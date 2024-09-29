"use client";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { prepareContractCall, toWei } from "thirdweb";
import { useState } from "react";
import { wishlistcontract } from "../utils/wishlistcontract";
import CustomEmoji from "../components/CustomEmoji";
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
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const account = useActiveAccount();  // Access the user's account here

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

                                {/* Use CustomEmoji Component */}
                                <CustomEmoji title={title} setTitle={setTitle} />

                                <label className="mt-4 text-lg mb-1">Price (ETH)</label>
                                <input
                                    className="appearance-none bg-n0 border border-n0 text-n7 text-lg rounded-lg focus:outline-none focus:ring-0 focus:border-n2 block w-full py-4 px-3 mb-2 placeholder:text-base"
                                    type="number"
                                    step="0.00000001"
                                    value={price}
                                    placeholder="Enter your asking price here"
                                    onChange={handlePriceChange}
                                    required
                                />

                                {/* Add the new price option buttons */}
                                <div className="flex space-x-2 mb-6 mt-1">
                                <button
                                         className="button-secondary text-sm px-4 py-2 bg-n1 text-n5 rounded-lg hover:text-n7 hover:bg-n2"
                                        onClick={() => setPrice("0.00001")}
                                    >
                                        0.00001 ETH
                                    </button>
                                    <button
                                         className="button-secondary text-sm px-4 py-2 bg-n1 text-n5 rounded-lg hover:text-n7 hover:bg-n2 hidden sm:block"
                                        onClick={() => setPrice("0.0001")}
                                    >
                                        0.0001 ETH
                                    </button>
                                    <button
                                        className="button-secondary text-sm px-4 py-2 bg-n1 text-n5 rounded-lg hover:text-n7 hover:bg-n2"
                                        onClick={() => setPrice("0.001")}
                                    >
                                        0.001 ETH
                                    </button>
                                    <button
                                       className="button-secondary text-sm px-4 py-2 bg-n1 text-n5 rounded-lg hover:text-n7 hover:bg-n2"
                                        onClick={() => setPrice("0.01")}
                                    >
                                        0.01 ETH
                                    </button>
                                </div>

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
                <DialogContent className="bg-nb border border-n1 text-left">
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-lg font-medium">Transaction Complete!</DialogTitle>
                        <DialogDescription className="text-n5">
                            Your wish was successfully created. Head over to{" "}
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
                            <button className="button-primary px-4 py-2 bg-p1 text-white rounded-lg">Got It!</button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateWish;

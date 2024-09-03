import React, { useState } from "react";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { Glow, GlowCapture } from "@codaworks/react-glow";
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
import { Frown } from "lucide-react";

interface Product {
    id: string;
    creator: string;
    title: string;
    price: string;
    createdAt: string;
    isSold: boolean;
    buyer: string;
}

interface ProductListProps {
    products: Product[];
    handleBuyProduct: (productId: string, productPrice: string) => Promise<any>;
    refetchProducts: () => void;
    isLoading: boolean;
}

const convertDate = (timestamp: string) => {
    return new Date(Number(timestamp) * 1000).toLocaleString();
};

const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}....${address.slice(-4)}`;
};

const ProductList: React.FC<ProductListProps> = ({ products, handleBuyProduct, refetchProducts, isLoading }) => {
    const account = useActiveAccount(); // Get the current user's wallet address
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // State to control dialog visibility

    return (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
                <p>Loading...</p>
            ) : products.length === 0 ? (
                <div className="col-span-4">
                    <div className="flex flex-col max-w-[400px] border border-n1 bg-n0 rounded-md mx-auto justify-center p-4 text-center">
                        <p className="flex justify-center items-center w-full text-n5 mb-2">
                            <Frown />
                        </p>
                        <h3 className="text-lg font-medium"> No Wishes Available</h3>
                        <p className="text-n5"> This account does not have any listed wishes. </p>
                    </div>

                </div>
            ) : (
                products.map((product) => (
                    <GlowCapture key={product.id}> {/* Adding key prop here */}
                        <Glow className="border border-n2 rounded-md">
                            <div key={product.id} className="flex text-center glow:bg-p4 flex-col w-full justify-center gap-4 rounded-md p-4 mb-4">
                                <p className="text-sm text-n4">
                                    Created By:{" "}
                                    <a
                                        href={`${window.location.origin}/profile/${product.creator}`}
                                        className="text-blue-500 underline"
                                    >
                                        <span className="text-p1">  {truncateAddress(product.creator)} </span>
                                    </a>
                                </p>
                                <h4 className="text-4xl text-center font-bold">{product.title}</h4>
                                <p className="text-lg font-medium text-n7">{Number(product.price) / 10 ** 18} ETH</p>

                                {!product.isSold ? (
                                    account?.address !== product.creator ? (
                                        <div className="flex justify-center">
                                            <TransactionButton
                                                className="mt-8 button-primary w-full"
                                                transaction={() => handleBuyProduct(product.id, product.price)}
                                                onTransactionConfirmed={() => {
                                                    setIsDialogOpen(true);
                                                    refetchProducts();
                                                }}
                                            >
                                                Pay
                                            </TransactionButton>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center">
                                            <button className="text-sm px-6 py-3.5 rounded-full button bg-n1 text-n4 font-medium cursor-not-allowed" disabled>
                                                <p> Creator </p>
                                            </button>
                                        </div>
                                    )
                                ) : (
                                    <div className="flex justify-center">
                                        <button className="text-sm px-6 py-3.5 rounded-full button bg-n2 text-n4 font-medium cursor-not-allowed" disabled>
                                            <p>Bought By: {truncateAddress(product.buyer)}</p>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </Glow>
                    </GlowCapture>
                ))
            )}

            {/* Dialog Component */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-nb border border-n1">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-medium">Purchase Complete!</DialogTitle>
                        <DialogDescription className="text-n5">
                            Thanks for being a genie and purchasing the wish!
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <button className="button-primary px-4 py-2 bg-p1 text-white rounded-lg"> Close </button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProductList;

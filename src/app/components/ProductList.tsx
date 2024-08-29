import React from "react";
import { TransactionButton } from "thirdweb/react";
import { Glow, GlowCapture } from "@codaworks/react-glow";

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
    return (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
                <p>Loading...</p>
            ) : products.length === 0 ? (
                <p>No products available</p>
            ) : (
                products.map((product) => (
                    <GlowCapture>
                        <Glow className="border border-n2 rounded-md">

                            <div key={product.id} className="flex text-center glow:bg-p2 flex-col w-full justify-center gap-4 rounded-md p-4 mb-4">
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
                                {/* <p className="text-sm text-n4">Created At: {convertDate(product.createdAt)}</p> */}

                                {/* <p>Status: {product.isSold ? "Sold" : "Available"}</p> */}
                                {/* {product.isSold && (
                                    <p>Buyer: {truncateAddress(product.buyer)}</p>
                                )} */}
                                {!product.isSold ? (
                                    <div className="flex justify-center">
                                        <TransactionButton
                                            className="mt-8 button-primary w-full"
                                            transaction={() => handleBuyProduct(product.id, product.price)}
                                            onTransactionConfirmed={() => {
                                                alert("Product Purchased Successfully!");
                                                refetchProducts();
                                            }}
                                        >
                                            Pay
                                        </TransactionButton>
                                    </div>
                                ) : (
                                    <div className="flex justify-center">
                                        <button className=" text-sm px-6 py-3.5 rounded-full button bg-n2 text-n4 font-medium cursor-not-allowed" disabled>
                                        <p>Bought By: {truncateAddress(product.buyer)}</p>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </Glow>
                    </GlowCapture>
                ))
            )}
        </div>
    );
};

export default ProductList;

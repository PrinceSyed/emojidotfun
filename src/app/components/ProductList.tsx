import React from "react";
import { TransactionButton } from "thirdweb/react";

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
        <div className="mt-10">
            <h3 className="font-semibold">Product List</h3>
            {isLoading ? (
                <p>Loading...</p>
            ) : products.length === 0 ? (
                <p>No products available</p>
            ) : (
                products.map((product) => (
                    <div key={product.id} className="flex flex-col w-full justify-center gap-4 bg-n0 rounded-md p-4 mb-4">
                        <h4 className="text-lg font-bold">{product.title}</h4>
                        <p>Price: {Number(product.price) / 10 ** 18} ETH</p>
                        <p>Created At: {convertDate(product.createdAt)}</p>
                        <p>
                            Created By:{" "}
                            <a
                                href={`${window.location.origin}/wishlist/${product.creator}`}
                                className="text-blue-500 underline"
                            >
                                {truncateAddress(product.creator)}
                            </a>
                        </p>
                        <p>Status: {product.isSold ? "Sold" : "Available"}</p>
                        {product.isSold && (
                            <p>Buyer: {truncateAddress(product.buyer)}</p>
                        )}
                        {!product.isSold && (
                            <TransactionButton
                                transaction={() => handleBuyProduct(product.id, product.price)}
                                onTransactionConfirmed={() => {
                                    alert("Product Purchased Successfully!");
                                    refetchProducts();
                                }}
                            >
                                Buy Product
                            </TransactionButton>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductList;

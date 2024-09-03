"use client";
import { useState, useEffect } from "react";
import { useReadContract } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { wishlistcontract } from "./utils/wishlistcontract";
import ProductList from "./components/ProductList";
import { Skeleton } from "@/components/ui/skeleton";
import EmojiAnimation from "./components/EmojiAnimation";

interface Product {
  id: string;
  creator: string;
  title: string;
  price: string;
  createdAt: number;
  isSold: boolean;
  buyer: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { data: productList, refetch: refetchProducts, isLoading } = useReadContract({
    contract: wishlistcontract,
    method: "getAllProducts",
    params: [],
  });

  useEffect(() => {
    if (productList) {
      const formattedProducts: Product[] = (productList as unknown as {
        id: bigint;
        creator: string;
        title: string;
        price: bigint;
        createdAt: bigint;
        isSold: boolean;
        buyer: string;
      }[]).map(product => ({
        id: product.id.toString(),
        creator: product.creator,
        title: product.title,
        price: product.price.toString(),
        createdAt: Number(product.createdAt),
        isSold: product.isSold,
        buyer: product.buyer,
      }));

      const sortedProducts = formattedProducts.sort((a, b) => b.createdAt - a.createdAt);
      setProducts(sortedProducts);
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
    <div className="min-h-screen bg-nb">
      <h1 className="text-n7 font-sans text-3xl font-semibold mb-4 text-center mt-4">
        Onchain Wishlist With Emojis <EmojiAnimation />
      </h1>
      <div className="mt-10 container mb-6">
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
          />
        )}
      </div>
    </div>
  );
}

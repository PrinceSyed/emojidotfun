"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useReadContract } from "thirdweb/react";
import { wishlistcontract } from "./utils/wishlistcontract";
import ProductList from "./components/ProductList";
import { Glow, GlowCapture } from "@codaworks/react-glow";
import { Skeleton } from "@/components/ui/skeleton"


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


  return (
    <div className="min-h-screen bg-nb">
      <h1 className="text-n7 font-sans text-3xl font-semibold mb-4 text-center">Onchain Wishlist For Your Bullshit</h1>
      <div className="mt-10 container">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Display multiple skeleton loaders to simulate the product list */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProductList
            //@ts-ignore
            products={products}
            refetchProducts={refetchProducts}
          />
        )}
      </div>
    </div>
  );
}

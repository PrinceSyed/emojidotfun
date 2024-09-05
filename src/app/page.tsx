"use client";
import { useState, useEffect } from "react";
import { useReadContract } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { wishlistcontract } from "./utils/wishlistcontract";
import ProductList from "./components/ProductList";
import { Skeleton } from "@/components/ui/skeleton";
import EmojiAnimation from "./components/EmojiAnimation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

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
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to manage sheet visibility

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
      <h1 className="text-n7 font-sans text-3xl font-semibold mb-2 text-center mt-4">
        Onchain Wishlist With Emojis <EmojiAnimation />
      </h1>

      {/* Trigger to open the Sheet */}
      <p
        className="text-sm font-medium text-p1 text-center cursor-pointer"
        onClick={() => setIsSheetOpen(true)}
      >
        How Does it Work?
      </p>

      {/* Sheet Component */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="bg-n0 border border-n0 text-center"> {/* Bottom sheet */}
          <SheetHeader>
            <SheetTitle className="text-center text-lg font-medium">How Does it Work?</SheetTitle>
            <SheetDescription>
              <div className="container text-n7 text-center mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  <div className="p-6 border border-n1 rounded-lg">
                  <h4 className="text-base font-medium">
                      Step 1 - Connect Wallet
                    </h4>
                    <p className="text-sm text-n-6 font-normal mt-1">
                      Connect wIth your Ethereum wallet
                      and get some ETH for the Base Network.
                    </p>
                    <p className="mt-3 border border-n0 rounded-lg">
                      <img src="/images/tutorials/step1.png" alt="Step 1 - Sign in" />
                    </p>
                  </div>

                  <div className="p-6 border border-n1 rounded-lg">
                    <h4 className="text-base font-medium">
                    Step 2 - Create Wish
                    </h4>
                    <p className="text-sm text-n-6 font-normal mt-1">
                      Click on create from top navbar and create a wish with up to 5 emojis.
                    </p>
                    <p className="mt-3 border border-n0 rounded-lg">
                      <img src="/images/tutorials/step2.png" alt="Step 2 - Create Emoji" />
                    </p>
                  </div>

                  <div className="p-6 border border-n1 rounded-lg">
                  <h4 className="text-base font-medium">
                    Step 3 - Share your profile
                    </h4>
                    <p className="text-sm text-n-6 font-normal mt-1">
                    Share your profile with others by
                    copying your profile url. Your created wishes will be shown here.
                    </p>
                    <p className="mt-3 border border-n0 rounded-lg">
                      <img src="/images/tutorials/step3.png" alt="Step 3 - Share Profile" />
                    </p>
                  </div>



                </div>
              </div>

            </SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
            <button className="button-secondary px-6 py-2 bg-n2 text-white rounded-full mt-4">Close</button>
          </SheetClose>
        </SheetContent>
      </Sheet>

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

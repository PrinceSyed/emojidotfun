"use client";
import Link from 'next/link';
import {
  ConnectButton,
  useActiveAccount
} from "thirdweb/react";

import { client } from "../client";
import { createWallet } from "thirdweb/wallets";
import { baseSepolia, defineChain } from "thirdweb/chains";

const wallets = [createWallet("com.coinbase.wallet"), createWallet("io.metamask")];

const HeaderNav = () => {
  const account = useActiveAccount();

  return (
    <header className="flex justify-between items-center p-4 container mx-auto">
      <div className="flex justify-start items-center">
        <Link href="/">
          <img src="/images/logo.svg" alt="geenie logo" />
        </Link>
        <Link href="/">
          <h1 className="text-p1 text-[1.3rem] font-bold ml-2 hidden sm:block"> Geenie.lol </h1>
        </Link>
      </div>

      <nav className="flex items-center">
        {account?.address && (
          <>
            <Link href="/create" className="mr-4">
              Create
            </Link>
            <Link href={`/profile/${account.address}`} className="mr-4">
              Profile
            </Link>
          </>
        )}
        <div className="ml-4 custom-connect-button">
          <ConnectButton
            client={client}
            wallets={wallets}
            chain={defineChain(baseSepolia)}
          />
        </div>
      </nav>
    </header>
  );
}

export default HeaderNav;

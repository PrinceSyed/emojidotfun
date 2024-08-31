"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ConnectButton,
  useActiveAccount
} from "thirdweb/react";

import { client } from "../client";
import { createWallet } from "thirdweb/wallets";
import { baseSepolia, defineChain } from "thirdweb/chains";
import { motion } from "framer-motion"

const wallets = [createWallet("com.coinbase.wallet"), createWallet("io.metamask")];

const HeaderNav = () => {
  const account = useActiveAccount();
  const pathname = usePathname(); // Get the current path

  return (
    <header className="flex justify-between items-center p-4 container mx-auto">
      <motion.div className="flex justify-start items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Link href="/">
          <img src="/images/logo.svg" alt="geenie logo" />
        </Link>
        <Link href="/">
          <h1 className="text-p1 text-[1.3rem] font-bold ml-2 hidden sm:block"> Geenie.lol </h1>
        </Link>
      </motion.div>

      <nav className="flex items-center">
        {account?.address && (
          <>
            <Link 
              href="/create" 
              className={`mr-4 transition-colors duration-300 ${pathname === '/create' ? 'text-p1' : 'hover:text-p1'}`}
            >
              Create
            </Link>
            <Link 
              href={`/profile/${account.address}`} 
              className={`mr-4 transition-colors duration-300 ${pathname.startsWith('/profile') ? 'text-p1' : 'hover:text-p1'}`}
            >
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

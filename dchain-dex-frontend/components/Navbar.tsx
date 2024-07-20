"use client";
import Link from "next/link";
import {  createThirdwebClient, defineChain, getContract } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";


export default function Navbar() {

const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
  });
  // connect to your contract
   const contract = getContract({ 
    client, 
    chain: defineChain(2713017997578000), 
    address: "0x2AAC535db31DB35D13AECe36Ea7954A2089D55bE"
  });

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    inAppWallet({
      auth: {
        options: [
          "email",
          "google",
          "apple",
          "facebook",
          "phone",
        ],
      },
    }),
  ];

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "10px",
        }}>
            <Link href="/" className="text-red-500 text-2xl">DChain DEX</Link>
            <Link href="/dex" className="text-blue-600 text-2xl"> DEX V1 </Link>
            <Link href="/dexv2" className="text-blue-600 text-2xl"> DEX V2 </Link>
            <ConnectButton
              client={client}
              wallets={wallets}
              theme={"dark"}
              connectModal={{ size: "wide" }}
            />
        </div>
    )
}
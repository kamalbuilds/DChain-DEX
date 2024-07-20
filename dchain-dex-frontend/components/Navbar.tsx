"use client";
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
            <h1>DChain DEX</h1>
            <ConnectButton
              client={client}
              wallets={wallets}
              theme={"dark"}
              connectModal={{ size: "wide" }}
            />
        </div>
    )
}
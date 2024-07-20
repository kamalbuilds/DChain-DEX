"use client";
import { useWalletBalance, useReadContract, useActiveAccount } from "thirdweb/react";
import styles from "../../styles/Home.module.css";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import SwapInput from "@/components/SwapInput";
import { defineChain, getContract, prepareContractCall, sendTransaction, toEther, toWei } from "thirdweb";
import { client } from "../layout";

const DCHAINDEX: NextPage = () => {

  const TOKEN_CONTRACT_ADDRESS = "0x2AAC535db31DB35D13AECe36Ea7954A2089D55bE";
  const DEX_CONTRACT_ADDRESS = "0xB86800BA7D0b25309726511f54F1e3D92457a8E4";

  const activeAccount = useActiveAccount();
  const address = activeAccount?.address;

  const dexContract = getContract({ 
    client, 
    chain: defineChain(2713017997578000), 
    address: DEX_CONTRACT_ADDRESS
  });

  const tokenContract = getContract({
    client,
    chain: defineChain(2713017997578000),
    address: TOKEN_CONTRACT_ADDRESS
  });

  const { data: symbol, isLoading: loadingsymbol } = useReadContract({ 
    contract: tokenContract, 
    method: "function symbol() view returns (string)", 
    params: [] 
  });

  const { data: tokenBalance, isLoading: loadtokenbalance } = useReadContract({ 
    contract: tokenContract, 
    method: "function balanceOf(address account) view returns (uint256)", 
    params: [address!] 
  });

  // Get native balance and LP token balance
  const { data: nativeBalance, isError } = useWalletBalance({
    chain: defineChain(2713017997578000),
    address,
    client,
    // tokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  });

  console.log(nativeBalance,"native",address);

  const { data: contractTokenBalance } = useReadContract({ 
    contract: dexContract, 
    method: "function getTokensInContract() view returns (uint256)", 
    params: [] 
  });

  // State for the contract balance and the values to swap
  const [contractBalance, setContractBalance] = useState<String>("0");
  const [nativeValue, setNativeValue] = useState<String>("0");
  const [tokenValue, setTokenValue] = useState<String>("0");
  const [currentFrom, setCurrentFrom] = useState<String>("native");
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [minTokens, setMinTokens] = useState<String>("0");

  // Get the amount of tokens to get based on the value to swap
  const { data: amountToGet, isLoading: load } = useReadContract({ 
    contract: dexContract, 
    method: "function getAmountOfTokens(uint256 inputAmount, uint256 inputReserve, uint256 outputReserve) view returns (uint256)", 
    params: currentFrom === "native"
      ? [
          toWei(nativeValue as string || "0"),
          toWei(contractBalance as string || "0"),
          contractTokenBalance?.valueOf(),
        ]
      : [
        toWei(tokenValue as string || "0"),
        contractTokenBalance?.valueOf(),
        toWei(contractBalance as string || "0"),
      ]
  });

  // Fetch the contract balance
  const fetchContractBalance = async () => {
    try {
      // const balance = await sdk?.getBalance(DEX_CONTRACT);
      // setContractBalance(balance?.displayValue || "0");
    } catch (error) {
      console.error(error);
    }
  };

  // Execute the swap
  const executeSwap = async () => {
    setIsLoading(true);
    try {
      if (currentFrom === "native") {
        const transaction = prepareContractCall({ 
          contract: dexContract, 
          method: "function swapEthTotoken(uint256 minTokens) payable", 
          params: [toWei(minTokens as string || "0")], 
          overrides: { value: toWei(nativeValue as string || "0") }
        });

        await sendTransaction(transaction);
        alert("Swap executed successfully");
      } else {
        const approvetransaction = prepareContractCall({ 
          contract: tokenContract, 
          method: "function approve(address spender, uint256 amount) returns (bool)", 
          params: [DEX_CONTRACT_ADDRESS, toWei(tokenValue as string || "0")] 
        });
        await sendTransaction(approvetransaction);

        const transaction = prepareContractCall({ 
          contract: dexContract, 
          method: "function swapTokenToEth(uint256 _tokensSold, uint256 minEth)", 
          params: [toWei(tokenValue as string || "0"), toWei(minTokens as string || "0")] 
        });

        await sendTransaction(transaction);
        alert("Swap executed successfully");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while trying to execute the swap");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch the contract balance and update it every 10 seconds
  useEffect(() => {
    fetchContractBalance();
    setInterval(fetchContractBalance, 10000);
  }, []);

  // Update the amount to get based on the value
  useEffect(() => {
    if (!amountToGet) return;
    setMinTokens(toEther(amountToGet));
    if (currentFrom === "native") {
      setTokenValue(toEther(amountToGet));
    } else {
      setNativeValue(toEther(amountToGet));
    }
  }, [amountToGet]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div style={{
          backgroundColor: "#111",
          padding: "2rem",
          borderRadius: "10px",
          minWidth: "500px",
        }}>
          <div>
            <SwapInput
              current={currentFrom as string}
              type="native"
              max={nativeBalance?.displayValue}
              value={nativeValue as string}
              setValue={setNativeValue}
              tokenSymbol="ETH"
              tokenBalance={nativeBalance?.displayValue}
            />
            <button
              onClick={() => 
                currentFrom === "native"
                  ? setCurrentFrom("token")
                  : setCurrentFrom("native")
              }
              className={styles.toggleButton}
            >↓</button>
            <SwapInput
              current={currentFrom as string}
              type="token"
              max={tokenBalance?.displayValue}
              value={tokenValue as string}
              setValue={setTokenValue}
              tokenSymbol={symbol as string}
              tokenBalance={tokenBalance?.displayValue}
            />
          </div>
          {address ? (
            <div style={{ textAlign: "center" }}>
              <button
                onClick={executeSwap}
                disabled={isLoading as boolean}
                className={styles.swapButton}
              >{
                isLoading
                  ? "Loading..."
                  : "Swap"  
              }</button>
            </div>
          ) : (
            <p>Connect wallet to exchange.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default DCHAINDEX;

import React from "react";
import styles from "../styles/Home.module.css";

type Token = {
  symbol: string;
  address: string;
};

type Props = {
  type: "native" | "token";
  tokens: Token[];
  currentToken: Token;
  setCurrentToken: (token: Token) => void;
  tokenBalance?: string;
  current: string;
  setValue: (value: string) => void;
  max?: string;
  value: string;
};

export default function SwapInputWithTokenSwitch({
  type,
  tokens,
  currentToken,
  setCurrentToken,
  tokenBalance,
  setValue,
  value,
  current,
  max,
}: Props) {
  const truncate = (value: string) => {
    if (value === undefined) return;
    if (value.length > 5) {
      return value.slice(0, 5);
    }
    return value;
  };

  return (
    <div className={styles.swapInputContainer}>
      <input
        type="number"
        placeholder="0.0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={current !== type}
        className={styles.swapInput}
      />
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <select
          value={currentToken.symbol}
          onChange={(e) => {
            const token = tokens.find(token => token.symbol === e.target.value);
            setCurrentToken(token!);
          }}
          className={styles.tokenSelect}
        >
          {tokens.map((token) => (
            <option key={token.address} value={token.symbol}>
              {token.symbol}
            </option>
          ))}
        </select>
        <p style={{ fontSize: "10px" }}>
          Balance: {truncate(tokenBalance as string)}
        </p>
        {current === type && (
          <button
            onClick={() => setValue(max || "0")}
            className={styles.maxButton}
          >
            Max
          </button>
        )}
      </div>
    </div>
  );
}

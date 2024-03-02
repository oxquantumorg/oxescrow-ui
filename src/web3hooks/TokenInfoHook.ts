import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import { config } from "../utils/config";
import { getAssociatedTokenAccount } from "../utils/tokens/getAssociatedTokenAccount";

export const TokenInfoHook = () => {
  const [balance, setBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();

  const onClick = useCallback(async () => {
    try {
      if (!publicKey || !signTransaction) throw new WalletNotConnectedError();

      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);

      const tokenAccount = await getAssociatedTokenAccount(
        connection,
        config.usdcMintPubKey,
        publicKey
      );

      if (tokenAccount?.amount) {
        setTokenBalance(Number(tokenAccount?.amount.toString()));
      }
    } catch (error) {
      console.log(error);
    }
  }, [connection, publicKey, signTransaction]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("refreshing...");
      onClick();
    }, 6000);

    return () => clearInterval(interval);
  }, [onClick]);

  return { balance, tokenBalance };
};

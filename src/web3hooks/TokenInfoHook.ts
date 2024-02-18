import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useCallback, useState } from "react";
// import { getOrCreateAssociatedTokenAccount } from "../utils/tokens/getOrCreateAssociatedTokenAccount";

export const TokenInfoHook = (mintPubkeyString: string) => {
  const [balance, setBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey: senderPubKey, signTransaction } = useWallet();

  const onClick = useCallback(async () => {
    try {
      if (!senderPubKey || !signTransaction)
        throw new WalletNotConnectedError();

      const balance = await connection.getBalance(senderPubKey)
      setBalance(balance / LAMPORTS_PER_SOL)
      
      // const tokenAccount = await getOrCreateAssociatedTokenAccount(
      //   connection,
      //   senderPubKey,
      //   new PublicKey(mintPubkeyString),
      //   senderPubKey,
      //   signTransaction
      // );

      // if (tokenAccount?.amount) {
      //   setTokenBalance(Number(tokenAccount?.amount.toString()));
      // }
      
    } catch (error) {
      console.log(error);
    }
  }, [connection, senderPubKey, signTransaction]);

  setInterval(() => {
    console.log("refreshing...");
    onClick();
  }, 6000);
  
  return { balance, tokenBalance };
};

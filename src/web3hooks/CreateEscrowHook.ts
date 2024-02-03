import {
  createInitializeAccountInstruction,
  // createTransferInstruction,
  // getAssociatedTokenAddress,
} from "@solana/spl-token";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { useCallback } from "react";
import {
  createEscrowAccountIX,
  createEscrowIX,
  createTokenAccountIX,
} from "../utils/instructions";
import { config } from "../utils/config";

export const CreateEscrowHook = (
  receiverPubkeyString: string,
  amount: string
) => {
  const { connection } = useConnection();
  const { publicKey: senderPubKey, sendTransaction } = useWallet();

  const onClick = useCallback(async () => {
    try {
      if (!senderPubKey) throw new WalletNotConnectedError();
      const receiverPubkey = new PublicKey(receiverPubkeyString);
      const tempUsdcAccount = new Keypair();
      const tempUsdcAccountPubKey = tempUsdcAccount.publicKey;
      const escrowAccount = new Keypair();
      const escrowAccountPubKey = escrowAccount.publicKey;
      const amountNum = Number(amount)

      const usdcMintPubKey = config.usdcMintPubKey;
      // const senderUsdcAccountPubKey = await getAssociatedTokenAddress(
      //   usdcMintPubKey, // mint
      //   senderPubKey, // owner
      //   false // allow owner off curve
      // );

      const tempTokenAccountIX = await createTokenAccountIX(
        connection,
        senderPubKey,
        tempUsdcAccountPubKey
      );
      const initTempAccountIX = await createInitializeAccountInstruction(
        tempUsdcAccountPubKey,
        usdcMintPubKey,
        senderPubKey
      );
      // const transferUsdcToTempAccIX = createTransferInstruction(
      //   senderUsdcAccountPubKey,
      //   tempUsdcAccountPubKey,
      //   senderPubKey,
      //   amountNum
      // );
      const escrowAccountIX = await createEscrowAccountIX(
        connection,
        senderPubKey,
        escrowAccountPubKey
      );

      const initEscrowIX = await createEscrowIX(
        senderPubKey,
        tempUsdcAccountPubKey,
        receiverPubkey,
        escrowAccountPubKey,
        amountNum
      );

      const tx = new Transaction().add(
        tempTokenAccountIX,
        initTempAccountIX,
        // transferUsdcToTempAccIX,
        escrowAccountIX,
        initEscrowIX
      );

      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature);
    } catch (error) {
      console.log(error);
    }
  }, [sendTransaction, connection, senderPubKey, receiverPubkeyString, amount]);

  return onClick;
};

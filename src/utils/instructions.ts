import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  Connection,
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import { ESCROW_ACCOUNT_DATA_LAYOUT } from ".";
import { config } from "./config";
const BN = require("bn.js");

export const createTokenAccountIX = async (
  connection: Connection,
  fromPubKey: PublicKey,
  newAccountPubkey: PublicKey
) => {
  return SystemProgram.createAccount({
    programId: TOKEN_PROGRAM_ID,
    space: AccountLayout.span,
    lamports: await connection.getMinimumBalanceForRentExemption(
      AccountLayout.span
    ),
    fromPubkey: fromPubKey,
    newAccountPubkey: newAccountPubkey,
  });
};

export const createEscrowAccountIX = async (
  connection: Connection,
  senderPubKey: PublicKey,
  newAccountPubkey: PublicKey
) => {
  return SystemProgram.createAccount({
    space: ESCROW_ACCOUNT_DATA_LAYOUT.span,
    lamports: await connection.getMinimumBalanceForRentExemption(
      ESCROW_ACCOUNT_DATA_LAYOUT.span
    ),
    fromPubkey: senderPubKey,
    newAccountPubkey: newAccountPubkey,
    programId: config.escrowProgramId,
  });
};

export const createEscrowIX = async (
  senderPubKey: PublicKey,
  tempUsdcAccountPubKey: PublicKey,
  receiverPubKey: PublicKey,
  escrowPubKey: PublicKey,
  amount: number
) => {
  return new TransactionInstruction({
    programId: config.escrowProgramId,
    keys: [
      {
        pubkey: senderPubKey,
        isSigner: true,
        isWritable: false,
      },
      {
        pubkey: receiverPubKey,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: tempUsdcAccountPubKey,
        isSigner: false,
        isWritable: true,
      },
      { pubkey: escrowPubKey, isSigner: false, isWritable: true },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    ],
    data: Buffer.from(Uint8Array.of(0, ...new BN(amount).toArray("le", 1))),
  });
};

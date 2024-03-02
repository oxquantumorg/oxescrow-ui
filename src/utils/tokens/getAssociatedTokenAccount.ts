import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Connection, PublicKey, Commitment } from "@solana/web3.js";
import { getAccountInfo } from "./getAccountInfo";
import { getAssociatedTokenAddress } from "./getAssociatedTokenAddress";

export async function getAssociatedTokenAccount(
  connection: Connection,
  mint: PublicKey,
  owner: PublicKey,
  allowOwnerOffCurve = false,
  commitment?: Commitment,
  programId = TOKEN_PROGRAM_ID,
  associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID
) {
  const associatedToken = await getAssociatedTokenAddress(
    mint,
    owner,
    allowOwnerOffCurve,
    programId,
    associatedTokenProgramId
  );

  try {
    let account = await getAccountInfo(
      connection,
      associatedToken,
      commitment,
      programId
    );
    return account;
  } catch (error: any) {
    return undefined;
  }
}

const BufferLayout = require("buffer-layout") ;

const publicKey = (property = "publicKey") => {
  return BufferLayout.blob(32, property);
};

const uint64 = (property = "uint64") => {
  return BufferLayout.blob(8, property);
};

export const ESCROW_ACCOUNT_DATA_LAYOUT = BufferLayout.struct([
  BufferLayout.u8("isInitialized"),
  publicKey("initializerPubkey"),
  publicKey("receiverAccountPubkey"),
  publicKey("initializerTempTokenAccountPubkey"),
  uint64("expectedAmount"),
  uint64("expireDate"),
]);

export interface EscrowLayout {
  isInitialized: number;
  initializerPubkey: Uint8Array;
  receiverAccountPubkey: Uint8Array;
  initializerTempTokenAccountPubkey: Uint8Array;
  expectedAmount: Uint8Array;
  expireDate: Uint8Array;
}

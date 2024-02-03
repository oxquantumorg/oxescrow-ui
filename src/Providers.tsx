import React from "react";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  // getSolletExtensionWallet,
  // getSolletWallet,
} from "@solana/wallet-adapter-wallets";
import { config } from "./utils/config";

function Providers({ children }: any) {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;
  console.log(network);

  const localhost = "http://127.0.0.1:8899"
  const clusterUrl = React.useMemo(() => clusterApiUrl(network), [network])
  const endpoint = config.localhost ? localhost : clusterUrl;
  const wallets = React.useMemo(
    () => [
      getLedgerWallet(),
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      // getSolletWallet({ network }),
      // getSolletExtensionWallet({ network }),
    ],
    []
  );

  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          {children}
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default Providers;

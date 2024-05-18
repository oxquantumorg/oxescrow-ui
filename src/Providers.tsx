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
  getSolletExtensionWallet,
  getSolletWallet,
} from "@solana/wallet-adapter-wallets";
// import { config } from "./utils/config";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

function Providers({ children }: any) {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet;

  // const localhost = undefined //"http://127.0.0.1:8899"
  const clusterUrl = React.useMemo(() => clusterApiUrl(network), [network]);
  console.log(clusterUrl);
  // const endpoint = config.localhost ? localhost : clusterUrl;
  const wallets = React.useMemo(
    () => [
      getLedgerWallet(),
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [network]
  );

  return (
    <>
      <ConnectionProvider endpoint={clusterUrl}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default Providers;

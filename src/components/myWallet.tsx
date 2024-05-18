import React from "react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const MyWallet: React.FC = () => {
  // const { connection } = useConnection();
  // let walletAddress = "";

  // if (wallet.connected && wallet.publicKey) {
  //     walletAddress = wallet.publicKey.toString()
  // }

  return (
    <div className="">
      <span className="">
        <WalletModalProvider>
          <WalletMultiButton />
        </WalletModalProvider>
      </span>
    </div>
  );
};

export default MyWallet;

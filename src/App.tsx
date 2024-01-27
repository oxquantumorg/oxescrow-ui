import React, { useState } from "react";
import logo from "./logo.svg";
import MyWallet from "./components/my-wallet";
import CreateEscrow from "./pages/create-escrow";
import { TokenInfoHook } from "./web3hooks/TokenInfoHook";
import { useWallet } from "@solana/wallet-adapter-react";

function App() {
  const wallet = useWallet();
  const [mintPublickey,] = useState('BhMQMCcuNZUiBW8CWFkeSipwYcqEu3Gp939HdrsY37VG')
  const { balance, tokenBalance } = TokenInfoHook(mintPublickey)

  return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo mx-auto" alt="logo" />
            <h3 className="text-white text-center">
              LittleBiggy Escrow Systems
            </h3>
                  <h3 className="text-white text-center">
          {wallet.connected && wallet.publicKey && (
            <div className='text-[20px] mt-[20px]'>
              <p> Sol Balance: {balance.toFixed(2)} </p>
              <p> Token Balance: {tokenBalance.toFixed(2)} </p>
            </div>
          )}
          </h3>
            <div className="justify-center flex mt-5">
              <MyWallet /> <br />
            </div>
            <div className="h-10"></div>
            <CreateEscrow />
          </header>
        </div>
  );
}

export default App;

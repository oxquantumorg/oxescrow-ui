import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import MyWallet from "./components/myWallet";
import CreateEscrow from "./pages/create-escrow";
import AccountList from "./components/accountList";
import { TokenInfoHook } from "./web3hooks/TokenInfoHook";
import { useWallet } from "@solana/wallet-adapter-react";
import { config } from "./utils/config";
import packageJson from "../package.json";

function App() {
  const wallet = useWallet();
  const [mintPublickey,] = useState(config.usdcMintPubKey.toString())
  const { balance, tokenBalance } = TokenInfoHook(mintPublickey)
  const [displayPubKey, setDisplayPubKey] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [msg, setMsg] = useState('')

  const check = () => {
    let version = localStorage.getItem('version');
    if (version !== packageJson.version) {
      if ('caches' in window) {
        caches.keys().then((names) => {
          // Delete all the cache files
          names.forEach(name => {
            caches.delete(name);
          })
        });

        window.location.reload();
      }

      localStorage.clear();
      localStorage.setItem('version', packageJson.version);
    }
  }

  useEffect(() => {
    check()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo mx-auto" alt="logo" />
        <h3 className="text-white text-center">
          Oxescrow Escrow Systems
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
        <div className="w-[80%] mx-auto mt-10">

          {errMsg && (
            <p className='text-red-500 text-sm'>{errMsg}</p>
          )}
          {msg && (
            <p className='text-green-500 text-sm'>{msg}</p>
          )}
          {displayPubKey && (
            <h1 className='text-blue-500 text-sm'>Escrow Mint Account: {displayPubKey}</h1>
          )}
        </div>
        <div className="flex mx-auto my-20">

          <div className="w-[40%]">
            <CreateEscrow setDisplayPubKey={setDisplayPubKey} setErrMsg={setErrMsg} setMsg={setMsg} />
          </div>
          <div className="w-[40%]">
            <AccountList />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

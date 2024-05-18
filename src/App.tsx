import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import CreateEscrow from "./pages/create-escrow";
import AccountList from "./components/accountList";
import { TokenInfoHook } from "./web3hooks/TokenInfoHook";
import { useWallet } from "@solana/wallet-adapter-react";
import packageJson from "../package.json";
import Button from "./components/templates/button";
import { shortenAddress } from "./utils/helpers";

function App() {
  const { publicKey } = useWallet();

  const { balance, tokenBalance } = TokenInfoHook();
  const [errMsg, setErrMsg] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [msg, setMsg] = useState("");

  const check = () => {
    let version = localStorage.getItem("version");
    if (version !== packageJson.version) {
      if ("caches" in window) {
        caches.keys().then((names) => {
          // Delete all the cache files
          names.forEach((name) => {
            caches.delete(name);
          });
        });

        window.location.reload();
      }

      localStorage.clear();
      localStorage.setItem("version", packageJson.version);
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo mx-auto" alt="logo" />
        <h3 className="font-semibold text-center">Oxescrow</h3>
        {publicKey && (
          <h3 className="text-white text-center">
            <div className="text-[20px] mt-[10px]">
              <p> Connected wallet </p>
              <p className="text-blue-400 font-semibold text-[17px]">
                {shortenAddress(publicKey.toString())}
              </p>
            </div>
          </h3>
        )}

        <div className="flex justify-center mt-2 flex-col items-center">
          <div className="md:w-[50%] mb-8">
            <div className="max-w-sm mx-auto">
              {errMsg && <p className="text-red-500 text-sm">{errMsg}</p>}
              {msg && <p className="text-green-500 text-sm">{msg}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-2 flex-col items-center">
          <div className="md:w-[50%] mb-20">
            <CreateEscrow setErrMsg={setErrMsg} setMsg={setMsg} />
          </div>
          <div className="w-[94%] md:w-[50%] mb-20">
            <div className="flex mb-4">
              <Button
                onClickHandler={() => setShowHistory(!showHistory)}
                disabled={!!publicKey}
                text="Show history &gt;&gt;"
              />
              <div className="text-[17px] ml-8 text-blue-500">
                <p> Sol Balance: {balance.toFixed(2)} </p>
                <p> Usdc Balance: {tokenBalance.toFixed(2)} </p>
              </div>
            </div>
            <AccountList showHistory={showHistory} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

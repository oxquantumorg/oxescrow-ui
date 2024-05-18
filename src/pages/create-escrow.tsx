import React, { useCallback, useState } from "react";
import Input from "../components/templates/input";
import Button from "../components/templates/button";
import { useWallet } from "@solana/wallet-adapter-react";
import MyWallet from "../components/myWallet";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";

function CreateEscrow({ setMsg, setErrMsg }: any) {
  const [receiverPublickey, setReceiverPublickey] = useState("");

  const [amount, setAmount] = useState("2");
  const { publicKey } = useWallet();

  const createEscrow = useCallback(async () => {
    try {
      if (!publicKey)
        return setErrMsg("Please connect your wallet to continue");
      if (!amount) return setErrMsg("Escrow amount is required!!");
      const url = `https://oxescrow.api.oxquantumprojects.lol/create_escrow?initializerPublicKey=${publicKey}&amount=${amount}`;
      const res = await fetch(url).then((res) => res.json());

      if (res.isSuccess) {
        setReceiverPublickey(res.data.escrowAcc);
        setMsg(res.message);
      } else {
        setErrMsg(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, [amount, publicKey, setReceiverPublickey, setErrMsg, setMsg]);

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-blue-500 text-[15px] mb-5">
        Enter the expected Usdc amount. Our API will generate a unique address
        for escrow. Share this address with the sender to receive the escrowed
        funds securely.
      </h1>

      <div className="mb-5">
        <Input
          onChangeHandler={setReceiverPublickey}
          value={receiverPublickey}
          title="Deposit address"
        />
      </div>
      <div className="mb-5">
        <Input
          onChangeHandler={setAmount}
          value={amount}
          title="Amount to receive"
        />
      </div>

      {!publicKey && (
        <div className="justify-center flex mt-5">
          <MyWallet /> <br />
        </div>
      )}
      {publicKey && (
        <div className="justify-center flex flex-col mt-7">
          <div>
            <Button
              text="Generate Escrow Account"
              disabled={!publicKey}
              onClickHandler={createEscrow}
            />
          </div>
          <br />
          <div>
            <WalletDisconnectButton />
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateEscrow;

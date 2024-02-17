import React, { useCallback, useEffect, useState } from 'react'
import Input from '../components/templates/input'
import Button from '../components/templates/button'
import { useWallet } from '@solana/wallet-adapter-react'

function CreateEscrow({ setMsg, setDisplayPubKey, setErrMsg }: any) {
    const [receiverPublickey, setReceiverPublickey] = useState('')

    const [amount, setAmount] = useState('2')
    const { publicKey } = useWallet();

    const createEscrow = useCallback(async () => {
        try {
            if (!receiverPublickey || !amount) return setErrMsg("Receiver Public Key and amount is required!!")
            const url = `http://172.178.107.72:4001/create_escrow?receiverPubKey=${receiverPublickey}&amount=${amount}`
            const res = (await fetch(url).then(res => res.json()))
            console.log('res', res);
            if (res.isSuccess) {
                setDisplayPubKey(res.data.escrowAcc)
                setMsg(res.message)
            } else {
                setErrMsg(res.message)
            }
        } catch (error) {
            console.log(error);
        }
    }, [receiverPublickey, amount, setDisplayPubKey, setErrMsg, setMsg])

    useEffect(() => {
        if (publicKey == null) return
        setReceiverPublickey(publicKey.toString())
    }, [publicKey])
    return (
        <form className="max-w-sm mx-auto">
            <div className="mb-5">
                <Input
                    onChangeHandler={setReceiverPublickey}
                    value={receiverPublickey}
                    title='Preferred receiving public key'
                />
            </div>
            <div className="mb-5">
                <Input
                    onChangeHandler={setAmount}
                    value={amount}
                    title='Amount to receive'
                />
            </div>
            <Button text='Send transaction' disabled={!publicKey} onClickHandler={createEscrow} />
        </form>

    )
}

export default CreateEscrow
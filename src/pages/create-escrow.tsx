import React, { useEffect, useState } from 'react'
import Input from '../components/templates/input'
import Button from '../components/templates/button'
import { CreateEscrowHook } from '../web3hooks/CreateEscrowHook'
import { useWallet } from '@solana/wallet-adapter-react'

function CreateEscrow() {
    const [receiverPublickey, setReceiverPublickey] = useState('')
    const [amount, setAmount] = useState('2')
    const submitHandler = CreateEscrowHook(receiverPublickey, amount)
    const { publicKey } = useWallet();

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
            <Button text='Send transaction' disabled={!publicKey} onClickHandler={submitHandler} />
        </form>

    )
}

export default CreateEscrow
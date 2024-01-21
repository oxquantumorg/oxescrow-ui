import React, { useState } from 'react'
import Input from '../components/templates/input'
import Button from '../components/templates/button'
import { CreateEscrowHook } from '../web3hooks/CreateEscrowHook'
import { useWallet } from '@solana/wallet-adapter-react'

function CreateEscrow() {
    const [receiverPublickey, setReceiverPublickey] = useState('HBSLiE4KGxjgUz4ddB7cKKSeNGig8oNnYeCVEAs5VHq7')
    const [amount, setAmount] = useState('100')
    const submitHandler = CreateEscrowHook(receiverPublickey, amount)
    const { publicKey } = useWallet();

    return (
        <form className="max-w-sm mx-auto">
            <div className="mb-5">
                <Input
                    onChangeHandler={setReceiverPublickey}
                    value={receiverPublickey}
                    title='Receiver public key'
                />
            </div>
            <div className="mb-5">
                <Input
                    onChangeHandler={setAmount}
                    value={amount}
                    title='Amount to send'
                />
            </div>
            <Button text='Send transaction' disabled={!publicKey} onClickHandler={submitHandler} />
        </form>

    )
}

export default CreateEscrow
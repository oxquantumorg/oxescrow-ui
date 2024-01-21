import React, { useState } from 'react'
import Input from '../components/templates/input'

function CreateEscrow() {
    const [receiverPublickey, setReceiverPublickey] = useState('')
    const [amount, setAmount] = useState('')

    const setReceiverPublickeyHandler = (e: any) => {
        setReceiverPublickey(e.target.value)
    }

    const setAmountHandler = (e: any) => {
        setAmount(e.target.value)
    }

    return (
        <form className="max-w-sm mx-auto">
            <div className="mb-5">
                <Input
                    onChangeHandler={setReceiverPublickeyHandler}
                    value={receiverPublickey}
                    title='Receiver public key'
                />
            </div>
            <div className="mb-5">
                <Input
                    onChangeHandler={setAmountHandler}
                    value={amount}
                    title='Amount to send'
                />
            </div>
        </form>

    )
}

export default CreateEscrow
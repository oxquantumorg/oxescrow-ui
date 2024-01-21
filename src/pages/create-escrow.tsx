import React, { useState } from 'react'
import Input from '../components/templates/input'
import Button from '../components/templates/button'

function CreateEscrow() {
    const [receiverPublickey, setReceiverPublickey] = useState('')
    const [amount, setAmount] = useState('')

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
            <Button text='Send transaction' disabled={false} onClickHandler={(e) => { }} />
        </form>

    )
}

export default CreateEscrow
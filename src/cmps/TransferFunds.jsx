import React, { useState } from 'react'

export default function TransferFunds({ contact, onTransfer }) {
    const [amount, setAmount] = useState(0)

    function onSetAmount({ target }) {
        console.log('set amount', target.value)
        setAmount(target.value)
    }

    return (
        <form onSubmit={() => onTransfer(amount, contact)} className='flex gap'>
            <input type='number' placeholder='0' onChange={onSetAmount} />
            <button>Transfer Coins</button>
        </form>
    )
}

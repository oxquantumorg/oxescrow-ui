import { useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react';

const AccountList: React.FC = () => {
    const { publicKey } = useWallet();
    const [accounts, setAccounts] = useState([])


    const getData = async (pubkey: string) => {
        const url = 'http://localhost:3004/getescrows?publicKey='
        const res = (await fetch(url + publicKey).then(res => res.json()))
        setAccounts(res.map((data: any) => {
            const escrowData = { pubkey: data.temp_token_account_pubkey, amount: data.escrow_amount, status: data.completed ? "Paid" : "Pending" };
            return escrowData
        }))
    }

    useEffect(() => {
        if (!publicKey) return
        getData(publicKey.toString())
    }, [publicKey])

    return (
        <>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                PublicKey
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((acc: any) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {acc.pubkey}
                                </th>
                                <td className="px-6 py-4">
                                    {acc.amount}
                                </td>
                                <td className="px-6 py-4">
                                    {acc.status}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </>
    )
}

export default AccountList
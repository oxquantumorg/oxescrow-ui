import React from 'react'

interface Props {
    title: string,
    value: string,
    onChangeHandler: (e: any) => void
}

export default function Input({ title, value, onChangeHandler }: Props) {
    return (
        <>
            <label htmlFor="large-input" className="block mb-2 text-sm font-medium 
            text-gray-900 dark:text-white">
                {title}
            </label>

            <input
                value={value}
                onChange={onChangeHandler}
                type="text"
                id="large-input"
                className="bg-gray-50 border border-gray-300 
            text-gray-900 text-sm rounded-lg focus:ring-blue-500 
            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500"
            />
        </>
    )
}

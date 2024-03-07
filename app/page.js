'use client';
const { ethers } = require('ethers');
import { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

export default function Home() {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [hasProvider, setHasProvider] = useState(null);
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };
    getProvider();
  }, []);

  const updateWallet = async (accounts) => {
    setWallet({ accounts });
  };

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    updateWallet(accounts);
    console.log(accounts[0]);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async () => {
    let accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],

          to: address,

          value: amount,
        },
      ],
    });
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='m-2 p-2 rounded-lg bg-slate-800 text-white'>
        {hasProvider && (
          <button onClick={handleConnect}>Connect MetaMask</button>
        )}
        {wallet.accounts.length > 0 && (
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
        )}
      </div>

      <div className='bg-gray-100 p-8 rounded-lg shadow-md'>
        <div className='mb-4'>
          <label
            htmlFor='amount'
            className='block text-gray-700 font-bold mb-2'
          >
            Amount:
          </label>
          <input
            type='text'
            id='amount'
            value={amount}
            onChange={handleAmountChange}
            className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='address'
            className='block text-gray-700 font-bold mb-2'
          >
            Address:
          </label>
          <input
            type='text'
            id='address'
            value={address}
            onChange={handleAddressChange}
            className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400'
          />
        </div>
        <button
          onClick={handleSubmit}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Submit
        </button>
      </div>
    </div>
  );
}

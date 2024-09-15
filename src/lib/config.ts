import { http } from 'wagmi';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { mainnet } from 'wagmi/chains';

export const projectId = import.meta.env.VITE_PROJECT_ID as string;

export const metadata = {
  name: 'Quantum Sphere AI',
  description: 'A platform for Cloud Service',
  url: 'http://localhost:5173',
  icons: [''],
}

export const config = defaultWagmiConfig({
  chains: [
    mainnet,
  ],
  projectId,
  metadata,
  transports: {
    [mainnet.id]: http(''),
  }
})

export const USDT_CONTRACT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7';

export const abi = [
  {
    type: 'function',
    name: 'transferFrom',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
  {
    type: 'function',
    name: 'totalSupply',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'supply', type: 'uint256' }],
  },
] as const
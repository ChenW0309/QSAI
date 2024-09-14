import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { arbitrum, mainnet } from 'viem/chains';

export const projectId = import.meta.env.VITE_PROJECT_ID as string;

export const metadata = {
  name: 'Quantum Sphere AI',
  description: 'A platform for Cloud Service',
  url: 'https://qsai-nu.vercel.app',
  icons: [''],
}

export const chains = [mainnet, arbitrum] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})
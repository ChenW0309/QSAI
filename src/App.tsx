import { WagmiProvider } from 'wagmi';
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { arbitrum, mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import routes from './routes';
import { useWalletStore } from './store';

import DefaultLayout from './layout/DefaultLayout';
import ConnectWallet from './components/ConnectWallet';

const queryClient = new QueryClient();

const projectId = import.meta.env.VITE_PROJECT_ID as string;

if (!projectId) {
  throw new Error("Please provide project Id");
}

const metadata = {
  name: 'Quantum Sphere AI',
  description: 'A platform for Cloud Service',
  url: 'http://localhost:5173',
  icons: [''],
}

const chains = [mainnet, arbitrum] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata
})

createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true
})

function App() {
  const { isConnectedToWallet } = useWalletStore() as { isConnectedToWallet: boolean };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          containerClassName="overflow-auto"
        />
        <Routes>
          <Route element={<DefaultLayout />}>
            {routes.map((routes, index) => {
              const { path, component: Component } = routes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <>
                      {isConnectedToWallet ? <Component /> : <ConnectWallet />}
                    </>
                  }
                />
              );
            })}
          </Route>
        </Routes>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWalletStore = create(persist(
  (set) => ({
    isConnectedToWallet: false,
    connectToWallet: () => set({ isConnectedToWallet: true }),
    disconnectFromWallet: () => set({ isConnectedToWallet: false }),
  }),
  {
    name: 'wallet-storage',
    getStorage: () => localStorage,
  }
));

const useMachineStore = create(persist(
  (set) => ({
    machines: [],
    setMachines: (machines: any) => set({ machines: machines })
  }),
  {
    name: 'machine-storage',
    getStorage: () => localStorage
  }
))


export { useWalletStore, useMachineStore };
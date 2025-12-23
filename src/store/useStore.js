import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // Wallet state
      walletAddress: null,
      isConnected: false,
      chainId: null,
      
      // User role state
      userRole: null, // 'owner', 'contractor', 'installer', 'supplier', 'inspector', 'regulator'
      hasSelectedRole: false,
      
      // Modal states
      showWalletModal: false,
      showRoleModal: false,
      isConnecting: false,
      connectionError: null,
      
      // Actions
      setWalletAddress: (address) => set({ walletAddress: address }),
      setIsConnected: (connected) => set({ isConnected: connected }),
      setChainId: (chainId) => set({ chainId }),
      
      setUserRole: (role) => set({ 
        userRole: role, 
        hasSelectedRole: true 
      }),
      
      clearUserRole: () => set({ 
        userRole: null, 
        hasSelectedRole: false 
      }),
      
      openWalletModal: () => set({ showWalletModal: true }),
      closeWalletModal: () => set({ 
        showWalletModal: false, 
        isConnecting: false,
        connectionError: null 
      }),
      
      openRoleModal: () => set({ showRoleModal: true }),
      closeRoleModal: () => set({ showRoleModal: false }),
      
      setIsConnecting: (connecting) => set({ isConnecting: connecting }),
      setConnectionError: (error) => set({ connectionError: error }),
      
      // Disconnect wallet
      disconnectWallet: () => {
        set({
          walletAddress: null,
          isConnected: false,
          chainId: null,
          userRole: null,
          hasSelectedRole: false,
          showWalletModal: false,
          showRoleModal: false,
        });
        // Clear localStorage
        localStorage.removeItem('dppassport-storage');
      },
      
      // Check if user needs role selection
      needsRoleSelection: () => {
        const state = get();
        return state.isConnected && !state.hasSelectedRole;
      },
    }),
    {
      name: 'dppassport-storage',
      partialize: (state) => ({
        // Only persist these when both wallet and role are set
        walletAddress: state.walletAddress && state.hasSelectedRole ? state.walletAddress : null,
        userRole: state.hasSelectedRole ? state.userRole : null,
        hasSelectedRole: state.hasSelectedRole,
      }),
    }
  )
);

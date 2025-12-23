import { useEffect } from 'react';
import { X, ArrowRight, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useConnect, useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';

const WalletModal = () => {
  const { 
    showWalletModal, 
    closeWalletModal, 
    isConnecting, 
    setIsConnecting,
    connectionError,
    setConnectionError,
    setIsConnected,
    setWalletAddress,
    openRoleModal,
    needsRoleSelection,
  } = useStore();

  const { connect, connectors, error } = useConnect();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setIsConnected(true);
      setWalletAddress(address);
      closeWalletModal();
      
      // Check if user needs to select role
      if (needsRoleSelection()) {
        setTimeout(() => {
          openRoleModal();
        }, 300);
      }
    } else if (!isConnected) {
      // Sync store when wallet is disconnected
      setIsConnected(false);
      setWalletAddress(null);
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (error) {
      setConnectionError(error.message);
      setIsConnecting(false);
    }
  }, [error]);

  const handleConnect = async (connector) => {
    try {
      setIsConnecting(true);
      setConnectionError(null);
      await connect({ connector });
    } catch (err) {
      console.error('Connection error:', err);
      setConnectionError(err.message || 'Failed to connect wallet');
      setIsConnecting(false);
    }
  };

  const walletOptions = [
    {
      id: 'metaMask',
      name: 'MetaMask',
      icon: (
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">M</span>
        </div>
      ),
    },
    {
      id: 'walletConnect',
      name: 'WalletConnect',
      icon: (
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">WC</span>
        </div>
      ),
    },
    {
      id: 'coinbaseWallet',
      name: 'Coinbase Wallet',
      icon: (
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">CB</span>
        </div>
      ),
    },
  ];

  if (!showWalletModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeWalletModal}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-10"
        >
          {/* Close Button */}
          <button
            onClick={closeWalletModal}
            className="absolute top-6 right-6 text-steel-gray hover:text-dark-text transition-colors"
          >
            <X size={24} />
          </button>

          {!isConnecting && !connectionError ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-dark-text mb-2">
                  Connect Your Wallet
                </h2>
                <p className="text-base text-steel-gray">
                  Choose your preferred wallet provider
                </p>
              </div>

              {/* Wallet Options */}
              <div className="space-y-3">
                {walletOptions.map((wallet, index) => {
                  const connector = connectors[index];
                  return (
                    <button
                      key={wallet.id}
                      onClick={() => connector && handleConnect(connector)}
                      className="w-full bg-bg-gray border-2 border-border-gray hover:border-accent-orange hover:bg-white rounded-xl p-4 flex items-center justify-between transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        {wallet.icon}
                        <span className="text-lg font-semibold text-dark-text">
                          {wallet.name}
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-steel-gray" />
                    </button>
                  );
                })}
              </div>
            </>
          ) : isConnecting ? (
            /* Connecting State */
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-accent-orange animate-spin mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-dark-text mb-2">
                Connecting...
              </h3>
              <p className="text-base text-steel-gray">
                Confirm the connection in your wallet
              </p>
            </div>
          ) : (
            /* Error State */
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <X className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-dark-text mb-2">
                Connection Failed
              </h3>
              <p className="text-base text-steel-gray mb-6">
                {connectionError || 'Please make sure your wallet is unlocked and try again'}
              </p>
              <button
                onClick={() => {
                  setConnectionError(null);
                  setIsConnecting(false);
                }}
                className="bg-accent-orange hover:bg-accent-orange-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WalletModal;

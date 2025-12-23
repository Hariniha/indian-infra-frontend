import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useAccount } from 'wagmi';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { isConnected, userRole, hasSelectedRole, openWalletModal } = useStore();
  const { isConnected: wagmiConnected } = useAccount();

  useEffect(() => {
    if (!wagmiConnected && !isConnected) {
      openWalletModal();
    }
  }, [wagmiConnected, isConnected]);

  // Not connected - redirect to landing
  if (!wagmiConnected && !isConnected) {
    return <Navigate to="/" replace />;
  }

  // Connected but no role - redirect to landing (role modal will open)
  if (!hasSelectedRole || !userRole) {
    return <Navigate to="/" replace />;
  }

  // Role mismatch - redirect to correct dashboard
  if (userRole !== allowedRole) {
    return <Navigate to={`/dashboard/${userRole}`} replace />;
  }

  return children;
};

export default ProtectedRoute;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Timeline from '../components/Timeline';
import RoleSelector from '../components/RoleSelector';
import BlockchainTrust from '../components/BlockchainTrust';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import WalletModal from '../components/WalletModal';
import RoleModal from '../components/RoleModal';

const Landing = () => {
  const navigate = useNavigate();
  const { userRole, hasSelectedRole, walletAddress } = useStore();

  useEffect(() => {
    // If user has both wallet and role, redirect to their dashboard
    if (hasSelectedRole && userRole && walletAddress) {
      if (userRole === 'owner') {
        navigate('/owner/dashboard');
      } else {
        navigate(`/dashboard/${userRole}`);
      }
    }
  }, [hasSelectedRole, userRole, walletAddress, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Features />
      <Timeline />
      <RoleSelector />
      <BlockchainTrust />
      <CTA />
      <Footer />
      
      {/* Modals */}
      <WalletModal />
      <RoleModal />
    </div>
  );
};

export default Landing;

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Wallet, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useAccount, useDisconnect } from 'wagmi';
import gsap from 'gsap';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openWalletModal, disconnectWallet } = useStore();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const navRef = useRef(null);

  const handleDisconnect = () => {
    disconnect(); // Disconnect from wagmi
    disconnectWallet(); // Clear store state
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Features', id: 'features' },
    { label: 'How It Works', id: 'process' },
    { label: 'Roles', id: 'roles' },
    { label: 'Verification', id: 'verification' },
  ];

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95' : 'bg-white/80'
        } backdrop-blur-md border-b border-border-gray`}
        style={{ height: '72px' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-orange to-accent-orange-dark rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-dark-text tracking-tight">DPPassport</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-base font-medium text-steel-gray hover:text-dark-text transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent-orange transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </button>
            ))}
          </div>

          {/* Connect/Disconnect Wallet Button */}
          <div className="hidden md:flex items-center gap-3">
            {isConnected && address ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-dark-text">{formatAddress(address)}</span>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5"
                >
                  <LogOut size={18} />
                  <span>Disconnect</span>
                </button>
              </>
            ) : (
              <button
                onClick={openWalletModal}
                className="flex items-center space-x-2 bg-accent-orange hover:bg-accent-orange-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5"
              >
                <Wallet size={20} />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-steel-gray hover:text-dark-text"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden" style={{ top: '72px' }}>
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-2xl font-semibold text-dark-text hover:text-accent-orange transition-colors"
              >
                {link.label}
              </button>
            ))}
            {isConnected && address ? (
              <>
                <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-lg font-medium text-dark-text">{formatAddress(address)}</span>
                </div>
                <button
                  onClick={() => {
                    handleDisconnect();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
                >
                  <LogOut size={20} />
                  <span>Disconnect</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  openWalletModal();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 bg-accent-orange hover:bg-accent-orange-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
              >
                <Wallet size={20} />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;

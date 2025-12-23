import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X,
  Home,
  Package, 
  QrCode,
  Clock, 
  CheckCircle,
  User,
  Settings,
  Bell,
  LogOut,
  WifiOff,
  RefreshCw,
  Building2,
  Copy,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useDisconnect } from 'wagmi';

const ContractorLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const walletAddress = useStore((state) => state.walletAddress);
  const disconnectWallet = useStore((state) => state.disconnectWallet);
  const { disconnect } = useDisconnect();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentProject] = useState({ name: 'Tower Heights', id: 'TH-001' });
  const [isOnline] = useState(true);
  const [pendingSync] = useState(0);

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/contractor/dashboard' },
    { icon: Package, label: 'My Products', path: '/contractor/products' },
    { icon: QrCode, label: 'Scan QR Code', path: '/contractor/scan', highlighted: true },
    { icon: Clock, label: 'Pending Uploads', path: '/contractor/pending', badge: pendingSync },
    { icon: CheckCircle, label: 'Completed', path: '/contractor/completed' },
    { icon: User, label: 'Profile', path: '/contractor/profile' },
    { icon: Settings, label: 'Settings', path: '/contractor/settings' },
  ];

  const handleLogout = () => {
    disconnect();
    disconnectWallet();
    navigate('/');
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E5E7EB] z-50">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left - Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA] transition-colors"
          >
            <Menu className="w-6 h-6 text-[#1A1F2E]" />
          </button>

          {/* Center - Project Name */}
          <button 
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F8F9FA] transition-colors max-w-[180px]"
            onClick={() => {/* Open project switcher */}}
          >
            <Building2 className="w-4 h-4 text-[#E67E22] flex-shrink-0" />
            <span className="text-base font-semibold text-[#1A1F2E] truncate">
              {currentProject.name}
            </span>
            <ChevronDown className="w-4 h-4 text-[#6B7280] flex-shrink-0" />
          </button>

          {/* Right - Notifications & Status */}
          <div className="flex items-center gap-2">
            <button className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA] transition-colors relative">
              <Bell className="w-5 h-5 text-[#1A1F2E]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#E67E22] rounded-full"></span>
            </button>
            
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: isOnline ? '#10B981' : '#6B7280' }}></div>
          </div>
        </div>
      </header>

      {/* Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Now matches owner dashboard behavior */}
      <aside className={`
        fixed top-0 bottom-0 left-0 w-full sm:w-[280px] bg-white border-r border-[#E5E7EB] z-50 transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col overflow-y-auto">
          {/* Close Button (Mobile) */}
          <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB] sm:hidden">
            <span className="text-lg font-semibold text-[#1A1F2E]">Menu</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA]"
            >
              <X className="w-5 h-5 text-[#1A1F2E]" />
            </button>
          </div>

          {/* Profile Section */}
          <div className="p-6 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#E67E22] to-[#D35400] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">
                  {walletAddress?.slice(2, 4).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-[#1A1F2E]">Contractor Name</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-[#E67E22]/10 text-[#E67E22] text-xs font-medium rounded">
                    General Contractor
                  </span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={copyAddress}
              className="w-full flex items-center gap-2 px-3 py-2 bg-[#F8F9FA] rounded-lg text-sm text-[#6B7280] hover:bg-[#E5E7EB] transition-colors group"
            >
              <span className="font-mono truncate">{formatAddress(walletAddress)}</span>
              <Copy className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <p className="text-sm text-[#6B7280] mt-2">ABC Construction</p>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all mb-1 relative
                    ${isActive 
                      ? 'bg-[#E67E22]/10 text-[#E67E22]' 
                      : item.highlighted
                      ? 'bg-[#E67E22] text-white hover:bg-[#D35400]'
                      : 'text-[#1A1F2E] hover:bg-[#F8F9FA]'
                    }
                    ${isActive && 'border-l-4 border-[#E67E22] -ml-4 pl-4'}
                  `}
                >
                  <Icon className="w-5.5 h-5.5" />
                  <span className="font-medium">{item.label}</span>
                  {item.badge > 0 && (
                    <span className="ml-auto px-2 py-0.5 bg-[#E67E22] text-white text-xs font-semibold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sync Status Card */}
          <div className="p-4 border-t border-[#E5E7EB]">
            <div className="bg-[#F8F9FA] rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                {isOnline ? (
                  <>
                    <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                    <span className="text-sm font-medium text-[#1A1F2E]">All synced ✓</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-4 h-4 text-[#6B7280]" />
                    <span className="text-sm font-medium text-[#1A1F2E]">Offline mode</span>
                  </>
                )}
              </div>
              <p className="text-xs text-[#6B7280]">Last sync: 2 min ago</p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-[#E5E7EB] text-[#1A1F2E] hover:bg-[#F8F9FA] rounded-lg transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Disconnect Wallet</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content - Now pushes when sidebar opens on desktop */}
      <main className={`
        pt-16 transition-all duration-300
        ${isSidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-0'}
      `}>
        <div className="min-h-[calc(100vh-64px)]">
          {children}
        </div>
      </main>

      {/* Offline Banner */}
      {!isOnline && (
        <div className={`
          fixed top-16 left-0 right-0 bg-[#FEF3C7] border-b border-[#F59E0B] px-4 py-3 z-40 transition-all duration-300
          ${isSidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-0'}
        `}>
          <div className="flex items-center gap-2 text-sm">
            <WifiOff className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-[#92400E] font-medium">You're offline. Changes will sync when online.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractorLayout;

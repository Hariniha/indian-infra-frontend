import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Package, 
  Users, 
  FileCheck, 
  FileText, 
  Settings, 
  LogOut,
  ChevronDown,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useDisconnect } from 'wagmi';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const walletAddress = useStore((state) => state.walletAddress);
  const userRole = useStore((state) => state.userRole);
  const disconnectWallet = useStore((state) => state.disconnectWallet);
  const { disconnect } = useDisconnect();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/owner/dashboard' },
    { icon: FolderKanban, label: 'My Projects', path: '/owner/projects' },
    { icon: Package, label: 'Asset Registry', path: '/owner/assets' },
    { icon: Users, label: 'Team Management', path: '/owner/team' },
    { icon: FileCheck, label: 'Compliance', path: '/owner/compliance' },
    { icon: FileText, label: 'Documents', path: '/owner/documents' },
    { icon: Settings, label: 'Settings', path: '/owner/settings' },
  ];

  const handleLogout = () => {
    disconnect(); // Disconnect from wagmi
    disconnectWallet(); // Clear store state
    navigate('/');
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 h-[72px] bg-white border-b border-gray-200 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Left: Logo & Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#E67E22] to-[#D35400] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">IB</span>
              </div>
              <span className="text-xl font-bold text-[#1A1F2E] hidden sm:block">IndianBuild</span>
            </Link>
          </div>

          {/* Right: Wallet & Notifications */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E67E22] rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {walletAddress?.slice(2, 3).toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-[#1A1F2E]">{formatAddress(walletAddress)}</p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Disconnect</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-[72px] bottom-0 left-0 w-[280px] bg-white border-r border-gray-200 z-40 transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-6 overflow-y-auto">
          {/* User Profile */}
          <div className="mb-8 p-4 bg-gradient-to-br from-[#E67E22]/10 to-[#D35400]/10 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#E67E22] to-[#D35400] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {walletAddress?.slice(2, 4).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1A1F2E]">Owner Account</h3>
                <p className="text-sm text-gray-600">{formatAddress(walletAddress)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Network</span>
              <span className="flex items-center gap-1 text-[#10B981] font-medium">
                <span className="w-2 h-2 bg-[#10B981] rounded-full"></span>
                Ethereum
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-[#E67E22] text-white shadow-lg shadow-[#E67E22]/20' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Blockchain Status Card */}
          <div className="mt-6 p-4 bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 rounded-xl border border-[#10B981]/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[#1A1F2E]">Blockchain Status</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">All systems operational</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Gas Price</span>
                <span className="text-[#1A1F2E] font-medium">25 Gwei</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Block Height</span>
                <span className="text-[#1A1F2E] font-medium">18,450,123</span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`
        pt-[72px] transition-all duration-300
        ${isSidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-0'}
      `}>
        <div className="min-h-[calc(100vh-72px)] p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

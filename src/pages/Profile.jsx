import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Briefcase,
  Calendar,
  Shield,
  LogOut,
  Edit3,
  Camera,
  Copy,
  CheckCircle,
  Package,
  Clock,
  TrendingUp
} from 'lucide-react';
import ContractorLayout from '../components/ContractorLayout';
import { useStore } from '../store/useStore';
import { useDisconnect } from 'wagmi';

const Profile = () => {
  const navigate = useNavigate();
  const walletAddress = useStore((state) => state.walletAddress);
  const disconnectWallet = useStore((state) => state.disconnectWallet);
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);

  const profile = {
    name: 'Contractor Name',
    role: 'General Contractor',
    company: 'ABC Construction',
    email: 'contractor@abcconstruction.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    joinedDate: 'January 2024',
    avatar: walletAddress?.slice(2, 4).toUpperCase()
  };

  const stats = {
    totalProducts: 234,
    pending: 3,
    thisMonth: 47,
    activeProjects: 2
  };

  const handleLogout = () => {
    disconnect();
    disconnectWallet();
    navigate('/');
  };

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <ContractorLayout>
      <div className="min-h-screen bg-[#F8F9FA]">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#E67E22] to-[#D35400] px-4 pt-8 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-white">Profile</h1>
            <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors">
              <Edit3 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="px-4 -mt-16 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-[#E67E22] to-[#D35400] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">{profile.avatar}</span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#E67E22] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{profile.role}</p>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#E67E22]/10 rounded-full">
                <Building className="w-4 h-4 text-[#E67E22]" />
                <span className="text-sm font-medium text-[#E67E22]">{profile.company}</span>
              </div>
            </div>

            {/* Wallet Address */}
            <div className="bg-[#F8F9FA] rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 font-medium">Wallet Address</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                  <span className="text-xs text-[#10B981] font-medium">Connected</span>
                </div>
              </div>
              <button
                onClick={copyAddress}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg hover:border-[#E67E22] transition-colors group"
              >
                <span className="font-mono text-sm text-gray-900">{formatAddress(walletAddress)}</span>
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400 group-hover:text-[#E67E22]" />
                )}
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#F8F9FA] rounded-xl p-4 text-center">
                <Package className="w-6 h-6 text-[#E67E22] mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalProducts}</div>
                <div className="text-xs text-gray-600 font-medium">Total Products</div>
              </div>
              <div className="bg-[#F8F9FA] rounded-xl p-4 text-center">
                <Clock className="w-6 h-6 text-[#F59E0B] mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.pending}</div>
                <div className="text-xs text-gray-600 font-medium">Pending</div>
              </div>
              <div className="bg-[#F8F9FA] rounded-xl p-4 text-center">
                <TrendingUp className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.thisMonth}</div>
                <div className="text-xs text-gray-600 font-medium">This Month</div>
              </div>
              <div className="bg-[#F8F9FA] rounded-xl p-4 text-center">
                <Briefcase className="w-6 h-6 text-[#3B82F6] mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.activeProjects}</div>
                <div className="text-xs text-gray-600 font-medium">Active Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="px-4 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
          <div className="bg-white rounded-xl border border-[#E5E7EB] divide-y divide-[#E5E7EB]">
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600 mb-1">Email</p>
                <p className="text-sm font-medium text-gray-900 truncate">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 bg-[#10B981]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#10B981]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600 mb-1">Phone</p>
                <p className="text-sm font-medium text-gray-900">{profile.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600 mb-1">Location</p>
                <p className="text-sm font-medium text-gray-900">{profile.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 bg-[#6B7280]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-[#6B7280]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600 mb-1">Joined</p>
                <p className="text-sm font-medium text-gray-900">{profile.joinedDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="px-4 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Security</h3>
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#10B981]" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Blockchain Verified</h4>
                <p className="text-sm text-gray-600">Your identity is secured on Ethereum</p>
              </div>
              <CheckCircle className="w-6 h-6 text-[#10B981]" />
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-4 pb-20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 rounded-xl transition-colors font-semibold"
          >
            <LogOut className="w-5 h-5" />
            <span>Disconnect Wallet</span>
          </button>
        </div>
      </div>
    </ContractorLayout>
  );
};

export default Profile;

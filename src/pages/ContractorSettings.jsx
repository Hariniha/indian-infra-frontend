import { useState } from 'react';
import { 
  User,
  Bell,
  Shield,
  Moon,
  Sun,
  Globe,
  Database,
  Smartphone,
  Mail,
  Phone,
  Building,
  MapPin,
  Save,
  Camera,
  Check,
  ChevronRight,
  Download,
  Trash2,
  RefreshCw,
  Wifi,
  Volume2,
  Vibrate,
  Lock,
  Key,
  Eye,
  EyeOff
} from 'lucide-react';
import ContractorLayout from '../components/ContractorLayout';
import { useStore } from '../store/useStore';

const ContractorSettings = () => {
  const walletAddress = useStore((state) => state.walletAddress);
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Contractor Name',
    email: 'contractor@abcconstruction.com',
    phone: '+91 98765 43210',
    company: 'ABC Construction',
    role: 'General Contractor',
    location: 'Mumbai, Maharashtra'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    productUpdates: true,
    blockchainSync: true,
    projectAlerts: true,
    teamMessages: false,
    dailySummary: true,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false
  });

  const [appSettings, setAppSettings] = useState({
    theme: 'light',
    language: 'en',
    autoSync: true,
    offlineMode: true,
    hapticFeedback: true,
    soundEffects: false,
    cameraQuality: 'high',
    dataUsage: 'wifi-only'
  });

  const [securitySettings, setSecuritySettings] = useState({
    biometricAuth: false,
    autoLock: true,
    lockTimeout: '5',
    hideBalances: false,
    requireApproval: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'app', label: 'App Settings', icon: Smartphone },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'data', label: 'Data & Storage', icon: Database }
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <ContractorLayout>
      <div className="min-h-screen bg-[#F8F9FA]">
        {/* Header */}
        <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30">
          <div className="px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your account and preferences</p>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide px-4 pb-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-colors mr-2 ${
                    activeTab === tab.id
                      ? 'bg-[#E67E22] text-white'
                      : 'bg-white border border-[#E5E7EB] text-gray-700 hover:border-[#E67E22]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pb-20">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Avatar Section */}
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Picture</h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#E67E22] to-[#D35400] rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#E67E22] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <Camera className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">Change Photo</h4>
                    <p className="text-sm text-gray-600 mb-3">JPG, PNG or GIF. Max size 2MB</p>
                    <button className="text-sm font-medium text-[#E67E22] hover:text-[#D35400]">
                      Upload New
                    </button>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Wallet Information */}
              <div className="bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 rounded-xl border border-[#10B981]/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#10B981] rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Connected Wallet</h3>
                    <p className="text-sm text-gray-600">Blockchain verified account</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Wallet Address</p>
                  <p className="font-mono text-sm text-gray-900">{formatAddress(walletAddress)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-[#E5E7EB] last:border-0">
                      <div>
                        <h4 className="font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {key === 'productUpdates' && 'Get notified when products are registered'}
                          {key === 'blockchainSync' && 'Receive updates on blockchain transactions'}
                          {key === 'projectAlerts' && 'Important project notifications'}
                          {key === 'teamMessages' && 'Messages from team members'}
                          {key === 'dailySummary' && 'Daily activity summary'}
                          {key === 'emailNotifications' && 'Send notifications to your email'}
                          {key === 'pushNotifications' && 'Mobile and browser push notifications'}
                          {key === 'smsNotifications' && 'SMS alerts for critical updates'}
                        </p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({...notificationSettings, [key]: !value})}
                        className={`relative w-12 h-7 rounded-full transition-colors ${
                          value ? 'bg-[#10B981]' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          value ? 'right-1' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* App Settings Tab */}
          {activeTab === 'app' && (
            <div className="space-y-4">
              {/* Appearance */}
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Appearance</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setAppSettings({...appSettings, theme: 'light'})}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                          appSettings.theme === 'light'
                            ? 'border-[#E67E22] bg-[#E67E22]/5'
                            : 'border-[#E5E7EB] hover:border-[#E67E22]'
                        }`}
                      >
                        <Sun className="w-5 h-5 text-gray-700" />
                        <span className="font-medium text-gray-900">Light</span>
                        {appSettings.theme === 'light' && <Check className="w-4 h-4 text-[#E67E22] ml-auto" />}
                      </button>
                      <button
                        onClick={() => setAppSettings({...appSettings, theme: 'dark'})}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                          appSettings.theme === 'dark'
                            ? 'border-[#E67E22] bg-[#E67E22]/5'
                            : 'border-[#E5E7EB] hover:border-[#E67E22]'
                        }`}
                      >
                        <Moon className="w-5 h-5 text-gray-700" />
                        <span className="font-medium text-gray-900">Dark</span>
                        {appSettings.theme === 'dark' && <Check className="w-4 h-4 text-[#E67E22] ml-auto" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Language</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={appSettings.language}
                        onChange={(e) => setAppSettings({...appSettings, language: e.target.value})}
                        className="w-full pl-11 pr-10 py-3 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent appearance-none"
                      >
                        <option value="en">English</option>
                        <option value="hi">हिंदी (Hindi)</option>
                        <option value="mr">मराठी (Marathi)</option>
                        <option value="gu">ગુજરાતી (Gujarati)</option>
                      </select>
                      <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90" />
                    </div>
                  </div>
                </div>
              </div>

              {/* App Behavior */}
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">App Behavior</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <RefreshCw className="w-5 h-5 text-gray-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">Auto Sync</h4>
                        <p className="text-sm text-gray-600">Automatically sync when online</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setAppSettings({...appSettings, autoSync: !appSettings.autoSync})}
                      className={`relative w-12 h-7 rounded-full transition-colors ${
                        appSettings.autoSync ? 'bg-[#10B981]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        appSettings.autoSync ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Wifi className="w-5 h-5 text-gray-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">Offline Mode</h4>
                        <p className="text-sm text-gray-600">Save drafts when offline</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setAppSettings({...appSettings, offlineMode: !appSettings.offlineMode})}
                      className={`relative w-12 h-7 rounded-full transition-colors ${
                        appSettings.offlineMode ? 'bg-[#10B981]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        appSettings.offlineMode ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Vibrate className="w-5 h-5 text-gray-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">Haptic Feedback</h4>
                        <p className="text-sm text-gray-600">Vibration on button press</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setAppSettings({...appSettings, hapticFeedback: !appSettings.hapticFeedback})}
                      className={`relative w-12 h-7 rounded-full transition-colors ${
                        appSettings.hapticFeedback ? 'bg-[#10B981]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        appSettings.hapticFeedback ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-5 h-5 text-gray-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">Sound Effects</h4>
                        <p className="text-sm text-gray-600">Audio feedback for actions</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setAppSettings({...appSettings, soundEffects: !appSettings.soundEffects})}
                      className={`relative w-12 h-7 rounded-full transition-colors ${
                        appSettings.soundEffects ? 'bg-[#10B981]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        appSettings.soundEffects ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Camera Settings */}
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Camera</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Photo Quality</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['low', 'medium', 'high'].map(quality => (
                      <button
                        key={quality}
                        onClick={() => setAppSettings({...appSettings, cameraQuality: quality})}
                        className={`py-2.5 px-3 rounded-lg border-2 font-medium text-sm transition-colors capitalize ${
                          appSettings.cameraQuality === quality
                            ? 'border-[#E67E22] bg-[#E67E22]/5 text-[#E67E22]'
                            : 'border-[#E5E7EB] text-gray-700 hover:border-[#E67E22]'
                        }`}
                      >
                        {quality}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-gray-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">Auto Lock</h4>
                        <p className="text-sm text-gray-600">Lock app when inactive</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSecuritySettings({...securitySettings, autoLock: !securitySettings.autoLock})}
                      className={`relative w-12 h-7 rounded-full transition-colors ${
                        securitySettings.autoLock ? 'bg-[#10B981]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        securitySettings.autoLock ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  {securitySettings.autoLock && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Lock Timeout</label>
                      <select
                        value={securitySettings.lockTimeout}
                        onChange={(e) => setSecuritySettings({...securitySettings, lockTimeout: e.target.value})}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      >
                        <option value="1">1 minute</option>
                        <option value="5">5 minutes</option>
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                      </select>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">Require Approval</h4>
                        <p className="text-sm text-gray-600">Confirm blockchain transactions</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSecuritySettings({...securitySettings, requireApproval: !securitySettings.requireApproval})}
                      className={`relative w-12 h-7 rounded-full transition-colors ${
                        securitySettings.requireApproval ? 'bg-[#10B981]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        securitySettings.requireApproval ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-gray-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">Hide Balances</h4>
                        <p className="text-sm text-gray-600">Mask sensitive information</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSecuritySettings({...securitySettings, hideBalances: !securitySettings.hideBalances})}
                      className={`relative w-12 h-7 rounded-full transition-colors ${
                        securitySettings.hideBalances ? 'bg-[#10B981]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        securitySettings.hideBalances ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-xl p-4">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Security Tip</h4>
                    <p className="text-sm text-gray-700">Never share your private keys or seed phrase with anyone. IndianBuild will never ask for this information.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data & Storage Tab */}
          {activeTab === 'data' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Storage</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Cached Data</h4>
                      <p className="text-sm text-gray-600">156 MB</p>
                    </div>
                    <button className="px-4 py-2 bg-white border border-[#E5E7EB] text-gray-700 rounded-lg hover:border-[#E67E22] transition-colors font-medium text-sm">
                      Clear Cache
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Offline Products</h4>
                      <p className="text-sm text-gray-600">23 items, 45 MB</p>
                    </div>
                    <button className="px-4 py-2 bg-white border border-[#E5E7EB] text-gray-700 rounded-lg hover:border-[#E67E22] transition-colors font-medium text-sm">
                      Manage
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Draft Files</h4>
                      <p className="text-sm text-gray-600">5 drafts, 12 MB</p>
                    </div>
                    <button className="px-4 py-2 bg-white border border-[#E5E7EB] text-gray-700 rounded-lg hover:border-[#E67E22] transition-colors font-medium text-sm">
                      View Drafts
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Data Usage</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Download Photos</label>
                  <div className="space-y-2">
                    {['wifi-only', 'wifi-and-mobile', 'never'].map(option => (
                      <button
                        key={option}
                        onClick={() => setAppSettings({...appSettings, dataUsage: option})}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                          appSettings.dataUsage === option
                            ? 'border-[#E67E22] bg-[#E67E22]/5'
                            : 'border-[#E5E7EB] hover:border-[#E67E22]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 capitalize">{option.replace('-', ' ')}</h4>
                            <p className="text-sm text-gray-600 mt-0.5">
                              {option === 'wifi-only' && 'Only download over WiFi'}
                              {option === 'wifi-and-mobile' && 'Use WiFi and mobile data'}
                              {option === 'never' && 'Never auto-download'}
                            </p>
                          </div>
                          {appSettings.dataUsage === option && (
                            <Check className="w-5 h-5 text-[#E67E22]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Export Data</h3>
                <p className="text-sm text-gray-600 mb-4">Download all your registered products and data</p>
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#E67E22] text-white rounded-xl hover:bg-[#D35400] transition-colors font-medium">
                  <Download className="w-5 h-5" />
                  Export All Data
                </button>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h3>
                <p className="text-sm text-red-700 mb-4">Permanently delete all your data and disconnect wallet</p>
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium">
                  <Trash2 className="w-5 h-5" />
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="fixed bottom-20 left-0 right-0 px-4 pb-4 bg-gradient-to-t from-[#F8F9FA] via-[#F8F9FA] to-transparent pt-6">
            <button
              onClick={handleSave}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all shadow-lg ${
                saved
                  ? 'bg-[#10B981] text-white'
                  : 'bg-[#E67E22] text-white hover:bg-[#D35400]'
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Settings Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </ContractorLayout>
  );
};

export default ContractorSettings;

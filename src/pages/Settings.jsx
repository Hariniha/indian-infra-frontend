import { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Save,
  Key,
  Mail,
  Phone
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useStore } from '../store/useStore';

const Settings = () => {
  const walletAddress = useStore((state) => state.walletAddress);
  const [activeTab, setActiveTab] = useState('profile');

  const [profileData, setProfileData] = useState({
    name: 'Owner Account',
    email: 'owner@indianbuild.io',
    phone: '+91 98765 43210',
    company: 'IndianBuild Solutions',
    role: 'Owner/Developer'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    projectUpdates: true,
    complianceAlerts: true,
    teamInvites: true,
    assetRegistration: false,
    weeklyReports: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    language: 'en',
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Asia/Kolkata'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'blockchain', label: 'Blockchain', icon: Database }
  ];

  const handleSave = () => {
    console.log('Settings saved');
    // Show success message
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1F2E] mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left
                      ${activeTab === tab.id
                        ? 'bg-[#E67E22] text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1F2E] mb-1">Profile Settings</h2>
                    <p className="text-gray-600">Update your personal information</p>
                  </div>

                  <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#E67E22] to-[#D35400] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-3xl">
                        {walletAddress?.slice(2, 4).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400] transition-colors mr-2">
                        Change Avatar
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <input
                      type="text"
                      value={profileData.role}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>

                  <div className="flex justify-end pt-6 border-t border-gray-200">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-3 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400] transition-colors"
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1F2E] mb-1">Notification Preferences</h2>
                    <p className="text-gray-600">Choose what notifications you want to receive</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-4 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-[#1A1F2E]">Project Updates</p>
                        <p className="text-sm text-gray-600">Get notified about project milestones and changes</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.projectUpdates}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, projectUpdates: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E67E22]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E67E22]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-[#1A1F2E]">Compliance Alerts</p>
                        <p className="text-sm text-gray-600">Alerts for compliance deadlines and requirements</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.complianceAlerts}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, complianceAlerts: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E67E22]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E67E22]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-[#1A1F2E]">Team Invites</p>
                        <p className="text-sm text-gray-600">Notifications when team members join or leave</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.teamInvites}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, teamInvites: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E67E22]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E67E22]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-[#1A1F2E]">Asset Registration</p>
                        <p className="text-sm text-gray-600">Alerts when new assets are registered</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.assetRegistration}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, assetRegistration: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E67E22]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E67E22]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-[#1A1F2E]">Weekly Reports</p>
                        <p className="text-sm text-gray-600">Receive weekly project summary reports</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.weeklyReports}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, weeklyReports: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E67E22]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E67E22]"></div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-[#1A1F2E] mb-4">Notification Channels</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-[#1A1F2E]">Email Notifications</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings.emailNotifications}
                            onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E67E22]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E67E22]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-[#1A1F2E]">SMS Notifications</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings.smsNotifications}
                            onChange={(e) => setNotificationSettings({ ...notificationSettings, smsNotifications: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E67E22]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E67E22]"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-gray-200">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-3 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400] transition-colors"
                    >
                      <Save className="w-5 h-5" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1F2E] mb-1">Security Settings</h2>
                    <p className="text-gray-600">Manage your account security</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Key className="w-6 h-6 text-[#E67E22]" />
                      <h3 className="text-lg font-semibold text-[#1A1F2E]">Connected Wallet</h3>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600 mb-2">Wallet Address</p>
                      <p className="font-mono text-sm text-[#1A1F2E]">{walletAddress}</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Your account is secured with your Ethereum wallet. All transactions require wallet approval.
                    </p>
                    <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                      Disconnect Wallet
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#1A1F2E] mb-4">Two-Factor Authentication</h3>
                    <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                    <button className="px-4 py-2 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400] transition-colors">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#1A1F2E] mb-4">Session History</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <div>
                          <p className="font-medium text-[#1A1F2E]">Current Session</p>
                          <p className="text-sm text-gray-600">Mumbai, India • Chrome • Active now</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1F2E] mb-1">Appearance Settings</h2>
                    <p className="text-gray-600">Customize how the app looks and feels</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setAppearanceSettings({ ...appearanceSettings, theme: 'light' })}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          appearanceSettings.theme === 'light'
                            ? 'border-[#E67E22] bg-[#E67E22]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className="font-medium text-[#1A1F2E]">Light Mode</p>
                        <p className="text-sm text-gray-600">Clean and bright interface</p>
                      </button>
                      <button
                        onClick={() => setAppearanceSettings({ ...appearanceSettings, theme: 'dark' })}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          appearanceSettings.theme === 'dark'
                            ? 'border-[#E67E22] bg-[#E67E22]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className="font-medium text-[#1A1F2E]">Dark Mode</p>
                        <p className="text-sm text-gray-600">Easy on the eyes</p>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        value={appearanceSettings.language}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, language: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="hi">हिंदी (Hindi)</option>
                        <option value="mr">मराठी (Marathi)</option>
                        <option value="ta">தமிழ் (Tamil)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                      <select
                        value={appearanceSettings.dateFormat}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, dateFormat: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select
                        value={appearanceSettings.timezone}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, timezone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      >
                        <option value="Asia/Kolkata">India (IST)</option>
                        <option value="Asia/Dubai">Dubai (GST)</option>
                        <option value="America/New_York">New York (EST)</option>
                        <option value="Europe/London">London (GMT)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-gray-200">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-3 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400] transition-colors"
                    >
                      <Save className="w-5 h-5" />
                      Save Settings
                    </button>
                  </div>
                </div>
              )}

              {/* Blockchain Tab */}
              {activeTab === 'blockchain' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1F2E] mb-1">Blockchain Settings</h2>
                    <p className="text-gray-600">Manage your blockchain preferences</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#1A1F2E] mb-4">Network</h3>
                    <p className="text-gray-600 mb-4">Currently connected to Ethereum Mainnet</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-green-600 font-medium">Connected</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#1A1F2E] mb-4">Gas Settings</h3>
                    <p className="text-gray-600 mb-4">Current gas price: <strong>25 Gwei</strong></p>
                    <div className="flex items-center gap-4">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Low (Slow)
                      </button>
                      <button className="px-4 py-2 bg-[#E67E22] text-white rounded-lg">
                        Standard
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        High (Fast)
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#1A1F2E] mb-4">Transaction History</h3>
                    <p className="text-gray-600 mb-4">View all your blockchain transactions</p>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      View on Etherscan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

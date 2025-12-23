import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  QrCode, 
  Plus,
  Calendar,
  Clock,
  Database,
  ChevronRight,
  FileText,
  Users,
  MapPin,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import ContractorLayout from '../components/ContractorLayout';
import gsap from 'gsap';

const ContractorDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    today: 12,
    todayChange: 4,
    pending: 3,
    thisWeek: 47,
    total: 234
  });

  const [recentActivity] = useState([
    {
      id: 1,
      name: 'Portland Cement 50kg',
      category: 'Cement',
      quantity: '50 bags',
      location: 'Ground Floor, Wing A',
      status: 'confirmed',
      time: '2 hours ago',
      image: null
    },
    {
      id: 2,
      name: 'Steel Rebar 12mm',
      category: 'Steel',
      quantity: '200 pcs',
      location: 'First Floor, Wing B',
      status: 'pending',
      time: '4 hours ago',
      image: null
    },
    {
      id: 3,
      name: 'Electrical Wire 2.5mm',
      category: 'Electrical',
      quantity: '100 m',
      location: 'Ground Floor, Wing A',
      status: 'confirmed',
      time: '1 day ago',
      image: null
    }
  ]);

  useEffect(() => {
    // Animate stats on mount - without opacity
    gsap.from('.stat-card', {
      y: 20,
      scale: 0.9,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    });

    gsap.from('.activity-card', {
      x: -20,
      scale: 0.95,
      duration: 0.4,
      stagger: 0.1,
      delay: 0.3,
      ease: 'power2.out'
    });
  }, []);

  const quickActions = [
    { icon: FileText, label: 'View Reports', color: '#3B82F6', path: '/contractor/reports' },
    { icon: Users, label: 'Team Activity', color: '#10B981', path: '/contractor/team' },
    { icon: MapPin, label: 'Location Map', color: '#F59E0B', path: '/contractor/map' },
    { icon: HelpCircle, label: 'Help & Guide', color: '#6B7280', path: '/contractor/help' }
  ];

  return (
    <ContractorLayout>
      <div className="min-h-screen bg-[#F8F9FA] p-4 pb-20">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-br from-[#E67E22] to-[#D35400] rounded-2xl p-6 mb-5 text-white shadow-lg">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-1">Welcome back!</h2>
              <p className="text-sm text-white/90">Ready to register materials?</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-white/80">Current project: Tower Heights</p>
            <p className="text-xs text-white/70">Wednesday, Dec 04, 2024</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="stat-card bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#E67E22]/10 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-[#E67E22]" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.today}</div>
            <div className="text-sm text-gray-600 mb-2 font-medium">Registered Today</div>
            <div className="flex items-center gap-1 text-[#10B981] text-xs">
              <TrendingUp className="w-3 h-3" />
              <span>+{stats.todayChange} from yesterday</span>
            </div>
          </div>

          <div className="stat-card bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#F59E0B]" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.pending}</div>
            <div className="text-sm text-gray-600 mb-2 font-medium">Pending Blockchain</div>
            {stats.pending > 0 && (
              <div className="flex items-center gap-1 text-[#F59E0B] text-xs">
                <div className="w-3 h-3 border-2 border-[#F59E0B] border-t-transparent rounded-full animate-spin"></div>
                <span>Syncing...</span>
              </div>
            )}
          </div>

          <div className="stat-card bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#3B82F6]" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.thisWeek}</div>
            <div className="text-sm text-gray-600 font-medium">This Week</div>
          </div>

          <div className="stat-card bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                <Database className="w-5 h-5 text-[#10B981]" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="text-sm text-gray-600 font-medium">Total DPPs</div>
          </div>
        </div>

        {/* Primary Action */}
        <button
          onClick={() => navigate('/contractor/scan')}
          className="w-full h-14 bg-[#E67E22] hover:bg-[#D35400] rounded-xl flex items-center justify-center gap-3 text-white font-semibold text-lg shadow-lg shadow-[#E67E22]/30 transition-all active:scale-[0.98] mb-5"
        >
          <QrCode className="w-7 h-7" />
          <span>Scan Project QR</span>
        </button>

        <div className="flex items-center gap-4 my-5">
          <div className="flex-1 h-px bg-[#E5E7EB]"></div>
          <span className="text-sm text-[#6B7280] font-medium">OR</span>
          <div className="flex-1 h-px bg-[#E5E7EB]"></div>
        </div>

        <button
          onClick={() => navigate('/contractor/register')}
          className="w-full h-12 bg-white border-2 border-[#E5E7EB] hover:border-[#E67E22] rounded-xl flex items-center justify-center gap-2 text-[#1A1F2E] font-semibold transition-all active:scale-[0.98] mb-8"
        >
          <Plus className="w-6 h-6 text-[#E67E22]" />
          <span>Manual Entry</span>
        </button>

        {/* Recent Activity */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            <button onClick={() => navigate('/contractor/products')} className="text-sm text-[#E67E22] font-medium">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/contractor/product/${item.id}`)}
                className="activity-card bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm flex items-center gap-3 active:scale-[0.98] transition-transform cursor-pointer hover:shadow-md"
              >
                <div className="w-14 h-14 bg-[#F8F9FA] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-[#6B7280]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate mb-1">{item.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <span className="px-2 py-0.5 bg-[#F8F9FA] rounded">{item.category}</span>
                    <span>•</span>
                    <span>{item.quantity}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'confirmed' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'}`}>
                    {item.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </span>
                  <span className="text-xs text-[#6B7280]">{item.time}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6B7280] flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className="bg-white border border-[#E5E7EB] rounded-xl p-5 text-left hover:border-[#E67E22] shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <action.icon className="w-8 h-8 mb-3" style={{ color: action.color }} />
                <h4 className="font-semibold text-gray-900 text-base mb-1">{action.label}</h4>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ContractorLayout>
  );
};

export default ContractorDashboard;

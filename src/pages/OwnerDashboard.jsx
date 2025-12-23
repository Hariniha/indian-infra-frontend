import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FolderKanban, 
  Package, 
  Shield, 
  Activity,
  Plus,
  Upload,
  Users,
  FileText,
  TrendingUp,
  Clock
} from 'lucide-react';
import gsap from 'gsap';
import DashboardLayout from '../components/DashboardLayout';
import { useStore } from '../store/useStore';

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const walletAddress = useStore((state) => state.walletAddress);
  const kpiRef = useRef(null);
  const actionsRef = useRef(null);
  const activityRef = useRef(null);
  const [animatedValues, setAnimatedValues] = useState({
    projects: 0,
    passports: 0,
    compliance: 0,
    blockchain: 0
  });

  // KPI data
  const kpis = [
    { 
      key: 'projects',
      label: 'Active Projects', 
      value: 12, 
      icon: FolderKanban, 
      color: '#E67E22',
      change: '+3 this month'
    },
    { 
      key: 'passports',
      label: 'Digital Passports', 
      value: 248, 
      icon: Package, 
      color: '#10B981',
      change: '+45 this week'
    },
    { 
      key: 'compliance',
      label: 'Compliance Rate', 
      value: 98, 
      icon: Shield, 
      color: '#3B82F6',
      change: '+2% improvement',
      suffix: '%'
    },
    { 
      key: 'blockchain',
      label: 'Blockchain Activity', 
      value: 1247, 
      icon: Activity, 
      color: '#8B5CF6',
      change: '156 today'
    }
  ];

  // Quick actions
  const quickActions = [
    {
      icon: Plus,
      label: 'Create New Project',
      description: 'Start a new construction project',
      color: '#E67E22',
      action: () => navigate('/owner/projects/create')
    },
    {
      icon: Upload,
      label: 'Upload Documents',
      description: 'Add compliance documents',
      color: '#10B981',
      action: () => navigate('/owner/documents')
    },
    {
      icon: Users,
      label: 'Invite Team',
      description: 'Add contractors and suppliers',
      color: '#3B82F6',
      action: () => navigate('/owner/team')
    },
    {
      icon: FileText,
      label: 'View Reports',
      description: 'Access analytics and insights',
      color: '#8B5CF6',
      action: () => navigate('/owner/compliance')
    },
    {
      icon: Package,
      label: 'Asset Registry',
      description: 'Manage digital passports',
      color: '#F59E0B',
      action: () => navigate('/owner/assets')
    },
    {
      icon: TrendingUp,
      label: 'Analytics',
      description: 'View project performance',
      color: '#EC4899',
      action: () => navigate('/owner/analytics')
    }
  ];

  // Recent activity
  const recentActivity = [
    {
      type: 'project',
      title: 'New project "Skyline Tower" created',
      time: '2 hours ago',
      icon: FolderKanban,
      color: '#E67E22'
    },
    {
      type: 'passport',
      title: '15 digital passports issued for Phase 2',
      time: '5 hours ago',
      icon: Package,
      color: '#10B981'
    },
    {
      type: 'compliance',
      title: 'Safety inspection completed',
      time: '1 day ago',
      icon: Shield,
      color: '#3B82F6'
    },
    {
      type: 'team',
      title: 'New contractor "BuildTech Solutions" onboarded',
      time: '2 days ago',
      icon: Users,
      color: '#8B5CF6'
    },
    {
      type: 'document',
      title: 'Fire safety certificate uploaded',
      time: '3 days ago',
      icon: FileText,
      color: '#F59E0B'
    }
  ];

  // Animate KPI counters
  useEffect(() => {
    kpis.forEach(kpi => {
      gsap.to({ value: 0 }, {
        value: kpi.value,
        duration: 2,
        ease: 'power2.out',
        onUpdate: function() {
          setAnimatedValues(prev => ({
            ...prev,
            [kpi.key]: Math.floor(this.targets()[0].value)
          }));
        }
      });
    });

    // Entrance animations
    if (kpiRef.current && actionsRef.current && activityRef.current) {
      gsap.fromTo(
        kpiRef.current.children,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );

      gsap.fromTo(
        actionsRef.current.children,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          stagger: 0.08,
          delay: 0.3,
          ease: 'power3.out'
        }
      );

      gsap.fromTo(
        activityRef.current.children,
        { x: -20, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.5,
          stagger: 0.1,
          delay: 0.6,
          ease: 'power3.out'
        }
      );
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1F2E] mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your project overview.</p>
        </div>

        {/* KPI Cards */}
        <div ref={kpiRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div 
                key={kpi.key}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${kpi.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: kpi.color }} />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm mb-2">{kpi.label}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="text-3xl font-bold text-[#1A1F2E]">
                    {animatedValues[kpi.key]}{kpi.suffix || ''}
                  </p>
                </div>
                <p className="text-sm text-[#10B981] font-medium">{kpi.change}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[#1A1F2E] mb-4">Quick Actions</h2>
            <div ref={actionsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="p-3 rounded-lg group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${action.color}15` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: action.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#1A1F2E] mb-1 group-hover:text-[#E67E22] transition-colors">
                          {action.label}
                        </h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold text-[#1A1F2E] mb-4">Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div ref={activityRef} className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div 
                        className="p-2 rounded-lg flex-shrink-0"
                        style={{ backgroundColor: `${activity.color}15` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: activity.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1A1F2E] mb-1">{activity.title}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <button className="w-full mt-4 pt-4 border-t border-gray-100 text-sm font-medium text-[#E67E22] hover:text-[#D35400] transition-colors">
                View All Activity →
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OwnerDashboard;

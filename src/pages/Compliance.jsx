import { useState } from 'react';
import { 
  FileCheck, 
  Search, 
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Download,
  Upload,
  Calendar,
  Eye
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Compliance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock compliance data
  const complianceItems = [
    {
      id: 1,
      name: 'Building Permit',
      category: 'Legal',
      project: 'Skyline Tower',
      status: 'completed',
      dueDate: '2024-01-10',
      completedDate: '2024-01-08',
      documents: 3,
      priority: 'high'
    },
    {
      id: 2,
      name: 'Environmental Impact Assessment',
      category: 'Environmental',
      project: 'Tech Park Phase 2',
      status: 'completed',
      dueDate: '2024-02-01',
      completedDate: '2024-01-25',
      documents: 5,
      priority: 'high'
    },
    {
      id: 3,
      name: 'Fire Safety Approval',
      category: 'Safety',
      project: 'Skyline Tower',
      status: 'in-progress',
      dueDate: '2024-06-15',
      completedDate: null,
      documents: 2,
      priority: 'high'
    },
    {
      id: 4,
      name: 'Structural Safety Certificate',
      category: 'Safety',
      project: 'Riverside Apartments',
      status: 'in-progress',
      dueDate: '2024-07-01',
      completedDate: null,
      documents: 4,
      priority: 'medium'
    },
    {
      id: 5,
      name: 'Electrical Safety Clearance',
      category: 'Safety',
      project: 'Tech Park Phase 2',
      status: 'pending',
      dueDate: '2024-08-10',
      completedDate: null,
      documents: 0,
      priority: 'medium'
    },
    {
      id: 6,
      name: 'Plumbing System Approval',
      category: 'Infrastructure',
      project: 'Skyline Tower',
      status: 'pending',
      dueDate: '2024-09-01',
      completedDate: null,
      documents: 1,
      priority: 'low'
    },
    {
      id: 7,
      name: 'Occupancy Certificate',
      category: 'Legal',
      project: 'Riverside Apartments',
      status: 'pending',
      dueDate: '2024-12-15',
      completedDate: null,
      documents: 0,
      priority: 'high'
    },
    {
      id: 8,
      name: 'Labour Welfare Compliance',
      category: 'Labour',
      project: 'Tech Park Phase 2',
      status: 'overdue',
      dueDate: '2024-05-20',
      completedDate: null,
      documents: 2,
      priority: 'high'
    }
  ];

  const categories = ['all', 'Legal', 'Safety', 'Environmental', 'Infrastructure', 'Labour'];
  const statuses = ['all', 'completed', 'in-progress', 'pending', 'overdue'];

  const statusConfig = {
    completed: { 
      label: 'Completed', 
      color: 'bg-green-100 text-green-800 border-green-200', 
      icon: CheckCircle2,
      iconColor: 'text-green-600'
    },
    'in-progress': { 
      label: 'In Progress', 
      color: 'bg-blue-100 text-blue-800 border-blue-200', 
      icon: Clock,
      iconColor: 'text-blue-600'
    },
    pending: { 
      label: 'Pending', 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
      icon: AlertCircle,
      iconColor: 'text-yellow-600'
    },
    overdue: { 
      label: 'Overdue', 
      color: 'bg-red-100 text-red-800 border-red-200', 
      icon: XCircle,
      iconColor: 'text-red-600'
    }
  };

  const priorityColors = {
    high: 'text-red-600',
    medium: 'text-yellow-600',
    low: 'text-green-600'
  };

  const filteredItems = complianceItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: complianceItems.length,
    completed: complianceItems.filter(i => i.status === 'completed').length,
    inProgress: complianceItems.filter(i => i.status === 'in-progress').length,
    overdue: complianceItems.filter(i => i.status === 'overdue').length,
    complianceRate: Math.round((complianceItems.filter(i => i.status === 'completed').length / complianceItems.length) * 100)
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1F2E] mb-2">Compliance Management</h1>
            <p className="text-gray-600">Track and manage all compliance requirements</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5" />
              <span>Export Report</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#E67E22] hover:bg-[#D35400] text-white rounded-lg font-medium transition-colors shadow-lg shadow-[#E67E22]/20">
              <Plus className="w-5 h-5" />
              <span>Add Requirement</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileCheck className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Total</span>
            </div>
            <p className="text-3xl font-bold text-[#1A1F2E]">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Completed</span>
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">In Progress</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm text-gray-600">Overdue</span>
            </div>
            <p className="text-3xl font-bold text-red-600">{stats.overdue}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileCheck className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">Rate</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">{stats.complianceRate}%</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by requirement or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : statusConfig[status]?.label || status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Compliance Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const StatusIcon = statusConfig[item.status].icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${statusConfig[item.status].color.replace('text-', 'bg-').replace('800', '100')}`}>
                        <StatusIcon className={`w-6 h-6 ${statusConfig[item.status].iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-[#1A1F2E] mb-1">{item.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                                {item.category}
                              </span>
                              <span>• {item.project}</span>
                              <span className={`font-semibold ${priorityColors[item.priority]}`}>
                                • {item.priority.toUpperCase()} Priority
                              </span>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusConfig[item.status].color}`}>
                            {statusConfig[item.status].label}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Due Date</p>
                              <p className="text-sm font-medium text-[#1A1F2E]">{item.dueDate}</p>
                            </div>
                          </div>
                          {item.completedDate && (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <div>
                                <p className="text-xs text-gray-500">Completed</p>
                                <p className="text-sm font-medium text-green-600">{item.completedDate}</p>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Upload className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Documents</p>
                              <p className="text-sm font-medium text-[#1A1F2E]">{item.documents} uploaded</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#E67E22]/10 text-[#E67E22] rounded-lg hover:bg-[#E67E22]/20 transition-colors text-sm font-medium">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                    <Upload className="w-4 h-4" />
                    Upload Document
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileCheck className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1F2E] mb-2">No compliance items found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setSelectedCategory('all');
              }}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Compliance;

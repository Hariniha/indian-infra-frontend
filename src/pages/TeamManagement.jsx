import { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Mail,
  Phone,
  Building2,
  MoreVertical,
  UserCheck,
  UserX,
  Shield,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';

const TeamManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    phone: ''
  });

  // Mock team data
  const teamMembers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@buildtech.com',
      phone: '+91 98765 43210',
      role: 'Project Manager',
      company: 'BuildTech Solutions',
      projects: ['Skyline Tower', 'Tech Park Phase 2'],
      status: 'active',
      joinDate: '2024-01-15',
      avatar: 'RK'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@buildtech.com',
      phone: '+91 98765 43211',
      role: 'Site Engineer',
      company: 'BuildTech Solutions',
      projects: ['Skyline Tower'],
      status: 'active',
      joinDate: '2024-02-01',
      avatar: 'PS'
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit@patelcon.com',
      phone: '+91 98765 43212',
      role: 'Contractor',
      company: 'Patel Construction',
      projects: ['Skyline Tower', 'Riverside Apartments'],
      status: 'active',
      joinDate: '2024-01-20',
      avatar: 'AP'
    },
    {
      id: 4,
      name: 'Neha Singh',
      email: 'neha@safetyfirst.com',
      phone: '+91 98765 43213',
      role: 'Safety Inspector',
      company: 'SafetyFirst Consultants',
      projects: ['Tech Park Phase 2', 'Skyline Tower'],
      status: 'active',
      joinDate: '2024-02-15',
      avatar: 'NS'
    },
    {
      id: 5,
      name: 'Vikram Reddy',
      email: 'vikram@suppliers.com',
      phone: '+91 98765 43214',
      role: 'Supplier',
      company: 'Premium Suppliers Co',
      projects: ['Riverside Apartments'],
      status: 'active',
      joinDate: '2024-03-01',
      avatar: 'VR'
    },
    {
      id: 6,
      name: 'Anita Desai',
      email: 'anita@installer.com',
      phone: '+91 98765 43215',
      role: 'Installer',
      company: 'Expert Installers Ltd',
      projects: ['Tech Park Phase 2'],
      status: 'pending',
      joinDate: '2024-04-10',
      avatar: 'AD'
    }
  ];

  const roles = ['all', 'Project Manager', 'Site Engineer', 'Contractor', 'Safety Inspector', 'Supplier', 'Installer'];

  const roleColors = {
    'Project Manager': 'bg-purple-100 text-purple-800',
    'Site Engineer': 'bg-blue-100 text-blue-800',
    'Contractor': 'bg-orange-100 text-orange-800',
    'Safety Inspector': 'bg-red-100 text-red-800',
    'Supplier': 'bg-green-100 text-green-800',
    'Installer': 'bg-yellow-100 text-yellow-800'
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleInvite = (e) => {
    e.preventDefault();
    console.log('Inviting:', inviteForm);
    setShowInviteModal(false);
    setInviteForm({ name: '', email: '', role: '', company: '', phone: '' });
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1F2E] mb-2">Team Management</h1>
            <p className="text-gray-600">Manage your project team members and collaborators</p>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#E67E22] hover:bg-[#D35400] text-white rounded-lg font-medium transition-colors shadow-lg shadow-[#E67E22]/20"
          >
            <Plus className="w-5 h-5" />
            <span>Invite Member</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Total Members</span>
            </div>
            <p className="text-3xl font-bold text-[#1A1F2E]">{teamMembers.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Active</span>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {teamMembers.filter(m => m.status === 'active').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <UserX className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-600">Pending</span>
            </div>
            <p className="text-3xl font-bold text-yellow-600">
              {teamMembers.filter(m => m.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">Companies</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              {new Set(teamMembers.map(m => m.company)).size}
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
            >
              {roles.map(role => (
                <option key={role} value={role}>
                  {role === 'all' ? 'All Roles' : role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6">
              {/* Member Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#E67E22] to-[#D35400] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{member.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1F2E]">{member.name}</h3>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {member.status}
                    </span>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Role Badge */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${roleColors[member.role]}`}>
                  {member.role}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{member.company}</span>
                </div>
              </div>

              {/* Projects */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Active Projects ({member.projects.length})</p>
                <div className="flex flex-wrap gap-1">
                  {member.projects.map((project, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                      {project}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                <button className="flex-1 px-4 py-2 bg-[#E67E22]/10 text-[#E67E22] rounded-lg hover:bg-[#E67E22]/20 transition-colors text-sm font-medium">
                  View Profile
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1F2E] mb-2">No team members found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterRole('all');
              }}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Invite Modal */}
        <AnimatePresence>
          {showInviteModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setShowInviteModal(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#1A1F2E]">Invite Team Member</h2>
                    <button
                      onClick={() => setShowInviteModal(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <form onSubmit={handleInvite} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={inviteForm.name}
                        onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={inviteForm.email}
                        onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                      <select
                        required
                        value={inviteForm.role}
                        onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      >
                        <option value="">Select Role</option>
                        <option value="contractor">Contractor</option>
                        <option value="supplier">Supplier</option>
                        <option value="installer">Installer</option>
                        <option value="inspector">Inspector</option>
                        <option value="engineer">Site Engineer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                      <input
                        type="text"
                        required
                        value={inviteForm.company}
                        onChange={(e) => setInviteForm({ ...inviteForm, company: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                        placeholder="Company Name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={inviteForm.phone}
                        onChange={(e) => setInviteForm({ ...inviteForm, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowInviteModal(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400] transition-colors"
                      >
                        Send Invite
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default TeamManagement;

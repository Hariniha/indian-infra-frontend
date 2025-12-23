import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  Package,
  FileCheck,
  FileText,
  Clock,
  Settings,
  Download,
  Share2,
  MoreVertical,
  CheckCircle2,
  Circle,
  QrCode
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import DashboardLayout from '../components/DashboardLayout';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock project data
  const project = {
    id: id,
    name: 'Skyline Tower',
    location: 'Mumbai, Maharashtra',
    address: 'Plot 45, Bandra Kurla Complex, Mumbai 400051',
    status: 'In Progress',
    progress: 65,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
    startDate: '2024-01-15',
    estimatedCompletion: 'Jun 2025',
    budget: '₹12.5 Cr',
    spent: '₹8.1 Cr',
    projectType: 'Residential',
    description: 'A luxury residential tower with 25 floors, featuring modern amenities and sustainable design principles.',
    contractAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    txHash: '0x8f4c5e2a9d3b1f7c6e8a4d2b9f7e5c3a1d8b6f4e2a9c7b5d3f1e9a7c5b3d1f',
    team: [
      { id: 1, name: 'Rajesh Kumar', role: 'Project Manager', company: 'BuildTech Solutions', email: 'rajesh@buildtech.com', avatar: 'RK' },
      { id: 2, name: 'Priya Sharma', role: 'Site Engineer', company: 'BuildTech Solutions', email: 'priya@buildtech.com', avatar: 'PS' },
      { id: 3, name: 'Amit Patel', role: 'Contractor', company: 'Patel Construction', email: 'amit@patelcon.com', avatar: 'AP' },
      { id: 4, name: 'Neha Singh', role: 'Safety Inspector', company: 'SafetyFirst Consultants', email: 'neha@safetyfirst.com', avatar: 'NS' }
    ],
    assets: [
      { id: 1, name: 'Structural Steel Beams', quantity: 120, status: 'Installed', passportId: 'DPP-001', floor: 15 },
      { id: 2, name: 'HVAC System', quantity: 25, status: 'In Transit', passportId: 'DPP-002', floor: 10 },
      { id: 3, name: 'Fire Safety Equipment', quantity: 45, status: 'Installed', passportId: 'DPP-003', floor: 'All' }
    ],
    compliance: [
      { id: 1, name: 'Building Permit', status: 'completed', date: '2024-01-10' },
      { id: 2, name: 'Environmental Clearance', status: 'completed', date: '2024-01-08' },
      { id: 3, name: 'Fire Safety Approval', status: 'completed', date: '2024-02-15' },
      { id: 4, name: 'Structural Approval', status: 'in-progress', date: null },
      { id: 5, name: 'Electrical Approval', status: 'pending', date: null }
    ],
    documents: [
      { id: 1, name: 'Building Plan.pdf', size: '2.4 MB', uploadedBy: 'Rajesh Kumar', date: '2024-01-15' },
      { id: 2, name: 'Safety Checklist.pdf', size: '856 KB', uploadedBy: 'Neha Singh', date: '2024-02-20' },
      { id: 3, name: 'Material Specs.xlsx', size: '1.2 MB', uploadedBy: 'Priya Sharma', date: '2024-03-05' }
    ],
    timeline: [
      { id: 1, title: 'Project Deployed', description: 'Smart contract deployed on Ethereum', date: '2024-01-15', type: 'deployment' },
      { id: 2, title: 'Foundation Work Started', description: 'Excavation and foundation laying completed', date: '2024-02-01', type: 'milestone' },
      { id: 3, title: 'Floor 5 Completed', description: 'Structural work for floor 5 finished', date: '2024-03-15', type: 'milestone' },
      { id: 4, title: 'Safety Inspection', description: 'Quarterly safety inspection conducted', date: '2024-04-10', type: 'inspection' }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'assets', label: 'Assets', icon: Package },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'compliance', label: 'Compliance', icon: FileCheck },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const gettingStartedSteps = [
    { id: 1, title: 'Upload Building Plans', completed: true },
    { id: 2, title: 'Add Team Members', completed: true },
    { id: 3, title: 'Register First Asset', completed: false },
    { id: 4, title: 'Complete Compliance Checklist', completed: false }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/owner/projects')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#E67E22] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Projects</span>
        </button>

        {/* Project Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="h-48 overflow-hidden">
            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-[#1A1F2E] mb-2">{project.name}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{project.startDate} - {project.estimatedCompletion}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Project Progress</span>
                <span className="font-semibold text-[#1A1F2E]">{project.progress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#E67E22] to-[#D35400] rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-sm text-gray-600 mb-1">Budget</p>
                <p className="text-lg font-bold text-[#1A1F2E]">{project.budget}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Spent</p>
                <p className="text-lg font-bold text-[#E67E22]">{project.spent}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Team Size</p>
                <p className="text-lg font-bold text-[#1A1F2E]">{project.team.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Assets</p>
                <p className="text-lg font-bold text-[#1A1F2E]">{project.assets.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap
                      ${activeTab === tab.id
                        ? 'text-[#E67E22] border-b-2 border-[#E67E22]'
                        : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Project Details */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A1F2E] mb-4">Project Details</h3>
                      <p className="text-gray-700 leading-relaxed">{project.description}</p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Project Type</p>
                          <p className="font-medium text-[#1A1F2E] capitalize">{project.projectType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {project.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Getting Started */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-[#1A1F2E] mb-4">Getting Started</h3>
                      <div className="space-y-3">
                        {gettingStartedSteps.map((step) => (
                          <div key={step.id} className="flex items-center gap-3">
                            {step.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-300" />
                            )}
                            <span className={step.completed ? 'text-gray-500 line-through' : 'text-gray-700'}>
                              {step.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* QR Code */}
                    <div className="border border-gray-200 rounded-lg p-6 text-center">
                      <h3 className="text-lg font-semibold text-[#1A1F2E] mb-4">Project QR Code</h3>
                      <div className="bg-white p-4 rounded-lg inline-block">
                        <QRCodeSVG value={`https://indianbuild.io/project/${project.id}`} size={160} />
                      </div>
                      <p className="text-sm text-gray-600 mt-4">Scan to view project details</p>
                      <button className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">Download QR</span>
                      </button>
                    </div>

                    {/* Blockchain Info */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-[#1A1F2E] mb-4">Blockchain Info</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Contract Address</p>
                          <p className="font-mono text-xs text-[#1A1F2E] break-all">{project.contractAddress}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Network</p>
                          <p className="font-medium text-[#1A1F2E]">Ethereum Mainnet</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Deployment Date</p>
                          <p className="font-medium text-[#1A1F2E]">{project.startDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Assets Tab */}
            {activeTab === 'assets' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#1A1F2E]">Registered Assets</h3>
                  <button className="px-4 py-2 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400] transition-colors">
                    Add Asset
                  </button>
                </div>
                <div className="space-y-3">
                  {project.assets.map((asset) => (
                    <div key={asset.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#1A1F2E] mb-1">{asset.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Qty: {asset.quantity}</span>
                            <span>Floor: {asset.floor}</span>
                            <span>ID: {asset.passportId}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          asset.status === 'Installed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {asset.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#1A1F2E]">Team Members</h3>
                  <button className="px-4 py-2 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400] transition-colors">
                    Invite Member
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.team.map((member) => (
                    <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#E67E22] to-[#D35400] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">{member.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#1A1F2E]">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.role}</p>
                          <p className="text-sm text-gray-500">{member.company}</p>
                          <p className="text-sm text-blue-600 mt-1">{member.email}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compliance Tab */}
            {activeTab === 'compliance' && (
              <div>
                <h3 className="text-lg font-semibold text-[#1A1F2E] mb-6">Compliance Requirements</h3>
                <div className="space-y-3">
                  {project.compliance.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {item.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                          {item.status === 'in-progress' && <Clock className="w-5 h-5 text-yellow-600" />}
                          {item.status === 'pending' && <Circle className="w-5 h-5 text-gray-300" />}
                          <div>
                            <h4 className="font-semibold text-[#1A1F2E]">{item.name}</h4>
                            {item.date && <p className="text-sm text-gray-500">Completed: {item.date}</p>}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          item.status === 'completed' ? 'bg-green-100 text-green-800' :
                          item.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#1A1F2E]">Project Documents</h3>
                  <button className="px-4 py-2 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400] transition-colors">
                    Upload Document
                  </button>
                </div>
                <div className="space-y-3">
                  {project.documents.map((doc) => (
                    <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-10 h-10 text-blue-500" />
                          <div>
                            <h4 className="font-semibold text-[#1A1F2E]">{doc.name}</h4>
                            <p className="text-sm text-gray-500">{doc.size} • Uploaded by {doc.uploadedBy} on {doc.date}</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                          <Download className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div>
                <h3 className="text-lg font-semibold text-[#1A1F2E] mb-6">Project Timeline</h3>
                <div className="space-y-4">
                  {project.timeline.map((event, index) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          event.type === 'deployment' ? 'bg-purple-100' :
                          event.type === 'milestone' ? 'bg-blue-100' :
                          'bg-green-100'
                        }`}>
                          <Clock className={`w-5 h-5 ${
                            event.type === 'deployment' ? 'text-purple-600' :
                            event.type === 'milestone' ? 'text-blue-600' :
                            'text-green-600'
                          }`} />
                        </div>
                        {index < project.timeline.length - 1 && (
                          <div className="w-0.5 h-16 bg-gray-200 my-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <h4 className="font-semibold text-[#1A1F2E]">{event.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h3 className="text-lg font-semibold text-[#1A1F2E] mb-6">Project Settings</h3>
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-[#1A1F2E] mb-4">General Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                        <input type="text" value={project.name} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea rows={3} value={project.description} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                      </div>
                    </div>
                  </div>

                  <div className="border border-red-200 rounded-lg p-6">
                    <h4 className="font-semibold text-red-600 mb-2">Danger Zone</h4>
                    <p className="text-sm text-gray-600 mb-4">Once you archive this project, it will be hidden from your dashboard.</p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Archive Project
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetail;

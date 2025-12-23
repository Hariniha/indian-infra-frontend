import { useState } from 'react';
import { 
  FileText, 
  Search, 
  Plus,
  Download,
  Upload,
  Eye,
  Trash2,
  Filter,
  Calendar,
  User,
  FolderOpen,
  Ruler,
  BarChart3,
  Award,
  TrendingUp,
  Pen
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterProject, setFilterProject] = useState('all');

  // Mock documents data
  const documents = [
    {
      id: 1,
      name: 'Building Plan - Floor 1-10.pdf',
      type: 'Blueprint',
      project: 'Skyline Tower',
      size: '4.2 MB',
      uploadedBy: 'Rajesh Kumar',
      uploadDate: '2024-01-15',
      category: 'Technical'
    },
    {
      id: 2,
      name: 'Safety Inspection Report Q1.pdf',
      type: 'Report',
      project: 'Skyline Tower',
      size: '1.8 MB',
      uploadedBy: 'Neha Singh',
      uploadDate: '2024-02-20',
      category: 'Safety'
    },
    {
      id: 3,
      name: 'Material Specifications.xlsx',
      type: 'Spreadsheet',
      project: 'Tech Park Phase 2',
      size: '856 KB',
      uploadedBy: 'Priya Sharma',
      uploadDate: '2024-03-05',
      category: 'Procurement'
    },
    {
      id: 4,
      name: 'Environmental Clearance Certificate.pdf',
      type: 'Certificate',
      project: 'Tech Park Phase 2',
      size: '2.1 MB',
      uploadedBy: 'Amit Patel',
      uploadDate: '2024-01-08',
      category: 'Legal'
    },
    {
      id: 5,
      name: 'Structural Analysis Report.pdf',
      type: 'Report',
      project: 'Riverside Apartments',
      size: '5.6 MB',
      uploadedBy: 'Vikram Reddy',
      uploadDate: '2024-02-12',
      category: 'Technical'
    },
    {
      id: 6,
      name: 'Fire Safety System Layout.dwg',
      type: 'CAD Drawing',
      project: 'Skyline Tower',
      size: '3.4 MB',
      uploadedBy: 'Priya Sharma',
      uploadDate: '2024-03-18',
      category: 'Technical'
    },
    {
      id: 7,
      name: 'Labour Compliance Records Q1.xlsx',
      type: 'Spreadsheet',
      project: 'Tech Park Phase 2',
      size: '645 KB',
      uploadedBy: 'Rajesh Kumar',
      uploadDate: '2024-04-01',
      category: 'Legal'
    },
    {
      id: 8,
      name: 'Project Timeline Gantt Chart.pdf',
      type: 'Document',
      project: 'Riverside Apartments',
      size: '1.2 MB',
      uploadedBy: 'Amit Patel',
      uploadDate: '2024-01-20',
      category: 'Planning'
    }
  ];

  const documentTypes = ['all', 'Blueprint', 'Report', 'Certificate', 'Spreadsheet', 'CAD Drawing', 'Document'];
  const projects = ['all', 'Skyline Tower', 'Tech Park Phase 2', 'Riverside Apartments'];
  const categories = ['Technical', 'Safety', 'Legal', 'Procurement', 'Planning'];

  const typeIcons = {
    'Blueprint': Ruler,
    'Report': BarChart3,
    'Certificate': Award,
    'Spreadsheet': TrendingUp,
    'CAD Drawing': Pen,
    'Document': FileText
  };

  const categoryColors = {
    'Technical': 'bg-blue-100 text-blue-800',
    'Safety': 'bg-red-100 text-red-800',
    'Legal': 'bg-purple-100 text-purple-800',
    'Procurement': 'bg-green-100 text-green-800',
    'Planning': 'bg-yellow-100 text-yellow-800'
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesProject = filterProject === 'all' || doc.project === filterProject;
    return matchesSearch && matchesType && matchesProject;
  });

  const stats = {
    total: documents.length,
    technical: documents.filter(d => d.category === 'Technical').length,
    legal: documents.filter(d => d.category === 'Legal').length,
    safety: documents.filter(d => d.category === 'Safety').length,
    totalSize: documents.reduce((acc, doc) => acc + parseFloat(doc.size), 0).toFixed(1)
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1F2E] mb-2">Document Management</h1>
            <p className="text-gray-600">Store and manage all project documents securely</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5" />
              <span>Export All</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#E67E22] hover:bg-[#D35400] text-white rounded-lg font-medium transition-colors shadow-lg shadow-[#E67E22]/20">
              <Plus className="w-5 h-5" />
              <span>Upload Document</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Total Documents</span>
            </div>
            <p className="text-3xl font-bold text-[#1A1F2E]">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <FolderOpen className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Technical Docs</span>
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.technical}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">Legal Docs</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">{stats.legal}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Upload className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm text-gray-600">Total Storage</span>
            </div>
            <p className="text-3xl font-bold text-orange-600">{stats.totalSize} MB</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by document name or uploader..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
            >
              {documentTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
            >
              {projects.map(project => (
                <option key={project} value={project}>
                  {project === 'all' ? 'All Projects' : project}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Document</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Project</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Size</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Uploaded By</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {(() => {
                          const Icon = typeIcons[doc.type];
                          return <Icon className="w-6 h-6 text-gray-600" />;
                        })()}
                        <div>
                          <p className="font-medium text-[#1A1F2E]">{doc.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{doc.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{doc.project}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[doc.category]}`}>
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{doc.size}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{doc.uploadedBy}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{doc.uploadDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="View">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Download">
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1F2E] mb-2">No documents found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                setFilterProject('all');
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

export default Documents;

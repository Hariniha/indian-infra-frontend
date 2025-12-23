import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  MapPin, 
  Calendar,
  Users,
  TrendingUp,
  Package,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import gsap from 'gsap';
import DashboardLayout from '../components/DashboardLayout';

const MyProjects = () => {
  const navigate = useNavigate();
  const cardsRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock project data
  const projects = [
    {
      id: 1,
      name: 'Skyline Tower',
      location: 'Mumbai, Maharashtra',
      status: 'In Progress',
      progress: 65,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      startDate: '2024-01-15',
      team: 45,
      passports: 128,
      budget: '₹12.5 Cr',
      completion: 'Jun 2025'
    },
    {
      id: 2,
      name: 'Green Valley Residency',
      location: 'Pune, Maharashtra',
      status: 'Planning',
      progress: 15,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
      startDate: '2024-03-01',
      team: 12,
      passports: 0,
      budget: '₹8.2 Cr',
      completion: 'Dec 2025'
    },
    {
      id: 3,
      name: 'Tech Park Phase 2',
      location: 'Bangalore, Karnataka',
      status: 'In Progress',
      progress: 82,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      startDate: '2023-08-10',
      team: 67,
      passports: 245,
      budget: '₹25.8 Cr',
      completion: 'Mar 2025'
    },
    {
      id: 4,
      name: 'Riverside Apartments',
      location: 'Hyderabad, Telangana',
      status: 'In Progress',
      progress: 48,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
      startDate: '2023-11-20',
      team: 38,
      passports: 96,
      budget: '₹15.3 Cr',
      completion: 'Aug 2025'
    },
    {
      id: 5,
      name: 'Metro Mall Extension',
      location: 'Delhi NCR',
      status: 'Completed',
      progress: 100,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      startDate: '2023-02-15',
      team: 89,
      passports: 512,
      budget: '₹42.6 Cr',
      completion: 'Jan 2025'
    },
    {
      id: 6,
      name: 'Smart City Infrastructure',
      location: 'Ahmedabad, Gujarat',
      status: 'In Progress',
      progress: 35,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
      startDate: '2024-01-05',
      team: 156,
      passports: 187,
      budget: '₹78.9 Cr',
      completion: 'Dec 2026'
    }
  ];

  const statusColors = {
    'In Progress': { bg: '#3B82F6', light: '#3B82F615' },
    'Planning': { bg: '#F59E0B', light: '#F59E0B15' },
    'Completed': { bg: '#10B981', light: '#10B98115' },
    'On Hold': { bg: '#EF4444', light: '#EF444415' }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );
    }
  }, [filteredProjects]);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1F2E] mb-2">My Projects</h1>
            <p className="text-gray-600">Manage and monitor your construction projects</p>
          </div>
          <button
            onClick={() => navigate('/owner/projects/create')}
            className="flex items-center gap-2 px-6 py-3 bg-[#E67E22] hover:bg-[#D35400] text-white rounded-lg font-medium transition-colors shadow-lg shadow-[#E67E22]/20"
          >
            <Plus className="w-5 h-5" />
            <span>New Project</span>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">
                  {filterStatus === 'all' ? 'All Status' : filterStatus}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {showFilters && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                  {['all', 'In Progress', 'Planning', 'Completed', 'On Hold'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setFilterStatus(status);
                        setShowFilters(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700"
                    >
                      {status === 'all' ? 'All Status' : status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Projects</p>
              <p className="text-2xl font-bold text-[#1A1F2E]">{projects.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">In Progress</p>
              <p className="text-2xl font-bold text-[#3B82F6]">
                {projects.filter(p => p.status === 'In Progress').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-2xl font-bold text-[#10B981]">
                {projects.filter(p => p.status === 'Completed').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Budget</p>
              <p className="text-2xl font-bold text-[#E67E22]">₹183Cr</p>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/owner/projects/${project.id}`)}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: statusColors[project.status].bg }}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1A1F2E] mb-2 group-hover:text-[#E67E22] transition-colors">
                  {project.name}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{project.location}</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-[#1A1F2E]">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${project.progress}%`,
                        backgroundColor: statusColors[project.status].bg
                      }}
                    />
                  </div>
                </div>

                {/* Project Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <div className="flex items-center gap-1 text-gray-600 mb-1">
                      <Users className="w-3 h-3" />
                      <span className="text-xs">Team</span>
                    </div>
                    <p className="text-sm font-bold text-[#1A1F2E]">{project.team}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-gray-600 mb-1">
                      <Package className="w-3 h-3" />
                      <span className="text-xs">Assets</span>
                    </div>
                    <p className="text-sm font-bold text-[#1A1F2E]">{project.passports}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-gray-600 mb-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs">Budget</span>
                    </div>
                    <p className="text-sm font-bold text-[#1A1F2E]">{project.budget}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1F2E] mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
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

export default MyProjects;

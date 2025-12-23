import { useState, useRef, useEffect } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  Download,
  QrCode,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  Eye
} from 'lucide-react';
import gsap from 'gsap';
import DashboardLayout from '../components/DashboardLayout';

const AssetRegistry = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const cardsRef = useRef(null);

  // Mock asset data
  const assets = [
    {
      id: 'DPP-001',
      name: 'Structural Steel Beam ISA 400',
      category: 'Structural',
      project: 'Skyline Tower',
      location: 'Floor 15, Zone A',
      manufacturer: 'Tata Steel',
      installDate: '2024-03-15',
      status: 'installed',
      warranty: '25 years',
      certifications: ['ISO 9001', 'BIS'],
      qrCode: true
    },
    {
      id: 'DPP-002',
      name: 'HVAC System - Central AC Unit',
      category: 'MEP',
      project: 'Skyline Tower',
      location: 'Floor 10, Mechanical Room',
      manufacturer: 'Carrier',
      installDate: '2024-04-20',
      status: 'in-transit',
      warranty: '10 years',
      certifications: ['AHRI', 'Energy Star'],
      qrCode: true
    },
    {
      id: 'DPP-003',
      name: 'Fire Suppression Sprinkler System',
      category: 'Safety',
      project: 'Tech Park Phase 2',
      location: 'All Floors',
      manufacturer: 'Tyco Fire Protection',
      installDate: '2024-02-10',
      status: 'installed',
      warranty: '15 years',
      certifications: ['UL Listed', 'FM Approved'],
      qrCode: true
    },
    {
      id: 'DPP-004',
      name: 'Elevator System - Passenger',
      category: 'Vertical Transport',
      project: 'Skyline Tower',
      location: 'Core 1',
      manufacturer: 'Otis',
      installDate: '2024-05-01',
      status: 'maintenance',
      warranty: '20 years',
      certifications: ['ISO 9001', 'CE'],
      qrCode: true
    },
    {
      id: 'DPP-005',
      name: 'Solar Panel Array 500kW',
      category: 'Energy',
      project: 'Tech Park Phase 2',
      location: 'Rooftop',
      manufacturer: 'Vikram Solar',
      installDate: '2024-01-15',
      status: 'installed',
      warranty: '25 years',
      certifications: ['IEC', 'BIS'],
      qrCode: true
    },
    {
      id: 'DPP-006',
      name: 'Water Treatment Plant',
      category: 'Plumbing',
      project: 'Riverside Apartments',
      location: 'Basement Level 2',
      manufacturer: 'Aquatech',
      installDate: '2024-03-01',
      status: 'installed',
      warranty: '10 years',
      certifications: ['ISO 9001', 'NSF'],
      qrCode: true
    }
  ];

  const categories = ['all', 'Structural', 'MEP', 'Safety', 'Vertical Transport', 'Energy', 'Plumbing'];
  
  const statusConfig = {
    installed: { label: 'Installed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    'in-transit': { label: 'In Transit', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    maintenance: { label: 'Maintenance', color: 'bg-orange-100 text-orange-800', icon: AlertCircle }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || asset.status === filterStatus;
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
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
  }, [filteredAssets]);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1F2E] mb-2">Asset Registry</h1>
            <p className="text-gray-600">Digital passports for all construction assets</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#E67E22] hover:bg-[#D35400] text-white rounded-lg font-medium transition-colors shadow-lg shadow-[#E67E22]/20">
              <Plus className="w-5 h-5" />
              <span>Register Asset</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Total Assets</span>
            </div>
            <p className="text-3xl font-bold text-[#1A1F2E]">{assets.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Installed</span>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {assets.filter(a => a.status === 'installed').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-600">In Transit</span>
            </div>
            <p className="text-3xl font-bold text-yellow-600">
              {assets.filter(a => a.status === 'in-transit').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <QrCode className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">QR Codes</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              {assets.filter(a => a.qrCode).length}
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by asset name, ID, or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
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

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="installed">Installed</option>
              <option value="in-transit">In Transit</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        {/* Asset Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => {
            const StatusIcon = statusConfig[asset.status].icon;
            return (
              <div
                key={asset.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
              >
                {/* Asset Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono text-gray-500">{asset.id}</span>
                        <QrCode className="w-4 h-4 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-[#1A1F2E] group-hover:text-[#E67E22] transition-colors line-clamp-2">
                        {asset.name}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[asset.status].color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig[asset.status].label}
                    </span>
                  </div>
                </div>

                {/* Asset Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Package className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{asset.category}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{asset.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>Installed: {asset.installDate}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Manufacturer</p>
                    <p className="text-sm font-medium text-[#1A1F2E]">{asset.manufacturer}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {asset.certifications.map((cert, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#E67E22]/10 text-[#E67E22] rounded-lg hover:bg-[#E67E22]/20 transition-colors text-sm font-medium">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <QrCode className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1F2E] mb-2">No assets found</h3>
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

export default AssetRegistry;

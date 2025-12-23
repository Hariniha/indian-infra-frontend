import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Package, 
  MapPin, 
  Calendar,
  QrCode,
  Edit3,
  Trash2,
  Share2,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  X,
  Download,
  RefreshCw
} from 'lucide-react';
import ContractorLayout from '../components/ContractorLayout';
import CategoryIcon from '../components/CategoryIcon';
import gsap from 'gsap';

const MyProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const productsRef = useRef([]);

  const categories = [
    { id: 'all', label: 'All Categories', count: 234 },
    { id: 'cement', label: 'Cement', count: 45 },
    { id: 'bricks', label: 'Bricks', count: 67 },
    { id: 'steel', label: 'Steel', count: 34 },
    { id: 'electrical', label: 'Electrical', count: 28 },
    { id: 'plumbing', label: 'Plumbing', count: 22 },
    { id: 'other', label: 'Other', count: 38 }
  ];

  const statuses = [
    { id: 'all', label: 'All Status', color: '#6B7280' },
    { id: 'verified', label: 'Verified', color: '#10B981' },
    { id: 'pending', label: 'Pending', color: '#F59E0B' },
    { id: 'draft', label: 'Draft', color: '#6B7280' }
  ];

  // Mock data
  const mockProducts = [
    {
      id: 'DPP-001',
      name: 'Premium Portland Cement',
      category: 'cement',
      categoryLabel: 'Cement',
      quantity: '500',
      unit: 'bags',
      location: 'Floor 3, Wing A',
      date: '2024-12-04',
      status: 'verified',
      supplier: 'UltraTech',
      blockchainHash: '0x7b3f...9a2e'
    },
    {
      id: 'DPP-002',
      name: 'Red Clay Bricks',
      category: 'bricks',
      categoryLabel: 'Bricks',
      quantity: '10000',
      unit: 'pcs',
      location: 'Floor 2, North Block',
      date: '2024-12-03',
      status: 'verified',
      supplier: 'Jindal Brick Works',
      blockchainHash: '0x4c2a...7b1f'
    },
    {
      id: 'DPP-003',
      name: 'TMT Steel Bars 12mm',
      category: 'steel',
      categoryLabel: 'Steel',
      quantity: '2.5',
      unit: 'ton',
      location: 'Floor 5, Central',
      date: '2024-12-02',
      status: 'pending',
      supplier: 'Tata Steel',
      blockchainHash: null
    },
    {
      id: 'DPP-004',
      name: 'LED Panel Lights 40W',
      category: 'electrical',
      categoryLabel: 'Electrical',
      quantity: '150',
      unit: 'pcs',
      location: 'Floor 4, Wing B',
      date: '2024-12-01',
      status: 'verified',
      supplier: 'Philips India',
      blockchainHash: '0x9d8c...3e4f'
    },
    {
      id: 'DPP-005',
      name: 'PVC Pipes 4 inch',
      category: 'plumbing',
      categoryLabel: 'Plumbing',
      quantity: '200',
      unit: 'm',
      location: 'Floor 1, South Block',
      date: '2024-11-30',
      status: 'draft',
      supplier: 'Astral Pipes',
      blockchainHash: null
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
      
      // Animate products in
      gsap.fromTo(
        productsRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    }, 800);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const getStatusConfig = (status) => {
    switch(status) {
      case 'verified':
        return { icon: CheckCircle, color: '#10B981', bg: '#10B981/10', label: 'Verified' };
      case 'pending':
        return { icon: Clock, color: '#F59E0B', bg: '#F59E0B/10', label: 'Pending' };
      case 'draft':
        return { icon: AlertCircle, color: '#6B7280', bg: '#6B7280/10', label: 'Draft' };
      default:
        return { icon: Clock, color: '#6B7280', bg: '#6B7280/10', label: 'Unknown' };
    }
  };

  const ProductCard = ({ product, index }) => {
    const statusConfig = getStatusConfig(product.status);
    const StatusIcon = statusConfig.icon;

    return (
      <div
        ref={el => productsRef.current[index] = el}
        className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-shadow"
      >
        <Link to={`/contractor/products/${product.id}`} className="block">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              {/* Thumbnail */}
              <div className="w-14 h-14 bg-[#F8F9FA] rounded-lg flex items-center justify-center flex-shrink-0">
                <CategoryIcon category={product.category} className="w-7 h-7 text-gray-600" />
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-[#1A1F2E] text-base leading-tight">
                    {product.name}
                  </h3>
                  <ChevronRight className="w-5 h-5 text-[#6B7280] flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-sm text-[#6B7280] font-mono">{product.id}</p>
              </div>
            </div>

            {/* Category Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 bg-[#E67E22]/10 text-[#E67E22] text-xs font-medium rounded-full">
                {product.categoryLabel}
              </span>
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center gap-1`}
                    style={{ backgroundColor: statusConfig.bg, color: statusConfig.color }}>
                <StatusIcon className="w-3 h-3" />
                {statusConfig.label}
              </span>
            </div>

            {/* Details Grid */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-sm">
                <Package className="w-4 h-4 text-[#6B7280]" />
                <span className="text-[#1A1F2E] font-medium">
                  {product.quantity} {product.unit}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[#6B7280]" />
                <span className="text-[#6B7280]">{product.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-[#6B7280]" />
                <span className="text-[#6B7280]">{new Date(product.date).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Supplier */}
            <div className="flex items-center justify-between text-xs text-[#6B7280] mb-3 pb-3 border-b border-[#E5E7EB]">
              <span>Supplier</span>
              <span className="font-medium text-[#1A1F2E]">{product.supplier}</span>
            </div>

            {/* Blockchain Hash */}
            {product.blockchainHash && (
              <div className="flex items-center gap-2 px-3 py-2 bg-[#10B981]/5 rounded-lg">
                <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></div>
                <span className="text-xs font-mono text-[#10B981]">{product.blockchainHash}</span>
              </div>
            )}
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center border-t border-[#E5E7EB]">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 text-[#6B7280] hover:bg-[#F8F9FA] transition-colors">
            <QrCode className="w-4 h-4" />
            <span className="text-sm font-medium">View QR</span>
          </button>
          <div className="w-px h-10 bg-[#E5E7EB]"></div>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 text-[#6B7280] hover:bg-[#F8F9FA] transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
          <div className="w-px h-10 bg-[#E5E7EB]"></div>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 text-[#6B7280] hover:bg-[#F8F9FA] transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </button>
        </div>
      </div>
    );
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center mb-6">
        <Package className="w-12 h-12 text-[#6B7280]" />
      </div>
      <h3 className="text-xl font-semibold text-[#1A1F2E] mb-2">No Products Found</h3>
      <p className="text-[#6B7280] text-center mb-6 max-w-sm">
        {searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all'
          ? "Try adjusting your filters or search query"
          : "Start scanning QR codes to register products"}
      </p>
      <Link
        to="/contractor/scan"
        className="flex items-center gap-2 px-6 py-3 bg-[#E67E22] text-white rounded-xl hover:bg-[#D35400] transition-colors font-medium"
      >
        <QrCode className="w-5 h-5" />
        Scan QR Code
      </Link>
    </div>
  );

  return (
    <ContractorLayout>
      <div className="min-h-screen bg-[#F8F9FA]">
        {/* Header */}
        <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-[#1A1F2E]">My Products</h1>
                <p className="text-sm text-[#6B7280] mt-1">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} registered
                </p>
              </div>
              <button
                onClick={handleRefresh}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#F8F9FA] hover:bg-[#E5E7EB] transition-colors"
                disabled={refreshing}
              >
                <RefreshCw className={`w-5 h-5 text-[#1A1F2E] ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search products or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-[#1A1F2E] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#E5E7EB]"
                >
                  <X className="w-4 h-4 text-[#6B7280]" />
                </button>
              )}
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0
                    ${selectedCategory === category.id
                      ? 'bg-[#E67E22] text-white'
                      : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#E67E22]'
                    }
                  `}
                >
                  {category.label}
                  {category.id !== 'all' && (
                    <span className="ml-1.5 opacity-75">({category.count})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter Bar */}
          <div className="px-4 py-3 bg-[#F8F9FA] border-t border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#6B7280]" />
              <span className="text-sm text-[#6B7280] mr-2">Status:</span>
              {statuses.map(status => (
                <button
                  key={status.id}
                  onClick={() => setSelectedStatus(status.id)}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex-shrink-0
                    ${selectedStatus === status.id
                      ? 'text-white'
                      : 'bg-white text-[#6B7280] hover:bg-[#E5E7EB]'
                    }
                  `}
                  style={selectedStatus === status.id ? { backgroundColor: status.color } : {}}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {isLoading ? (
            // Loading Skeletons
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] p-4 animate-pulse">
                  <div className="flex gap-3 mb-3">
                    <div className="w-14 h-14 bg-[#F8F9FA] rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-[#F8F9FA] rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-[#F8F9FA] rounded w-1/3"></div>
                    </div>
                  </div>
                  <div className="h-6 bg-[#F8F9FA] rounded mb-3 w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-[#F8F9FA] rounded"></div>
                    <div className="h-4 bg-[#F8F9FA] rounded"></div>
                    <div className="h-4 bg-[#F8F9FA] rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-4 pb-20">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Floating Action Button */}
        {!isLoading && filteredProducts.length > 0 && (
          <Link
            to="/contractor/scan"
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#E67E22] to-[#D35400] text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all hover:scale-110 z-40"
          >
            <QrCode className="w-7 h-7" />
          </Link>
        )}
      </div>
    </ContractorLayout>
  );
};

export default MyProducts;

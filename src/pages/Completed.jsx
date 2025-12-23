import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  Package,
  Calendar,
  MapPin,
  Download,
  Share2,
  ExternalLink,
  Search,
  Filter,
  TrendingUp,
  Award
} from 'lucide-react';
import ContractorLayout from '../components/ContractorLayout';
import CategoryIcon from '../components/CategoryIcon';
import gsap from 'gsap';

const Completed = () => {
  const [completedProducts, setCompletedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    thisWeek: 0
  });

  // Mock data
  const mockProducts = [
    {
      id: 'DPP-001',
      name: 'Premium Portland Cement',
      category: 'cement',
      categoryLabel: 'Cement',
      quantity: '500 bags',
      location: 'Floor 3, Wing A',
      completedDate: '2024-12-04',
      blockchainHash: '0x7b3f...9a2e'
    },
    {
      id: 'DPP-002',
      name: 'Red Clay Bricks',
      category: 'bricks',
      categoryLabel: 'Bricks',
      quantity: '10000 pcs',
      location: 'Floor 2, North Block',
      completedDate: '2024-12-03',
      blockchainHash: '0x4c2a...7b1f'
    },
    {
      id: 'DPP-004',
      name: 'LED Panel Lights 40W',
      category: 'electrical',
      categoryLabel: 'Electrical',
      quantity: '150 pcs',
      location: 'Floor 4, Wing B',
      completedDate: '2024-12-01',
      blockchainHash: '0x9d8c...3e4f'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setCompletedProducts(mockProducts);
      setStats({
        total: mockProducts.length,
        thisMonth: mockProducts.length,
        thisWeek: 2
      });
      setIsLoading(false);

      // Animate cards
      gsap.from('.completed-card', {
        y: 20,
        scale: 0.95,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, 800);
  }, []);

  const filteredProducts = completedProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const CompletedCard = ({ product }) => (
    <Link
      to={`/contractor/products/${product.id}`}
      className="completed-card bg-white rounded-xl border border-[#E5E7EB] p-4 hover:shadow-lg transition-shadow block"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-14 h-14 bg-[#10B981]/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <CategoryIcon category={product.category} className="w-7 h-7 text-[#10B981]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 leading-tight">{product.name}</h3>
            <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />
          </div>
          <p className="text-sm text-gray-600 font-mono">{product.id}</p>
        </div>
      </div>

      <div className="space-y-2 mb-3 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Package className="w-4 h-4" />
          <span className="font-medium text-gray-900">{product.quantity}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{product.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date(product.completedDate).toLocaleDateString('en-IN')}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 bg-[#10B981]/5 rounded-lg border border-[#10B981]/20">
        <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></div>
        <span className="text-xs font-mono text-[#10B981] flex-1">{product.blockchainHash}</span>
        <ExternalLink className="w-3.5 h-3.5 text-[#10B981]" />
      </div>

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E5E7EB]">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
          <Download className="w-4 h-4" />
          Export
        </button>
        <div className="w-px h-8 bg-[#E5E7EB]"></div>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </Link>
  );

  return (
    <ContractorLayout>
      <div className="min-h-screen bg-[#F8F9FA]">
        {/* Header */}
        <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30">
          <div className="px-4 py-4">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Completed</h1>
              <p className="text-sm text-gray-600 mt-1">
                Successfully registered and verified products
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-[#10B981] mb-1">{stats.total}</div>
                <div className="text-xs text-gray-600 font-medium">Total</div>
              </div>
              <div className="bg-[#F8F9FA] rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.thisMonth}</div>
                <div className="text-xs text-gray-600 font-medium">This Month</div>
              </div>
              <div className="bg-[#F8F9FA] rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.thisWeek}</div>
                <div className="text-xs text-gray-600 font-medium">This Week</div>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search completed products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] p-4 animate-pulse">
                  <div className="flex gap-3 mb-3">
                    <div className="w-14 h-14 bg-[#F8F9FA] rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-[#F8F9FA] rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-[#F8F9FA] rounded w-1/3"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-[#F8F9FA] rounded"></div>
                    <div className="h-4 bg-[#F8F9FA] rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-4 pb-20">
              {filteredProducts.map(product => (
                <CompletedCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="w-20 h-20 bg-[#10B981]/10 rounded-full flex items-center justify-center mb-4">
                <Award className="w-10 h-10 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Completed Products</h3>
              <p className="text-sm text-gray-600 text-center max-w-sm mb-6">
                {searchQuery
                  ? "No products match your search"
                  : "Complete your first product registration to see it here"}
              </p>
              <Link
                to="/contractor/scan"
                className="flex items-center gap-2 px-6 py-3 bg-[#10B981] text-white rounded-xl hover:bg-[#059669] transition-colors font-medium"
              >
                <Package className="w-5 h-5" />
                Start Registration
              </Link>
            </div>
          )}
        </div>
      </div>
    </ContractorLayout>
  );
};

export default Completed;

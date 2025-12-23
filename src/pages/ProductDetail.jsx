import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Package,
  MapPin,
  Calendar,
  User,
  Phone,
  FileText,
  Hash,
  QrCode,
  Share2,
  Download,
  Edit3,
  ExternalLink,
  CheckCircle,
  Clock,
  Truck,
  Building,
  Shield,
  FileCheck,
  Image as ImageIcon,
  ChevronRight
} from 'lucide-react';
import ContractorLayout from '../components/ContractorLayout';
import CategoryIcon from '../components/CategoryIcon';
import gsap from 'gsap';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const headerRef = useRef(null);
  const tabsRef = useRef([]);

  const tabs = [
    { id: 'details', label: 'Details', icon: FileText },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'blockchain', label: 'Blockchain', icon: Shield },
    { id: 'documents', label: 'Documents', icon: FileCheck }
  ];

  // Mock product data
  const mockProduct = {
    id: 'DPP-001',
    name: 'Premium Portland Cement',
    category: 'cement',
    categoryLabel: 'Cement',
    quantity: '500',
    unit: 'bags',
    batchNumber: 'BATCH-2024-0412',
    location: 'Floor 3, Wing A, Zone North',
    floor: '3',
    zone: 'Wing A',
    specificLocation: 'Near elevator shaft',
    gpsCoordinates: { lat: 19.0760, lng: 72.8777 },
    date: '2024-12-04',
    status: 'verified',
    supplier: {
      name: 'UltraTech Cement Ltd.',
      contact: '+91 98765 43210',
      email: 'supply@ultratech.com',
      invoiceNumber: 'INV-2024-1234',
      poNumber: 'PO-2024-5678',
      deliveryDate: '2024-12-03'
    },
    registeredBy: {
      name: 'Contractor Name',
      wallet: '0x742d...3a9f',
      role: 'General Contractor',
      company: 'ABC Construction'
    },
    blockchain: {
      contractAddress: '0x742d35Cc6634C0532925a3b844Bc9e3a9f',
      transactionHash: '0x7b3f8e4a2c9d1f6b5e8c3a7d9f2e6b4a1c8e5d7f3a9b2c6e8d4f1a5b7c9e3f6',
      blockNumber: '18450567',
      timestamp: '2024-12-04T10:30:00Z',
      ipfsHash: 'QmX7b3f8e4a2c9d1f6b5e8c3a7d9f2e6b4a',
      network: 'Ethereum Mainnet',
      gasUsed: '234,567',
      confirmations: 42
    },
    timeline: [
      {
        event: 'Product Registered',
        timestamp: '2024-12-04T10:30:00Z',
        actor: 'Contractor Name',
        description: 'Initial product registration completed',
        icon: Package,
        color: '#E67E22'
      },
      {
        event: 'Blockchain Verification',
        timestamp: '2024-12-04T10:32:00Z',
        actor: 'Smart Contract',
        description: 'DPP minted on Ethereum blockchain',
        icon: Shield,
        color: '#10B981'
      },
      {
        event: 'Delivery Confirmed',
        timestamp: '2024-12-03T14:15:00Z',
        actor: 'UltraTech Cement',
        description: 'Materials delivered to site',
        icon: Truck,
        color: '#3B82F6'
      },
      {
        event: 'Order Placed',
        timestamp: '2024-11-28T09:00:00Z',
        actor: 'Owner',
        description: 'Purchase order initiated',
        icon: FileText,
        color: '#6B7280'
      }
    ],
    documents: [
      { name: 'Invoice.pdf', size: '245 KB', type: 'pdf', uploaded: '2024-12-04' },
      { name: 'Quality Certificate.pdf', size: '189 KB', type: 'pdf', uploaded: '2024-12-04' },
      { name: 'Delivery Challan.pdf', size: '156 KB', type: 'pdf', uploaded: '2024-12-03' },
      { name: 'Product Photo.jpg', size: '1.2 MB', type: 'image', uploaded: '2024-12-04' }
    ]
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProduct(mockProduct);
      setIsLoading(false);

      // Animate header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }, 600);
  }, [id]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    
    // Animate tab content
    gsap.fromTo(
      '.tab-content',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
  };

  const InfoRow = ({ icon: Icon, label, value, mono = false }) => (
    <div className="flex items-start gap-3 py-3 border-b border-[#E5E7EB] last:border-0">
      <Icon className="w-5 h-5 text-[#6B7280] flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#6B7280] mb-1">{label}</p>
        <p className={`text-base font-medium text-[#1A1F2E] ${mono ? 'font-mono text-sm' : ''}`}>
          {value}
        </p>
      </div>
    </div>
  );

  if (isLoading || !product) {
    return (
      <ContractorLayout>
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#E5E7EB] border-t-[#E67E22]"></div>
        </div>
      </ContractorLayout>
    );
  }

  return (
    <ContractorLayout>
      <div className="min-h-screen bg-[#F8F9FA] pb-20">
        {/* Header */}
        <div ref={headerRef} className="bg-white border-b border-[#E5E7EB]">
          <div className="px-4 py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#6B7280] hover:text-[#1A1F2E] mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>

            {/* Product Hero */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[#E67E22]/10 to-[#D35400]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <CategoryIcon category={product.category} className="w-10 h-10 text-[#E67E22]" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-[#1A1F2E] mb-2 leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm font-mono text-[#6B7280] mb-3">{product.id}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1.5 bg-[#E67E22]/10 text-[#E67E22] text-sm font-medium rounded-full">
                    {product.categoryLabel}
                  </span>
                  <span className="px-3 py-1.5 bg-[#10B981]/10 text-[#10B981] text-sm font-medium rounded-full flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Info Bar */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-[#F8F9FA] rounded-lg p-3 text-center">
                <p className="text-xs text-[#6B7280] mb-1">Quantity</p>
                <p className="text-lg font-bold text-[#1A1F2E]">{product.quantity}</p>
                <p className="text-xs text-[#6B7280]">{product.unit}</p>
              </div>
              <div className="bg-[#F8F9FA] rounded-lg p-3 text-center">
                <p className="text-xs text-[#6B7280] mb-1">Location</p>
                <p className="text-lg font-bold text-[#1A1F2E]">Floor {product.floor}</p>
                <p className="text-xs text-[#6B7280]">{product.zone}</p>
              </div>
              <div className="bg-[#F8F9FA] rounded-lg p-3 text-center">
                <p className="text-xs text-[#6B7280] mb-1">Status</p>
                <p className="text-lg font-bold text-[#10B981]">✓</p>
                <p className="text-xs text-[#6B7280]">On Chain</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#E67E22] text-white rounded-xl hover:bg-[#D35400] transition-colors font-medium">
                <QrCode className="w-4 h-4" />
                <span className="text-sm">QR Code</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#E5E7EB] text-[#1A1F2E] rounded-xl hover:bg-[#F8F9FA] transition-colors font-medium">
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#E5E7EB] text-[#1A1F2E] rounded-xl hover:bg-[#F8F9FA] transition-colors font-medium">
                <Download className="w-4 h-4" />
                <span className="text-sm">Export</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 px-4 overflow-x-auto scrollbar-hide">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  ref={el => tabsRef.current[index] = el}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors relative flex-shrink-0
                    ${activeTab === tab.id
                      ? 'text-[#E67E22]'
                      : 'text-[#6B7280] hover:text-[#1A1F2E]'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E67E22]"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content px-4 py-6">
          {activeTab === 'details' && (
            <div className="space-y-4">
              {/* Product Information */}
              <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
                <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#E5E7EB]">
                  <h2 className="font-semibold text-[#1A1F2E]">Product Information</h2>
                </div>
                <div className="p-4">
                  <InfoRow icon={Package} label="Product Name" value={product.name} />
                  <InfoRow icon={Hash} label="Batch Number" value={product.batchNumber} mono />
                  <InfoRow icon={Package} label="Quantity" value={`${product.quantity} ${product.unit}`} />
                  <InfoRow icon={Calendar} label="Registration Date" value={new Date(product.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })} />
                </div>
              </div>

              {/* Location Details */}
              <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
                <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#E5E7EB]">
                  <h2 className="font-semibold text-[#1A1F2E]">Location Details</h2>
                </div>
                <div className="p-4">
                  <InfoRow icon={Building} label="Floor" value={`Floor ${product.floor}`} />
                  <InfoRow icon={MapPin} label="Zone" value={product.zone} />
                  <InfoRow icon={MapPin} label="Specific Location" value={product.specificLocation} />
                  {product.gpsCoordinates && (
                    <div className="pt-3">
                      <button className="flex items-center gap-2 text-[#3B82F6] hover:underline text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        View on Map ({product.gpsCoordinates.lat.toFixed(4)}, {product.gpsCoordinates.lng.toFixed(4)})
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Supplier Information */}
              <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
                <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#E5E7EB]">
                  <h2 className="font-semibold text-[#1A1F2E]">Supplier Information</h2>
                </div>
                <div className="p-4">
                  <InfoRow icon={User} label="Supplier Name" value={product.supplier.name} />
                  <InfoRow icon={Phone} label="Contact" value={product.supplier.contact} mono />
                  <InfoRow icon={FileText} label="Invoice Number" value={product.supplier.invoiceNumber} mono />
                  <InfoRow icon={FileText} label="PO Number" value={product.supplier.poNumber} mono />
                  <InfoRow icon={Calendar} label="Delivery Date" value={new Date(product.supplier.deliveryDate).toLocaleDateString('en-IN')} />
                </div>
              </div>

              {/* Registered By */}
              <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
                <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#E5E7EB]">
                  <h2 className="font-semibold text-[#1A1F2E]">Registered By</h2>
                </div>
                <div className="p-4">
                  <InfoRow icon={User} label="Name" value={product.registeredBy.name} />
                  <InfoRow icon={Hash} label="Wallet Address" value={product.registeredBy.wallet} mono />
                  <InfoRow icon={User} label="Role" value={product.registeredBy.role} />
                  <InfoRow icon={Building} label="Company" value={product.registeredBy.company} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {product.timeline.map((event, index) => {
                const Icon = event.icon;
                return (
                  <div key={index} className="bg-white rounded-xl border border-[#E5E7EB] p-4">
                    <div className="flex gap-4">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${event.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: event.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-[#1A1F2E]">{event.event}</h3>
                          <span className="text-xs text-[#6B7280] whitespace-nowrap">
                            {new Date(event.timestamp).toLocaleTimeString('en-IN', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-[#6B7280] mb-2">{event.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-[#6B7280]">By</span>
                          <span className="font-medium text-[#1A1F2E]">{event.actor}</span>
                          <span className="text-[#6B7280]">•</span>
                          <span className="text-[#6B7280]">
                            {new Date(event.timestamp).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'blockchain' && (
            <div className="space-y-4">
              {/* Verification Status */}
              <div className="bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 rounded-xl border border-[#10B981]/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1F2E] text-lg">Verified on Blockchain</h3>
                    <p className="text-sm text-[#6B7280]">This DPP is immutable and tamper-proof</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[#1A1F2E] font-medium">
                    {product.blockchain.confirmations} Confirmations
                  </span>
                </div>
              </div>

              {/* Blockchain Details */}
              <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
                <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#E5E7EB]">
                  <h2 className="font-semibold text-[#1A1F2E]">Blockchain Details</h2>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <p className="text-sm text-[#6B7280] mb-2">Network</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                      <span className="font-medium text-[#1A1F2E]">{product.blockchain.network}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-[#6B7280] mb-2">Contract Address</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs font-mono bg-[#F8F9FA] px-3 py-2 rounded-lg text-[#1A1F2E] overflow-x-auto">
                        {product.blockchain.contractAddress}
                      </code>
                      <button className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4 text-[#6B7280]" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-[#6B7280] mb-2">Transaction Hash</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs font-mono bg-[#F8F9FA] px-3 py-2 rounded-lg text-[#1A1F2E] overflow-x-auto">
                        {product.blockchain.transactionHash}
                      </code>
                      <button className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4 text-[#6B7280]" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-[#6B7280] mb-2">IPFS Hash</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs font-mono bg-[#F8F9FA] px-3 py-2 rounded-lg text-[#1A1F2E] overflow-x-auto">
                        {product.blockchain.ipfsHash}
                      </code>
                      <button className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4 text-[#6B7280]" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-sm text-[#6B7280] mb-1">Block Number</p>
                      <p className="font-mono text-sm font-medium text-[#1A1F2E]">
                        {product.blockchain.blockNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280] mb-1">Gas Used</p>
                      <p className="font-mono text-sm font-medium text-[#1A1F2E]">
                        {product.blockchain.gasUsed}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-[#6B7280] mb-1">Timestamp</p>
                    <p className="text-sm font-medium text-[#1A1F2E]">
                      {new Date(product.blockchain.timestamp).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>

              {/* View on Explorer */}
              <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#3B82F6] text-white rounded-xl hover:bg-[#2563EB] transition-colors font-medium">
                View on Etherscan
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              {product.documents.length > 0 ? (
                product.documents.map((doc, index) => (
                  <div key={index} className="bg-white rounded-xl border border-[#E5E7EB] p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        doc.type === 'pdf' ? 'bg-red-50' : 'bg-blue-50'
                      }`}>
                        {doc.type === 'pdf' ? (
                          <FileText className={`w-6 h-6 ${doc.type === 'pdf' ? 'text-red-500' : 'text-blue-500'}`} />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#1A1F2E] mb-1">{doc.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>Uploaded {new Date(doc.uploaded).toLocaleDateString('en-IN')}</span>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors">
                        <Download className="w-5 h-5 text-[#6B7280]" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl border border-[#E5E7EB] p-12 text-center">
                  <FileText className="w-12 h-12 text-[#6B7280] mx-auto mb-4" />
                  <h3 className="font-semibold text-[#1A1F2E] mb-2">No Documents</h3>
                  <p className="text-sm text-[#6B7280]">No documents have been uploaded yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ContractorLayout>
  );
};

export default ProductDetail;

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Camera,
  Image as ImageIcon,
  Package,
  Hash,
  Building,
  FileText,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  MapPin,
  Crosshair
} from 'lucide-react';
import ContractorLayout from '../components/ContractorLayout';
import SubmissionModal from '../components/SubmissionModal';
import CategoryIcon from '../components/CategoryIcon';
import gsap from 'gsap';

const ProductRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [projectId] = useState(location.state?.projectId || 'TH-001');
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Product Info
    photo: null,
    productName: '',
    category: '',
    quantity: 1,
    unit: 'pcs',
    batchNumber: '',
    
    // Step 2: Supplier Info
    supplierName: '',
    supplierContact: '',
    invoiceNumber: '',
    poNumber: '',
    deliveryDate: new Date().toISOString().split('T')[0],
    notes: '',
    
    // Step 3: Location
    floor: '',
    zone: '',
    specificLocation: '',
    useGPS: false,
    gpsCoords: null,
    
    // Step 4: Confirmation
    confirmed: false
  });

  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showFloorPicker, setShowFloorPicker] = useState(false);

  const categories = [
    { id: 'cement', name: 'Cement & Concrete' },
    { id: 'bricks', name: 'Bricks & Blocks' },
    { id: 'steel', name: 'Steel & Metal' },
    { id: 'electrical', name: 'Electrical' },
    { id: 'plumbing', name: 'Plumbing' },
    { id: 'hvac', name: 'HVAC' },
    { id: 'lighting', name: 'Lighting' },
    { id: 'doors', name: 'Doors & Windows' },
    { id: 'paint', name: 'Paint & Finishes' },
    { id: 'hardware', name: 'Hardware' },
    { id: 'equipment', name: 'Equipment' },
    { id: 'other', name: 'Other Materials' }
  ];

  const floors = ['B2', 'B1', 'G', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const zones = ['Wing A', 'Wing B', 'North Block', 'South Block', 'Central'];
  const units = ['pcs', 'bags', 'boxes', 'kg', 'ton', 'm', 'm²', 'm³', 'liters', 'rolls'];

  useEffect(() => {
    // Animate progress bar
    gsap.to('.progress-fill', {
      width: `${(currentStep / 4) * 100}%`,
      duration: 0.4,
      ease: 'power2.out'
    });
  }, [currentStep]);

  const handlePhotoCapture = () => {
    // In production, open camera or file picker
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, photo: reader.result });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    if (formData.confirmed) {
      setShowSubmissionModal(true);
    }
  };

  const handleSubmissionClose = () => {
    setShowSubmissionModal(false);
    navigate('/contractor/products');
  };

  const canProceedStep1 = formData.photo && formData.productName && formData.category && formData.quantity > 0;
  const canProceedStep2 = formData.supplierName && formData.deliveryDate;
  const canProceedStep3 = formData.floor && formData.zone;
  const canSubmit = formData.confirmed;

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E5E7EB] z-40">
        <div className="h-full px-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA]">
            <ArrowLeft className="w-6 h-6 text-[#1A1F2E]" />
          </button>
          <h1 className="text-lg font-semibold text-[#1A1F2E]">Register Product</h1>
          <button className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA]">
            <Bookmark className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="h-0.5 bg-[#E5E7EB]">
          <div className="progress-fill h-full bg-[#E67E22] transition-all" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
        </div>
      </header>

      {/* Project Context Banner */}
      <div className="fixed top-16 left-0 right-0 bg-[#F8F9FA] border-b border-[#E5E7EB] px-4 py-3 z-30">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-[#E67E22]" />
          <span className="text-sm font-semibold text-[#1A1F2E]">Project: Tower Heights ({projectId})</span>
        </div>
      </div>

      {/* Form Content */}
      <div className="pt-[136px] pb-24 px-4">
        {/* Step 1: Product Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#1A1F2E] mb-1">Product Details</h2>
              <p className="text-sm text-[#6B7280]">Step 1 of 4</p>
            </div>

            {/* Photo Capture */}
            <div>
              <label className="block text-base font-semibold text-[#1A1F2E] mb-2">
                Product Photo <span className="text-red-500">*</span>
              </label>
              {!formData.photo ? (
                <button
                  onClick={handlePhotoCapture}
                  className="w-full h-60 border-2 border-dashed border-[#E5E7EB] rounded-xl bg-[#F8F9FA] flex flex-col items-center justify-center gap-3"
                >
                  <Camera className="w-12 h-12 text-[#6B7280]" />
                  <div className="text-center">
                    <p className="text-base font-semibold text-[#1A1F2E] mb-1">Take Product Photo</p>
                    <p className="text-sm text-[#6B7280]">Required for delivery verification</p>
                  </div>
                </button>
              ) : (
                <div className="relative">
                  <img src={formData.photo} alt="Product" className="w-full h-60 object-cover rounded-xl" />
                  <button
                    onClick={handlePhotoCapture}
                    className="absolute top-3 right-3 px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-[#1A1F2E] shadow-lg"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-base font-semibold text-[#1A1F2E] mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                placeholder="e.g., Portland Cement 50kg"
                className="w-full h-12 px-4 border border-[#E5E7EB] rounded-xl text-[#1A1F2E] focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/20 outline-none"
              />
              <p className="text-xs text-[#6B7280] text-right mt-1">{formData.productName.length}/100</p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-base font-semibold text-[#1A1F2E] mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <button
                onClick={() => setShowCategoryPicker(true)}
                className="w-full h-12 px-4 border border-[#E5E7EB] rounded-xl flex items-center justify-between bg-white"
              >
                <span className={formData.category ? 'text-[#1A1F2E]' : 'text-[#6B7280]'}>
                  {formData.category ? categories.find(c => c.id === formData.category)?.name : 'Select category'}
                </span>
                <ArrowRight className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>

            {/* Quantity & Unit */}
            <div>
              <label className="block text-base font-semibold text-[#1A1F2E] mb-2">
                Quantity <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <div className="flex-1 flex items-center border border-[#E5E7EB] rounded-xl bg-white">
                  <button
                    onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                    className="w-11 h-12 flex items-center justify-center text-[#1A1F2E] font-semibold"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                    className="flex-1 h-12 text-center text-xl font-semibold text-[#1A1F2E] outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                    className="w-11 h-12 flex items-center justify-center text-[#1A1F2E] font-semibold"
                  >
                    +
                  </button>
                </div>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-28 h-12 px-3 border border-[#E5E7EB] rounded-xl bg-white text-[#1A1F2E] outline-none"
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Batch Number */}
            <div>
              <label className="block text-base font-semibold text-[#1A1F2E] mb-2">
                Batch/Serial Number <span className="text-xs font-normal text-[#6B7280]">(optional)</span>
              </label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="text"
                  value={formData.batchNumber}
                  onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                  placeholder="Enter batch/serial number"
                  className="w-full h-12 pl-12 pr-4 border border-[#E5E7EB] rounded-xl text-[#1A1F2E] focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/20 outline-none"
                />
              </div>
              <p className="text-xs text-[#6B7280] mt-1">Helps with tracking and warranty claims</p>
            </div>
          </div>
        )}

        {/* Step 2: Supplier Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#1A1F2E] mb-1">Supplier Details</h2>
              <p className="text-sm text-[#6B7280]">Step 2 of 4</p>
            </div>

            <div>
              <label className="block text-base font-semibold text-[#1A1F2E] mb-2">
                Supplier/Manufacturer <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="text"
                  value={formData.supplierName}
                  onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                  placeholder="Enter supplier name"
                  className="w-full h-12 pl-12 pr-4 border border-[#E5E7EB] rounded-xl text-[#1A1F2E] focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/20 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-[#1A1F2E] mb-2">
                Contact Information <span className="text-xs font-normal text-[#6B7280]">(optional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="text"
                  value={formData.supplierContact}
                  onChange={(e) => setFormData({ ...formData, supplierContact: e.target.value })}
                  placeholder="Phone or email"
                  className="w-full h-12 pl-12 pr-4 border border-[#E5E7EB] rounded-xl text-[#1A1F2E] focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/20 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-[#1A1F2E] mb-2">
                Invoice Number <span className="text-xs font-normal text-[#6B7280]">(optional)</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="text"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                  placeholder="INV-2024-..."
                  className="w-full h-12 pl-12 pr-4 border border-[#E5E7EB] rounded-xl text-[#1A1F2E] focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/20 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-[#1A1F2E] mb-2">
                PO Number <span className="text-xs font-normal text-[#6B7280]">(optional)</span>
              </label>
              <input
                type="text"
                value={formData.poNumber}
                onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
                placeholder="PO-..."
                className="w-full h-12 px-4 border border-[#E5E7EB] rounded-xl text-[#1A1F2E] focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/20 outline-none"
              />
            </div>

            <div>
              <label className="block text-base font-semibold text-[#1A1F2E] mb-2">
                Delivery Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  className="w-full h-12 pl-12 pr-4 border border-[#E5E7EB] rounded-xl text-[#1A1F2E] focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/20 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-[#1A1F2E] mb-2">
                Notes <span className="text-xs font-normal text-[#6B7280]">(optional)</span>
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any additional delivery notes..."
                rows={3}
                maxLength={300}
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#1A1F2E] focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/20 outline-none resize-none"
              />
              <p className="text-xs text-[#6B7280] text-right mt-1">{formData.notes.length}/300</p>
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#1A1F2E] mb-1">Delivery Location</h2>
              <p className="text-sm text-[#6B7280]">Step 3 of 4</p>
            </div>

            <div className="bg-[#F8F9FA] rounded-xl p-4 flex gap-3">
              <MapPin className="w-5 h-5 text-[#E67E22] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#1A1F2E] mb-1">Where was this product delivered?</p>
                <p className="text-xs text-[#6B7280]">Specify floor and zone for tracking</p>
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-[#1A1F2E] mb-3">
                Floor <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {floors.map(floor => (
                  <button
                    key={floor}
                    onClick={() => setFormData({ ...formData, floor })}
                    className={`h-14 rounded-xl border-2 font-semibold transition-all ${
                      formData.floor === floor
                        ? 'bg-[#E67E22] border-[#E67E22] text-white'
                        : 'border-[#E5E7EB] text-[#1A1F2E] hover:border-[#E67E22]'
                    }`}
                  >
                    {floor}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-[#1A1F2E] mb-3">
                Zone <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {zones.map(zone => (
                  <button
                    key={zone}
                    onClick={() => setFormData({ ...formData, zone })}
                    className={`px-5 py-3 rounded-full border-2 font-medium whitespace-nowrap transition-all ${
                      formData.zone === zone
                        ? 'bg-[#E67E22] border-[#E67E22] text-white'
                        : 'border-[#E5E7EB] text-[#1A1F2E] hover:border-[#E67E22]'
                    }`}
                  >
                    {zone}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-[#1A1F2E] mb-2">
                Specific Location <span className="text-xs font-normal text-[#6B7280]">(optional)</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="text"
                  value={formData.specificLocation}
                  onChange={(e) => setFormData({ ...formData, specificLocation: e.target.value })}
                  placeholder="e.g., Near Column A-4, Storage Area"
                  className="w-full h-12 pl-12 pr-4 border border-[#E5E7EB] rounded-xl text-[#1A1F2E] focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/20 outline-none"
                />
              </div>
              <p className="text-xs text-[#6B7280] mt-1">More precise location for easy finding</p>
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.useGPS}
                  onChange={(e) => setFormData({ ...formData, useGPS: e.target.checked })}
                  className="w-5 h-5 rounded border-[#E5E7EB] text-[#E67E22] focus:ring-[#E67E22]"
                />
                <div className="flex items-center gap-2">
                  <Crosshair className="w-5 h-5 text-[#E67E22]" />
                  <span className="text-base font-medium text-[#1A1F2E]">Use current GPS location</span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#1A1F2E] mb-1">Review & Submit</h2>
              <p className="text-sm text-[#6B7280]">Step 4 of 4</p>
            </div>

            {/* Product Summary */}
            <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#1A1F2E]">Product Details</h3>
                <button onClick={() => setCurrentStep(1)} className="text-sm text-[#E67E22] font-medium">Edit</button>
              </div>
              <div className="flex gap-4">
                {formData.photo && (
                  <img src={formData.photo} alt="Product" className="w-20 h-20 object-cover rounded-lg" />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-[#1A1F2E] mb-2">{formData.productName}</p>
                  <div className="space-y-1 text-sm text-[#6B7280]">
                    <p>Category: {categories.find(c => c.id === formData.category)?.name}</p>
                    <p>Quantity: {formData.quantity} {formData.unit}</p>
                    {formData.batchNumber && <p>Batch: {formData.batchNumber}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Supplier Summary */}
            <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#1A1F2E]">Supplier</h3>
                <button onClick={() => setCurrentStep(2)} className="text-sm text-[#E67E22] font-medium">Edit</button>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="text-[#6B7280]">Supplier:</span> <span className="text-[#1A1F2E] font-medium">{formData.supplierName}</span></p>
                {formData.supplierContact && <p><span className="text-[#6B7280]">Contact:</span> <span className="text-[#1A1F2E]">{formData.supplierContact}</span></p>}
                {formData.invoiceNumber && <p><span className="text-[#6B7280]">Invoice:</span> <span className="text-[#1A1F2E]">{formData.invoiceNumber}</span></p>}
                <p><span className="text-[#6B7280]">Delivery:</span> <span className="text-[#1A1F2E]">{new Date(formData.deliveryDate).toLocaleDateString()}</span></p>
              </div>
            </div>

            {/* Location Summary */}
            <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#1A1F2E]">Delivery Location</h3>
                <button onClick={() => setCurrentStep(3)} className="text-sm text-[#E67E22] font-medium">Edit</button>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="text-[#6B7280]">Floor:</span> <span className="text-[#1A1F2E] font-medium">{formData.floor}</span></p>
                <p><span className="text-[#6B7280]">Zone:</span> <span className="text-[#1A1F2E] font-medium">{formData.zone}</span></p>
                {formData.specificLocation && <p><span className="text-[#6B7280]">Specific:</span> <span className="text-[#1A1F2E]">{formData.specificLocation}</span></p>}
                {formData.useGPS && <p className="text-[#10B981]">✓ GPS location captured</p>}
              </div>
            </div>

            {/* Blockchain Info */}
            <div className="bg-[#3B82F6]/5 rounded-xl p-4 border border-[#3B82F6]/20">
              <div className="flex gap-3 mb-3">
                <Package className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1A1F2E] mb-1">Blockchain Registration</p>
                  <p className="text-sm text-[#6B7280] mb-3">This product will be registered on Ethereum blockchain</p>
                  <div className="space-y-1 text-xs text-[#6B7280]">
                    <p>• Unique DPP identifier</p>
                    <p>• Product details hash</p>
                    <p>• IPFS content hash</p>
                    <p>• Timestamp & GPS coordinates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.confirmed}
                onChange={(e) => setFormData({ ...formData, confirmed: e.target.checked })}
                className="w-5 h-5 mt-0.5 rounded border-[#E5E7EB] text-[#E67E22] focus:ring-[#E67E22]"
              />
              <span className="text-base text-[#1A1F2E]">I confirm all information is accurate</span>
            </label>
          </div>
        )}
      </div>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] p-4 space-y-3">
        {currentStep < 4 ? (
          <div className="flex gap-3">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="flex-1 h-13 border-2 border-[#E5E7EB] text-[#1A1F2E] font-semibold rounded-xl"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !canProceedStep1) ||
                (currentStep === 2 && !canProceedStep2) ||
                (currentStep === 3 && !canProceedStep3)
              }
              className="flex-1 h-13 bg-[#E67E22] text-white font-semibold rounded-xl disabled:bg-[#E5E7EB] disabled:text-[#6B7280] flex items-center justify-center gap-2"
            >
              <span>Next: {currentStep === 1 ? 'Supplier' : currentStep === 2 ? 'Location' : 'Review'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full h-14 bg-gradient-to-r from-[#E67E22] to-[#D35400] text-white font-bold text-lg rounded-xl disabled:from-[#E5E7EB] disabled:to-[#E5E7EB] disabled:text-[#6B7280] shadow-lg shadow-[#E67E22]/40"
            >
              Create Digital Product Passport
            </button>
            <button className="w-full text-sm text-[#6B7280] font-medium">
              Save as Draft
            </button>
          </>
        )}
      </div>

      {/* Category Picker Modal */}
      {showCategoryPicker && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[70vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-4">
              <div className="w-12 h-1 bg-[#E5E7EB] rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-[#1A1F2E] text-center">Select Category</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setFormData({ ...formData, category: category.id });
                    setShowCategoryPicker(false);
                  }}
                  className={`p-4 rounded-xl border-2 text-left ${
                    formData.category === category.id
                      ? 'border-[#E67E22] bg-[#E67E22]/5'
                      : 'border-[#E5E7EB] hover:border-[#E67E22]'
                  }`}
                >
                  <div className="mb-2">
                    <CategoryIcon category={category.id} className={`w-8 h-8 ${formData.category === category.id ? 'text-[#E67E22]' : 'text-gray-600'}`} />
                  </div>
                  <p className="text-sm font-semibold text-[#1A1F2E]">{category.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Submission Modal */}
      <SubmissionModal 
        isOpen={showSubmissionModal}
        onClose={handleSubmissionClose}
        productData={formData}
      />
    </div>
  );
};

export default ProductRegistration;

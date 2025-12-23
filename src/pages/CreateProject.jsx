import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  MapPin,
  Building2,
  FileCheck,
  Users,
  Eye,
  X,
  Plus,
  Trash2,
  Mail
} from 'lucide-react';
import gsap from 'gsap';
import DashboardLayout from '../components/DashboardLayout';

// Validation schemas for each step
const step1Schema = z.object({
  projectName: z.string().min(3, 'Project name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(3, 'Location is required'),
  address: z.string().min(5, 'Full address is required'),
  startDate: z.string().min(1, 'Start date is required'),
  estimatedCompletion: z.string().min(1, 'Completion date is required'),
  budget: z.string().min(1, 'Budget is required'),
  projectType: z.string().min(1, 'Project type is required')
});

const CreateProject = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    // Step 1: Project Details
    projectName: '',
    description: '',
    location: '',
    address: '',
    startDate: '',
    estimatedCompletion: '',
    budget: '',
    projectType: '',
    image: null,
    
    // Step 2: Structure
    floors: [{ id: 1, name: 'Ground Floor', zones: [] }],
    
    // Step 3: Compliance
    compliance: {
      buildingPermit: false,
      environmentalClearance: false,
      fireSafety: false,
      structuralApproval: false,
      electricalApproval: false,
      plumbingApproval: false,
      occupancyCertificate: false,
      labourCompliance: false
    },
    
    // Step 4: Team
    team: []
  });

  const contentRef = useRef(null);

  const steps = [
    { number: 1, title: 'Project Details', icon: Building2 },
    { number: 2, title: 'Structure', icon: Building2 },
    { number: 3, title: 'Compliance', icon: FileCheck },
    { number: 4, title: 'Team', icon: Users },
    { number: 5, title: 'Review & Deploy', icon: Eye }
  ];

  // React Hook Form
  const { register, handleSubmit, formState: { errors }, trigger } = useForm({
    resolver: zodResolver(step1Schema),
    mode: 'onChange',
    defaultValues: formData
  });

  // Animate step transitions
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [currentStep]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addFloor = () => {
    setFormData(prev => ({
      ...prev,
      floors: [...prev.floors, { id: Date.now(), name: `Floor ${prev.floors.length}`, zones: [] }]
    }));
  };

  const removeFloor = (id) => {
    setFormData(prev => ({
      ...prev,
      floors: prev.floors.filter(f => f.id !== id)
    }));
  };

  const addZone = (floorId) => {
    setFormData(prev => ({
      ...prev,
      floors: prev.floors.map(f =>
        f.id === floorId
          ? { ...f, zones: [...f.zones, { id: Date.now(), name: '', area: '' }] }
          : f
      )
    }));
  };

  const updateZone = (floorId, zoneId, field, value) => {
    setFormData(prev => ({
      ...prev,
      floors: prev.floors.map(f =>
        f.id === floorId
          ? {
              ...f,
              zones: f.zones.map(z =>
                z.id === zoneId ? { ...z, [field]: value } : z
              )
            }
          : f
      )
    }));
  };

  const removeZone = (floorId, zoneId) => {
    setFormData(prev => ({
      ...prev,
      floors: prev.floors.map(f =>
        f.id === floorId
          ? { ...f, zones: f.zones.filter(z => z.id !== zoneId) }
          : f
      )
    }));
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      team: [...prev.team, { id: Date.now(), name: '', email: '', role: '', company: '' }]
    }));
  };

  const updateTeamMember = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.map(m => m.id === id ? { ...m, [field]: value } : m)
    }));
  };

  const removeTeamMember = (id) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.filter(m => m.id !== id)
    }));
  };

  const nextStep = async () => {
    if (currentStep === 1) {
      const isValid = await trigger();
      if (!isValid) return;
    }
    
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    nextStep();
  };

  const handleDeploy = () => {
    // Navigate to deployment page with form data
    navigate('/owner/projects/deploy', { state: { projectData: formData } });
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/owner/projects')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#E67E22] mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Projects</span>
          </button>
          <h1 className="text-3xl font-bold text-[#1A1F2E] mb-2">Create New Project</h1>
          <p className="text-gray-600">Set up your construction project on the blockchain</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center transition-all
                        ${isCompleted ? 'bg-[#10B981] text-white' : ''}
                        ${isCurrent ? 'bg-[#E67E22] text-white shadow-lg shadow-[#E67E22]/30' : ''}
                        ${!isCompleted && !isCurrent ? 'bg-gray-100 text-gray-400' : ''}
                      `}
                    >
                      {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <p className={`text-sm mt-2 font-medium ${isCurrent ? 'text-[#E67E22]' : 'text-gray-600'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 -mt-8 ${isCompleted ? 'bg-[#10B981]' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div ref={contentRef} className="bg-white rounded-xl shadow-sm p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Project Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1A1F2E] mb-6">Project Details</h2>
                
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#E67E22] transition-colors">
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData(prev => ({ ...prev, image: null }));
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Click to upload project image</p>
                        <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-block mt-4 px-6 py-2 bg-[#E67E22] text-white rounded-lg cursor-pointer hover:bg-[#D35400] transition-colors"
                    >
                      Choose Image
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name *
                    </label>
                    <input
                      {...register('projectName')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      placeholder="e.g., Skyline Tower"
                    />
                    {errors.projectName && (
                      <p className="text-red-500 text-sm mt-1">{errors.projectName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type *
                    </label>
                    <select
                      {...register('projectType')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                    >
                      <option value="">Select type</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                      <option value="infrastructure">Infrastructure</option>
                      <option value="mixed-use">Mixed Use</option>
                    </select>
                    {errors.projectType && (
                      <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                    placeholder="Describe your project..."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register('location')}
                        type="text"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                        placeholder="City, State"
                      />
                    </div>
                    {errors.location && (
                      <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Address *
                    </label>
                    <input
                      {...register('address')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      placeholder="Complete address"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      {...register('startDate')}
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                    />
                    {errors.startDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Completion *
                    </label>
                    <input
                      {...register('estimatedCompletion')}
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                    />
                    {errors.estimatedCompletion && (
                      <p className="text-red-500 text-sm mt-1">{errors.estimatedCompletion.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget (₹) *
                    </label>
                    <input
                      {...register('budget')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      placeholder="e.g., 12.5 Cr"
                    />
                    {errors.budget && (
                      <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Structure */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#1A1F2E]">Building Structure</h2>
                  <button
                    type="button"
                    onClick={addFloor}
                    className="flex items-center gap-2 px-4 py-2 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Floor
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.floors.map((floor, floorIndex) => (
                    <div key={floor.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <input
                          type="text"
                          value={floor.name}
                          onChange={(e) => {
                            setFormData(prev => ({
                              ...prev,
                              floors: prev.floors.map(f =>
                                f.id === floor.id ? { ...f, name: e.target.value } : f
                              )
                            }));
                          }}
                          className="text-lg font-semibold text-[#1A1F2E] bg-transparent border-b border-transparent hover:border-gray-300 focus:border-[#E67E22] focus:outline-none"
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => addZone(floor.id)}
                            className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                          >
                            Add Zone
                          </button>
                          {formData.floors.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFloor(floor.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        {floor.zones.map((zone) => (
                          <div key={zone.id} className="flex gap-3 items-center">
                            <input
                              type="text"
                              value={zone.name}
                              onChange={(e) => updateZone(floor.id, zone.id, 'name', e.target.value)}
                              placeholder="Zone name (e.g., Living Room)"
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                            />
                            <input
                              type="text"
                              value={zone.area}
                              onChange={(e) => updateZone(floor.id, zone.id, 'area', e.target.value)}
                              placeholder="Area (sq ft)"
                              className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => removeZone(floor.id, zone.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        {floor.zones.length === 0 && (
                          <p className="text-sm text-gray-500 italic">No zones added yet</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Compliance */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1A1F2E] mb-6">Compliance Requirements</h2>
                <p className="text-gray-600 mb-6">Select all applicable compliance requirements for your project</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(formData.compliance).map(([key, value]) => (
                    <label
                      key={key}
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#E67E22] cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            compliance: { ...prev.compliance, [key]: e.target.checked }
                          }));
                        }}
                        className="w-5 h-5 text-[#E67E22] rounded focus:ring-2 focus:ring-[#E67E22]"
                      />
                      <span className="text-gray-700 font-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> These compliance requirements will be tracked throughout the project lifecycle. 
                    You can update them later from the project dashboard.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Team */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#1A1F2E]">Team Members</h2>
                  <button
                    type="button"
                    onClick={addTeamMember}
                    className="flex items-center gap-2 px-4 py-2 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Member
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.team.map((member) => (
                    <div key={member.id} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-start p-4 border border-gray-200 rounded-lg">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                        placeholder="Full Name"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      />
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                        placeholder="Email"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      />
                      <select
                        value={member.role}
                        onChange={(e) => updateTeamMember(member.id, 'role', e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      >
                        <option value="">Select Role</option>
                        <option value="contractor">Contractor</option>
                        <option value="supplier">Supplier</option>
                        <option value="installer">Installer</option>
                        <option value="inspector">Inspector</option>
                      </select>
                      <input
                        type="text"
                        value={member.company}
                        onChange={(e) => updateTeamMember(member.id, 'company', e.target.value)}
                        placeholder="Company"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeTeamMember(member.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {formData.team.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 mb-2">No team members added yet</p>
                      <p className="text-sm text-gray-500">Click "Add Member" to invite your team</p>
                    </div>
                  )}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> Team members will receive email invitations to join the project 
                    after blockchain deployment.
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1A1F2E] mb-6">Review & Deploy</h2>
                
                <div className="space-y-6">
                  {/* Project Details */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#1A1F2E] mb-4">Project Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Project Name</p>
                        <p className="font-medium text-[#1A1F2E]">{formData.projectName}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Type</p>
                        <p className="font-medium text-[#1A1F2E] capitalize">{formData.projectType}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Location</p>
                        <p className="font-medium text-[#1A1F2E]">{formData.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Budget</p>
                        <p className="font-medium text-[#1A1F2E]">₹{formData.budget}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Start Date</p>
                        <p className="font-medium text-[#1A1F2E]">{formData.startDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Completion</p>
                        <p className="font-medium text-[#1A1F2E]">{formData.estimatedCompletion}</p>
                      </div>
                    </div>
                  </div>

                  {/* Structure */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#1A1F2E] mb-4">Structure</h3>
                    <p className="text-sm text-gray-700">
                      {formData.floors.length} floor(s), {formData.floors.reduce((acc, f) => acc + f.zones.length, 0)} zone(s)
                    </p>
                  </div>

                  {/* Compliance */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#1A1F2E] mb-4">Compliance</h3>
                    <p className="text-sm text-gray-700">
                      {Object.values(formData.compliance).filter(Boolean).length} requirement(s) selected
                    </p>
                  </div>

                  {/* Team */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#1A1F2E] mb-4">Team</h3>
                    <p className="text-sm text-gray-700">
                      {formData.team.length} team member(s) to be invited
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[#E67E22]/10 to-[#10B981]/10 border border-[#E67E22]/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#1A1F2E] mb-2">Ready to Deploy?</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Your project will be deployed to the Ethereum blockchain. This creates an immutable record 
                      and enables digital passport generation for all assets.
                    </p>
                    <button
                      type="button"
                      onClick={handleDeploy}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#E67E22] to-[#D35400] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Deploy to Blockchain
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Previous
                </button>

                <button
                  type={currentStep === 1 ? 'submit' : 'button'}
                  onClick={currentStep !== 1 ? nextStep : undefined}
                  className="flex items-center gap-2 px-6 py-3 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400] transition-colors"
                >
                  Next
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateProject;

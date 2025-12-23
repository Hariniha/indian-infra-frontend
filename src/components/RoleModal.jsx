import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, HardHat, Wrench, Package, ClipboardCheck, Scale } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

const RoleModal = () => {
  const navigate = useNavigate();
  const { showRoleModal, closeRoleModal, setUserRole } = useStore();
  const [selectedRole, setSelectedRole] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const roles = [
    {
      id: 'owner',
      name: 'Owner/Developer',
      icon: Building,
      description: 'Manage projects and monitor team',
    },
    {
      id: 'contractor',
      name: 'Contractor',
      icon: HardHat,
      description: 'Register products on-site',
    },
    {
      id: 'installer',
      name: 'Installer/MEP',
      icon: Wrench,
      description: 'Update installation records',
    },
    {
      id: 'supplier',
      name: 'Supplier',
      icon: Package,
      description: 'Enrich product data',
    },
    {
      id: 'inspector',
      name: 'Inspector',
      icon: ClipboardCheck,
      description: 'Verify compliance',
    },
    {
      id: 'regulator',
      name: 'Regulator',
      icon: Scale,
      description: 'Public verification',
    },
  ];

  const handleContinue = async () => {
    if (!selectedRole) return;

    setIsProcessing(true);
    
    // Simulate API call to save role
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setUserRole(selectedRole);
    closeRoleModal();
    
    // Navigate to role-specific dashboard
    if (selectedRole === 'owner') {
      navigate('/owner/dashboard');
    } else {
      navigate(`/dashboard/${selectedRole}`);
    }
  };

  if (!showRoleModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-dark-text mb-2">
              Welcome! Choose Your Role
            </h2>
            <p className="text-base text-steel-gray mb-2">
              Select your role to access your personalized dashboard
            </p>
            <p className="text-sm text-steel-gray italic">
              You can change this later in settings
            </p>
          </div>

          {/* Role Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`bg-bg-gray border-2 rounded-xl p-6 text-center transition-all duration-200 ${
                  selectedRole === role.id
                    ? 'border-accent-orange bg-accent-orange/5 scale-[0.98]'
                    : 'border-border-gray hover:border-accent-orange/50 hover:-translate-y-0.5'
                }`}
              >
                {/* Radio Indicator */}
                <div className="flex justify-end mb-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                      selectedRole === role.id
                        ? 'border-accent-orange bg-accent-orange'
                        : 'border-border-gray'
                    }`}
                  >
                    {selectedRole === role.id && (
                      <svg
                        className="w-full h-full text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Icon */}
                <role.icon className="w-12 h-12 text-accent-orange mx-auto mb-3" />

                {/* Role Name */}
                <h3 className="text-lg font-bold text-dark-text mb-1">
                  {role.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-steel-gray">
                  {role.description}
                </p>
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedRole || isProcessing}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
              selectedRole && !isProcessing
                ? 'bg-accent-orange hover:bg-accent-orange-dark text-white'
                : 'bg-border-gray text-steel-gray cursor-not-allowed'
            }`}
          >
            {isProcessing ? 'Setting up your dashboard...' : 'Continue to Dashboard'}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RoleModal;

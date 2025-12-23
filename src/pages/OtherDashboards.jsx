import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Wrench, Package, ClipboardCheck, Scale, LogOut, Settings } from 'lucide-react';

const DashboardTemplate = ({ icon: Icon, title, subtitle, description, role }) => {
  const navigate = useNavigate();
  const { disconnectWallet } = useStore();

  return (
    <div className="min-h-screen bg-bg-gray">
      <header className="bg-white border-b border-border-gray">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-orange to-accent-orange-dark rounded-lg flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-dark-text">{title}</h1>
              <p className="text-sm text-steel-gray">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-steel-gray hover:text-dark-text transition-colors">
              <Settings size={20} />
            </button>
            <button onClick={() => { disconnectWallet(); navigate('/'); }} className="flex items-center gap-2 text-steel-gray hover:text-dark-text transition-colors">
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Icon className="w-20 h-20 text-accent-orange mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-dark-text mb-4">{title}</h2>
          <p className="text-lg text-steel-gray">{description}</p>
        </div>
      </main>
    </div>
  );
};

export const InstallerDashboard = () => (
  <DashboardTemplate
    icon={Wrench}
    title="Installer / MEP Dashboard"
    subtitle="Update installation records and certificates"
    description="Upload commissioning documents and manage installation records."
    role="installer"
  />
);

export const SupplierDashboard = () => (
  <DashboardTemplate
    icon={Package}
    title="Supplier / Manufacturer Dashboard"
    subtitle="Enrich product data with specifications"
    description="Add EPD documents, fire certifications, and technical datasheets."
    role="supplier"
  />
);

export const InspectorDashboard = () => (
  <DashboardTemplate
    icon={ClipboardCheck}
    title="Building Inspector Dashboard"
    subtitle="Verify compliance and authenticity"
    description="Scan product QR codes and view blockchain audit trails."
    role="inspector"
  />
);

export const RegulatorDashboard = () => (
  <DashboardTemplate
    icon={Scale}
    title="Regulator / Authority Dashboard"
    subtitle="Public verification and oversight"
    description="Access public blockchain data for regulatory compliance monitoring."
    role="regulator"
  />
);

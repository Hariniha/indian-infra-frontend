import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config/wagmi';

import Landing from './pages/Landing';
import OwnerDashboard from './pages/OwnerDashboard';
import MyProjects from './pages/MyProjects';
import CreateProject from './pages/CreateProject';
import DeployProject from './pages/DeployProject';
import ProjectDetail from './pages/ProjectDetail';
import AssetRegistry from './pages/AssetRegistry';
import TeamManagement from './pages/TeamManagement';
import Compliance from './pages/Compliance';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import ContractorDashboard from './pages/ContractorDashboard';
import QRScanner from './pages/QRScanner';
import ProductRegistration from './pages/ProductRegistration';
import MyProducts from './pages/MyProducts';
import ProductDetail from './pages/ProductDetail';
import PendingUploads from './pages/PendingUploads';
import Completed from './pages/Completed';
import Profile from './pages/Profile';
import ContractorSettings from './pages/ContractorSettings';
import { InstallerDashboard, SupplierDashboard, InspectorDashboard, RegulatorDashboard } from './pages/OtherDashboards';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            
            {/* Owner Routes */}
            <Route 
              path="/owner/dashboard" 
              element={
                <ProtectedRoute allowedRole="owner">
                  <OwnerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/owner/projects" 
              element={
                <ProtectedRoute allowedRole="owner">
                  <MyProjects />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/owner/projects/create" 
              element={
                <ProtectedRoute allowedRole="owner">
                  <CreateProject />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/owner/projects/deploy" 
              element={
                <ProtectedRoute allowedRole="owner">
                  <DeployProject />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/owner/projects/:id" 
              element={
                <ProtectedRoute allowedRole="owner">
                  <ProjectDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/owner/assets" 
              element={
                <ProtectedRoute allowedRole="owner">
                  <AssetRegistry />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/owner/team" 
              element={
                <ProtectedRoute allowedRole="owner">
                  <TeamManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/owner/compliance" 
              element={
                <ProtectedRoute allowedRole="owner">
                  <Compliance />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/owner/documents" 
              element={
                <ProtectedRoute allowedRole="owner">
                  <Documents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/owner/settings" 
              element={
                <ProtectedRoute allowedRole="owner">
                  <Settings />
                </ProtectedRoute>
              } 
            />
            
            {/* Legacy dashboard routes for backward compatibility */}
            <Route 
              path="/dashboard/owner" 
              element={
                <ProtectedRoute allowedRole="owner">
                  <OwnerDashboard />
                </ProtectedRoute>
              } 
            />
            {/* Contractor Routes */}
            <Route 
              path="/contractor/dashboard" 
              element={
                <ProtectedRoute allowedRole="contractor">
                  <ContractorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contractor/scan" 
              element={
                <ProtectedRoute allowedRole="contractor">
                  <QRScanner />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contractor/register" 
              element={
                <ProtectedRoute allowedRole="contractor">
                  <ProductRegistration />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contractor/products" 
              element={
                <ProtectedRoute allowedRole="contractor">
                  <MyProducts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contractor/products/:id" 
              element={
                <ProtectedRoute allowedRole="contractor">
                  <ProductDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contractor/pending" 
              element={
                <ProtectedRoute allowedRole="contractor">
                  <PendingUploads />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contractor/completed" 
              element={
                <ProtectedRoute allowedRole="contractor">
                  <Completed />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contractor/profile" 
              element={
                <ProtectedRoute allowedRole="contractor">
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contractor/settings" 
              element={
                <ProtectedRoute allowedRole="contractor">
                  <ContractorSettings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/contractor" 
              element={
                <ProtectedRoute allowedRole="contractor">
                  <ContractorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/installer" 
              element={
                <ProtectedRoute allowedRole="installer">
                  <InstallerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/supplier" 
              element={
                <ProtectedRoute allowedRole="supplier">
                  <SupplierDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/inspector" 
              element={
                <ProtectedRoute allowedRole="inspector">
                  <InspectorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/regulator" 
              element={
                <ProtectedRoute allowedRole="regulator">
                  <RegulatorDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;

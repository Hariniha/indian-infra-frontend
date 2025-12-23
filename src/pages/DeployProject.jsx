import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Loader, 
  Check, 
  AlertCircle,
  ExternalLink,
  Copy,
  Sparkles,
  Package,
  Users,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import DashboardLayout from '../components/DashboardLayout';
import { useStore } from '../store/useStore';

const DeployProject = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const walletAddress = useStore((state) => state.walletAddress);
  const [deploymentStage, setDeploymentStage] = useState(0);
  const [txHash, setTxHash] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [projectId, setProjectId] = useState(null);
  const [error, setError] = useState(null);
  const progressRef = useRef(null);

  const projectData = location.state?.projectData;

  const stages = [
    {
      id: 0,
      title: 'Preparing Data',
      description: 'Validating project information and preparing for blockchain deployment',
      duration: 2000
    },
    {
      id: 1,
      title: 'Awaiting Wallet Approval',
      description: 'Please approve the transaction in your wallet',
      duration: 3000
    },
    {
      id: 2,
      title: 'Deploying Contract',
      description: 'Writing project data to the blockchain',
      duration: 5000
    },
    {
      id: 3,
      title: 'Deployment Complete',
      description: 'Your project is now live on the blockchain!',
      duration: 0
    }
  ];

  useEffect(() => {
    if (!projectData) {
      navigate('/owner/projects/create');
      return;
    }

    // Simulate deployment stages
    const deploySequence = async () => {
      try {
        // Stage 0: Preparing
        await new Promise(resolve => setTimeout(resolve, 2000));
        setDeploymentStage(1);

        // Stage 1: Wallet Approval
        await new Promise(resolve => setTimeout(resolve, 3000));
        setDeploymentStage(2);
        
        // Simulate transaction hash
        const mockTxHash = '0x' + Math.random().toString(16).slice(2, 66);
        setTxHash(mockTxHash);

        // Stage 2: Deploying
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // Simulate contract address
        const mockContractAddress = '0x' + Math.random().toString(16).slice(2, 42);
        setContractAddress(mockContractAddress);
        
        // Generate project ID
        const mockProjectId = Math.floor(Math.random() * 1000) + 1;
        setProjectId(mockProjectId);
        
        setDeploymentStage(3);

        // Trigger confetti
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
          });
        }, 250);

      } catch (err) {
        setError(err.message);
      }
    };

    deploySequence();
  }, [projectData, navigate]);

  useEffect(() => {
    if (progressRef.current) {
      const progress = ((deploymentStage) / 3) * 100;
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, [deploymentStage]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getEtherscanUrl = (type, value) => {
    return `https://etherscan.io/${type}/${value}`;
  };

  if (!projectData) {
    return null;
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A1F2E] mb-2">Deployment Failed</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => navigate('/owner/projects/create')}
                className="px-6 py-3 bg-[#E67E22] text-white rounded-lg hover:bg-[#D35400] transition-colors"
              >
                Back to Create Project
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1A1F2E] mb-2">Deploying Project</h1>
          <p className="text-gray-600">{projectData.projectName}</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="relative">
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                ref={progressRef}
                className="h-full bg-gradient-to-r from-[#E67E22] to-[#10B981] rounded-full transition-all"
                style={{ width: '0%' }}
              />
            </div>
            <div className="absolute -top-1 right-0 text-sm font-semibold text-[#E67E22]">
              {Math.round((deploymentStage / 3) * 100)}%
            </div>
          </div>
        </div>

        {/* Deployment Stages */}
        <div className="space-y-4 mb-8">
          {stages.map((stage) => {
            const isActive = deploymentStage === stage.id;
            const isCompleted = deploymentStage > stage.id;
            
            return (
              <div
                key={stage.id}
                className={`
                  bg-white rounded-xl shadow-sm p-6 transition-all
                  ${isActive ? 'ring-2 ring-[#E67E22] shadow-lg' : ''}
                `}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all
                      ${isCompleted ? 'bg-[#10B981] text-white' : ''}
                      ${isActive ? 'bg-[#E67E22] text-white animate-pulse' : ''}
                      ${!isActive && !isCompleted ? 'bg-gray-100 text-gray-400' : ''}
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : isActive ? (
                      <Loader className="w-6 h-6 animate-spin" />
                    ) : (
                      <span className="text-lg font-bold">{stage.id + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#1A1F2E] mb-1">{stage.title}</h3>
                    <p className="text-gray-600">{stage.description}</p>
                    
                    {/* Show transaction hash when deploying */}
                    {stage.id === 2 && isActive && txHash && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-600 mb-1">Transaction Hash</p>
                            <p className="text-sm font-mono text-[#1A1F2E] truncate">{txHash}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => copyToClipboard(txHash)}
                              className="p-2 hover:bg-gray-200 rounded transition-colors"
                              title="Copy"
                            >
                              <Copy className="w-4 h-4 text-gray-600" />
                            </button>
                            <a
                              href={getEtherscanUrl('tx', txHash)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 hover:bg-gray-200 rounded transition-colors"
                              title="View on Etherscan"
                            >
                              <ExternalLink className="w-4 h-4 text-gray-600" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Success State */}
        {deploymentStage === 3 && (
          <div className="bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 border border-[#10B981] rounded-xl p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A1F2E] mb-2">Project Deployed Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Your project is now live on the Ethereum blockchain and ready for asset tracking
              </p>
            </div>

            {/* Contract Details */}
            <div className="space-y-4 mb-6">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Contract Address</p>
                    <p className="text-sm font-mono font-semibold text-[#1A1F2E]">{contractAddress}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(contractAddress)}
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                    <a
                      href={getEtherscanUrl('address', contractAddress)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Project ID</p>
                    <p className="text-2xl font-bold text-[#E67E22]">#{projectId}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-[#1A1F2E] mb-4">Next Steps</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#E67E22]/10 rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-[#E67E22]" />
                  </div>
                  <span className="text-gray-700">Start adding assets and generating digital passports</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#3B82F6]/10 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                  <span className="text-gray-700">Invite team members to collaborate</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                    <FileCheck className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <span className="text-gray-700">Upload compliance documents</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate(`/owner/projects/${projectId}`)}
                className="flex-1 px-6 py-4 bg-[#E67E22] text-white rounded-lg font-semibold hover:bg-[#D35400] transition-colors"
              >
                View Project Dashboard
              </button>
              <button
                onClick={() => navigate('/owner/projects')}
                className="flex-1 px-6 py-4 border-2 border-[#E67E22] text-[#E67E22] rounded-lg font-semibold hover:bg-[#E67E22]/5 transition-colors"
              >
                Back to Projects
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DeployProject;

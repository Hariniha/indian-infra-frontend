import { useState, useEffect, useRef } from 'react';
import { X, Upload, CheckCircle, Wallet, Shield, ExternalLink, Download, Share2, QrCode as QrCodeIcon, Loader2, Smartphone, Link2 } from 'lucide-react';
import gsap from 'gsap';

const SubmissionModal = ({ isOpen, onClose, productData }) => {
  const [stage, setStage] = useState(1); // 1: Upload, 2: Wallet, 3: Minting, 4: Success
  const [uploadProgress, setUploadProgress] = useState(0);
  const [ipfsHash, setIpfsHash] = useState('');
  const [txHash, setTxHash] = useState('');
  const [confirmations, setConfirmations] = useState(0);
  const [dppId, setDppId] = useState('');
  
  const modalRef = useRef(null);
  const confettiRef = useRef(null);
  const checkmarkRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setStage(1);
      setUploadProgress(0);
      startSubmissionProcess();
    }
  }, [isOpen]);

  const startSubmissionProcess = async () => {
    // Stage 1: IPFS Upload
    await simulateIPFSUpload();
    
    // Stage 2: Wallet Approval
    setStage(2);
    await simulateWalletApproval();
    
    // Stage 3: Blockchain Minting
    setStage(3);
    await simulateBlockchainMinting();
    
    // Stage 4: Success
    setStage(4);
    animateSuccess();
  };

  const simulateIPFSUpload = () => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadProgress(100);
          setIpfsHash('QmX7b3f8e4a2c9d1f6b5e8c3a7d9f2e6b4a');
          setTimeout(resolve, 500);
        } else {
          setUploadProgress(Math.min(progress, 100));
        }
      }, 200);
    });
  };

  const simulateWalletApproval = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  };

  const simulateBlockchainMinting = () => {
    return new Promise((resolve) => {
      setTxHash('0x7b3f8e4a2c9d1f6b5e8c3a7d9f2e6b4a1c8e5d7f3a9b2c6e8d4f1a5b7c9e3f6');
      
      let conf = 0;
      const interval = setInterval(() => {
        conf++;
        setConfirmations(conf);
        
        if (conf >= 12) {
          clearInterval(interval);
          setDppId(`DPP-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`);
          setTimeout(resolve, 500);
        }
      }, 300);
    });
  };

  const animateSuccess = () => {
    // Confetti animation
    if (confettiRef.current) {
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.backgroundColor = ['#E67E22', '#10B981', '#3B82F6', '#F59E0B'][Math.floor(Math.random() * 4)];
        confettiRef.current.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
      }
    }

    // Checkmark animation
    if (checkmarkRef.current) {
      gsap.fromTo(
        checkmarkRef.current,
        { scale: 0, rotation: -180 },
        { 
          scale: 1, 
          rotation: 0, 
          duration: 0.6, 
          ease: 'back.out(2)',
          delay: 0.2
        }
      );
    }
  };

  const handleDownloadQR = () => {
    // Simulate QR code download
    console.log('Downloading QR code for', dppId);
  };

  const handleShare = () => {
    // Simulate sharing
    if (navigator.share) {
      navigator.share({
        title: `Digital Product Passport - ${dppId}`,
        text: `Check out this product on blockchain: ${dppId}`,
        url: window.location.href
      });
    }
  };

  const handleViewOnExplorer = () => {
    window.open(`https://etherscan.io/tx/${txHash}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Stage 1: IPFS Upload */}
        {stage === 1 && (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#3B82F6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-[#3B82F6]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A1F2E] mb-2">Uploading to IPFS</h2>
              <p className="text-[#6B7280]">Securing your data on decentralized storage</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#6B7280]">Upload Progress</span>
                <span className="font-medium text-[#1A1F2E]">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>

            {/* File List */}
            <div className="space-y-2 bg-[#F8F9FA] rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse"></div>
                <span className="text-sm text-[#1A1F2E]">Product metadata</span>
                {uploadProgress > 25 && <CheckCircle className="w-4 h-4 text-[#10B981] ml-auto" />}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse"></div>
                <span className="text-sm text-[#1A1F2E]">Supplier information</span>
                {uploadProgress > 50 && <CheckCircle className="w-4 h-4 text-[#10B981] ml-auto" />}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse"></div>
                <span className="text-sm text-[#1A1F2E]">Location data</span>
                {uploadProgress > 75 && <CheckCircle className="w-4 h-4 text-[#10B981] ml-auto" />}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse"></div>
                <span className="text-sm text-[#1A1F2E]">Images & documents</span>
                {uploadProgress === 100 && <CheckCircle className="w-4 h-4 text-[#10B981] ml-auto" />}
              </div>
            </div>

            {ipfsHash && (
              <div className="mt-4 p-3 bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl">
                <p className="text-xs text-[#6B7280] mb-1">IPFS Hash</p>
                <code className="text-xs font-mono text-[#10B981] break-all">{ipfsHash}</code>
              </div>
            )}
          </div>
        )}

        {/* Stage 2: Wallet Approval */}
        {stage === 2 && (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#F59E0B]/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Wallet className="w-8 h-8 text-[#F59E0B]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A1F2E] mb-2">Wallet Approval Required</h2>
              <p className="text-[#6B7280]">Please approve the transaction in your wallet</p>
            </div>

            {/* Wallet Animation */}
            <div className="bg-gradient-to-br from-[#F59E0B]/10 to-[#D97706]/10 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <Smartphone className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-2 h-2 bg-[#F59E0B] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-[#F59E0B] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-[#F59E0B] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <Link2 className="w-6 h-6 text-[#F59E0B]" />
                </div>
              </div>
              <p className="text-sm text-center text-[#6B7280]">
                Check your wallet app for the approval request
              </p>
            </div>

            {/* Transaction Details */}
            <div className="space-y-3 bg-[#F8F9FA] rounded-xl p-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Action</span>
                <span className="font-medium text-[#1A1F2E]">Mint DPP NFT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Network</span>
                <span className="font-medium text-[#1A1F2E]">Ethereum Mainnet</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Estimated Gas</span>
                <span className="font-medium text-[#1A1F2E]">~$12.50</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#6B7280]">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Waiting for approval...</span>
            </div>
          </div>
        )}

        {/* Stage 3: Blockchain Minting */}
        {stage === 3 && (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#E67E22]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#E67E22] animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A1F2E] mb-2">Minting on Blockchain</h2>
              <p className="text-[#6B7280]">Creating your immutable product passport</p>
            </div>

            {/* Transaction Hash */}
            {txHash && (
              <div className="mb-6 p-4 bg-[#F8F9FA] rounded-xl">
                <p className="text-xs text-[#6B7280] mb-2">Transaction Hash</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs font-mono text-[#1A1F2E] break-all">{txHash}</code>
                  <button 
                    onClick={handleViewOnExplorer}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-[#6B7280]" />
                  </button>
                </div>
              </div>
            )}

            {/* Confirmations Counter */}
            <div className="bg-gradient-to-br from-[#E67E22]/10 to-[#D35400]/10 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-[#E67E22] mb-2">{confirmations}/12</div>
              <p className="text-sm text-[#6B7280]">Block Confirmations</p>
              
              <div className="mt-4 flex justify-center gap-1">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i < confirmations ? 'bg-[#E67E22] scale-110' : 'bg-[#E5E7EB]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#6B7280]">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing transaction...</span>
            </div>
          </div>
        )}

        {/* Stage 4: Success */}
        {stage === 4 && (
          <div className="p-6 relative overflow-hidden">
            {/* Confetti Container */}
            <div ref={confettiRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

            <div className="text-center mb-6 relative z-10">
              <div 
                ref={checkmarkRef}
                className="w-20 h-20 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A1F2E] mb-2">Success!</h2>
              <p className="text-[#6B7280] mb-4">Your Digital Product Passport is now on blockchain</p>
              
              {/* DPP ID */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#10B981]/10 rounded-full">
                <span className="text-sm text-[#6B7280]">DPP ID:</span>
                <span className="text-lg font-mono font-bold text-[#10B981]">{dppId}</span>
              </div>
            </div>

            {/* DPP Card Preview */}
            <div className="bg-gradient-to-br from-[#E67E22] to-[#D35400] rounded-xl p-6 mb-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Digital Product Passport</p>
                    <h3 className="text-xl font-bold">{productData?.name || 'Product Name'}</h3>
                  </div>
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                    <QrCodeIcon className="w-12 h-12 text-[#E67E22]" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="opacity-75 mb-1">Category</p>
                    <p className="font-medium">{productData?.category || 'Cement'}</p>
                  </div>
                  <div>
                    <p className="opacity-75 mb-1">Quantity</p>
                    <p className="font-medium">{productData?.quantity || '500'} {productData?.unit || 'bags'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Blockchain Info */}
            <div className="bg-[#F8F9FA] rounded-xl p-4 mb-6 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">Network</span>
                <span className="font-medium text-[#1A1F2E]">Ethereum</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">Confirmations</span>
                <span className="font-medium text-[#10B981]">{confirmations} ✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">IPFS</span>
                <span className="font-mono text-xs text-[#1A1F2E]">{ipfsHash.slice(0, 12)}...</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleDownloadQR}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#E67E22] text-white rounded-xl hover:bg-[#D35400] transition-colors font-medium"
              >
                <Download className="w-5 h-5" />
                Download QR Code
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#E5E7EB] text-[#1A1F2E] rounded-xl hover:bg-[#F8F9FA] transition-colors font-medium"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={handleViewOnExplorer}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#E5E7EB] text-[#1A1F2E] rounded-xl hover:bg-[#F8F9FA] transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Explorer
                </button>
              </div>

              <button
                onClick={onClose}
                className="w-full px-6 py-3 text-[#6B7280] hover:text-[#1A1F2E] transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          animation: confetti-fall 3s linear forwards;
        }

        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default SubmissionModal;

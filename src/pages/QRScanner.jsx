import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Zap, Hash, CheckCircle } from 'lucide-react';
import gsap from 'gsap';

const QRScanner = () => {
  const navigate = useNavigate();
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [projectId, setProjectId] = useState('');
  const scanLineRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    // Animate scanning line
    if (scanLineRef.current && isScanning) {
      gsap.to(scanLineRef.current, {
        y: 280,
        duration: 2,
        repeat: -1,
        ease: 'none'
      });
    }

    // Animate corner brackets
    if (frameRef.current) {
      const corners = frameRef.current.querySelectorAll('.corner-bracket');
      gsap.to(corners, {
        opacity: 0.6,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }

    // Simulate camera permission (in real app, request actual camera access)
    // navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })

    return () => {
      gsap.killTweensOf(scanLineRef.current);
    };
  }, [isScanning]);

  const handleScanSuccess = (scannedData) => {
    setIsScanning(false);
    setShowSuccess(true);

    // Success animation
    gsap.to('.success-overlay', {
      opacity: 1,
      duration: 0.3,
      onComplete: () => {
        gsap.to('.success-overlay', {
          opacity: 0,
          duration: 0.3,
          delay: 0.5
        });
      }
    });

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }

    // Navigate to registration form with project data
    setTimeout(() => {
      navigate('/contractor/register', { state: { projectId: scannedData } });
    }, 1200);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (projectId.trim()) {
      handleScanSuccess(projectId);
    }
  };

  // Simulate scan for demo (remove in production)
  const handleSimulateScan = () => {
    handleScanSuccess('TH-001-DEMO');
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Camera Feed Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
        {/* In production, replace with actual camera feed */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/30 text-sm">Camera feed would appear here</p>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 w-11 h-11 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center z-10"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Flash Toggle */}
      <button
        onClick={() => setIsFlashOn(!isFlashOn)}
        className="absolute top-4 right-4 w-11 h-11 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center z-10"
      >
        <Zap className={`w-5 h-5 ${isFlashOn ? 'text-yellow-400' : 'text-white'}`} />
      </button>

      {/* Scanning Frame */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={frameRef} className="relative w-[280px] h-[280px]">
          {/* Corner Brackets */}
          <div className="corner-bracket absolute top-0 left-0 w-6 h-6 border-t-[3px] border-l-[3px] border-[#E67E22] rounded-tl-2xl"></div>
          <div className="corner-bracket absolute top-0 right-0 w-6 h-6 border-t-[3px] border-r-[3px] border-[#E67E22] rounded-tr-2xl"></div>
          <div className="corner-bracket absolute bottom-0 left-0 w-6 h-6 border-b-[3px] border-l-[3px] border-[#E67E22] rounded-bl-2xl"></div>
          <div className="corner-bracket absolute bottom-0 right-0 w-6 h-6 border-b-[3px] border-r-[3px] border-[#E67E22] rounded-br-2xl"></div>

          {/* Main Border */}
          <div className="absolute inset-0 border-[3px] border-[#E67E22] rounded-2xl"></div>

          {/* Scanning Line */}
          {isScanning && (
            <div
              ref={scanLineRef}
              className="absolute top-0 left-0 right-0 h-0.5 bg-[#E67E22] shadow-[0_0_20px_#E67E22]"
              style={{ transform: 'translateY(0)' }}
            ></div>
          )}

          {/* Success Checkmark */}
          {showSuccess && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-[#10B981] rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Overlay */}
      <div className="success-overlay absolute inset-0 bg-[#10B981]/20 pointer-events-none" style={{ opacity: 0 }}></div>

      {/* Instruction Text */}
      {isScanning && (
        <div className="absolute bottom-32 left-0 right-0 flex justify-center px-4">
          <div className="bg-black/60 backdrop-blur-md px-5 py-3 rounded-full">
            <p className="text-white text-center text-base">Align QR code within frame</p>
          </div>
        </div>
      )}

      {/* Manual Input Button */}
      {isScanning && (
        <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-3 px-4">
          <button
            onClick={() => setShowManualInput(true)}
            className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2 font-medium text-[#1A1F2E]"
          >
            <Hash className="w-5 h-5" />
            <span>Enter Project ID Manually</span>
          </button>

          {/* Demo Button - Remove in production */}
          <button
            onClick={handleSimulateScan}
            className="text-white/70 text-sm underline"
          >
            Simulate Scan (Demo)
          </button>
        </div>
      )}

      {/* Manual Input Modal */}
      {showManualInput && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 z-20">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1A1F2E]">Enter Project ID</h3>
              <button
                onClick={() => setShowManualInput(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA]"
              >
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>

            <form onSubmit={handleManualSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                  Project ID
                </label>
                <input
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  placeholder="e.g., TH-001"
                  className="w-full h-12 px-4 border-2 border-[#E5E7EB] rounded-xl text-[#1A1F2E] focus:border-[#E67E22] focus:ring-2 focus:ring-[#E67E22]/20 outline-none transition-all"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={!projectId.trim()}
                className="w-full h-12 bg-[#E67E22] text-white font-semibold rounded-xl disabled:bg-[#E5E7EB] disabled:text-[#6B7280] transition-all"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRScanner;

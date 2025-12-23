import { useEffect, useRef } from 'react';
import { Wallet, Play, Shield, Building, Users } from 'lucide-react';
import { useStore } from '../store/useStore';
import gsap from 'gsap';

const Hero = () => {
  const { openWalletModal } = useStore();
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonsRef = useRef(null);
  const trustRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(eyebrowRef.current, {
        x: -20,
        duration: 0.8,
        delay: 0.2,
      })
        .from(headingRef.current, {
          scale: 0.95,
          duration: 1,
        }, '-=0.4')
        .from(subheadingRef.current, {
          x: -20,
          duration: 0.8,
        }, '-=0.6')
        .from(buttonsRef.current.children, {
          y: 20,
          duration: 0.6,
          stagger: 0.2,
        }, '-=0.4')
        .from(trustRef.current.children, {
          y: 10,
          duration: 0.5,
          stagger: 0.15,
        }, '-=0.2')
        .from(visualRef.current, {
          scale: 0.95,
          duration: 1.5,
        }, 0.3);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-white to-bg-gray pt-24 pb-12 md:pt-32 md:pb-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Eyebrow */}
            <div ref={eyebrowRef}>
              <span className="text-sm font-semibold text-accent-orange uppercase tracking-wider">
                Blockchain-Powered Construction Management
              </span>
            </div>

            {/* Main Heading */}
            <h1 
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark-text leading-tight tracking-tight max-w-2xl"
            >
              Digital Product Passports for the Built Environment
            </h1>

            {/* Subheading */}
            <p 
              ref={subheadingRef}
              className="text-lg md:text-xl text-steel-gray leading-relaxed max-w-xl"
            >
              Immutable tracking of construction materials from procurement to installation. 
              Verified by blockchain, trusted by regulators.
            </p>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={openWalletModal}
                className="flex items-center justify-center space-x-2 bg-accent-orange hover:bg-accent-orange-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-accent-orange/30"
              >
                <Wallet size={20} />
                <span>Connect Wallet to Start</span>
              </button>

              <button
                className="flex items-center justify-center space-x-2 bg-transparent border-2 border-border-gray hover:border-accent-orange hover:bg-accent-orange/5 text-dark-text px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                <Play size={20} />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div ref={trustRef} className="flex flex-wrap gap-8 pt-8 md:pt-12">
              <div className="flex flex-col items-center space-y-2">
                <Shield className="w-6 h-6 text-accent-orange" />
                <span className="text-sm font-medium text-steel-gray">Blockchain Verified</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Building className="w-6 h-6 text-accent-orange" />
                <span className="text-sm font-medium text-steel-gray">1000+ Projects</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Users className="w-6 h-6 text-accent-orange" />
                <span className="text-sm font-medium text-steel-gray">Trusted by Regulators</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div ref={visualRef} className="relative">
            {/* Construction Illustration */}
            <div className="relative w-full h-[400px] md:h-[500px]">
              <svg viewBox="0 0 500 500" className="w-full h-full">
                {/* Building Structure */}
                <g className="building-structure">
                  {/* Base */}
                  <rect x="100" y="350" width="300" height="120" fill="#F8F9FA" stroke="#6B7280" strokeWidth="2" />
                  
                  {/* Floors */}
                  <rect x="100" y="250" width="300" height="100" fill="#FFFFFF" stroke="#6B7280" strokeWidth="2" />
                  <rect x="100" y="150" width="300" height="100" fill="#F8F9FA" stroke="#6B7280" strokeWidth="2" />
                  <rect x="100" y="80" width="300" height="70" fill="#FFFFFF" stroke="#6B7280" strokeWidth="2" />
                  
                  {/* Windows */}
                  <rect x="130" y="270" width="40" height="40" fill="#E5E7EB" />
                  <rect x="190" y="270" width="40" height="40" fill="#E5E7EB" />
                  <rect x="250" y="270" width="40" height="40" fill="#E5E7EB" />
                  <rect x="310" y="270" width="40" height="40" fill="#E5E7EB" />
                  
                  <rect x="130" y="170" width="40" height="40" fill="#E5E7EB" />
                  <rect x="190" y="170" width="40" height="40" fill="#E5E7EB" />
                  <rect x="250" y="170" width="40" height="40" fill="#E5E7EB" />
                  <rect x="310" y="170" width="40" height="40" fill="#E5E7EB" />
                </g>

                {/* Blockchain Nodes */}
                <g className="blockchain-nodes">
                  <circle cx="150" cy="290" r="12" fill="#E67E22" opacity="0.8">
                    <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="250" cy="190" r="12" fill="#E67E22" opacity="0.8">
                    <animate attributeName="r" values="12;16;12" dur="2s" begin="0.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="350" cy="290" r="12" fill="#E67E22" opacity="0.8">
                    <animate attributeName="r" values="12;16;12" dur="2s" begin="1s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Connection Lines */}
                  <line x1="150" y1="290" x2="250" y2="190" stroke="#E67E22" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
                  <line x1="250" y1="190" x2="350" y2="290" stroke="#E67E22" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
                </g>

                {/* QR Codes */}
                <g className="qr-codes">
                  <rect x="60" y="240" width="30" height="30" fill="#1A1F2E" opacity="0.7" />
                  <rect x="410" y="180" width="30" height="30" fill="#1A1F2E" opacity="0.7" />
                  
                  {/* QR pattern */}
                  <rect x="63" y="243" width="6" height="6" fill="#FFFFFF" />
                  <rect x="81" y="243" width="6" height="6" fill="#FFFFFF" />
                  <rect x="63" y="261" width="6" height="6" fill="#FFFFFF" />
                  <rect x="81" y="261" width="6" height="6" fill="#FFFFFF" />
                  
                  <rect x="413" y="183" width="6" height="6" fill="#FFFFFF" />
                  <rect x="431" y="183" width="6" height="6" fill="#FFFFFF" />
                  <rect x="413" y="201" width="6" height="6" fill="#FFFFFF" />
                  <rect x="431" y="201" width="6" height="6" fill="#FFFFFF" />
                </g>

                {/* Crane */}
                <g className="crane">
                  <line x1="420" y1="50" x2="420" y2="250" stroke="#6B7280" strokeWidth="4" />
                  <line x1="420" y1="50" x2="480" y2="50" stroke="#E67E22" strokeWidth="3" />
                  <line x1="420" y1="50" x2="350" y2="50" stroke="#E67E22" strokeWidth="3" />
                  <rect x="415" y="245" width="10" height="20" fill="#6B7280" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div ref={(el) => {
          if (el) {
            gsap.from(el, {
              y: 20,
              duration: 1,
              delay: 1.5,
              ease: 'power2.out',
            });
          }
        }} className="flex flex-col items-center justify-center mt-12 md:mt-20 opacity-60 hover:opacity-100 transition-opacity">
          <div className="w-6 h-10 border-2 border-steel-gray rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-steel-gray rounded-full animate-bounce"></div>
          </div>
          <span className="text-sm text-steel-gray mt-2">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;

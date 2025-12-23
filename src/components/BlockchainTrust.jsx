import { useEffect, useRef, useState } from 'react';
import { Shield, Lock, Globe, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BlockchainTrust = () => {
  const sectionRef = useRef(null);
  const metricsRef = useRef([]);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const targets = [100, 256, 1, 1];
    const hasAnimated = { current: false };

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      onEnter: () => {
        if (!hasAnimated.current) {
          hasAnimated.current = true;
          targets.forEach((target, index) => {
            const duration = 2000;
            const startTime = Date.now();
            
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const current = Math.floor(easeOutQuart * target);
              
              setCounts((prev) => {
                const newCounts = [...prev];
                newCounts[index] = current;
                return newCounts;
              });
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            
            animate();
          });
        }
      },
    });

    const metrics = metricsRef.current.filter(Boolean);
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from('.trust-eyebrow', {
      x: -20,
      duration: 0.6,
      ease: 'power3.out',
    })
      .from('.trust-heading', {
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.3')
      .from('.trust-description', {
        y: 10,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')
      .from(metrics, {
        y: 30,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
      }, '-=0.2')
      .from('.trust-logos-text', {
        y: 10,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3')
      .from('.trust-logos > *', {
        scale: 0.9,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.5)',
      }, '-=0.2');
  }, []);

  const metrics = [
    { icon: Shield, value: counts[0], suffix: '%', label: 'Data Immutability' },
    { icon: Lock, value: counts[1], suffix: '-bit', label: 'Encryption Standard' },
    { icon: Globe, value: 'Public', suffix: '', label: 'Verification Access' },
    { icon: Clock, value: 'Instant', suffix: '', label: 'Blockchain Confirmation' },
  ];

  return (
    <section 
      id="verification" 
      ref={sectionRef} 
      className="py-20 md:py-28"
      style={{
        background: 'linear-gradient(to bottom right, #1A1F2E, #2D3748)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="trust-eyebrow text-sm font-semibold text-accent-orange uppercase tracking-wider">
            Built on Trust
          </span>
          <h2 className="trust-heading text-4xl md:text-5xl font-bold mt-4 mb-6" style={{ color: '#FFFFFF' }}>
            Powered by Ethereum Blockchain
          </h2>
          <p className="trust-description text-lg md:text-xl max-w-2xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Immutable, transparent, and verifiable by anyone
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              ref={(el) => (metricsRef.current[index] = el)}
              className="bg-white/5 border border-white/10 rounded-xl p-8 text-center backdrop-blur-lg hover:bg-white/10 transition-all duration-300"
            >
              <metric.icon className="w-12 h-12 text-accent-orange mx-auto mb-4" />
              <div className="text-5xl font-extrabold mb-2" style={{ color: '#FFFFFF' }}>
                {typeof metric.value === 'number' ? metric.value : metric.value}
                {metric.suffix}
              </div>
              <div className="text-base font-medium" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Integration Logos */}
        <div className="text-center">
          <p className="trust-logos-text text-base mb-8" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Integrated with</p>
          <div className="trust-logos flex flex-wrap justify-center items-center gap-12 md:gap-16">
            {/* Ethereum Logo */}
            <div className="opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
              <svg className="h-10 w-auto" viewBox="0 0 256 417" fill="currentColor">
                <path d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" fill="#FFFFFF"/>
                <path d="M127.962 0L0 212.32l127.962 75.639V154.158z" fill="#FFFFFF" opacity="0.6"/>
                <path d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z" fill="#FFFFFF"/>
                <path d="M127.962 416.905v-104.72L0 236.585z" fill="#FFFFFF" opacity="0.6"/>
              </svg>
            </div>

            {/* IPFS Logo */}
            <div className="opacity-60 hover:opacity-100 transition-opacity">
              <span className="text-4xl font-bold text-white">IPFS</span>
            </div>

            {/* WalletConnect Logo */}
            <div className="opacity-60 hover:opacity-100 transition-opacity">
              <svg className="h-10 w-auto" viewBox="0 0 300 185" fill="none">
                <path d="M61.438 36.783c39.56-38.706 103.683-38.706 143.243 0l4.76 4.656a4.86 4.86 0 010 6.987l-16.28 15.93a2.56 2.56 0 01-3.558 0l-6.55-6.407c-27.604-27.006-72.352-27.006-99.956 0l-7.016 6.865a2.56 2.56 0 01-3.558 0l-16.28-15.93a4.86 4.86 0 010-6.987l5.195-5.084zm176.926 32.953l14.494 14.18a4.86 4.86 0 010 6.988l-65.357 63.956a5.12 5.12 0 01-7.116 0l-46.379-45.388a1.28 1.28 0 00-1.779 0l-46.379 45.388a5.12 5.12 0 01-7.116 0L13.375 90.904a4.86 4.86 0 010-6.988l14.494-14.18a5.12 5.12 0 017.116 0l46.379 45.389a1.28 1.28 0 001.779 0l46.378-45.389a5.12 5.12 0 017.116 0l46.379 45.389a1.28 1.28 0 001.779 0l46.379-45.389a5.12 5.12 0 017.116 0h.001z" fill="#FFFFFF"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlockchainTrust;

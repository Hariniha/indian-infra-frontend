import { useEffect, useRef } from 'react';
import { QrCode, Shield, FileText, CheckCircle, Activity, Users, Download, Search } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from('.features-eyebrow', {
      x: -20,
      duration: 0.6,
      ease: 'power3.out',
    })
      .from('.features-heading', {
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.3')
      .from('.features-description', {
        y: 10,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')
      .from(cards, {
        y: 30,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      }, '-=0.2');
  }, []);

  const features = [
    {
      icon: QrCode,
      title: 'Digital Product Passports',
      description: 'Create immutable records for every construction material with QR code tracking',
    },
    {
      icon: Shield,
      title: 'Blockchain Verification',
      description: 'Cryptographically secure data stored on Ethereum. Tamper-proof and publicly verifiable',
    },
    {
      icon: FileText,
      title: 'Complete Documentation',
      description: 'Store certifications, warranties, and O&M manuals with IPFS content addressing',
    },
    {
      icon: CheckCircle,
      title: 'Regulatory Compliance',
      description: 'Instant verification for building inspectors. Fire safety, EPD, and warranty tracking',
    },
    {
      icon: Activity,
      title: 'Real-time Tracking',
      description: 'Monitor installation progress, document status, and blockchain confirmations live',
    },
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Separate dashboards for owners, contractors, installers, suppliers, and regulators',
    },
    {
      icon: Download,
      title: 'Digital Handover',
      description: 'Generate complete asset registers with blockchain-verified documentation for owners',
    },
    {
      icon: Search,
      title: 'Public Verification',
      description: 'No-login verification portal for regulators to instantly check product authenticity',
    },
  ];

  return (
    <section id="features" ref={sectionRef} className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="features-eyebrow text-sm font-semibold text-accent-orange uppercase tracking-wider">
            Platform Features
          </span>
          <h2 className="features-heading text-4xl md:text-5xl font-bold text-dark-text mt-4 mb-6">
            Complete Lifecycle Management
          </h2>
          <p className="features-description text-lg md:text-xl text-steel-gray max-w-2xl mx-auto">
            From procurement to handover, every step verified on blockchain
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-bg-gray border border-border-gray rounded-xl p-8 hover:border-accent-orange hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-accent-orange/10 to-accent-orange-dark/10 rounded-xl flex items-center justify-center mb-5">
                <feature.icon className="w-7 h-7 text-accent-orange" />
              </div>
              <h3 className="text-xl font-bold text-dark-text mb-3">
                {feature.title}
              </h3>
              <p className="text-base text-steel-gray leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

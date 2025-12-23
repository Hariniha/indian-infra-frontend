import { useEffect, useRef } from 'react';
import { Building2, Package, Wrench, FileStack, CheckSquare, ShieldCheck, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const steps = stepsRef.current.filter(Boolean);
    
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    headerTl.from('.timeline-eyebrow', {
      x: -20,
      duration: 0.6,
      ease: 'power3.out',
    })
      .from('.timeline-heading', {
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.3')
      .from('.timeline-description', {
        y: 10,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4');

    steps.forEach((step, index) => {
      if (step) {
        gsap.from(step, {
          x: index % 2 === 0 ? -50 : 50,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            once: false,
          },
        });
      }
    });
  }, []);

  const steps = [
    {
      icon: Building2,
      phase: 'Phase 1',
      title: 'Project Initialization',
      description: 'Owner creates project and deploys smart contract registry',
      actions: [
        'Define project scope and structure',
        'Add team members with permissions',
        'Deploy project registry on Ethereum',
        'Generate unique project QR code',
      ],
      anchor: '#0 - Project Registry',
    },
    {
      icon: Package,
      phase: 'Phase 2',
      title: 'Material Procurement',
      description: 'Contractor records material delivery and creates Digital Product Passport',
      actions: [
        'Scan project QR on-site',
        'Record product and supplier details',
        'Upload delivery photos to IPFS',
        'Mint DPP on blockchain',
      ],
      anchor: '#1 - Product Delivery',
    },
    {
      icon: Wrench,
      phase: 'Phase 3',
      title: 'Installation & Commissioning',
      description: 'Installer updates DPP with installation records and certificates',
      actions: [
        'Scan product QR code',
        'Record installation location',
        'Upload commissioning documents',
        'Submit safety certifications',
      ],
      anchor: '#2 - Installation Record',
    },
    {
      icon: FileStack,
      phase: 'Phase 4',
      title: 'Technical Data Enrichment',
      description: 'Supplier adds technical specifications and compliance documents',
      actions: [
        'Add EPD and fire certifications',
        'Upload warranty documents',
        'Provide maintenance manuals',
        'Submit technical datasheets',
      ],
      anchor: '#3 - Product Verification',
    },
    {
      icon: CheckSquare,
      phase: 'Phase 5',
      title: 'Owner Validation',
      description: 'Owner reviews complete asset inventory and generates handover pack',
      actions: [
        'Review compliance status',
        'Verify all documentation',
        'Generate digital handover',
        'Download asset register',
      ],
      anchor: null,
    },
    {
      icon: ShieldCheck,
      phase: 'Phase 6',
      title: 'Regulatory Inspection',
      description: 'Inspector verifies authenticity directly on blockchain without login',
      actions: [
        'Scan product QR on-site',
        'View complete audit trail',
        'Verify data on Etherscan',
        'Submit inspection approval',
      ],
      anchor: '#4 - Regulatory Approval',
    },
  ];

  return (
    <section id="process" ref={sectionRef} className="py-20 md:py-32 bg-gradient-to-b from-bg-gray via-white to-bg-gray">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="timeline-eyebrow text-sm font-semibold text-accent-orange uppercase tracking-wider">
            The Process
          </span>
          <h2 className="timeline-heading text-4xl md:text-5xl font-bold text-dark-text mt-4 mb-6">
            From Delivery to Handover
          </h2>
          <p className="timeline-description text-lg md:text-xl text-steel-gray max-w-2xl mx-auto">
            Six blockchain-anchored phases ensuring complete transparency
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border-gray transform -translate-x-1/2"></div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 md:gap-12 items-center`}
              >
                {/* Step Number Badge */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-accent-orange border-4 border-white rounded-full items-center justify-center z-10 shadow-lg">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white border border-border-gray rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    {/* Mobile Step Number */}
                    <div className="md:hidden w-12 h-12 bg-accent-orange rounded-full flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>

                    <step.icon className={`w-10 h-10 text-accent-orange mb-4 ${index % 2 === 0 ? 'md:ml-auto' : ''}`} />
                    
                    <div className={`mb-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <span className="text-sm font-semibold text-accent-orange uppercase tracking-wide">
                        {step.phase}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-dark-text mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-base text-steel-gray leading-relaxed mb-5">
                      {step.description}
                    </p>

                    {/* Key Actions */}
                    <ul className={`space-y-2 mb-5 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      {step.actions.map((action, i) => (
                        <li key={i} className={`flex items-start gap-2 text-sm text-steel-gray ${index % 2 === 0 ? 'md:flex-row-reverse md:justify-end' : ''}`}>
                          <Check className="w-4 h-4 text-success-green flex-shrink-0 mt-0.5" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Blockchain Badge */}
                    {step.anchor && (
                      <div className={`inline-flex items-center gap-2 bg-accent-orange/10 px-3 py-1.5 rounded-lg ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                        <svg className="w-3.5 h-3.5 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span className="text-xs font-semibold text-accent-orange">
                          Blockchain Anchor {step.anchor}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-[calc(50%-3rem)]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;

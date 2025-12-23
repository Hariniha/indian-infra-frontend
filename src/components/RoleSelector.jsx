import { useEffect, useRef } from 'react';
import { Building, HardHat, Wrench, Package, ClipboardCheck, Scale, Check, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RoleSelector = () => {
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

    tl.from('.roles-eyebrow', {
      x: -20,
      duration: 0.6,
      ease: 'power3.out',
    })
      .from('.roles-heading', {
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.3')
      .from('.roles-description', {
        y: 10,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')
      .from(cards, {
        scale: 0.95,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.2)',
      }, '-=0.2');
  }, []);

  const roles = [
    {
      icon: Building,
      title: 'Owner / Developer',
      description: 'Complete project oversight with asset management and compliance tracking',
      features: [
        'Create and manage projects',
        'Monitor team activities',
        'Generate digital handover packs',
        'View analytics and reports',
      ],
    },
    {
      icon: HardHat,
      title: 'Contractor',
      description: 'On-site product registration with mobile-friendly procurement interface',
      features: [
        'Scan project QR codes',
        'Create Digital Product Passports',
        'Upload delivery documentation',
        'Track material inventory',
      ],
    },
    {
      icon: Wrench,
      title: 'Installer / MEP Team',
      description: 'Installation updates and commissioning document management',
      features: [
        'Update installation records',
        'Upload certificates',
        'Record commissioning data',
        'Track assigned products',
      ],
    },
    {
      icon: Package,
      title: 'Supplier / Manufacturer',
      description: 'Enrich product data with technical specifications and certifications',
      features: [
        'Add EPD documents',
        'Upload fire certifications',
        'Provide warranty terms',
        'Submit technical datasheets',
      ],
    },
    {
      icon: ClipboardCheck,
      title: 'Building Inspector',
      description: 'Instant verification portal for on-site compliance checking',
      features: [
        'Scan product QR codes',
        'View blockchain audit trail',
        'Verify document authenticity',
        'Submit inspection reports',
      ],
    },
    {
      icon: Scale,
      title: 'Regulator / Authority',
      description: 'Public verification without login for regulatory oversight',
      features: [
        'No-login verification',
        'Direct blockchain reads',
        'Independent data checking',
        'Compliance monitoring',
      ],
    },
  ];

  return (
    <section id="roles" ref={sectionRef} className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="roles-eyebrow text-sm font-semibold text-accent-orange uppercase tracking-wider">
            Built for Everyone
          </span>
          <h2 className="roles-heading text-4xl md:text-5xl font-bold text-dark-text mt-4 mb-6">
            Choose Your Role
          </h2>
          <p className="roles-description text-lg md:text-xl text-steel-gray max-w-2xl mx-auto">
            Tailored dashboards for every stakeholder in construction
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-bg-gray border-2 border-border-gray rounded-2xl p-8 text-center hover:border-accent-orange hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-accent-orange/10 to-accent-orange-dark/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <role.icon className="w-10 h-10 text-accent-orange" />
              </div>
              
              <h3 className="text-2xl font-bold text-dark-text mb-3">
                {role.title}
              </h3>
              
              <p className="text-base text-steel-gray leading-relaxed mb-6">
                {role.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2 mb-6 text-left">
                {role.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-steel-gray">
                    <Check className="w-3.5 h-3.5 text-success-green flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Learn More Link */}
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent-orange hover:gap-3 transition-all"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoleSelector;

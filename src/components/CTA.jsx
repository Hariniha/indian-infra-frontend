import { useEffect, useRef } from 'react';
import { Wallet } from 'lucide-react';
import { useStore } from '../store/useStore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const { openWalletModal } = useStore();
  const sectionRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from('.cta-heading', {
      scale: 0.95,
      duration: 0.8,
      ease: 'power3.out',
    })
      .from('.cta-description', {
        y: 10,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')
      .from('.cta-button', {
        y: 20,
        scale: 0.95,
        duration: 0.6,
        ease: 'back.out(1.5)',
      }, '-=0.2')
      .from('.cta-support-text', {
        y: 10,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3')
      .from('.cta-wallet-icons > *', {
        scale: 0.8,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(1.5)',
      }, '-=0.2');
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-bg-gray">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <h2 className="cta-heading text-4xl md:text-5xl font-extrabold text-dark-text leading-tight mb-6">
          Ready to Transform Your Construction Project?
        </h2>
        
        <p className="cta-description text-lg md:text-xl text-steel-gray mb-10">
          Connect your wallet to get started. Choose your role and access your personalized dashboard.
        </p>

        <button
          onClick={openWalletModal}
          className="cta-button inline-flex items-center space-x-3 bg-accent-orange hover:bg-accent-orange-dark text-white px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 hover:-translate-y-1 shadow-2xl shadow-accent-orange/40"
        >
          <Wallet size={24} />
          <span>Connect Wallet & Choose Role</span>
        </button>

        <p className="cta-support-text text-sm text-steel-gray mt-6">
          Supports MetaMask, WalletConnect, and Coinbase Wallet
        </p>

        <div className="cta-wallet-icons flex justify-center items-center gap-6 mt-4 opacity-60">
          {/* Wallet Icons */}
          <div className="w-8 h-8 bg-steel-gray rounded-lg"></div>
          <div className="w-8 h-8 bg-steel-gray rounded-lg"></div>
          <div className="w-8 h-8 bg-steel-gray rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

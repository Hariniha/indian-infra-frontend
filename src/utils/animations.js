import gsap from 'gsap';

// Page Transition Animations
export const pageTransition = {
  // Slide in from right (for forward navigation)
  slideInRight: (element, onComplete) => {
    gsap.fromTo(
      element,
      { x: '100%', opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.4, 
        ease: 'power2.out',
        onComplete 
      }
    );
  },

  // Slide in from left (for back navigation)
  slideInLeft: (element, onComplete) => {
    gsap.fromTo(
      element,
      { x: '-100%', opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.4, 
        ease: 'power2.out',
        onComplete 
      }
    );
  },

  // Fade in (for initial loads)
  fadeIn: (element, onComplete) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        ease: 'power2.out',
        onComplete 
      }
    );
  },

  // Slide up (for modals)
  slideUp: (element, onComplete) => {
    gsap.fromTo(
      element,
      { y: '100%', opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.4, 
        ease: 'power3.out',
        onComplete 
      }
    );
  }
};

// Button Interactions
export const buttonAnimations = {
  // Tap feedback (scale down)
  tap: (element) => {
    gsap.to(element, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power1.out',
      yoyo: true,
      repeat: 1
    });
  },

  // Bounce (for success actions)
  bounce: (element) => {
    gsap.fromTo(
      element,
      { scale: 1 },
      {
        scale: 1.1,
        duration: 0.2,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      }
    );
  },

  // Pulse (for attention)
  pulse: (element, repeat = 3) => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.5,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: repeat * 2 - 1
    });
  },

  // Shake (for errors)
  shake: (element) => {
    gsap.to(element, {
      x: [-10, 10, -10, 10, 0],
      duration: 0.4,
      ease: 'power1.inOut'
    });
  }
};

// Loading Animations
export const loadingAnimations = {
  // Shimmer effect for skeleton loaders
  shimmer: (element) => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(element, {
      backgroundPosition: '200% center',
      duration: 1.5,
      ease: 'none'
    });
    return tl;
  },

  // Spinner
  spin: (element) => {
    gsap.to(element, {
      rotation: 360,
      duration: 1,
      ease: 'none',
      repeat: -1
    });
  },

  // Dots loading
  dots: (elements) => {
    const tl = gsap.timeline({ repeat: -1 });
    elements.forEach((element, i) => {
      tl.to(element, {
        y: -10,
        duration: 0.3,
        ease: 'power1.out',
        yoyo: true,
        repeat: 1
      }, i * 0.1);
    });
    return tl;
  }
};

// List Animations
export const listAnimations = {
  // Stagger fade in
  staggerFadeIn: (elements, delay = 0) => {
    gsap.fromTo(
      elements,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        delay,
        ease: 'power2.out'
      }
    );
  },

  // Stagger slide in from right
  staggerSlideIn: (elements, delay = 0) => {
    gsap.fromTo(
      elements,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.08,
        delay,
        ease: 'power2.out'
      }
    );
  },

  // Remove item animation
  removeItem: (element, onComplete) => {
    const tl = gsap.timeline({ onComplete });
    tl.to(element, {
      x: 100,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });
    tl.to(element, {
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.2,
      ease: 'power2.out'
    });
    return tl;
  }
};

// Success Animations
export const successAnimations = {
  // Checkmark draw
  checkmark: (element, onComplete) => {
    const tl = gsap.timeline({ onComplete });
    tl.fromTo(
      element,
      { 
        scale: 0, 
        rotation: -180 
      },
      {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'back.out(2)'
      }
    );
    tl.to(element, {
      scale: 1.1,
      duration: 0.2,
      ease: 'power1.out',
      yoyo: true,
      repeat: 1
    });
    return tl;
  },

  // Confetti burst
  confetti: (container, count = 50) => {
    const colors = ['#E67E22', '#10B981', '#3B82F6', '#F59E0B', '#EF4444'];
    const confettiElements = [];

    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.left = '50%';
      confetti.style.top = '50%';
      confetti.style.pointerEvents = 'none';
      container.appendChild(confetti);
      confettiElements.push(confetti);

      const angle = (Math.random() * 360) * (Math.PI / 180);
      const velocity = 100 + Math.random() * 200;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity;

      gsap.to(confetti, {
        x,
        y: y - 200,
        rotation: Math.random() * 720,
        opacity: 0,
        duration: 1 + Math.random(),
        ease: 'power2.out',
        onComplete: () => confetti.remove()
      });
    }
  },

  // Success popup
  popup: (element, onComplete) => {
    const tl = gsap.timeline({ onComplete });
    tl.fromTo(
      element,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(2)'
      }
    );
    return tl;
  }
};

// Form Animations
export const formAnimations = {
  // Field focus
  fieldFocus: (element) => {
    gsap.to(element, {
      scale: 1.02,
      duration: 0.2,
      ease: 'power1.out'
    });
  },

  // Field blur
  fieldBlur: (element) => {
    gsap.to(element, {
      scale: 1,
      duration: 0.2,
      ease: 'power1.out'
    });
  },

  // Error shake
  errorShake: (element) => {
    gsap.fromTo(
      element,
      { x: 0 },
      {
        x: [-10, 10, -8, 8, -5, 5, 0],
        duration: 0.5,
        ease: 'power1.inOut'
      }
    );
  },

  // Progress bar
  progressBar: (element, progress, duration = 0.5) => {
    gsap.to(element, {
      width: `${progress}%`,
      duration,
      ease: 'power2.out'
    });
  }
};

// Card Animations
export const cardAnimations = {
  // Flip card
  flip: (element, onComplete) => {
    const tl = gsap.timeline({ onComplete });
    tl.to(element, {
      rotationY: 90,
      duration: 0.3,
      ease: 'power2.in'
    });
    tl.set(element, { rotationY: -90 });
    tl.to(element, {
      rotationY: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
    return tl;
  },

  // Hover lift
  hoverLift: (element) => {
    gsap.to(element, {
      y: -5,
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      duration: 0.3,
      ease: 'power2.out'
    });
  },

  // Hover settle
  hoverSettle: (element) => {
    gsap.to(element, {
      y: 0,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      duration: 0.3,
      ease: 'power2.out'
    });
  }
};

// Number Counter Animation
export const counterAnimation = (element, from, to, duration = 1, decimals = 0) => {
  const obj = { value: from };
  gsap.to(obj, {
    value: to,
    duration,
    ease: 'power1.out',
    onUpdate: () => {
      element.textContent = obj.value.toFixed(decimals);
    }
  });
};

// Notification Toast Animation
export const toastAnimation = {
  show: (element, onComplete) => {
    const tl = gsap.timeline({ onComplete });
    tl.fromTo(
      element,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(1.5)'
      }
    );
    return tl;
  },

  hide: (element, onComplete) => {
    gsap.to(element, {
      y: -100,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete
    });
  }
};

// Photo Capture Animation
export const photoCaptureAnimation = {
  flash: (element) => {
    const tl = gsap.timeline();
    tl.to(element, {
      backgroundColor: '#ffffff',
      duration: 0.1,
      ease: 'none'
    });
    tl.to(element, {
      backgroundColor: 'transparent',
      duration: 0.3,
      ease: 'power2.out'
    });
    return tl;
  },

  shutter: (element) => {
    const tl = gsap.timeline();
    tl.fromTo(
      element,
      { scaleY: 0, transformOrigin: 'center center' },
      {
        scaleY: 1,
        duration: 0.15,
        ease: 'power2.out'
      }
    );
    tl.to(element, {
      scaleY: 0,
      duration: 0.15,
      ease: 'power2.in'
    });
    return tl;
  }
};

// Utility function to kill all animations on an element
export const killAnimations = (element) => {
  gsap.killTweensOf(element);
};

export default {
  pageTransition,
  buttonAnimations,
  loadingAnimations,
  listAnimations,
  successAnimations,
  formAnimations,
  cardAnimations,
  counterAnimation,
  toastAnimation,
  photoCaptureAnimation,
  killAnimations
};

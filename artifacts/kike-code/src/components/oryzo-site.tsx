import { useState, useRef, useEffect, Suspense, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useInView, useMotionValueEvent, type MotionValue } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import type { BusinessTemplate } from "@/lib/templates/types";
import { submitLead } from "@/lib/plw";

const DEFAULT_HERO = "/template-assets/barro-ceramica/barro_hero.jpg";
const DEFAULT_PORTRAIT = "/template-assets/barro-ceramica/barro_void.jpg";
const DEFAULT_GALLERY = [
  "/template-assets/barro-ceramica/barro_stack.jpg",
  "/template-assets/barro-ceramica/barro_camp.jpg",
  "/template-assets/barro-ceramica/barro_orange.jpg",
];

const CUTOUTS = [
  "/template-assets/barro-ceramica/barro_cut1.png",
  "/template-assets/barro-ceramica/barro_cut2.png",
  "/template-assets/barro-ceramica/barro_cut3.png",
];

const LABELS = {
  voidText1: { en: "SO SIMPLE", es: "TAN SIMPLE" },
  voidText2: { en: "IT'S FOREVER", es: "QUE ES ETERNA" },
  sustainable: { en: "SUSTAINABLE", es: "SOSTENIBLE" },
  stackCaption: { en: "PERFECT WEIGHT", es: "PESO PERFECTO" },
  campCaption: { en: "FORGED IN FIRE", es: "FORJADA AL FUEGO" },
  panelClaim: { en: "THE LAST MUG YOU'LL BUY", es: "LA ÚLTIMA TAZA QUE COMPRARÁS" },
  waitlistPlaceholder: { en: "Enter your email...", es: "Ingresa tu email..." },
  submitText: { en: "JOIN WAITLIST", es: "UNIRSE A LA LISTA" },
  credit: { en: "MADE BY KIKE CODE", es: "HECHO POR KIKE CODE" },
  instagram: { en: "Instagram", es: "Instagram" },
};

function AnimatedDivider({ reduced }: { reduced: boolean | null }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  if (reduced) return <div className="absolute top-0 left-0 w-full border-t border-dashed border-[#40372e] z-20" />;
  return (
    <div ref={ref} className="absolute top-0 left-0 w-full h-[1px] overflow-hidden z-20">
      <motion.div 
        className="w-full h-full border-t border-dashed border-[#40372e]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "circOut" }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

// Preload the mug model
useGLTF.preload("/template-assets/barro-ceramica/barro_mug.glb");

function Mug3D({ progressRef, mouseRef }: { progressRef: React.MutableRefObject<number>; mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const { scene } = useGLTF("/template-assets/barro-ceramica/barro_mug.glb") as any;
  const meshRef = useRef<THREE.Group>(null);
  const idleTime = useRef(0);
  const normalizedScale = useRef(1);

  // Normalize model size on mount (use layoutEffect to ensure scene is ready)
  useLayoutEffect(() => {
    if (!scene) return;
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    // Target world size: 2.5 units (so choreography scale 1.5 = ~3.75 units total, ~40-50% viewport height)
    normalizedScale.current = maxDim > 0 ? 1.5 / maxDim : 1;
    scene.scale.setScalar(normalizedScale.current);
  }, [scene]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    idleTime.current += delta;
    const scrollProgress = progressRef.current;
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;

    // Scroll-driven position
    let y = 0;
    let z = 0;
    let scale = 1.0;
    
    if (scrollProgress < 0.14) {
      // Hero section: mug low-center, smaller
      y = -1.2 + scrollProgress * 2;
      z = 0;
      scale = 0.85 + scrollProgress * 3.2; // 0.85 → ~1.3 across the hero
    } else if (scrollProgress < 0.43) {
      // Void text section: centered, large (40-50% viewport height)
      const t = (scrollProgress - 0.14) / (0.43 - 0.14);
      y = 0.2 - t * 0.1;
      z = 0;
      scale = 1.5; // Target dominant size
    } else if (scrollProgress < 0.72) {
      // Gradient watermark: drifts up/right
      const t = (scrollProgress - 0.43) / (0.72 - 0.43);
      y = 0.1 + t * 0.4;
      z = 0;
      scale = 1.5 - t * 0.3;
    } else {
      // Faded out
      y = 0.5;
      z = -5;
      scale = 1.0;
    }

    meshRef.current.position.set(0, y, z);
    meshRef.current.scale.setScalar(scale);

    // Continuous tumbling rotation (doubled speed, scroll-driven base + idle wobble)
    const baseTumble = scrollProgress * Math.PI * 12; // ~6 full rotations across journey (2x)
    const idleWobbleX = Math.sin(idleTime.current * 0.4) * 0.08;
    const idleWobbleY = Math.cos(idleTime.current * 0.3) * 0.08;

    // Pointer tilt (lerped)
    const targetRotX = baseTumble + idleWobbleX + mouseY * 0.3;
    const targetRotY = baseTumble * 1.3 + idleWobbleY + mouseX * 0.3;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.05);

    // Idle bob
    meshRef.current.position.y += Math.sin(idleTime.current * 0.8) * 0.01;
  });

  return (
    <group ref={meshRef}>
      <primitive object={scene} />
    </group>
  );
}

function Scene3D({ progressRef, mouseRef }: { progressRef: React.MutableRefObject<number>; mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[-3, -2, 2]} intensity={2.5} color="#ff9a4d" />
      <pointLight position={[-2, 0, 1]} intensity={0.8} color="#ffb87d" />
      <hemisphereLight intensity={0.4} color="#ffffff" groundColor="#100904" />
      <Environment preset="sunset" />
      <Mug3D progressRef={progressRef} mouseRef={mouseRef} />
    </>
  );
}

function Mug3DLayer({ progress }: { progress: MotionValue<number> }) {
  const progressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useMotionValueEvent(progress, "change", (v) => {
    progressRef.current = v;
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const { innerWidth, innerHeight } = window;
      mouseRef.current = { x: (clientX / innerWidth) * 2 - 1, y: (clientY / innerHeight) * 2 - 1 };
    };
    const handleLeave = () => { mouseRef.current = { x: 0, y: 0 }; };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("touchend", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("touchend", handleLeave);
    };
  }, []);

  const layerOpacity = useTransform(progress, [0, 0.05, 0.11, 0.75, 0.85], [0, 0, 1, 1, 0]);
  const layerVisibility = useTransform(progress, (v) => (v < 0.86 ? "visible" : "hidden"));

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[60] flex items-center justify-center"
      style={{ opacity: layerOpacity, visibility: layerVisibility as any }}
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene3D progressRef={progressRef} mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}

function PNGFallbackLayer({ 
  progress 
}: { 
  progress: MotionValue<number>;
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setScrollProgress(v));
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const { innerWidth, innerHeight } = window;
      setMousePos({ x: (clientX / innerWidth) * 2 - 1, y: (clientY / innerHeight) * 2 - 1 });
    };
    const handleLeave = () => setMousePos({ x: 0, y: 0 });
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("touchend", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("touchend", handleLeave);
    };
  }, []);

  // Compute values directly from scrollProgress
  let mugX = "0vw";
  let mugY = "5vh";
  let mugScale = 0.9;
  let mugRotateZ = 0;
  let op1 = 1, op2 = 0, op3 = 0;
  let masterOpacity = 1;

  if (scrollProgress < 0.2) {
    op1 = 1;
  } else if (scrollProgress < 0.3) {
    op1 = 1 - (scrollProgress - 0.2) / 0.1;
    op2 = (scrollProgress - 0.2) / 0.1;
  } else if (scrollProgress < 0.55) {
    op2 = 1;
  } else if (scrollProgress < 0.65) {
    op2 = 1 - (scrollProgress - 0.55) / 0.1;
    op3 = (scrollProgress - 0.55) / 0.1;
  } else if (scrollProgress < 0.8) {
    op3 = 1;
  }

  if (scrollProgress < 0.28) {
    const t = scrollProgress / 0.28;
    mugX = `${0 + t * (-5)}vw`;
    mugY = `${5 + t * (-5)}vh`;
    mugScale = 0.9 + t * 0.5;
    mugRotateZ = 0 + t * 15;
  } else if (scrollProgress < 0.5) {
    const t = (scrollProgress - 0.28) / (0.5 - 0.28);
    mugX = `${-5 + t * 10}vw`;
    mugY = "0vh";
    mugScale = 1.4 + t * 0.1;
    mugRotateZ = 15 + t * (-25);
  } else if (scrollProgress < 0.71) {
    const t = (scrollProgress - 0.5) / (0.71 - 0.5);
    mugX = `${5 + t * (-5)}vw`;
    mugY = "0vh";
    mugScale = 1.5 - t * 0.1;
    mugRotateZ = -10 + t * 15;
  } else if (scrollProgress < 0.85) {
    const t = (scrollProgress - 0.71) / (0.85 - 0.71);
    mugX = "0vw";
    mugY = `${0 + t * (-10)}vh`;
    mugScale = 1.4 - t * 0.2;
    mugRotateZ = 5 + t * (-5);
  }

  if (scrollProgress >= 0.75) {
    masterOpacity = scrollProgress < 0.85 ? 1 - (scrollProgress - 0.75) / 0.1 : 0;
  }

  const isVisible = scrollProgress < 0.86;

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-[60] flex items-center justify-center overflow-hidden" 
      style={{ 
        perspective: "1200px", 
        opacity: masterOpacity, 
        visibility: isVisible ? "visible" : "hidden" 
      }}
    >
      <motion.div 
        className="pointer-events-auto cursor-grab active:cursor-grabbing"
        style={{ 
          x: mugX, 
          y: mugY, 
          scale: mugScale, 
          rotateZ: `${mugRotateZ}deg`,
          width: "45vmin", 
          height: "45vmin",
          rotateX: `${mousePos.y * 25}deg`, 
          rotateY: `${mousePos.x * 25}deg`
        }}
      >
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} 
          className="w-full h-full" 
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.img 
            src={CUTOUTS[0]} 
            style={{ opacity: op1 }} 
            className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" 
            alt="" 
          />
          <motion.img 
            src={CUTOUTS[1]} 
            style={{ opacity: op2 }} 
            className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" 
            alt="" 
          />
          <motion.img 
            src={CUTOUTS[2]} 
            style={{ opacity: op3 }} 
            className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" 
            alt="" 
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function OryzoSite({ template }: { template: BusinessTemplate }) {
  const [lang, setLang] = useState<"en" | "es">("es");
  const [formSuccess, setFormSuccess] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);
  
  const content = template.content[lang];
  const prefersReducedMotion = useReducedMotion();

  // Detect WebGL
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglAvailable(false);
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  // Scroll tracking
  const heroGroupRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroGroupProgress } = useScroll({ target: heroGroupRef, offset: ["start start", "end start"] });

  // Section 2 scroll logic (Fallback for reduced motion)
  const voidRef = useRef<HTMLElement>(null);
  const { scrollYProgress: voidProgress } = useScroll({ target: voidRef, offset: ["start end", "end start"] });
  const voidImgY = useTransform(voidProgress, [0, 1], ["20%", "-20%"]);

  // Section 4 scroll logic
  const textureRef = useRef<HTMLElement>(null);
  const { scrollYProgress: textureProgress } = useScroll({ target: textureRef, offset: ["start end", "end start"] });

  // Section 5 scroll logic
  const stripRef = useRef<HTMLElement>(null);
  const { scrollYProgress: stripProgress } = useScroll({ target: stripRef, offset: ["start start", "end end"] });
  const stripX = useTransform(stripProgress, [0, 1], ["0%", "-66.666%"]);
  const p1X = useTransform(stripProgress, [0, 0.33], ["0%", "10%"]);
  const p2X = useTransform(stripProgress, [0, 0.33, 0.66], ["-10%", "0%", "10%"]);
  const p3X = useTransform(stripProgress, [0.33, 0.66, 1], ["-10%", "0%", "0%"]);

  // Section 6 scroll logic
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: footerProgress } = useScroll({ target: footerRef, offset: ["start end", "end end"] });
  const footerTitleY = useTransform(footerProgress, [0, 1], [150, 0]);
  const footerTitleOpacity = useTransform(footerProgress, [0, 0.5], [0, 1]);

  const [formError, setFormError] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const email = String(new FormData(formEl).get("email") ?? "").trim();
    // The waitlist asks only for an email; lead-intake needs a name, so the email stands in.
    const ok = await submitLead(template.plwSiteId, { name: email, email }, lang);
    setFormError(!ok);
    if (!ok) return;
    formEl.reset();
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 5000);
  };

  // Derive imagery
  const heroImg = template.media?.hero || DEFAULT_HERO;
  const voidImg = template.media?.teamPortrait || DEFAULT_PORTRAIT;
  const customGallery = template.media?.gallery || [];
  const isStockGallery = customGallery.length === DEFAULT_GALLERY.length && customGallery.every((src, i) => src === DEFAULT_GALLERY[i]);

  const strip1Img = customGallery[0] || DEFAULT_GALLERY[0];
  const strip2Img = customGallery[1] || DEFAULT_GALLERY[1] || strip1Img;
  const strip3Img = customGallery[2] || DEFAULT_GALLERY[2] || strip1Img;

  const textureImg = isStockGallery ? "/template-assets/barro-ceramica/barro_texture.jpg" : (customGallery[3] || strip1Img);
  const beansImg = isStockGallery ? "/template-assets/barro-ceramica/barro_beans.jpg" : (customGallery[4] || strip2Img);

  return (
    <div className="min-h-screen bg-[#100904] text-[#ffedd7] overflow-x-clip" style={{ fontFamily: "Inter, sans-serif" }}>
      
      {!prefersReducedMotion && webglAvailable && (
        <Mug3DLayer progress={heroGroupProgress} />
      )}

      {!prefersReducedMotion && !webglAvailable && (
        <PNGFallbackLayer progress={heroGroupProgress} />
      )}

      <div ref={heroGroupRef}>
        {/* 1. Photographic Hero */}
        <section className="relative h-[100dvh] w-full overflow-hidden flex flex-col justify-between p-6">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img src={heroImg} alt={template.brand.name} className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-[#100904]/40" />
          </div>
          
          <header className="relative z-10 flex justify-between items-start w-full">
            <div>
              <h1 className="text-[clamp(60px,12vw,140px)] font-medium leading-[0.9] uppercase tracking-normal">
                {template.brand.name}
              </h1>
              <p className="text-[12px] uppercase mt-2 text-[#ffedd7]/80">
                {content.hero.eyebrow}
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-4">
              <button
                onClick={() => setLang(lang === "en" ? "es" : "en")}
                className="px-4 py-1.5 rounded-full border border-[#40372e] text-[10px] uppercase tracking-wider hover:bg-[#382416] transition-colors cursor-pointer z-10"
              >
                {lang === "en" ? "ES" : "EN"}
              </button>
              <div className="hidden md:block writing-vertical-rl text-[12px] uppercase tracking-widest text-[#ffedd7]/60 mt-8" style={{ writingMode: "vertical-rl" }}>
                {content.hero.title2}
              </div>
            </div>
          </header>

          <div className="relative z-10 flex justify-between items-end w-full">
            <div className="max-w-md">
              <p className="text-[16px] md:text-[22px] font-normal leading-[1.26] lowercase first-letter:uppercase text-[#ffedd7]">
                {content.hero.subtitle}
              </p>
            </div>
            <button 
              onClick={() => voidRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-[36px] border border-[#ffedd7] text-[10px] uppercase tracking-wider hover:bg-[#ffedd7] hover:text-[#100904] transition-colors cursor-pointer z-10"
            >
              {content.hero.cta1}
            </button>
          </div>
        </section>

        {/* 2. Void Overlap Reveal */}
        <section id="void" ref={voidRef} className="relative min-h-[150vh] bg-[#100904] flex items-center justify-center overflow-hidden">
          <AnimatedDivider reduced={prefersReducedMotion} />
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
              <h2 className="text-[clamp(80px,18vw,240px)] font-medium leading-[0.8] uppercase text-[#382416] whitespace-nowrap">
                {LABELS.voidText1[lang]}
              </h2>
              <h2 className="text-[clamp(80px,18vw,240px)] font-medium leading-[0.8] uppercase text-[#382416] whitespace-nowrap ml-12 md:ml-32">
                {LABELS.voidText2[lang]}
              </h2>
            </div>
            
            {prefersReducedMotion && (
              <motion.div 
                className="relative z-10 w-[80vw] md:w-[60vw] max-w-[800px] aspect-[4/5] md:aspect-[16/9]"
                style={{ y: voidImgY }}
              >
                <img src={voidImg} alt={template.brand.name} className="w-full h-full object-cover drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]" />
              </motion.div>
            )}
          </div>
        </section>

        {/* 3. Warm Gradient Interlude */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#100904] via-[#1a0f07] to-[#100904]">
          <AnimatedDivider reduced={prefersReducedMotion} />
          <h2 className="text-[clamp(100px,25vw,350px)] font-medium leading-[0.9] uppercase text-[#382416]/40 select-none">
            {template.brand.name}
          </h2>
        </section>
      </div>

      {/* 4. Texture Macro + Giant Sliding Word */}
      <section ref={textureRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatedDivider reduced={prefersReducedMotion} />
        <div className="absolute inset-0 z-0">
          <img src={textureImg} alt="Texture" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-[#100904]/20" />
        </div>
        <div className="relative z-10 flex mix-blend-overlay text-[#ffedd7]">
          {LABELS.sustainable[lang].split("").map((letter, i) => {
            const speed = 1 + (i % 4) * 0.15;
            const letterX = useTransform(textureProgress, [0, 1], [`${50 * speed}vw`, `${-50 * speed}vw`]);
            return (
              <motion.span 
                key={i} 
                style={{ x: prefersReducedMotion ? 0 : letterX }} 
                className={`text-[clamp(120px,25vw,400px)] font-medium leading-[0.9] uppercase whitespace-nowrap ${letter === ' ' ? 'w-[10vw]' : ''}`}
              >
                {letter}
              </motion.span>
            );
          })}
        </div>
      </section>

      {/* 5. Horizontal 3-Panel Strip */}
      {prefersReducedMotion ? (
        <section className="relative bg-[#100904] flex flex-col">
          <AnimatedDivider reduced={prefersReducedMotion} />
          <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 relative border-b border-dashed border-[#40372e]">
            <div className="w-full max-w-[600px] aspect-[4/5] relative">
              <img src={strip1Img} alt="Gallery 1" className="w-full h-full object-cover" />
              <div className="absolute bottom-6 left-6 px-4 py-2 bg-[#382416] rounded-full text-[10px] uppercase">
                {LABELS.stackCaption[lang]}
              </div>
            </div>
          </div>
          <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 relative border-b border-dashed border-[#40372e]">
            <div className="w-full max-w-[600px] aspect-[4/5] relative">
              <img src={strip2Img} alt="Gallery 2" className="w-full h-full object-cover" />
              <div className="absolute bottom-6 left-6 px-4 py-2 bg-[#382416] rounded-full text-[10px] uppercase">
                {LABELS.campCaption[lang]}
              </div>
            </div>
          </div>
          <div className="w-full min-h-screen flex items-center justify-center p-6 relative bg-[#dc5000]">
            <div className="w-full max-w-[600px] aspect-[4/5] relative flex flex-col items-center justify-center text-center p-12">
              <img src={strip3Img} alt="Gallery 3" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-50" />
              <h2 className="relative z-10 text-[clamp(40px,8vw,100px)] font-medium leading-[0.9] uppercase text-[#ffedd7]">
                {LABELS.panelClaim[lang]}
              </h2>
              <a href="#order" className="relative z-10 mt-12 px-8 py-4 rounded-[36px] bg-[#100904] text-[#ffedd7] text-[12px] uppercase tracking-widest hover:bg-[#382416] transition-colors inline-block z-10">
                {content.hero.cta2}
              </a>
            </div>
          </div>
        </section>
      ) : (
        <section ref={stripRef} className="relative h-[300vh] bg-[#100904]">
          <AnimatedDivider reduced={prefersReducedMotion} />
          <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
            <motion.div className="flex w-[300vw] h-full" style={{ x: stripX }}>
              <div className="w-[100vw] h-full flex flex-col items-center justify-center p-6 relative">
                <div className="w-full max-w-[600px] aspect-[4/5] relative overflow-hidden">
                  <motion.img src={strip1Img} alt="Gallery 1" style={{ x: p1X, scale: 1.25 }} className="w-full h-full object-cover" />
                  <div className="absolute bottom-6 left-6 px-4 py-2 bg-[#382416] rounded-full text-[10px] uppercase">
                    {LABELS.stackCaption[lang]}
                  </div>
                </div>
              </div>

              <div className="w-[100vw] h-full flex flex-col items-center justify-center p-6 relative">
                <div className="w-full max-w-[600px] aspect-[4/5] relative overflow-hidden">
                  <motion.img src={strip2Img} alt="Gallery 2" style={{ x: p2X, scale: 1.25 }} className="w-full h-full object-cover" />
                  <div className="absolute bottom-6 left-6 px-4 py-2 bg-[#382416] rounded-full text-[10px] uppercase">
                    {LABELS.campCaption[lang]}
                  </div>
                </div>
              </div>

              <div className="w-[100vw] h-full flex items-center justify-center p-6 relative bg-[#dc5000] overflow-hidden">
                <motion.img src={strip3Img} alt="Gallery 3" style={{ x: p3X, scale: 1.25 }} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-50" />
                <div className="w-full max-w-[600px] aspect-[4/5] relative flex flex-col items-center justify-center text-center p-12">
                  <h2 className="relative z-10 text-[clamp(40px,8vw,100px)] font-medium leading-[0.9] uppercase text-[#ffedd7]">
                    {LABELS.panelClaim[lang]}
                  </h2>
                  <a href="#order" className="relative z-10 mt-12 px-8 py-4 rounded-[36px] bg-[#100904] text-[#ffedd7] text-[12px] uppercase tracking-widest hover:bg-[#382416] transition-colors inline-block z-10">
                    {content.hero.cta2}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 6. Closing / Contact Section */}
      <footer id="order" ref={footerRef} className="relative min-h-screen bg-[#100904] flex flex-col justify-between overflow-hidden">
        <AnimatedDivider reduced={prefersReducedMotion} />
        <div className="absolute inset-0 z-0">
          <img src={beansImg} alt="Background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#100904] via-[#100904]/80 to-[#100904]/20" />
        </div>

        <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 py-32">
          <motion.h2 
            className="text-[clamp(50px,10vw,120px)] font-medium leading-[0.9] uppercase text-[#ffedd7] text-center max-w-5xl mb-16"
            style={{ y: prefersReducedMotion ? 0 : footerTitleY, opacity: prefersReducedMotion ? 1 : footerTitleOpacity }}
          >
            {content.contact.title}
          </motion.h2>
          
          <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              name="email"
              placeholder={LABELS.waitlistPlaceholder[lang]}
              required
              className="flex-grow bg-transparent border-b border-[#40372e] py-4 px-2 text-[20px] font-normal lowercase placeholder:uppercase placeholder:text-[#6c5f51] focus:outline-none focus:border-[#dc5000] transition-colors z-10"
            />
            <button 
              type="submit"
              className="px-8 py-4 rounded-[36px] bg-[#382416] text-[#ffedd7] text-[12px] uppercase tracking-widest hover:bg-[#ffedd7] hover:text-[#100904] transition-colors whitespace-nowrap z-10 cursor-pointer"
            >
              {LABELS.submitText[lang]}
            </button>
          </form>
          {formSuccess && (
            <p className="mt-6 text-[#dc5000] text-[14px] uppercase tracking-wider">{content.contact.success}</p>
          )}
          {formError && (
            <p className="mt-6 text-red-400 text-[14px]">
              {lang === "en" ? "We couldn't send that. Please try again." : "No se pudo enviar. Intente de nuevo."}
            </p>
          )}
        </div>

        <div className="relative z-10 w-full px-6 py-8 border-t border-dashed border-[#40372e] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-[#6c5f51]">
          <div className="flex gap-6 z-10">
            <a href="#" className="hover:text-[#dc5000] transition-colors">{content.nav.faq}</a>
            <a href="#" className="hover:text-[#dc5000] transition-colors">{LABELS.instagram[lang]}</a>
          </div>
          <div className="px-4 py-2 border border-dashed border-[#40372e] rounded-[22.5px] text-[#dc5000]">
            {LABELS.credit[lang]}
          </div>
          <div>
            © {new Date().getFullYear()} {template.brand.name}
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { Clock, Settings, Wind, ThermometerSnowflake, Droplets, MapPin, Phone, ChevronLeft, ChevronRight, Play, X, ZoomIn, Menu, ExternalLink, AlertTriangle, AlertCircle, CheckCircle, MessageCircle, Calendar, Activity } from "lucide-react";
import type { BusinessTemplate } from "@/lib/templates/types";
import { submitLead } from "@/lib/plw";
import { rymWhatsApp, trackRymEvent } from "@/lib/rym-whatsapp";
import { useFocusTrap } from "@/lib/use-focus-trap";

const LABELS = {
  location: "Ubicación",
  close: "Cerrar",
  next: "Siguiente",
  prev: "Anterior",
};

function useSEO(template: BusinessTemplate) {

  

  useEffect(() => {
    if (typeof window === "undefined" || window.location.hostname !== "autoserviciorym.com") return;
    document.title = "Auto Servicio R&M | Servicio Automotriz en San José";
    document.documentElement.lang = "es";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", "Servicio automotriz, diagnóstico y mantenimiento para tu vehículo. Solicitá una cita o consultá directamente por WhatsApp.");

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      "name": template.brand.name,
      "address": template.brand.address,
      "telephone": template.brand.phone,
      "openingHours": "Mo-Fr 07:00-18:00, Sa 07:00-13:00",
      "url": "https://autoserviciorym.com",
      "logo": `https://autoserviciorym.com${template.brand.logo || "/template-assets/auto-servicio-rym/rym_logo.png"}`,
      "image": `https://autoserviciorym.com${template.media?.hero || "/template-assets/auto-servicio-rym/rym_new_02.jpg"}`,
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [template]);
}

function FadeInView({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.6, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

function RequestModal({ isOpen, onClose, type, phone, siteId, initService = "", initDesc = "" }: { isOpen: boolean, onClose: () => void, type: "appointment" | "quote", phone: string, siteId?: string, initService?: string, initDesc?: string }) {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isOpen, modalRef, onClose);

  const [formData, setFormData] = useState({ name: "", phone: "", brand: "", model: "", year: "", service: initService, desc: initDesc, date: "", time: "", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) setFormData(prev => ({ ...prev, service: initService, desc: initDesc }));
  }, [isOpen, initService, initDesc]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Requerido";
    if (!formData.phone.trim()) newErrors.phone = "Requerido";
    if (!formData.brand.trim()) newErrors.brand = "Requerido";
    if (!formData.model.trim()) newErrors.model = "Requerido";
    if (!formData.year.trim()) newErrors.year = "Requerido";
    if (!formData.service.trim()) newErrors.service = "Requerido";
    if (!formData.desc.trim()) newErrors.desc = "Requerido";
    if (type === "appointment") {
      if (!formData.date.trim()) newErrors.date = "Requerido";
      if (!formData.time.trim()) newErrors.time = "Requerido";
    }
    if (!formData.consent) newErrors.consent = "Requerido";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    if (type === "appointment") {
      trackRymEvent("wa_appointment_request");
      window.open(rymWhatsApp.getAppointmentLink(phone, formData.name, formData.year, formData.brand, formData.model, formData.service, formData.desc, formData.date, formData.time), "_blank");
    } else {
      trackRymEvent("wa_quote_request");
      window.open(rymWhatsApp.getQuoteLink(phone, formData.name, formData.year, formData.brand, formData.model, formData.service, formData.desc), "_blank");
    }
    // WhatsApp stays what the visitor sees (opened first, inside the click, so it
    // is not blocked as a popup); PLW also receives the request as a lead.
    void submitLead(siteId, {
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      message: `${formData.year} ${formData.brand} ${formData.model}\n${formData.desc}`,
      preferredTime: type === "appointment" ? `${formData.date} ${formData.time}` : undefined,
    }, "es");
  };

  const inputClass = (err: string | undefined) => `w-full bg-[var(--surface-primary)] border ${err ? 'border-red-500' : 'border-[var(--border-subtle)]'} text-[var(--text-primary)] rounded-md px-4 py-3 min-h-[44px] focus:outline-none focus:border-[var(--border-active)] transition-colors text-[16px]`;

  return (
    <div className="fixed inset-0 z-[200] bg-black/90 flex items-start md:items-center justify-center p-0 md:p-4 backdrop-blur-md overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div ref={modalRef} className="bg-[var(--background-secondary)] w-full min-h-[100dvh] md:min-h-0 md:max-h-[90vh] md:max-w-2xl overflow-y-auto md:rounded-xl shadow-2xl relative p-6 md:p-8 flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-2"><X className="w-6 h-6" /></button>
        <div className="mb-8 pr-8">
          <h2 id="modal-title" className="text-2xl font-black mb-2 text-[var(--text-primary)]">{type === "appointment" ? "Solicitar una cita" : "Solicitar valoración"}</h2>
          <p className="text-sm text-[var(--text-secondary)]">{type === "appointment" ? "Tu solicitud queda pendiente de confirmación por parte de Auto Servicio RyM." : "Esta solicitud no constituye una cotización final."}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 pb-12 md:pb-0" noValidate>
          {/* Step 1 */}
          <fieldset className="p-5 border border-[var(--border-subtle)] rounded-lg bg-[var(--surface-elevated)] space-y-4">
            <legend className="text-sm font-bold text-[var(--premium-gold)] px-2">1. Tu vehículo</legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div><label className="block text-xs text-[var(--text-secondary)] mb-1">Marca</label><input className={inputClass(errors.brand)} placeholder="Ej. Toyota" value={formData.brand} onChange={e=>setFormData({...formData, brand: e.target.value})} /></div>
              <div><label className="block text-xs text-[var(--text-secondary)] mb-1">Modelo</label><input className={inputClass(errors.model)} placeholder="Ej. RAV4" value={formData.model} onChange={e=>setFormData({...formData, model: e.target.value})} /></div>
              <div><label className="block text-xs text-[var(--text-secondary)] mb-1">Año</label><input type="number" className={inputClass(errors.year)} placeholder="Ej. 2018" value={formData.year} onChange={e=>setFormData({...formData, year: e.target.value})} /></div>
            </div>
          </fieldset>

          {/* Step 2 */}
          <fieldset className="p-5 border border-[var(--border-subtle)] rounded-lg bg-[var(--surface-elevated)] space-y-4">
            <legend className="text-sm font-bold text-[var(--premium-gold)] px-2">2. Servicio o problema</legend>
            <div><label className="block text-xs text-[var(--text-secondary)] mb-1">Servicio requerido</label><input className={inputClass(errors.service)} placeholder="Ej. Revisión general" value={formData.service} onChange={e=>setFormData({...formData, service: e.target.value})} /></div>
            <div><label className="block text-xs text-[var(--text-secondary)] mb-1">Descripción</label><textarea rows={3} className={inputClass(errors.desc)} placeholder="Describí brevemente lo que necesita tu vehículo" value={formData.desc} onChange={e=>setFormData({...formData, desc: e.target.value})} /></div>
          </fieldset>

          {/* Step 3 */}
          {type === "appointment" && (
            <fieldset className="p-5 border border-[var(--border-subtle)] rounded-lg bg-[var(--surface-elevated)] space-y-4">
              <legend className="text-sm font-bold text-[var(--premium-gold)] px-2">3. Preferencia</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs text-[var(--text-secondary)] mb-1">Fecha preferida</label><input type="date" className={inputClass(errors.date)} value={formData.date} onChange={e=>setFormData({...formData, date: e.target.value})} /></div>
                <div><label className="block text-xs text-[var(--text-secondary)] mb-1">Horario preferido</label>
                  <select className={inputClass(errors.time)} value={formData.time} onChange={e=>setFormData({...formData, time: e.target.value})}>
                    <option value="">Seleccione</option>
                    <option value="Mañana (7:00 - 12:00)">Mañana (7:00 - 12:00)</option>
                    <option value="Tarde (12:00 - 18:00)">Tarde (12:00 - 18:00)</option>
                  </select>
                </div>
              </div>
            </fieldset>
          )}

          {/* Step 4 */}
          <fieldset className="p-5 border border-[var(--border-subtle)] rounded-lg bg-[var(--surface-elevated)] space-y-4">
            <legend className="text-sm font-bold text-[var(--premium-gold)] px-2">{type === "appointment" ? "4" : "3"}. Contacto</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-xs text-[var(--text-secondary)] mb-1">Nombre completo</label><input className={inputClass(errors.name)} value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} /></div>
              <div><label className="block text-xs text-[var(--text-secondary)] mb-1">Teléfono o WhatsApp</label><input type="tel" className={inputClass(errors.phone)} value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} /></div>
            </div>
          </fieldset>

          {/* Step 5 */}
          <fieldset className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer p-4 rounded-lg bg-[var(--surface-soft)] border border-[var(--border-subtle)]">
              <input type="checkbox" className="mt-1 w-5 h-5 accent-[var(--premium-gold)]" checked={formData.consent} onChange={e=>setFormData({...formData, consent: e.target.checked})} />
              <span className="text-sm text-[var(--text-secondary)]">Acepto ser contactado para confirmar esta solicitud.</span>
            </label>
            {errors.consent && <p className="text-red-500 text-xs mt-2 px-2">{errors.consent}</p>}
          </fieldset>

          <button type="submit" className="w-full bg-[var(--premium-gold)] hover:bg-[var(--premium-gold-dark)] text-[var(--background-primary)] py-4 rounded-lg font-bold uppercase tracking-widest transition-colors min-h-[56px] flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            {type === "appointment" ? "Solicitar una cita" : "Enviar por WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
}

const SYMPTOMS = [
  { id: "warn", label: "Luz de advertencia", exp: "El sistema detectó una anomalía. Recomendamos una inspección para determinar la causa.", alert: false, icon: AlertCircle },
  { id: "brake", label: "Ruido al frenar", exp: "Posible desgaste en componentes del sistema de frenos. Recomendamos una revisión.", alert: false, icon: Settings },
  { id: "vib", label: "Vibración", exp: "Puede estar relacionado a suspensión o dirección. Sugerimos evaluarlo.", alert: false, icon: Activity },
  { id: "heat", label: "Sobrecalentamiento", exp: "Sugerimos detener la marcha y coordinar una revisión de temperatura.", alert: true, icon: ThermometerSnowflake },
  { id: "power", label: "Pérdida de potencia", exp: "Puede deberse a múltiples factores. Recomendamos diagnóstico automotriz.", alert: false, icon: Wind },
  { id: "start", label: "Dificultad encendido", exp: "Revisión recomendada del sistema de encendido o batería.", alert: false, icon: Play },
  { id: "leak", label: "Fuga visible", exp: "Recomendamos verificar el nivel de fluidos y agendar una revisión.", alert: true, icon: Droplets },
  { id: "ac", label: "A/C sin enfriar", exp: "Sugerimos revisión del sistema de climatización.", alert: false, icon: Wind },
];

export default function RymSite({ template }: { template: BusinessTemplate }) {
  useSEO(template);
  const content = template.content.es;
  const prefersReducedMotion = useReducedMotion();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"appointment"|"quote">("appointment");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollDir, setScrollDir] = useState<"up"|"down">("up");
  const [scrollYPos, setScrollYPos] = useState(0);

  const logoImg = template.brand.logo || "/template-assets/auto-servicio-rym/rym_logo.png";
  const heroImg = template.media?.hero || "/template-assets/auto-servicio-rym/rym_new_02.jpg";
  const ownerImg = "/template-assets/auto-servicio-rym/rym_owner.jpg";
  const shopImg = template.media?.teamPortrait || "/template-assets/auto-servicio-rym/rym_new_11.jpg";
  const carImg = template.media?.gallery?.[6] || "/template-assets/auto-servicio-rym/rym_new_07.jpg";

  const DEFAULT_GALLERY = [
    "/template-assets/auto-servicio-rym/rym_new_04.jpg",
    "/template-assets/auto-servicio-rym/rym_new_06.jpg",
    "/template-assets/auto-servicio-rym/rym_new_08.jpg",
    "/template-assets/auto-servicio-rym/rym_new_01.jpg",
    "/template-assets/auto-servicio-rym/rym_new_03.jpg",
    "/template-assets/auto-servicio-rym/rym_new_05.jpg",
    "/template-assets/auto-servicio-rym/rym_new_07.jpg",
    "/template-assets/auto-servicio-rym/rym_new_09.jpg",
    "/template-assets/auto-servicio-rym/rym_new_10.jpg",
    "/template-assets/auto-servicio-rym/rym_new_12.jpg",
    "/template-assets/auto-servicio-rym/rym_new_13.jpg",
    "/template-assets/auto-servicio-rym/rym_new_14.jpg",
  ];
  const GALLERY_IMGS = template.media?.gallery?.length ? template.media.gallery : DEFAULT_GALLERY;

  const SERVICE_IMGS = [
    GALLERY_IMGS[1], GALLERY_IMGS[2], GALLERY_IMGS[3], GALLERY_IMGS[4]
  ];

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], ["0%", "15%"]);
  
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const [selSymptom, setSelSymptom] = useState(SYMPTOMS[0]);
  const [selVehicle, setSelVehicle] = useState({ service: "", desc: "" });

  const isOverlayOpen = modalOpen || menuOpen || lightboxIdx !== null;
  
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const curY = window.scrollY;
      if (curY > lastY + 10) setScrollDir("down");
      else if (curY < lastY - 10) setScrollDir("up");
      setScrollYPos(curY);
      lastY = curY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (type: "appointment"|"quote", e?: React.MouseEvent) => {
    e?.preventDefault();
    setModalType(type);
    setModalOpen(true);
    setMenuOpen(false);
  };

  // Lightbox arrow navigation
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i! + 1) % GALLERY_IMGS.length);
      if (e.key === "ArrowLeft") setLightboxIdx((i) => (i! - 1 + GALLERY_IMGS.length) % GALLERY_IMGS.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIdx, GALLERY_IMGS.length]);

  const menuRef = useRef<HTMLDivElement>(null);
  useFocusTrap(menuOpen, menuRef, () => setMenuOpen(false));
  useFocusTrap(lightboxIdx !== null, lightboxRef, () => setLightboxIdx(null));

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --background-primary: #070809;
          --background-secondary: #0D0F12;
          --surface-primary: #14171B;
          --surface-elevated: #1B1F24;
          --surface-soft: #20242A;
          --premium-gold: #D0A928;
          --premium-gold-dark: #A98218;
          --premium-gold-soft: rgba(208, 169, 40, 0.16);
          --text-primary: #F4F4F2;
          --text-secondary: #A8ADB3;
          --text-muted: #727880;
          --metallic-silver: #C8CDD2;
          --border-subtle: rgba(255, 255, 255, 0.10);
          --border-active: rgba(208, 169, 40, 0.55);
        }
        html { scroll-padding-top: 80px; scroll-behavior: smooth; }
        body { background-color: var(--background-primary); color: var(--text-primary); }
      `}} />
      <div className="min-h-[100dvh] overflow-x-hidden font-sans selection:bg-[var(--premium-gold)] selection:text-black pb-[calc(72px+env(safe-area-inset-bottom))] lg:pb-0">
        
        {/* Header */}
        <header className={`fixed top-0 left-0 w-full z-[150] transition-transform duration-300 ${scrollDir === "down" && scrollYPos > 100 && !isOverlayOpen ? "-translate-y-full" : "translate-y-0"} bg-[var(--background-primary)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] h-[64px] md:h-[72px] flex items-center`}>
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
            <a href="#" className="flex items-center shrink-0">
              <img src={logoImg} alt="Auto Servicio RyM" className="h-10 md:h-12 w-auto object-contain" />
            </a>
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
              <a href="#servicios" className="hover:text-[var(--premium-gold)] transition-colors">Servicios</a>
              <a href="#problemas" className="hover:text-[var(--premium-gold)] transition-colors">Problemas comunes</a>
              <a href="#galeria" className="hover:text-[var(--premium-gold)] transition-colors">Trabajos</a>
              <a href="#nosotros" className="hover:text-[var(--premium-gold)] transition-colors">Nosotros</a>
              <a href="#contacto" className="hover:text-[var(--premium-gold)] transition-colors">Ubicación</a>
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <button onClick={(e) => openModal("appointment", e)} className="border border-[var(--premium-gold)] text-[var(--premium-gold)] hover:bg-[var(--premium-gold-soft)] px-5 py-2 rounded-md text-sm font-bold uppercase tracking-widest transition-colors h-[44px]">
                Solicitar cita
              </button>
              <a href={rymWhatsApp.getGeneralLink(template.brand.phone)} target="_blank" rel="noreferrer" onClick={()=>trackRymEvent("wa_general")} className="bg-[var(--premium-gold)] hover:bg-[var(--premium-gold-dark)] text-[var(--background-primary)] px-5 py-2 rounded-md text-sm font-bold uppercase tracking-widest transition-colors h-[44px] flex items-center justify-center">
                WhatsApp
              </a>
            </div>
            <button className="lg:hidden p-2 text-[var(--text-primary)] h-[44px] w-[44px] flex items-center justify-center" onClick={() => setMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div ref={menuRef} role="dialog" aria-modal="true" aria-label="Menú principal" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed inset-0 z-[250] bg-[var(--background-primary)] flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
              <div className="h-[64px] flex items-center justify-between px-4 border-b border-[var(--border-subtle)]">
                <img src={logoImg} alt="Auto Servicio RyM" className="h-9 w-auto object-contain" />
                <button onClick={() => setMenuOpen(false)} className="p-2 h-[44px] w-[44px] flex items-center justify-center text-[var(--text-secondary)]"><X className="w-6 h-6" /></button>
              </div>
              <nav className="flex flex-col gap-6 p-6 text-xl font-bold text-[var(--text-primary)] flex-grow overflow-y-auto">
                <a href="#" onClick={() => setMenuOpen(false)}>Inicio</a>
                <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
                <button className="text-left" onClick={(e) => openModal("appointment", e)}>Solicitar cita</button>
                <a href="#problemas" onClick={() => setMenuOpen(false)}>Problemas comunes</a>
                <a href="#galeria" onClick={() => setMenuOpen(false)}>Trabajos realizados</a>
                <a href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
                <a href="#contacto" onClick={() => setMenuOpen(false)}>Ubicación</a>
              </nav>
              <div className="p-6 border-t border-[var(--border-subtle)] bg-[var(--surface-primary)] flex flex-col gap-3">
                <a href={template.brand.phoneHref} onClick={()=>trackRymEvent("phone_click")} className="w-full text-center border border-[var(--border-subtle)] text-[var(--text-primary)] py-4 font-bold uppercase tracking-widest rounded-lg min-h-[56px] flex items-center justify-center gap-2"><Phone className="w-5 h-5"/> Llamar</a>
                <a href={rymWhatsApp.getGeneralLink(template.brand.phone)} target="_blank" rel="noreferrer" onClick={()=>trackRymEvent("wa_general")} className="w-full text-center border border-[var(--premium-gold)] text-[var(--premium-gold)] py-4 font-bold uppercase tracking-widest rounded-lg min-h-[56px] flex items-center justify-center gap-2"><MessageCircle className="w-5 h-5"/> WhatsApp</a>
                <button onClick={(e) => openModal("appointment", e)} className="w-full bg-[var(--premium-gold)] text-[var(--background-primary)] py-4 font-bold uppercase tracking-widest rounded-lg min-h-[56px] flex items-center justify-center gap-2"><Calendar className="w-5 h-5"/> Solicitar cita</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero */}
        <section className="relative h-[85dvh] lg:h-[88dvh] w-full flex flex-col justify-end pb-24 lg:pb-32 overflow-hidden bg-[var(--background-primary)]">
          <div className="absolute inset-0 z-0">
            <motion.img src={heroImg} alt="" className="w-full h-full object-cover object-center" style={prefersReducedMotion ? {} : { y: heroY }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)] via-[var(--background-primary)]/80 to-[var(--background-primary)]/30" />
          </div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 lg:pt-0">
            <FadeInView>
              <img src={logoImg} alt="Auto Servicio RyM" className="h-16 md:h-20 w-auto object-contain mb-6" />
              <div className="inline-block bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-6">
                {content.hero.eyebrow}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[var(--text-primary)] leading-[1.1] tracking-tight mb-6 max-w-3xl">
                Diagnóstico preciso.<br className="hidden sm:block"/> Mantenimiento responsable.
              </h1>
              <p className="max-w-xl text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-8">
                Contanos qué presenta tu vehículo y coordiná una revisión directamente con nuestro equipo.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <button onClick={(e) => openModal("appointment", e)} className="w-full sm:w-auto bg-[var(--premium-gold)] hover:bg-[var(--premium-gold-dark)] text-[var(--background-primary)] px-8 py-4 rounded-lg font-bold uppercase tracking-widest transition-colors min-h-[56px] flex items-center justify-center">
                  Solicitar una cita
                </button>
                <a href={rymWhatsApp.getGeneralLink(template.brand.phone)} target="_blank" rel="noreferrer" onClick={()=>trackRymEvent("wa_general")} className="w-full sm:w-auto bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--premium-gold)] px-8 py-4 rounded-lg font-bold uppercase tracking-widest transition-colors min-h-[56px] flex items-center justify-center">
                  Consultar por WhatsApp
                </a>
              </div>
              <p className="text-[var(--text-muted)] text-xs mt-4">Las solicitudes quedan sujetas a confirmación.</p>
            </FadeInView>
          </div>
        </section>

        {/* Symptom Selector */}
        <section id="problemas" className="py-20 lg:py-28 px-6 bg-[var(--background-secondary)] scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <FadeInView>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">¿Qué está presentando tu vehículo?</h2>
              <p className="text-[var(--text-secondary)] mb-10 text-lg">Esta guía es informativa y no sustituye una inspección mecánica.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 mb-6">
                {SYMPTOMS.map(s => {
                  const Icon = s.icon;
                  const isActive = selSymptom.id === s.id;
                  return (
                    <button key={s.id} onClick={() => setSelSymptom(s)} className={`flex flex-col items-start text-left p-4 rounded-lg border transition-colors min-h-[88px] ${isActive ? "border-[var(--premium-gold)] bg-[var(--surface-elevated)]" : "border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:border-[var(--text-secondary)]"}`}>
                      <Icon className={`w-5 h-5 mb-3 ${isActive ? "text-[var(--premium-gold)]" : "text-[var(--text-muted)]"}`} />
                      <span className={`font-bold text-sm leading-tight ${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>{s.label}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={selSymptom.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-[var(--surface-elevated)] border-l-4 border-[var(--premium-gold)] rounded-r-lg p-6 lg:p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <selSymptom.icon className="w-6 h-6 text-[var(--premium-gold)]" />
                    <h3 className="text-xl font-bold">{selSymptom.label}</h3>
                  </div>
                  <p className="text-[var(--text-secondary)] text-lg mb-6">{selSymptom.exp}</p>
                  
                  {selSymptom.alert && (
                    <div className="bg-[var(--surface-soft)] text-[var(--text-primary)] p-4 border border-[var(--border-subtle)] mb-6 rounded text-sm flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-[var(--premium-gold)] shrink-0" />
                      <span>Atención prioritaria recomendada. Consúltenos para orientarle.</span>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={(e) => openModal("appointment", e)} className="bg-[var(--surface-soft)] border border-[var(--border-subtle)] hover:border-[var(--premium-gold)] px-6 py-3 font-bold uppercase tracking-widest text-xs rounded-lg min-h-[48px] transition-colors">
                      Solicitar Inspección
                    </button>
                    <a href={selSymptom.alert ? rymWhatsApp.getEmergencyLink(template.brand.phone, selSymptom.label) : rymWhatsApp.getServiceLink(template.brand.phone, "Revisión", "", "", "", selSymptom.label)} target="_blank" rel="noreferrer" onClick={()=>trackRymEvent(selSymptom.alert ? "wa_emergency" : "wa_service_consult")} className="bg-[var(--premium-gold)] text-[var(--background-primary)] hover:bg-[var(--premium-gold-dark)] px-6 py-3 font-bold uppercase tracking-widest text-xs rounded-lg min-h-[48px] flex items-center justify-center transition-colors">
                      Consultar por WhatsApp
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </FadeInView>
          </div>
        </section>

        {/* Services */}
        <section id="servicios" className="py-20 lg:py-28 px-6 bg-[var(--background-primary)] scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <FadeInView>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">{content.services.title}</h2>
              <p className="text-[var(--text-secondary)] text-lg mb-12">{content.services.blurb}</p>
            </FadeInView>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {content.services.items.slice(0,4).map((item, i) => (
                <FadeInView key={i} delay={i * 0.1}>
                  <div className="group relative bg-[var(--surface-elevated)] rounded-xl overflow-hidden border border-[var(--border-subtle)] h-full flex flex-col">
                    <div className="relative h-56 lg:h-64 overflow-hidden">
                      <img src={SERVICE_IMGS[i % SERVICE_IMGS.length]} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-elevated)] via-[var(--surface-elevated)]/50 to-transparent" />
                    </div>
                    <div className="p-6 relative z-10 flex flex-col flex-grow -mt-16">
                      <div className="text-[var(--premium-gold)] font-bold text-xs uppercase tracking-widest mb-2">Servicio {i+1}</div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-[var(--text-secondary)] text-sm mb-6 flex-grow leading-relaxed">{item.blurb}</p>
                      <div className="flex items-center gap-4">
                        <button onClick={(e) => openModal("quote", e)} className="text-[var(--text-primary)] text-sm font-bold uppercase tracking-widest hover:text-[var(--premium-gold)] transition-colors min-h-[44px] flex items-center">
                          Solicitar valoración <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="nosotros" className="py-20 lg:py-28 px-6 bg-[var(--background-secondary)] scroll-mt-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeInView>
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-[var(--border-subtle)]">
                <img src={ownerImg} alt="Auto Servicio RyM" className="w-full h-full object-cover grayscale-[0.2]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-secondary)] to-transparent opacity-80" />
              </div>
            </FadeInView>
            <FadeInView delay={0.2}>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">Atención directa<br/>de principio a fin.</h2>
              <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
                Nuestra filosofía es sencilla: cuidamos tu vehículo con el mismo nivel de exigencia y precisión que aplicaríamos a nuestro propio auto. Inspección honesta, repuestos adecuados y comunicación clara.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex gap-3 text-[var(--text-primary)]"><CheckCircle className="w-5 h-5 text-[var(--premium-gold)] shrink-0" /> <span>Explicamos el trabajo sin tecnicismos innecesarios.</span></div>
                <div className="flex gap-3 text-[var(--text-primary)]"><CheckCircle className="w-5 h-5 text-[var(--premium-gold)] shrink-0" /> <span>Trato directo con los mecánicos encargados.</span></div>
                <div className="flex gap-3 text-[var(--text-primary)]"><CheckCircle className="w-5 h-5 text-[var(--premium-gold)] shrink-0" /> <span>Revisión completa antes de cambiar repuestos.</span></div>
              </div>
              <a href={rymWhatsApp.getGeneralLink(template.brand.phone)} target="_blank" rel="noreferrer" onClick={()=>trackRymEvent("wa_general")} className="inline-flex items-center justify-center gap-2 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--premium-gold)] px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-sm transition-colors min-h-[48px]">
                <MessageCircle className="w-4 h-4" /> Hablar por WhatsApp
              </a>
            </FadeInView>
          </div>
        </section>

        {/* Trust / Split */}
        <section className="py-20 lg:py-28 px-6 bg-[var(--background-primary)]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeInView className="order-2 lg:order-1 space-y-8">
              <h2 className="text-3xl font-black tracking-tight mb-8">Por qué elegirnos</h2>
              <div className="space-y-6">
                {content.why.items.map((w,i) => (
                  <div key={i} className="border-b border-[var(--border-subtle)] pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="text-[var(--premium-gold)] font-black text-xl mt-0.5">0{i+1}</div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">{w.title}</h4>
                        <p className="text-[var(--text-secondary)] text-sm">{w.blurb}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInView>
            <FadeInView delay={0.2} className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--border-subtle)]">
                <img src={shopImg} alt="Instalaciones del taller" className="w-full h-full object-cover" />
              </div>
            </FadeInView>
          </div>
        </section>

        {/* Gallery */}
        <section id="galeria" className="py-20 lg:py-28 px-6 bg-[var(--background-secondary)] scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <FadeInView>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Trabajos realizados</h2>
              <p className="text-[var(--text-secondary)] text-lg mb-12">Vehículos que han pasado por nuestro elevador — pickups, SUVs y sedanes de distintas marcas.</p>
            </FadeInView>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GALLERY_IMGS.map((src, i) => (
                <FadeInView key={i} delay={Math.min(i, 5) * 0.08} className={`relative group overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] ${i === 0 ? 'sm:col-span-2 lg:col-span-2 aspect-video' : 'aspect-square sm:aspect-video lg:aspect-[4/3]'}`}>
                  <button type="button" onClick={(e) => { e.preventDefault(); lastFocusedRef.current = document.activeElement as HTMLElement; setLightboxIdx(i); }} aria-label={`Ampliar imagen ${i + 1}`} className="w-full h-full block text-left">
                    <img src={src} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                    </div>
                  </button>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 px-6 bg-[var(--surface-elevated)] border-y border-[var(--border-subtle)] text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <img src={carImg} alt="" className="w-full h-full object-cover grayscale" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">Trabajo preciso. Comunicación clara.</h2>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl mb-10 leading-relaxed">Revisamos tu vehículo, explicamos lo necesario y coordinamos cada paso directamente con vos.</p>
            <a href={rymWhatsApp.getGeneralLink(template.brand.phone)} target="_blank" rel="noreferrer" onClick={()=>trackRymEvent("wa_general")} className="inline-flex items-center justify-center gap-2 bg-[var(--premium-gold)] hover:bg-[var(--premium-gold-dark)] text-[var(--background-primary)] px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-sm transition-colors min-h-[56px]">
              <MessageCircle className="w-5 h-5" /> Conversar con nuestro equipo
            </a>
          </div>
        </section>

        {/* Location */}
        <section id="contacto" className="py-20 lg:py-28 px-6 bg-[var(--background-primary)] scroll-mt-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInView>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8">Ubicación y Contacto</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-[var(--premium-gold)] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Dirección</h4>
                    <p className="text-[var(--text-secondary)] leading-relaxed">{template.brand.address}</p>
                    <div className="mt-3 flex gap-4">
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(template.brand.address)}`} target="_blank" rel="noreferrer" onClick={()=>trackRymEvent("maps_click")} className="text-[var(--text-primary)] font-bold text-xs uppercase tracking-widest hover:text-[var(--premium-gold)] flex items-center gap-1 min-h-[44px]"><ExternalLink className="w-3 h-3" /> Google Maps</a>
                      <a href={`https://waze.com/ul?q=${encodeURIComponent(template.brand.address)}`} target="_blank" rel="noreferrer" onClick={()=>trackRymEvent("waze_click")} className="text-[var(--text-primary)] font-bold text-xs uppercase tracking-widest hover:text-[var(--premium-gold)] flex items-center gap-1 min-h-[44px]"><ExternalLink className="w-3 h-3" /> Waze</a>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-[var(--premium-gold)] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Horario</h4>
                    <p className="text-[var(--text-secondary)]">{content.footer.hours}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-[var(--premium-gold)] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Contacto</h4>
                    <p className="text-[var(--text-secondary)]">{template.brand.phone}</p>
                    <div className="mt-3 flex gap-4">
                      <a href={template.brand.phoneHref} onClick={()=>trackRymEvent("phone_click")} className="border border-[var(--border-subtle)] hover:border-[var(--premium-gold)] text-[var(--text-primary)] px-4 py-2 font-bold uppercase tracking-widest text-xs rounded transition-colors min-h-[44px] flex items-center justify-center">Llamar</a>
                      <a href={rymWhatsApp.getGeneralLink(template.brand.phone)} target="_blank" rel="noreferrer" onClick={()=>trackRymEvent("wa_general")} className="bg-[var(--premium-gold)] hover:bg-[var(--premium-gold-dark)] text-[var(--background-primary)] px-4 py-2 font-bold uppercase tracking-widest text-xs rounded transition-colors min-h-[44px] flex items-center justify-center">WhatsApp</a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInView>
            <FadeInView delay={0.2}>
              <div className="w-full aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden border border-[var(--border-subtle)]">
                <img src={GALLERY_IMGS[8]} alt="Ubicación" className="w-full h-full object-cover" />
              </div>
            </FadeInView>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[var(--background-secondary)] border-t border-[var(--border-subtle)] pt-16 pb-8 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <img src={logoImg} alt="Auto Servicio RyM" className="h-14 w-auto object-contain mb-4" />
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{content.hero.subtitle}</p>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-widest text-[var(--premium-gold)] mb-4 text-xs">Enlaces</h4>
              <nav className="flex flex-col gap-3 text-[var(--text-secondary)] text-sm">
                <a href="#servicios" className="hover:text-[var(--text-primary)] transition-colors inline-block py-1">Servicios</a>
                <a href="#nosotros" className="hover:text-[var(--text-primary)] transition-colors inline-block py-1">Nosotros</a>
                <button onClick={(e) => openModal("appointment", e)} className="text-left hover:text-[var(--text-primary)] transition-colors py-1">Solicitar Cita</button>
              </nav>
            </div>
            
            <div className="lg:col-span-2 space-y-2 text-[var(--text-secondary)] text-sm">
              <h4 className="font-bold uppercase tracking-widest text-[var(--premium-gold)] mb-4 text-xs">Contacto</h4>
              <p className="mb-2">{template.brand.address}</p>
              <p className="mb-4">{content.footer.hours}</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href={template.brand.phoneHref} onClick={()=>trackRymEvent("phone_click")} className="hover:text-[var(--text-primary)] transition-colors min-h-[44px] flex items-center">{template.brand.phone}</a>
                <a href={rymWhatsApp.getGeneralLink(template.brand.phone)} target="_blank" rel="noreferrer" onClick={()=>trackRymEvent("wa_general")} className="hover:text-[var(--premium-gold)] text-[var(--text-primary)] font-bold min-h-[44px] flex items-center">WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto text-center text-sm text-[var(--text-muted)] border-t border-[var(--border-subtle)] pt-8">
            <p>Copyright © {new Date().getFullYear()} {template.brand.name}. Todos los derechos reservados.</p>
          </div>
        </footer>

        {/* Mobile Bottom Contact Bar */}
        <AnimatePresence>
          {!isOverlayOpen && (
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="lg:hidden fixed bottom-0 left-0 w-full z-[140] bg-[var(--surface-elevated)] border-t border-[var(--border-subtle)] shadow-[0_-4px_20px_rgba(0,0,0,0.5)] pb-[env(safe-area-inset-bottom)]">
              <div className="flex h-[72px] divide-x divide-[var(--border-subtle)]">
                <a href={template.brand.phoneHref} onClick={()=>trackRymEvent("phone_click")} className="flex-1 flex flex-col items-center justify-center gap-1 text-[var(--text-primary)] active:bg-[var(--surface-soft)]">
                  <Phone className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Llamar</span>
                </a>
                <a href={rymWhatsApp.getGeneralLink(template.brand.phone)} target="_blank" rel="noreferrer" onClick={()=>trackRymEvent("wa_general")} className="flex-1 flex flex-col items-center justify-center gap-1 text-[var(--premium-gold)] active:bg-[var(--surface-soft)]">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
                </a>
                <button onClick={(e) => openModal("appointment", e)} className="flex-[1.2] flex flex-col items-center justify-center gap-1 bg-[var(--premium-gold)] text-[var(--background-primary)] active:bg-[var(--premium-gold-dark)]">
                  <Calendar className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Cita</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIdx !== null && (
            <motion.div ref={lightboxRef} role="dialog" aria-modal="true" aria-label="Galería de imágenes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-[var(--background-primary)]/95 backdrop-blur-md flex items-center justify-center p-0 md:p-4" onClick={() => setLightboxIdx(null)}>
              <button onClick={(e) => { e.stopPropagation(); setLightboxIdx(null); }} className="absolute top-[env(safe-area-inset-top)] right-4 md:top-6 md:right-6 text-[var(--text-muted)] hover:text-[var(--text-primary)] z-10 p-2"><X className="w-8 h-8" /></button>
              <button onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => (i! - 1 + GALLERY_IMGS.length) % GALLERY_IMGS.length); }} className="absolute left-2 md:left-6 text-[var(--text-muted)] hover:text-[var(--premium-gold)] z-10 p-2"><ChevronLeft className="w-10 h-10 md:w-12 md:h-12" /></button>
              <img src={GALLERY_IMGS[lightboxIdx]} alt="" onClick={(e) => e.stopPropagation()} className="w-full max-h-[100dvh] object-contain md:max-w-5xl md:border border-[var(--border-subtle)] md:rounded-lg" />
              <button onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => (i! + 1) % GALLERY_IMGS.length); }} className="absolute right-2 md:right-6 text-[var(--text-muted)] hover:text-[var(--premium-gold)] z-10 p-2"><ChevronRight className="w-10 h-10 md:w-12 md:h-12" /></button>
              <div className="absolute bottom-[env(safe-area-inset-bottom)] left-1/2 -translate-x-1/2 text-[var(--text-secondary)] text-sm font-bold tracking-widest mb-4">{lightboxIdx + 1} / {GALLERY_IMGS.length}</div>
            </motion.div>
          )}
        </AnimatePresence>

        <RequestModal isOpen={modalOpen} onClose={() => { setModalOpen(false); if (lastFocusedRef.current) lastFocusedRef.current.focus(); }} type={modalType} phone={template.brand.phone} siteId={template.plwSiteId} initService={selVehicle.service} initDesc={selVehicle.desc} />

      </div>
    </>
  );
}

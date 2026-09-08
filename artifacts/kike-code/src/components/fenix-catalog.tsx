import { useState, useEffect, useRef } from "react";
import { Search, X, Check, MessageCircle, Info, Phone, Home, Grid, Filter } from "lucide-react";
import { FENIX_PRODUCTS, type FenixProduct, type FenixCategory } from "@/lib/templates/fenix-products";
import { trackFenixEvent } from "@/lib/fenix-analytics";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/lib/use-focus-trap";

interface ConsultaItem {
  product: FenixProduct;
  quantity: number;
  variation?: string;
}

const WHATSAPP_NUMBER = "50672974936";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

function formatPrice(price: number | null) {
  return price === null ? "Precio: Consultar" : `₡${price.toLocaleString()}`;
}

export function FenixCatalog() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FenixCategory | "all">("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [consulta, setConsulta] = useState<ConsultaItem[]>(() => {
    try {
      const stored = localStorage.getItem("fenix_consulta");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isConsultaOpen, setIsConsultaOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<FenixProduct | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const activeProductRef = useRef<HTMLDivElement>(null);
  const consultaRef = useRef<HTMLDivElement>(null);
  const [headerPortalNode, setHeaderPortalNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setHeaderPortalNode(document.getElementById('header-consulta-portal'));
  }, []);

  const closeProductModal = () => {
    window.history.pushState(null, "", window.location.pathname);
    setActiveProduct(null);
  };

  useEffect(() => {
    localStorage.setItem("fenix_consulta", JSON.stringify(consulta));
  }, [consulta]);

  // Handle external events from FenixSite
  useEffect(() => {
    const handleOpenConsulta = () => setIsConsultaOpen(true);
    const handleSetCategory = (e: CustomEvent) => {
      setSelectedCategory(e.detail);
      // scroll to catalog
      const el = document.getElementById("productos");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    const handleMenuState = (e: CustomEvent) => {
      setIsMobileMenuOpen(e.detail);
    };
    
    window.addEventListener('open-fenix-consulta', handleOpenConsulta);
    window.addEventListener('set-fenix-category', handleSetCategory as EventListener);
    window.addEventListener('fenix-menu-state', handleMenuState as EventListener);
    
    return () => {
      window.removeEventListener('open-fenix-consulta', handleOpenConsulta);
      window.removeEventListener('set-fenix-category', handleSetCategory as EventListener);
      window.removeEventListener('fenix-menu-state', handleMenuState as EventListener);
    };
  }, []);

  // Handle hash routing for product details
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#producto/")) {
        const id = hash.replace("#producto/", "");
        const prod = FENIX_PRODUCTS.find(p => p.id === id);
        if (prod) {
          setActiveProduct(prod);
          setSelectedVariation(prod.variations?.[0] || "");
          setQuantity(1);
          trackFenixEvent("Product viewed", { productId: prod.id });
        }
      } else {
        setActiveProduct(null);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Modals focus traps
  useFocusTrap(!!activeProduct, activeProductRef, closeProductModal);
  useFocusTrap(isConsultaOpen, consultaRef, () => setIsConsultaOpen(false));

  const addToConsulta = (product: FenixProduct, qty: number, variation?: string) => {
    setConsulta(prev => {
      const existing = prev.find(item => 
        item.product.id === product.id && item.variation === variation
      );
      if (existing) {
        return prev.map(item => 
          item === existing ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { product, quantity: qty, variation }];
    });
    trackFenixEvent("Product added to consultation list", { productId: product.id });
    setIsConsultaOpen(true);
  };

  const removeFromConsulta = (index: number) => {
    trackFenixEvent("Product removed from consultation list", { productId: consulta[index].product.id });
    setConsulta(prev => prev.filter((_, i) => i !== index));
  };

  const updateConsultaQuantity = (index: number, delta: number) => {
    setConsulta(prev => prev.map((item, i) => {
      if (i === index) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const filteredProducts = FENIX_PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchBrand = selectedBrand === "all" || p.brand === selectedBrand;
    return matchSearch && matchCat && matchBrand;
  });

  const brands = Array.from(new Set(FENIX_PRODUCTS.map(p => p.brand)));

  const handleSearch = (v: string) => {
    setSearch(v);
    if (v.length > 2) trackFenixEvent("Product searched", { termLength: v.length });
  };

  const sendSingleWhatsApp = (product: FenixProduct, qty: number, variation?: string) => {
    trackFenixEvent("Single-product WhatsApp inquiry", { productId: product.id });
    const productUrl = `${window.location.origin}${window.location.pathname}#producto/${product.id}`;
    const priceFormatted = product.price === null ? "Consultar" : formatPrice(product.price);
    const text = `Hola, estoy interesado(a) en este producto de Suplidora Fénix:\n\nProducto: ${product.name}\nPrecio mostrado: ${priceFormatted}\nVariación: ${variation || "N/A"}\nCantidad: ${qty}\nEnlace: ${productUrl}\n\n¿Me pueden confirmar disponibilidad y cómo puedo comprarlo?`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const sendMultiWhatsApp = () => {
    if (consulta.length === 0) return;
    trackFenixEvent("Multi-product WhatsApp inquiry", { count: consulta.length });
    
    let listText = consulta.map(c => {
      const p = c.product.price === null ? "Consultar" : formatPrice(c.product.price);
      return `- ${c.quantity}x ${c.product.name} ${c.variation ? "(" + c.variation + ")" : ""} [${p}]`;
    }).join("\n");

    const text = `Hola, quiero consultar por los siguientes productos de Suplidora Fénix:\n\n${listText}\n\nSubtotal mostrado para referencia: Precios sujetos a confirmación\n\n¿Me pueden confirmar disponibilidad, precio final y opciones de entrega o retiro?`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      {/* Desktop Header Portal for Mi Consulta */}
      {headerPortalNode && createPortal(
        <button 
          onClick={() => setIsConsultaOpen(true)}
          className="bg-[var(--premium-gold)] hover:bg-[var(--premium-gold-dark)] text-black px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 rounded-sm"
        >
          <MessageCircle className="w-4 h-4" />
          Mi Consulta
          {consulta.length > 0 && <span className="bg-black text-[var(--premium-gold)] px-1.5 py-0.5 rounded-full text-[10px]">{consulta.length}</span>}
        </button>,
        headerPortalNode
      )}

      {/* Mobile Bottom Nav */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--background-primary)] border-t border-[var(--border-subtle)] transition-transform duration-300 pb-[env(safe-area-inset-bottom)] ${isConsultaOpen || activeProduct || isMobileMenuOpen ? 'translate-y-[200%]' : 'translate-y-0'}`}>
        <div className="flex justify-between items-center h-16 px-6">
          <a href="#" className="flex flex-col items-center gap-1 text-[var(--text-muted)] hover:text-[var(--premium-gold)] w-1/4">
            <Home className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Inicio</span>
          </a>
          <a href="#productos" className="flex flex-col items-center gap-1 text-[var(--text-primary)] hover:text-[var(--premium-gold)] w-1/4">
            <Grid className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Catálogo</span>
          </a>
          <button onClick={() => setIsConsultaOpen(true)} className="relative flex flex-col items-center gap-1 text-[var(--text-muted)] hover:text-[var(--premium-gold)] w-1/4">
            <MessageCircle className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Consulta</span>
            {consulta.length > 0 && (
              <span className="absolute -top-2 ml-4 bg-[var(--premium-gold)] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {consulta.length}
              </span>
            )}
          </button>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 text-[var(--text-muted)] hover:text-[var(--premium-gold)] w-1/4">
            <Phone className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold tracking-wider">WhatsApp</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 md:py-16 px-4 md:px-8 min-h-screen">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-10 md:items-center md:justify-between">
          <div className="relative w-full md:w-96 flex-shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input 
              type="text" 
              placeholder="Buscar productos..."
              value={search}
              onChange={e => handleSearch(e.target.value)}
              className="w-full bg-[var(--surface-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] pl-12 pr-4 py-3 md:py-3 text-sm focus:outline-none focus:border-[var(--premium-gold)] transition-colors rounded-none"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <button 
              className="md:hidden flex-1 bg-[var(--surface-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] px-4 py-3 text-sm font-bold uppercase flex items-center justify-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" /> Filtros
            </button>
          </div>
          
          <div className={`${showFilters ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto`}>
            <select 
              value={selectedCategory} 
              onChange={e => {
                setSelectedCategory(e.target.value as any);
                trackFenixEvent("Category selected", { category: e.target.value });
              }}
              className="bg-[var(--surface-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] px-4 py-3 md:py-3 text-sm focus:outline-none focus:border-[var(--premium-gold)] rounded-none"
            >
              <option value="all">Todas las Categorías</option>
              <option value="maquinas">Máquinas</option>
              <option value="trimmers">Trimmers</option>
              <option value="shavers">Shavers</option>
              <option value="secadoras">Secadoras</option>
              <option value="accesorios">Accesorios</option>
              <option value="sillas">Sillas</option>
            </select>
            <select 
              value={selectedBrand} 
              onChange={e => setSelectedBrand(e.target.value)}
              className="bg-[var(--surface-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] px-4 py-3 md:py-3 text-sm focus:outline-none focus:border-[var(--premium-gold)] rounded-none"
            >
              <option value="all">Todas las Marcas</option>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-colors group flex flex-col rounded-md overflow-hidden">
              <div className="relative aspect-[4/3] bg-[var(--background-secondary)] p-4 flex items-center justify-center overflow-hidden border-b border-[var(--border-subtle)]">
                <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 md:p-5 flex flex-col flex-grow">
                <div className="text-[var(--premium-gold)] text-[10px] font-bold uppercase tracking-widest mb-1">{product.brand}</div>
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-2 leading-snug line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                
                <div className="text-sm font-bold text-[var(--text-primary)] mb-1">
                  {formatPrice(product.price)}
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mb-5 uppercase tracking-wider">
                  Disponibilidad sujeta a confirmación.
                </div>
                
                <div className="flex flex-col gap-2 mt-auto">
                  <button 
                    onClick={() => addToConsulta(product, 1)}
                    className="w-full bg-[var(--premium-gold)] hover:bg-[var(--premium-gold-dark)] text-black py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors rounded-sm"
                  >
                    Agregar a mi consulta
                  </button>
                  <div className="flex gap-2 items-center justify-between">
                    <a 
                      href={`#producto/${product.id}`}
                      className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--premium-gold)] uppercase font-bold tracking-wider px-1"
                    >
                      Ver detalles
                    </a>
                    <button 
                      onClick={() => sendSingleWhatsApp(product, 1)}
                      className="bg-[var(--surface-primary)] hover:bg-[var(--border-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-[11px] py-2 px-3 uppercase font-bold tracking-wider transition-colors rounded-sm flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-20 text-[var(--text-muted)]">
              No se encontraron productos con estos filtros.
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      {activeProduct && (
        <div 
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={activeProduct.name}
        >
          <div ref={activeProductRef} className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] max-w-4xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 rounded-md">
            <div className="relative bg-[var(--background-secondary)] aspect-[4/3] md:aspect-auto flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-[var(--border-subtle)]">
              <button onClick={closeProductModal} aria-label="Cerrar detalles" className="absolute top-4 right-4 md:left-4 md:right-auto text-[var(--text-secondary)] hover:text-white z-10 p-2 bg-black/40 rounded-full md:bg-transparent md:p-0">
                <X className="w-6 h-6" />
              </button>
              <img src={activeProduct.image} alt={activeProduct.name} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="p-6 md:p-10 flex flex-col">
              <div className="text-[var(--premium-gold)] text-xs font-bold uppercase tracking-widest mb-2">{activeProduct.brand}</div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--text-primary)] mb-3 leading-tight">{activeProduct.name}</h2>
              <div className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-2">
                {formatPrice(activeProduct.price)}
              </div>
              <div className="flex items-center gap-2 mb-6 text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                <Check className="w-3 h-3 text-[var(--premium-gold)]" /> Disponibilidad sujeta a confirmación.
              </div>
              
              <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-6">
                {activeProduct.description}
              </p>
              
              {activeProduct.variations && activeProduct.variations.length > 0 && (
                <div className="mb-6">
                  <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-2">Variación</div>
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.variations.map(v => (
                      <button 
                        key={v}
                        onClick={() => setSelectedVariation(v)}
                        className={`px-3 py-1.5 border ${selectedVariation === v ? 'border-[var(--premium-gold)] text-[var(--premium-gold)]' : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'} text-xs font-bold uppercase transition-colors rounded-sm`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-auto space-y-3 pt-4 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">Cantidad</div>
                  <div className="flex border border-[var(--border-subtle)] rounded-sm overflow-hidden">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1.5 bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:text-white">-</button>
                    <div className="px-4 py-1.5 bg-[var(--background-secondary)] text-[var(--text-primary)] font-bold min-w-[2.5rem] text-center text-sm">{quantity}</div>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1.5 bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:text-white">+</button>
                  </div>
                </div>
                
                <button 
                  onClick={() => addToConsulta(activeProduct, quantity, selectedVariation)}
                  className="w-full bg-[var(--premium-gold)] hover:bg-[var(--premium-gold-dark)] text-black py-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors rounded-sm"
                >
                  Agregar a mi consulta
                </button>
                <button 
                  onClick={() => sendSingleWhatsApp(activeProduct, quantity, selectedVariation)}
                  className="w-full bg-transparent border border-[var(--border-subtle)] hover:bg-[var(--surface-primary)] text-[var(--text-primary)] py-3 text-xs md:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors rounded-sm"
                >
                  <Phone className="w-4 h-4" />
                  Consultar por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mi Consulta Sidebar */}
      {isConsultaOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Mi Consulta"
        >
          <div ref={consultaRef} className="w-full max-w-md bg-[var(--surface-elevated)] h-full shadow-2xl flex flex-col border-l border-[var(--border-subtle)]">
            <div className="p-5 md:p-6 border-b border-[var(--border-subtle)] flex justify-between items-center bg-[var(--surface-primary)]">
              <h2 className="text-lg md:text-xl font-display font-bold uppercase flex items-center gap-3">
                <MessageCircle className="text-[var(--premium-gold)] w-5 h-5 md:w-6 md:h-6" />
                Mi Consulta
                <span className="bg-[var(--premium-gold)] text-black text-[10px] px-2 py-0.5 rounded-full font-bold">{consulta.length}</span>
              </h2>
              <button onClick={() => setIsConsultaOpen(false)} aria-label="Cerrar Mi Consulta" className="text-[var(--text-secondary)] hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-5 md:p-6 space-y-4">
              {consulta.length === 0 ? (
                <div className="text-center text-[var(--text-muted)] py-12">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  No has agregado productos a tu consulta.
                </div>
              ) : (
                consulta.map((item, i) => (
                  <div key={i} className="flex gap-3 border-b border-[var(--border-subtle)] pb-4">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 md:w-20 md:h-20 object-contain bg-[var(--background-secondary)] p-1 border border-[var(--border-subtle)] rounded-sm" />
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="text-[var(--premium-gold)] text-[9px] md:text-[10px] font-bold uppercase">{item.product.brand}</div>
                        <h4 className="font-bold text-xs md:text-sm text-[var(--text-primary)] mb-1 leading-tight">{item.product.name}</h4>
                        {item.variation && <div className="text-[var(--text-muted)] text-[10px] md:text-xs">Var: {item.variation}</div>}
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center border border-[var(--border-subtle)] rounded-sm overflow-hidden bg-[var(--surface-primary)]">
                          <button onClick={() => updateConsultaQuantity(i, -1)} className="px-2 py-0.5 text-[var(--text-secondary)] hover:text-white" aria-label="Disminuir cantidad">-</button>
                          <div className="px-2 text-[var(--text-primary)] font-bold text-xs min-w-[1.5rem] text-center">{item.quantity}</div>
                          <button onClick={() => updateConsultaQuantity(i, 1)} className="px-2 py-0.5 text-[var(--text-secondary)] hover:text-white" aria-label="Aumentar cantidad">+</button>
                        </div>
                        <button onClick={() => removeFromConsulta(i)} className="text-red-400 text-[10px] uppercase font-bold hover:underline tracking-wider">Quitar</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-5 md:p-6 bg-[var(--surface-primary)] border-t border-[var(--border-subtle)]">
              <div className="flex items-start gap-2 text-[var(--text-secondary)] bg-[var(--background-secondary)] p-3 md:p-4 mb-4 text-[10px] md:text-[11px] leading-relaxed border border-[var(--border-subtle)] rounded-sm">
                <Info className="w-4 h-4 text-[var(--premium-gold)] shrink-0" />
                Los precios y la disponibilidad están sujetos a confirmación. La compra se coordina directamente con Suplidora Fénix.
              </div>
              <button 
                onClick={sendMultiWhatsApp}
                disabled={consulta.length === 0}
                className="w-full bg-[var(--premium-gold)] hover:bg-[var(--premium-gold-dark)] disabled:opacity-50 disabled:hover:bg-[var(--premium-gold)] text-black py-3.5 text-xs md:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors rounded-sm"
              >
                <Phone className="w-4 h-4" />
                Enviar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export type FenixCategory = "maquinas" | "trimmers" | "shavers" | "secadoras" | "accesorios" | "sillas";

export interface FenixProduct {
  id: string;
  name: string;
  brand: string;
  category: FenixCategory;
  price: number | null;
  image: string;
  description: string;
  variations?: string[];
  status: "consultar";
}

export const FENIX_PRODUCTS: FenixProduct[] = [
  {
    id: "wmark-clipper-wmaglev",
    name: "Clipper W-Maglev 10,000 RPM",
    brand: "WMARK",
    category: "maquinas",
    price: null,
    image: "/template-assets/suplidora-fenix/fenix_clipper_box.jpg",
    description: "Máquina de corte. Incluye caja y accesorios según empaque.",
    status: "consultar"
  },
  {
    id: "wmark-clipper-kit",
    name: "Set de Clippers",
    brand: "WMARK",
    category: "maquinas",
    price: null,
    image: "/template-assets/suplidora-fenix/fenix_clipper_kit.jpg",
    description: "Kit de máquinas de corte para barbería.",
    status: "consultar"
  },
  {
    id: "vgr-clipper",
    name: "Clipper VGR",
    brand: "VGR",
    category: "maquinas",
    price: null,
    image: "/template-assets/suplidora-fenix/fenix_vgr.jpg",
    description: "Máquina de corte VGR.",
    status: "consultar"
  },
  {
    id: "clipper-teal",
    name: "Clipper Teal",
    brand: "Generic",
    category: "maquinas",
    price: null,
    image: "/template-assets/suplidora-fenix/fenix_teal.jpg",
    description: "Máquina de corte en color teal.",
    status: "consultar"
  },
  {
    id: "white-trimmer-set",
    name: "Set Trimmer Blanco",
    brand: "WMARK",
    category: "trimmers",
    price: null,
    image: "/template-assets/suplidora-fenix/fenix_white_set.jpg",
    description: "Colección de terminadoras en color blanco.",
    status: "consultar"
  },
  {
    id: "gold-trimmer-set",
    name: "Set Trimmer Dorado",
    brand: "WMARK",
    category: "trimmers",
    price: null,
    image: "/template-assets/suplidora-fenix/fenix_gold_set.jpg",
    description: "Terminadoras en color dorado.",
    status: "consultar"
  },
  {
    id: "foil-shaver-gold",
    name: "Foil Shaver Gold",
    brand: "VGR",
    category: "shavers",
    price: null,
    image: "/template-assets/suplidora-fenix/fenix_gold_shaver.jpg",
    description: "Rasuradora de lámina en color dorado.",
    status: "consultar"
  },
  {
    id: "foil-shaver-black",
    name: "Foil Shaver Black",
    brand: "VGR",
    category: "shavers",
    price: null,
    image: "/template-assets/suplidora-fenix/fenix_shaver_black.jpg",
    description: "Rasuradora de lámina en color negro.",
    status: "consultar"
  },
  {
    id: "foil-shaver-red",
    name: "Foil Shaver Red",
    brand: "VGR",
    category: "shavers",
    price: null,
    image: "/template-assets/suplidora-fenix/fenix_shaver_red.jpg",
    description: "Rasuradora de lámina en color rojo.",
    status: "consultar"
  },
  {
    id: "shaver-compact",
    name: "Shaver Compacta",
    brand: "WMARK",
    category: "shavers",
    price: null,
    image: "/template-assets/suplidora-fenix/fenix_shaver_hands.jpg",
    description: "Rasuradora compacta.",
    status: "consultar"
  },
  {
    id: "hair-dryer",
    name: "Secadora",
    brand: "Generic",
    category: "secadoras",
    price: null,
    image: "/template-assets/suplidora-fenix/fenix_dryer.jpg",
    description: "Secadora de cabello.",
    status: "consultar"
  },
  {
    id: "guards-kit-color",
    name: "Kit de Guías Color",
    brand: "WMARK",
    category: "accesorios",
    price: null,
    image: "/template-assets/suplidora-fenix/fenix_accesorios.jpg",
    description: "Set de guías de corte en múltiples colores.",
    status: "consultar"
  },
  {
    id: "barber-chair",
    name: "Silla de Barbero",
    brand: "Generic",
    category: "sillas",
    price: null,
    image: "/template-assets/suplidora-fenix/fenix_shop2.jpg",
    description: "Silla para estación de barbería.",
    status: "consultar"
  }
];
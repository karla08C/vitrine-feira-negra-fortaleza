import { Negocio, Categoria } from "../types";

export const STORAGE_KEY = "vitrine_feira_negra_fortaleza";

export const CATEGORIAS: Categoria[] = [
  "Moda e Vestuário",
  "Acessórios",
  "Artesanato",
  "Gastronomia",
  "Beleza e Cosméticos",
];

export interface CategoriaColorStyle {
  bg: string;
  text: string;
  tintBg: string;
  tintText: string;
  border: string;
  dotColor: string;
}

export const CATEGORIA_CORES: Record<string, CategoriaColorStyle> = {
  "Moda e Vestuário": {
    bg: "#16594c",
    text: "#ffffff",
    tintBg: "#edf7f5",
    tintText: "#12493e",
    border: "#b9e3da",
    dotColor: "#16594c",
  },
  "Acessórios": {
    bg: "#c64624",
    text: "#ffffff",
    tintBg: "#fdf2ee",
    tintText: "#9e3417",
    border: "#f7cfc4",
    dotColor: "#c64624",
  },
  "Artesanato": {
    bg: "#cb7c12",
    text: "#ffffff",
    tintBg: "#fef8ec",
    tintText: "#965705",
    border: "#fae1b2",
    dotColor: "#cb7c12",
  },
  "Gastronomia": {
    bg: "#9a2828",
    text: "#ffffff",
    tintBg: "#faefef",
    tintText: "#7b1c1c",
    border: "#f6c9c9",
    dotColor: "#9a2828",
  },
  "Beleza e Cosméticos": {
    bg: "#b5592c",
    text: "#ffffff",
    tintBg: "#fdf3ee",
    tintText: "#8e3f18",
    border: "#f7d2c0",
    dotColor: "#b5592c",
  },
};

export function getCategoriaCor(categoria: string): CategoriaColorStyle {
  return (
    CATEGORIA_CORES[categoria] || {
      bg: "#c64624",
      text: "#ffffff",
      tintBg: "#fdf2ee",
      tintText: "#9e3417",
      border: "#f7cfc4",
      dotColor: "#c64624",
    }
  );
}

export const SEED_NEGOCIOS: Negocio[] = [
  {
    id: "seed-1",
    nome: "D'ZABOR Crochê Autoral",
    categoria: "Moda e Vestuário",
    descricao: "Vestidos e peças em crochê com fios naturais, inspirados na ancestralidade africana.",
    whatsapp: "85999887766",
    foto: "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=800&q=80",
    destaque: true,
  },
  {
    id: "seed-2",
    nome: "Raiz Adornos",
    categoria: "Acessórios",
    descricao: "Brincos, colares e turbantes artesanais com materiais sustentáveis e gemas brasileiras.",
    whatsapp: "85988776655",
    foto: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=800&q=80",
    destaque: false,
  },
  {
    id: "seed-3",
    nome: "Cozinha da Mãe Preta",
    categoria: "Gastronomia",
    descricao: "Quitutes afro-brasileiros: acarajé, abará, cocada e bolos tradicionais feitos na hora.",
    whatsapp: "85977665544",
    foto: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80",
    destaque: true,
  },
  {
    id: "seed-4",
    nome: "Ori Saberes Artesanais",
    categoria: "Artesanato",
    descricao: "Cerâmicas, mandalas e objetos de decoração feitos à mão com barro e fibras naturais.",
    whatsapp: "85966554433",
    foto: "https://images.unsplash.com/photo-1565193981860-33ed4a9b8d5e?w=800&q=80",
    destaque: false,
  },
  {
    id: "seed-5",
    nome: "Omolocura Cosméticos Naturais",
    categoria: "Beleza e Cosméticos",
    descricao: "Shampoos, hidratações e óleos vegetais formulados para cabelos crespos e cacheados.",
    whatsapp: "85955443322",
    foto: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    destaque: false,
  },
  {
    id: "seed-6",
    nome: "Terra Maré Modas",
    categoria: "Moda e Vestuário",
    descricao: "Estamparia exclusiva com padrões africanos em camisas, saias e conjuntos unissex.",
    whatsapp: "85944332211",
    foto: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    destaque: false,
  },
];

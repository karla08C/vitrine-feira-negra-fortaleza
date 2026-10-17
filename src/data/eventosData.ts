export interface EventoFeira {
  id: string;
  titulo: string;
  subtitulo: string;
  data: string;
  horario: string;
  local: string;
  endereco: string;
  bairro: string;
  cidade: string;
  descricao: string;
  atracaoDestaque: string[];
  entrada: string;
  linkMaps: string;
  foto: string;
  status: "confirmado" | "proximo" | "em_breve";
}

export const EVENTOS_FEIRA: EventoFeira[] = [
  {
    id: "evento-1",
    titulo: "Feira Negra no Dragão do Mar",
    subtitulo: "Moda autoral, gastronomia afro-brasileira e roda de samba",
    data: "Sábado, 11 de Outubro",
    horario: "16h às 21h30",
    local: "Centro Dragão do Mar de Arte e Cultura",
    endereco: "Rua Dragão do Mar, 81 — Praça Verde",
    bairro: "Praia de Iracema",
    cidade: "Fortaleza — CE",
    descricao:
      "Edição especial reunindo mais de 35 marcas afroempreendedoras de Fortaleza. Venha prestigiar produções em crochê, biojoias, turbantes, cosméticos veganos e a tradicional praça de quitutes com acarajé quentinho, abará e doces ancestrais.",
    atracaoDestaque: [
      "Roda de Samba e Ancestralidade",
      "Desfile de Moda Autoral Afro",
      "Praça Gastronômica com Acarajé e Quitutes",
      "Mais de 35 Expositores Locais",
    ],
    entrada: "Entrada Gratuita e Aberta ao Público",
    linkMaps: "https://maps.google.com/?q=Centro+Dragao+do+Mar+de+Arte+e+Cultura+Fortaleza",
    foto: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=900&q=80",
    status: "confirmado",
  },
  {
    id: "evento-2",
    titulo: "Feira Negra no Parque Rachel de Queiroz",
    subtitulo: "Artesanato, beleza negra, literatura e oficinas infantis",
    data: "Domingo, 26 de Outubro",
    horario: "16h às 21h",
    local: "Parque Rachel de Queiroz",
    endereco: "Avenida Governador Parsifal Barroso",
    bairro: "Presidente Kennedy",
    cidade: "Fortaleza — CE",
    descricao:
      "Uma tarde e noite sob a brisa do parque com muita economia criativa, cosméticos para cabelos crespos e cacheados, peças de decoração em cerâmica e oficinas de amarrações de turbantes para toda a família.",
    atracaoDestaque: [
      "Oficina Aberta de Turbantes e Tranças",
      "Contação de Histórias Africanas para Crianças",
      "Cosméticos Naturais e Biojoias",
      "Música Instrumental e DJ Set",
    ],
    entrada: "Entrada Gratuita e Livre para Todas as Idades",
    linkMaps: "https://maps.google.com/?q=Parque+Rachel+de+Queiroz+Fortaleza",
    foto: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900&q=80",
    status: "confirmado",
  },
  {
    id: "evento-3",
    titulo: "Feira Cultural Negra na Praça da Gentilândia",
    subtitulo: "Slam de poesia, artes visuais, brechós e música periférica",
    data: "Sexta-feira, 14 de Novembro",
    horario: "17h às 22h",
    local: "Praça da Gentilândia",
    endereco: "Rua Marechal Deodoro s/n — Coração do Benfica",
    bairro: "Benfica",
    cidade: "Fortaleza — CE",
    descricao:
      "No polo boêmio e universitário do Benfica, a Feira Negra ocupa a tradicional Praça da Gentilândia com poesia marginal, moda urbana, brechós sustentáveis, estamparias exclusivas e comidas típicas.",
    atracaoDestaque: [
      "Batalha de Poesia (Slam) com Poetas Negros",
      "Mostra de Artes Plásticas e Gravuras",
      "Brechós e Moda Upcycling",
      "Chorinho e Samba no Benfica",
    ],
    entrada: "Entrada Gratuita",
    linkMaps: "https://maps.google.com/?q=Praca+da+Gentilandia+Fortaleza",
    foto: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80",
    status: "proximo",
  },
];

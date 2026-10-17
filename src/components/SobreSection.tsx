import React from "react";
import { Sparkles, HeartHandshake, Compass, Users, ArrowRight, Store, Calendar, CheckCircle2 } from "lucide-react";

export const SobreSection: React.FC = () => {
  return (
    <section id="sobre" className="scroll-mt-20 py-16 md:py-24 border-t border-stone-200/70">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/60 text-[#E04823] text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Nossa História & Propósito</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] text-stone-900 mb-6">
            A força do afroempreendedorismo pulsando no coração de Fortaleza
          </h2>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            A <strong>Feira Negra de Fortaleza</strong> é um movimento vivo de protagonismo,
            geração de renda e celebração cultural. Criada para abrir caminhos e conectar produtores
            negros diretamente ao público da capital cearense.
          </p>
        </div>

        {/* Narrative & Photo Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Large Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E04823]">
                Manifesto da Feira
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-2 mb-6">
                Construindo prosperidade através da identidade e da ancestralidade
              </h3>

              <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Por muito tempo, o talento e a produção das pessoas negras foram invisibilizados ou relegados às margens. A Feira Negra nasce para ocupar o centro: trazendo moda autoral, biojoias, turbantes, saboarias naturais, obras de arte e quitutes que carregam séculos de sabedoria ancestral.
                </p>
                <p>
                  Mais do que uma feira comercial, este é um território de acolhimento e escuta. Cada edição reúne dezenas de empreendedoras e empreendedores que sustentam suas famílias, formam redes de apoio mútuo e reafirmam Fortaleza como uma cidade diversa, vibrante e negra.
                </p>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-stone-100 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#E04823]">100%</span>
                <p className="text-xs text-stone-500 mt-1 font-medium">Marcas Autorais & Locais</p>
              </div>
              <div>
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#F0AC33]">Ceará</span>
                <p className="text-xs text-stone-500 mt-1 font-medium">Cultura & Ancestralidade</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#16594C]">Coletivo</span>
                <p className="text-xs text-stone-500 mt-1 font-medium">Economia Preta Circular</p>
              </div>
            </div>
          </div>

          {/* Right Visual Image Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative rounded-3xl overflow-hidden h-72 lg:h-full min-h-[260px] border border-stone-200 shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900&q=80"
                alt="Encontro e artesanato na Feira Negra"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  Encontro & Comunidade
                </span>
                <p className="text-white text-base font-medium leading-snug">
                  Espaço público ocupado com arte, afeto, gastronomia e respeito às nossas raízes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-xs flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#E04823] flex items-center justify-center mb-5 border border-orange-100">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-display text-xl font-bold text-stone-900 mb-2.5">
              Ancestralidade & Autoria
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed mb-4 flex-1">
              Produtos que contam histórias: vestimentas com tecidos africanos, crochês autorais, biojoias, turbantes e cosméticos fitoterápicos pensados para nossos corpos e cabelos.
            </p>
            <ul className="space-y-2 text-xs font-medium text-stone-600 pt-3 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E04823] shrink-0" />
                <span>Identidade e representatividade</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E04823] shrink-0" />
                <span>Moda autoral e artesanal</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-xs flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F0AC33] flex items-center justify-center mb-5 border border-amber-100">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="font-display text-xl font-bold text-stone-900 mb-2.5">
              Economia Circular & Renda
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed mb-4 flex-1">
              Comprar de quem faz transforma a realidade de famílias inteiras. Cada real investido em afroempreendedores de Fortaleza circula na cidade e gera emancipação socioeconômica.
            </p>
            <ul className="space-y-2 text-xs font-medium text-stone-600 pt-3 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F0AC33] shrink-0" />
                <span>Dinheiro que fortalece a comunidade</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F0AC33] shrink-0" />
                <span>Independência e sustentabilidade</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-xs flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#16594C] flex items-center justify-center mb-5 border border-emerald-100">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-display text-xl font-bold text-stone-900 mb-2.5">
              Cultura, Música & Sabor
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed mb-4 flex-1">
              A feira é uma celebração para os sentidos. Roda de samba de raiz, apresentações de slam, capoeira, e a culinária afro-brasileira com o tempero tradicional do dendê.
            </p>
            <ul className="space-y-2 text-xs font-medium text-stone-600 pt-3 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16594C] shrink-0" />
                <span>Gastronomia afro de primeira</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16594C] shrink-0" />
                <span>Música, poesia e convivência</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Section Navigation Jump */}
        <div className="bg-[#141210] rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="font-display text-2xl font-bold mb-2">
              Apoie quem produz em Fortaleza
            </h3>
            <p className="text-stone-300 text-sm max-w-xl">
              Navegue pelos produtos e serviços na nossa Vitrine Digital ou confira as próximas datas e locais onde a Feira Negra estará montada.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="#vitrine"
              className="inline-flex items-center gap-2 bg-[#E04823] hover:bg-[#C83E1D] text-white px-5 py-3 rounded-full text-sm font-semibold transition-all shadow-xs"
            >
              <Store className="w-4 h-4" />
              <span>Ver Vitrine de Negócios</span>
            </a>
            <a
              href="#eventos"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3 rounded-full text-sm font-semibold transition-all"
            >
              <Calendar className="w-4 h-4 text-[#F0AC33]" />
              <span>Ver Próximos Eventos</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

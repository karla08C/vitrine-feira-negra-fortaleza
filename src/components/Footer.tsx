import React from "react";
import { Heart, Sparkles, MapPin, Store, Compass, Calendar, Lock } from "lucide-react";

interface FooterProps {
  isAdmin?: boolean;
  onAbrirLogin?: () => void;
  onLogout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  isAdmin,
  onAbrirLogin,
  onLogout,
}) => {
  return (
    <footer className="mt-20 pt-16 pb-16 border-t border-stone-200/80 text-center bg-white/40">
      <div className="max-w-xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Feira Negra de Fortaleza · Vitrine Oficial</span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
          Afroempreendedorismo em Movimento
        </h3>

        <p className="text-sm text-stone-600 leading-relaxed mb-8">
          Cada visita, compartilhamento e contato direto no WhatsApp fortalece a economia criativa,
          a ancestralidade e os negócios negros de Fortaleza.
        </p>

        {/* Section Navigation Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <a
            href="#vitrine"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:border-[#E04823] hover:text-[#E04823] transition-colors shadow-xs"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Vitrine</span>
          </a>

          <a
            href="#sobre"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:border-[#E04823] hover:text-[#E04823] transition-colors shadow-xs"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Sobre a Feira</span>
          </a>

          <a
            href="#eventos"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:border-[#E04823] hover:text-[#E04823] transition-colors shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Eventos & Agenda</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-stone-500 pt-6 border-t border-stone-200/60">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#E04823]" />
            Fortaleza — Ceará
          </span>
          <span>·</span>
          <span>Economia & Cultura Negra</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            Feito com <Heart className="w-3.5 h-3.5 text-[#E04823] fill-current" /> para a comunidade
          </span>
          {isAdmin ? (
            <>
              <span>·</span>
              <button
                onClick={onLogout}
                className="text-stone-400 hover:text-red-600 transition-colors text-xs cursor-pointer inline-flex items-center gap-1"
              >
                <span>Sair do Acesso</span>
              </button>
            </>
          ) : onAbrirLogin ? (
            <>
              <span>·</span>
              <button
                onClick={onAbrirLogin}
                className="text-stone-400 hover:text-stone-600 transition-colors text-xs cursor-pointer inline-flex items-center gap-1 opacity-70 hover:opacity-100"
                title="Acesso dos organizadores"
              >
                <Lock className="w-3 h-3" />
                <span>Acesso Organizadores</span>
              </button>
            </>
          ) : null}
        </div>
      </div>
    </footer>
  );
};

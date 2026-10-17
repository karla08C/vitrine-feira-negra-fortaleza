import React from "react";
import { MapPin, Sparkles, ShieldCheck, LogOut, ArrowDown, Store, Calendar, Compass } from "lucide-react";

interface HeaderHeroProps {
  total: number;
  isAdmin: boolean;
  onLogout: () => void;
  secaoAtiva?: "vitrine" | "sobre" | "eventos";
}

export const HeaderHero: React.FC<HeaderHeroProps> = ({
  total,
  isAdmin,
  onLogout,
  secaoAtiva = "vitrine",
}) => {
  return (
    <header className="relative overflow-hidden bg-[#141210] text-[#FAF7F2]">
      {/* Decorative ambient lighting */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #DE4A24 0px, transparent 50%), radial-gradient(circle at 80% 30%, #F0AC33 0px, transparent 45%), radial-gradient(circle at 50% 90%, #16594C 0px, transparent 50%)",
        }}
      />
      {/* Subtle geometric dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#FAF7F2 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-6 pb-16 md:pt-8 md:pb-24">
        {/* Top Navbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 md:mb-14 pb-4 border-b border-white/10">
          {/* Brand Logo / Title */}
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E04823] animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#FAF7F2]/90">
              Feira Negra de Fortaleza
            </span>
          </div>

          {/* Section Navigation Links: Vitrine, Sobre, Eventos */}
          <nav className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm">
            <a
              id="nav-link-vitrine"
              href="#vitrine"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                secaoAtiva === "vitrine"
                  ? "bg-[#E04823] text-white shadow-xs"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Vitrine</span>
            </a>

            <a
              id="nav-link-sobre"
              href="#sobre"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                secaoAtiva === "sobre"
                  ? "bg-[#E04823] text-white shadow-xs"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Sobre</span>
            </a>

            <a
              id="nav-link-eventos"
              href="#eventos"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                secaoAtiva === "eventos"
                  ? "bg-[#E04823] text-white shadow-xs"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Eventos</span>
            </a>
          </nav>

          {/* Admin Status (only visible if admin is logged in) */}
          <div className="min-h-[32px] flex items-center">
            {isAdmin && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-[#F0AC33]/40 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#FAF7F2] shadow-sm">
                <span className="flex items-center gap-1.5 text-[#F0AC33] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Modo Organizador</span>
                </span>
                <span className="opacity-30">|</span>
                <button
                  id="hero-admin-logout"
                  onClick={onLogout}
                  className="inline-flex items-center gap-1 text-[#FAF7F2]/80 hover:text-white transition-colors cursor-pointer"
                  title="Sair do modo administrador"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hero Central Content */}
        <div className="max-w-3xl">
          <h1
            className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.08] tracking-tight mb-6 animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            Vitrine Digital do
            <br />
            <span className="italic font-normal text-[#F0AC33]">
              Afroempreendedorismo
            </span>
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl text-[#FAF7F2]/85 max-w-2xl leading-relaxed mb-10 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            A potência da cultura negra, da arte ancestral e da economia criativa em Fortaleza.
            Conheça as marcas, apoie os criadores e conecte-se diretamente pelo WhatsApp.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3.5 mb-14 animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            <a
              id="hero-explorar-btn"
              href="#vitrine"
              className="inline-flex items-center justify-center gap-2.5 gradient-terroso text-white px-7 py-3.5 rounded-full font-semibold hover:opacity-95 hover:shadow-lg hover:shadow-[#E04823]/25 active:scale-[0.98] transition-all cursor-pointer text-sm sm:text-base"
            >
              <span>Explorar a Vitrine</span>
              <ArrowDown className="w-4 h-4 text-[#FAF7F2]" />
            </a>

            <a
              id="hero-eventos-btn"
              href="#eventos"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-[#FAF7F2] px-6 py-3.5 rounded-full font-medium transition-colors text-sm sm:text-base backdrop-blur-sm"
            >
              <Calendar className="w-4 h-4 text-[#F0AC33]" />
              <span>Ver Agenda de Eventos</span>
            </a>
          </div>
        </div>

        {/* Live Metrics Floating Row */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10 text-sm animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#E04823]/20 flex items-center justify-center text-[#E04823]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#FAF7F2]/60 uppercase tracking-wider font-medium">Localização</p>
              <p className="text-sm font-semibold text-[#FAF7F2]">Fortaleza — Ceará</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#F0AC33]/20 flex items-center justify-center text-[#F0AC33]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#FAF7F2]/60 uppercase tracking-wider font-medium">Movimento</p>
              <p className="text-sm font-semibold text-[#FAF7F2]">Economia & Identidade</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#16594C]/30 flex items-center justify-center text-[#38B29D]">
              <span className="font-display text-lg font-bold">{total}</span>
            </div>
            <div>
              <p className="text-xs text-[#FAF7F2]/60 uppercase tracking-wider font-medium">Catálogo</p>
              <p className="text-sm font-semibold text-[#FAF7F2]">Negócios Ativos</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

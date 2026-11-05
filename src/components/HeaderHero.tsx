import React from "react";
import {
  MapPin,
  Sparkles,
  ShieldCheck,
  LogOut,
  ArrowDown,
  Store,
  Calendar,
  Compass,
  UserCheck,
  Plus,
  Send,
  KeyRound,
} from "lucide-react";

interface HeaderHeroProps {
  total: number;
  isAdmin: boolean;
  onLogout: () => void;
  secaoAtiva?: "vitrine" | "sobre" | "eventos" | "quero-expor";
  pendentesCount?: number;
  onAbrirSolicitacoes?: () => void;
  onAbrirLogin?: () => void;
  onCadastrarNegocio?: () => void;
  onCadastrarEvento?: () => void;
  onAbrirAlterarSenha?: () => void;
  isDefaultPassword?: boolean;
}

export const HeaderHero: React.FC<HeaderHeroProps> = ({
  total,
  isAdmin,
  onLogout,
  secaoAtiva = "vitrine",
  pendentesCount = 0,
  onAbrirSolicitacoes,
  onAbrirLogin,
  onCadastrarNegocio,
  onCadastrarEvento,
  onAbrirAlterarSenha,
  isDefaultPassword = false,
}) => {
  return (
    <header className="relative bg-[#2A160E] py-4 sm:py-8 px-3 sm:px-6 md:px-8 text-[#FAF1DE]">
      {/* Outer ambient warmth */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, #F9910F 0px, transparent 40%), radial-gradient(circle at 85% 75%, #E07F00 0px, transparent 45%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Top Header Tagline */}
        <div className="text-center mb-3 hidden sm:block">
          <p className="text-xs uppercase font-extrabold tracking-[0.28em] text-[#F9910F]">
            ✦ Economia Criativa & Identidade Ancestral ✦
          </p>
        </div>

        {/* Poster Canvas Card (Reference Layout) */}
        <div className="relative bg-[#F8E4B8] text-[#260E05] rounded-3xl sm:rounded-[32px] p-6 sm:p-10 md:p-12 shadow-2xl border-4 border-[#3D2014] overflow-hidden bg-afro-grid">
          {/* Subtle distressed edge overlay / corner grunge */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-[#F3D79F]/30 pointer-events-none" />

          {/* Decorative Starbursts */}
          <div className="absolute top-10 right-12 text-[#F9910F] text-4xl select-none pointer-events-none animate-pulse opacity-85">
            ✦
          </div>
          <div className="absolute top-44 right-1/3 text-[#F9910F] text-2xl select-none pointer-events-none opacity-75">
            ✦
          </div>
          <div className="absolute bottom-28 left-1/3 text-[#F9910F] text-3xl select-none pointer-events-none opacity-80">
            ✦
          </div>

          {/* Navigation Bar inside Poster Canvas */}
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-12 pb-5 border-b-2 border-[#260E05]/15">
            {/* Logo / Brand Name in Poster Font */}
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[#F9910F] ring-4 ring-[#260E05]/20" />
              <span className="font-poster text-xl sm:text-2xl tracking-tight text-[#260E05] uppercase">
                Feira Negra
              </span>
              <span className="font-condensed text-base tracking-wider bg-[#260E05] text-[#FAF1DE] px-2.5 py-0.5 rounded-md uppercase">
                Fortaleza
              </span>
            </div>

            {/* Nav Pill Tabs */}
            <nav className="flex flex-wrap items-center justify-center gap-1.5 bg-[#260E05]/10 p-1.5 rounded-full border border-[#260E05]/15 backdrop-blur-xs">
              <a
                id="nav-link-vitrine"
                href="#vitrine"
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  secaoAtiva === "vitrine"
                    ? "bg-[#260E05] text-white shadow-md scale-102"
                    : "text-[#260E05] hover:bg-white/50"
                }`}
              >
                <Store className="w-3.5 h-3.5 text-[#F9910F]" />
                <span>Vitrine</span>
              </a>

              <a
                id="nav-link-sobre"
                href="#sobre"
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  secaoAtiva === "sobre"
                    ? "bg-[#260E05] text-white shadow-md scale-102"
                    : "text-[#260E05] hover:bg-white/50"
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-[#F9910F]" />
                <span>Sobre</span>
              </a>

              <a
                id="nav-link-eventos"
                href="#eventos"
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  secaoAtiva === "eventos"
                    ? "bg-[#260E05] text-white shadow-md scale-102"
                    : "text-[#260E05] hover:bg-white/50"
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-[#F9910F]" />
                <span>Eventos</span>
              </a>

              <a
                id="nav-link-quero-expor"
                href="#quero-expor"
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  secaoAtiva === "quero-expor"
                    ? "bg-[#260E05] text-white shadow-md scale-102"
                    : "text-[#260E05] hover:bg-white/50"
                }`}
              >
                <Send className="w-3.5 h-3.5 text-[#F9910F]" />
                <span>Quero Expor</span>
              </a>
            </nav>

            {/* Admin Controls */}
            <div className="flex items-center gap-2">
              {isAdmin ? (
                <div className="flex flex-wrap items-center gap-2">
                  {/* Default Password Warning Badge */}
                  {isDefaultPassword && onAbrirAlterarSenha && (
                    <button
                      id="hero-trocar-senha-padrao-btn"
                      onClick={onAbrirAlterarSenha}
                      className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-[#260E05] px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer animate-pulse"
                      title="Você está usando a senha padrão (admin123). Clique para alterar."
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Trocar Senha Padrão</span>
                      <span className="sm:hidden">Senha</span>
                    </button>
                  )}

                  {/* Candidaturas button */}
                  {onAbrirSolicitacoes && (
                    <button
                      onClick={onAbrirSolicitacoes}
                      className="relative inline-flex items-center gap-1.5 bg-[#260E05] hover:bg-[#F9910F] text-[#FAF1DE] hover:text-[#260E05] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Candidaturas</span>
                      {pendentesCount > 0 && (
                        <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#F9910F] text-[#260E05] text-[10px] font-black">
                          {pendentesCount}
                        </span>
                      )}
                    </button>
                  )}

                  <div className="inline-flex items-center gap-2 bg-[#260E05] text-[#FAF1DE] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F9910F]" />
                    <span className="hidden sm:inline">Admin</span>
                    {onAbrirAlterarSenha && (
                      <>
                        <span className="opacity-30">|</span>
                        <button
                          id="hero-admin-trocar-senha"
                          onClick={onAbrirAlterarSenha}
                          className="hover:text-[#F9910F] transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                          title="Alterar senha do administrador"
                        >
                          <KeyRound className="w-3 h-3 text-[#F9910F]" />
                          <span className="hidden sm:inline">Senha</span>
                        </button>
                      </>
                    )}
                    <span className="opacity-30">|</span>
                    <button
                      id="hero-admin-logout"
                      onClick={onLogout}
                      className="hover:text-[#F9910F] transition-colors cursor-pointer flex items-center gap-1"
                      title="Sair do modo administrador"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>Sair</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={onAbrirLogin}
                  className="inline-flex items-center gap-1.5 bg-[#260E05] hover:bg-[#F9910F] text-[#FAF1DE] hover:text-[#260E05] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Área Admin</span>
                </button>
              )}
            </div>
          </div>

          {/* Main Hero Split Grid: Left Illustration + Right Big Title */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Visual Characters Artwork from Reference */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative group max-w-sm sm:max-w-md w-full">
                {/* Sunburst glowing background behind character */}
                <div className="absolute -inset-4 bg-[#F9910F]/20 rounded-full blur-xl pointer-events-none" />

                {/* Main Illustration Cutout */}
                <div className="relative rounded-3xl overflow-hidden border-4 border-[#260E05] shadow-2xl bg-[#FAF1DE] p-2 transition-transform duration-500 hover:rotate-1">
                  <img
                    src="/hero-characters-ref.webp"
                    alt="Afroempreendedoras da Feira Negra de Fortaleza"
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                  {/* Floating star badges */}
                  <div className="absolute top-4 left-4 bg-[#260E05] text-[#FAF1DE] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                    <span className="text-[#F9910F]">✦</span> Orgulho & Riqueza
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Poster Typography + Message */}
            <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="font-condensed text-sm sm:text-base tracking-[0.25em] uppercase text-[#F9910F] font-black bg-[#260E05] px-3 py-1 rounded-md">
                  Vitrine Oficial
                </span>
                <span className="text-xs font-bold text-[#260E05]/70 tracking-widest uppercase">
                  Fortaleza • CE
                </span>
              </div>

              {/* Big Display Headline (Alfa Slab One) */}
              <h1 className="font-poster text-4xl sm:text-6xl md:text-7xl font-normal leading-[0.98] tracking-tight text-[#260E05] uppercase mb-3">
                Feira Negra
              </h1>

              {/* Subheading: Inspired by reference "INSPIRES US ALL" */}
              <div className="font-sans font-extrabold text-lg sm:text-2xl md:text-3xl tracking-[0.08em] text-[#260E05] uppercase mb-5 flex items-center gap-2">
                <span>AFROEMPREENDEDORISMO & CULTURA</span>
              </div>

              {/* Mission / Context Text */}
              <p className="text-base sm:text-lg text-[#3D2014] font-medium leading-relaxed max-w-xl mb-8">
                A potência dos negócios liderados por pessoas negras, da moda e da ancestralidade à
                gastronomia e inovação em Fortaleza. Conheça as marcas, valorize os criadores e conecte-se
                diretamente pelo WhatsApp.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <a
                  id="hero-explorar-btn"
                  href="#vitrine"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#260E05] hover:bg-[#F9910F] text-[#FAF1DE] hover:text-[#260E05] px-7 py-3.5 rounded-full font-bold uppercase text-xs sm:text-sm tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-103 active:scale-98 cursor-pointer"
                >
                  <span>Conhecer Expositores</span>
                  <ArrowDown className="w-4 h-4" />
                </a>

                <a
                  id="hero-quero-expor-btn"
                  href="#quero-expor"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#F9910F] hover:bg-[#260E05] text-[#260E05] hover:text-[#FAF1DE] px-7 py-3.5 rounded-full font-bold uppercase text-xs sm:text-sm tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-103 active:scale-98 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Quero Expor na Feira</span>
                </a>

                <a
                  id="hero-eventos-btn"
                  href="#eventos"
                  className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#260E05] text-[#260E05] hover:text-[#FAF1DE] border-2 border-[#260E05] px-6 py-3.5 rounded-full font-bold uppercase text-xs sm:text-sm tracking-wider transition-all duration-300 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#F9910F]" />
                  <span>Agenda da Feira</span>
                </a>
              </div>

              {/* Admin quick actions if logged in */}
              {isAdmin && (
                <div className="flex flex-wrap items-center gap-2 p-3 bg-white/70 rounded-2xl border-2 border-[#260E05]/20 mb-6">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#260E05] mr-1">
                    Painel Rápido:
                  </span>
                  {onCadastrarNegocio && (
                    <button
                      onClick={onCadastrarNegocio}
                      className="inline-flex items-center gap-1 bg-[#260E05] text-[#FAF1DE] hover:bg-[#F9910F] hover:text-[#260E05] px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>+ Expositor</span>
                    </button>
                  )}
                  {onCadastrarEvento && (
                    <button
                      onClick={onCadastrarEvento}
                      className="inline-flex items-center gap-1 bg-[#260E05] text-[#FAF1DE] hover:bg-[#F9910F] hover:text-[#260E05] px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>+ Evento</span>
                    </button>
                  )}
                  {onAbrirSolicitacoes && (
                    <button
                      onClick={onAbrirSolicitacoes}
                      className="inline-flex items-center gap-1 bg-[#F9910F] text-[#260E05] hover:bg-[#260E05] hover:text-[#FAF1DE] px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <UserCheck className="w-3 h-3" />
                      <span>Aprovar Inscrições ({pendentesCount})</span>
                    </button>
                  )}
                </div>
              )}

              {/* Empowerment Fist Element */}
              <div className="hidden sm:flex items-center gap-3 pt-4 border-t border-[#260E05]/15">
                <div className="w-12 h-14 shrink-0 rounded-xl overflow-hidden border-2 border-[#260E05] shadow-xs bg-[#FAF1DE]">
                  <img
                    src="/empowerment-fist.webp"
                    alt="Resistência e Prosperidade"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[#260E05] uppercase tracking-wider">
                    Economia Solidária & Resistência
                  </p>
                  <p className="text-[#3D2014]/80">
                    Fortalecendo comunidades e gerando prosperidade coletiva.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-[#FAF1DE] border-2 border-[#3D2014] p-4 rounded-2xl flex items-center gap-3.5 shadow-md">
            <div className="w-11 h-11 rounded-xl bg-[#F9910F] text-[#260E05] flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#3D2014]/70 uppercase tracking-widest">Território</p>
              <p className="text-sm font-extrabold text-[#260E05]">Fortaleza — Ceará</p>
            </div>
          </div>

          <div className="bg-[#FAF1DE] border-2 border-[#3D2014] p-4 rounded-2xl flex items-center gap-3.5 shadow-md">
            <div className="w-11 h-11 rounded-xl bg-[#260E05] text-[#F9910F] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#3D2014]/70 uppercase tracking-widest">Impacto</p>
              <p className="text-sm font-extrabold text-[#260E05]">Ancestralidade & Riqueza</p>
            </div>
          </div>

          <div className="bg-[#FAF1DE] border-2 border-[#3D2014] p-4 rounded-2xl flex items-center gap-3.5 shadow-md">
            <div className="w-11 h-11 rounded-xl bg-[#F9910F] text-[#260E05] flex items-center justify-center">
              <span className="font-poster text-xl font-bold">{total}</span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#3D2014]/70 uppercase tracking-widest">Catálogo</p>
              <p className="text-sm font-extrabold text-[#260E05]">Marcas Cadastradas</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

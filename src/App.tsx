import React, { useState, useMemo, useEffect } from "react";
import { Plus, Store, ShieldCheck, Compass, Calendar, Send, UserCheck } from "lucide-react";
import { useNegocios } from "./hooks/useNegocios";
import { useAdminAuth } from "./hooks/useAdminAuth";
import { useEventos } from "./hooks/useEventos";
import { useSolicitacoes } from "./hooks/useSolicitacoes";
import { Negocio, ToastInfo, EventoFeira, SolicitacaoExpositor } from "./types";
import { HeaderHero } from "./components/HeaderHero";
import { FilterBar } from "./components/FilterBar";
import { NegocioCard } from "./components/NegocioCard";
import { NegocioModal } from "./components/NegocioModal";
import { EventoModal } from "./components/EventoModal";
import { AdminSolicitacoesModal } from "./components/AdminSolicitacoesModal";
import { CompartilharModal } from "./components/CompartilharModal";
import { AdminLoginModal } from "./components/AdminLoginModal";
import { SobreSection } from "./components/SobreSection";
import { EventosSection } from "./components/EventosSection";
import { QueroExporSection } from "./components/QueroExporSection";
import { ToastNotification } from "./components/ToastNotification";
import { Footer } from "./components/Footer";

export default function App() {
  const {
    negocios,
    adicionar,
    editar,
    alternarDestaque,
    remover,
  } = useNegocios();

  const {
    isAdmin,
    login,
    logout,
  } = useAdminAuth();

  const {
    eventos,
    adicionarEvento,
    editarEvento,
    removerEvento,
  } = useEventos();

  const {
    solicitacoes,
    pendentesCount,
    enviarSolicitacao,
    aprovar,
    rejeitar,
  } = useSolicitacoes();

  const [secaoAtiva, setSecaoAtiva] = useState<"vitrine" | "sobre" | "eventos" | "quero-expor">("vitrine");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [loginModalAberto, setLoginModalAberto] = useState(false);
  const [eventoModalAberto, setEventoModalAberto] = useState(false);
  const [solicitacoesModalAberto, setSolicitacoesModalAberto] = useState(false);
  const [negocioEditar, setNegocioEditar] = useState<Negocio | null>(null);
  const [eventoEditar, setEventoEditar] = useState<EventoFeira | null>(null);
  const [negocioCompartilhar, setNegocioCompartilhar] = useState<Negocio | null>(null);
  const [toast, setToast] = useState<ToastInfo | null>(null);

  // Smooth scroll to card or section if direct hash is provided
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash && hash.startsWith("#card-negocio-")) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("ring-4", "ring-[#F9910F]", "ring-offset-4");
          setTimeout(() => {
            el.classList.remove("ring-4", "ring-[#F9910F]", "ring-offset-4");
          }, 3000);
        }, 300);
      }
    } else if (hash === "#sobre") {
      setSecaoAtiva("sobre");
    } else if (hash === "#eventos") {
      setSecaoAtiva("eventos");
    } else if (hash === "#quero-expor") {
      setSecaoAtiva("quero-expor");
    } else if (hash === "#vitrine") {
      setSecaoAtiva("vitrine");
    }
  }, []);

  // Track active section on scroll
  useEffect(() => {
    if (typeof window === "undefined") return;

    const secoes = [
      { id: "vitrine", elemento: document.getElementById("vitrine") },
      { id: "sobre", elemento: document.getElementById("sobre") },
      { id: "eventos", elemento: document.getElementById("eventos") },
      { id: "quero-expor", elemento: document.getElementById("quero-expor") },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSecaoAtiva(entry.target.id as "vitrine" | "sobre" | "eventos" | "quero-expor");
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    secoes.forEach((s) => {
      if (s.elemento) observer.observe(s.elemento);
    });

    return () => observer.disconnect();
  }, []);

  function rolarParaSecao(secao: "vitrine" | "sobre" | "eventos" | "quero-expor") {
    setSecaoAtiva(secao);
    const el = document.getElementById(secao);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  const negociosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return [...negocios]
      .filter((item) => {
        const condCategoria =
          categoriaAtiva === "Todas" || item.categoria === categoriaAtiva;
        const condBusca =
          !termo ||
          item.nome.toLowerCase().includes(termo) ||
          item.descricao.toLowerCase().includes(termo) ||
          item.categoria.toLowerCase().includes(termo);
        return condCategoria && condBusca;
      })
      .sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
  }, [negocios, categoriaAtiva, busca]);

  // Business (Expositor) Management
  function handleSalvarNegocio(dados: Partial<Negocio>) {
    if (dados.id) {
      editar(dados.id, dados);
      setModalAberto(false);
      setNegocioEditar(null);
      setToast({
        titulo: `“${dados.nome}” atualizado!`,
        mensagem: "As alterações já aparecem na vitrine.",
      });
    } else {
      const novo = adicionar(dados);
      setModalAberto(false);
      setToast({
        titulo: `“${novo.nome}” cadastrado! 🎉`,
        mensagem: "O expositor foi cadastrado com sucesso e já está disponível na vitrine.",
      });
    }
  }

  function handleAbrirEditarNegocio(item: Negocio) {
    if (!isAdmin) {
      setLoginModalAberto(true);
      return;
    }
    setNegocioEditar(item);
    setModalAberto(true);
  }

  // Event Management
  function handleSalvarEvento(dados: Partial<EventoFeira>) {
    if (dados.id) {
      editarEvento(dados.id, dados);
      setEventoModalAberto(false);
      setEventoEditar(null);
      setToast({
        titulo: `Evento atualizado! 📅`,
        mensagem: `“${dados.titulo}” foi atualizado com sucesso.`,
      });
    } else {
      const novo = adicionarEvento(dados as Omit<EventoFeira, "id">);
      setEventoModalAberto(false);
      setToast({
        titulo: `Evento cadastrado! 📅`,
        mensagem: `“${novo.titulo}” foi adicionado à agenda da Feira Negra.`,
      });
    }
  }

  function handleRemoverEventoComToast(id: string) {
    removerEvento(id);
    setToast({
      titulo: "Evento removido",
      mensagem: "O evento foi excluído da programação.",
    });
  }

  // Solicitation (Candidatura) Approval Flow
  function handleAprovarSolicitacao(solicitacao: SolicitacaoExpositor) {
    // 1. Mark as approved in solicitations
    aprovar(solicitacao.id);

    // 2. Add to active businesses in showcase
    adicionar({
      nome: solicitacao.nomeNegocio,
      categoria: solicitacao.categoria,
      descricao: solicitacao.descricao,
      whatsapp: solicitacao.whatsapp,
      foto: solicitacao.foto,
      destaque: true, // give spotlight to freshly approved exhibitor
    });

    setToast({
      titulo: `Expositor Aprovado! 🌟`,
      mensagem: `“${solicitacao.nomeNegocio}” foi aprovado e agora aparece na Vitrine Pública com destaque!`,
    });
  }

  function handleRejeitarSolicitacao(id: string) {
    rejeitar(id);
    setToast({
      titulo: "Candidatura Recusada",
      mensagem: "A solicitação foi marcada como recusada.",
    });
  }

  return (
    <div className="min-h-screen bg-[#FAF3E7] text-[#260E05] selection:bg-[#F9910F]/30 bg-cocoa-grid">
      {/* Toast alert */}
      <ToastNotification toast={toast} onFechar={() => setToast(null)} />

      {/* Hero Banner Header */}
      <HeaderHero
        total={negocios.length}
        isAdmin={isAdmin}
        onLogout={logout}
        secaoAtiva={secaoAtiva}
        pendentesCount={pendentesCount}
        onAbrirSolicitacoes={() => setSolicitacoesModalAberto(true)}
        onAbrirLogin={() => setLoginModalAberto(true)}
        onCadastrarNegocio={() => {
          setNegocioEditar(null);
          setModalAberto(true);
        }}
        onCadastrarEvento={() => {
          setEventoEditar(null);
          setEventoModalAberto(true);
        }}
      />

      {/* Sticky Section Navigation Bar */}
      <div className="sticky top-0 z-30 bg-[#FAF3E7]/95 backdrop-blur-md border-b-2 border-[#D8C29D] py-2.5 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2">
          {/* Section Switcher Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-0.5 scrollbar-none">
            <button
              id="sticky-nav-vitrine"
              onClick={() => rolarParaSecao("vitrine")}
              className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                secaoAtiva === "vitrine"
                  ? "bg-[#260E05] text-[#FAF1DE] shadow-xs"
                  : "bg-white text-[#260E05] hover:bg-stone-100 border border-[#D8C29D]"
              }`}
            >
              <Store className="w-3.5 h-3.5 text-[#F9910F]" />
              <span>Vitrine</span>
              <span className="text-[11px] opacity-75 font-normal ml-0.5">({negocios.length})</span>
            </button>

            <button
              id="sticky-nav-sobre"
              onClick={() => rolarParaSecao("sobre")}
              className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                secaoAtiva === "sobre"
                  ? "bg-[#260E05] text-[#FAF1DE] shadow-xs"
                  : "bg-white text-[#260E05] hover:bg-stone-100 border border-[#D8C29D]"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#F9910F]" />
              <span>Sobre</span>
            </button>

            <button
              id="sticky-nav-eventos"
              onClick={() => rolarParaSecao("eventos")}
              className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                secaoAtiva === "eventos"
                  ? "bg-[#260E05] text-[#FAF1DE] shadow-xs"
                  : "bg-white text-[#260E05] hover:bg-stone-100 border border-[#D8C29D]"
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#F9910F]" />
              <span>Eventos</span>
            </button>

            <button
              id="sticky-nav-quero-expor"
              onClick={() => rolarParaSecao("quero-expor")}
              className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                secaoAtiva === "quero-expor"
                  ? "bg-[#260E05] text-[#FAF1DE] shadow-xs"
                  : "bg-white text-[#260E05] hover:bg-stone-100 border border-[#D8C29D]"
              }`}
            >
              <Send className="w-3.5 h-3.5 text-[#F9910F]" />
              <span>Quero Expor</span>
            </button>
          </div>

          {/* Admin Quick Action Controls */}
          {isAdmin && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setSolicitacoesModalAberto(true)}
                className="relative inline-flex items-center gap-1.5 bg-[#F9910F] text-[#260E05] hover:bg-[#260E05] hover:text-[#FAF1DE] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-colors cursor-pointer shadow-xs"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Candidaturas</span>
                {pendentesCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-[#260E05] text-[#FAF1DE] text-[10px] font-black rounded-full">
                    {pendentesCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setNegocioEditar(null);
                  setModalAberto(true);
                }}
                className="inline-flex items-center gap-1.5 bg-[#260E05] hover:bg-[#F9910F] text-[#FAF1DE] hover:text-[#260E05] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Novo Expositor</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area containing all sections */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ================= SEÇÃO 1: VITRINE ================= */}
        <section id="vitrine" className="pt-10 pb-16 md:pt-14 md:pb-20 scroll-mt-20">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#F9910F] mb-1.5">
                Vitrine Digital
              </p>
              <h2 className="font-poster text-3xl md:text-4xl font-normal leading-tight text-[#260E05] uppercase">
                Conheça quem faz a feira acontecer
              </h2>
            </div>

            {isAdmin && (
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF1DE] text-[#260E05] border border-[#D8C29D]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F9910F]" />
                  Painel de Gestão
                </span>
                <button
                  onClick={() => {
                    setNegocioEditar(null);
                    setModalAberto(true);
                  }}
                  className="inline-flex items-center gap-1.5 bg-[#260E05] hover:bg-[#F9910F] text-[#FAF1DE] hover:text-[#260E05] px-4 py-2 rounded-full font-bold uppercase text-xs tracking-wider shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Cadastrar Expositor</span>
                </button>
              </div>
            )}
          </div>

          {/* Search and Category Filter Bar */}
          <FilterBar
            categoriaAtiva={categoriaAtiva}
            setCategoriaAtiva={setCategoriaAtiva}
            busca={busca}
            setBusca={setBusca}
            total={negociosFiltrados.length}
          />

          {/* Businesses Grid */}
          {negociosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {negociosFiltrados.map((item, index) => (
                <NegocioCard
                  key={item.id}
                  negocio={item}
                  index={index}
                  isAdmin={isAdmin}
                  onRemover={remover}
                  onEditar={handleAbrirEditarNegocio}
                  onDestacar={alternarDestaque}
                  onCompartilhar={(negocio) => setNegocioCompartilhar(negocio)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#FAF1DE] rounded-3xl border-2 border-[#D8C29D] shadow-xs">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#260E05] text-[#F9910F] flex items-center justify-center mb-4">
                <Store className="w-8 h-8" />
              </div>
              <h3 className="font-poster text-xl font-normal mb-1 text-[#260E05] uppercase">
                Nenhum empreendimento encontrado
              </h3>
              <p className="text-sm text-[#3D2014]/70 max-w-sm mx-auto font-medium">
                Tente buscar por outro termo ou escolher outra categoria para ver os negócios disponíveis.
              </p>
            </div>
          )}
        </section>

        {/* ================= SEÇÃO 2: QUERO EXPOR (NOVA ABA DE FORMULÁRIO) ================= */}
        <QueroExporSection
          onEnviarSolicitacao={enviarSolicitacao}
          onToast={(t) => setToast(t)}
        />

        {/* ================= SEÇÃO 3: SOBRE ================= */}
        <SobreSection />

        {/* ================= SEÇÃO 4: EVENTOS ================= */}
        <EventosSection
          eventos={eventos}
          isAdmin={isAdmin}
          onNovoEvento={() => {
            setEventoEditar(null);
            setEventoModalAberto(true);
          }}
          onEditarEvento={(ev) => {
            setEventoEditar(ev);
            setEventoModalAberto(true);
          }}
          onRemoverEvento={handleRemoverEventoComToast}
          onIrParaQueroExpor={() => rolarParaSecao("quero-expor")}
          onToast={(t) => setToast(t)}
        />

        {/* Footer */}
        <Footer
          isAdmin={isAdmin}
          onAbrirLogin={() => setLoginModalAberto(true)}
          onLogout={logout}
        />
      </main>

      {/* Add / Edit Business Modal (Only opens when authenticated) */}
      <NegocioModal
        aberto={modalAberto}
        onFechar={() => {
          setModalAberto(false);
          setNegocioEditar(null);
        }}
        onSalvar={handleSalvarNegocio}
        negocioEditar={negocioEditar}
      />

      {/* Add / Edit Event Modal */}
      <EventoModal
        aberto={eventoModalAberto}
        onFechar={() => {
          setEventoModalAberto(false);
          setEventoEditar(null);
        }}
        onSalvar={handleSalvarEvento}
        eventoEditar={eventoEditar}
      />

      {/* Admin Applications Review Modal */}
      <AdminSolicitacoesModal
        aberto={solicitacoesModalAberto}
        onFechar={() => setSolicitacoesModalAberto(false)}
        solicitacoes={solicitacoes}
        onAprovar={handleAprovarSolicitacao}
        onRejeitar={handleRejeitarSolicitacao}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        aberto={loginModalAberto}
        onFechar={() => setLoginModalAberto(false)}
        onLogin={login}
        onSucesso={() => {
          setToast({
            titulo: "Acesso de Administrador Liberado! 🛡️",
            mensagem: "Você pode cadastrar expositores, gerenciar eventos e aprovar novas candidaturas.",
          });
        }}
        motivo="cadastrar"
      />

      {/* Share Business Modal */}
      <CompartilharModal
        negocio={negocioCompartilhar}
        aberto={Boolean(negocioCompartilhar)}
        onFechar={() => setNegocioCompartilhar(null)}
        onToast={(t) => setToast(t)}
      />
    </div>
  );
}

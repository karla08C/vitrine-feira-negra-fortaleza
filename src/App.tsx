import React, { useState, useMemo, useEffect } from "react";
import { Plus, Store, ShieldCheck, Compass, Calendar } from "lucide-react";
import { useNegocios } from "./hooks/useNegocios";
import { useAdminAuth } from "./hooks/useAdminAuth";
import { Negocio, ToastInfo } from "./types";
import { HeaderHero } from "./components/HeaderHero";
import { FilterBar } from "./components/FilterBar";
import { NegocioCard } from "./components/NegocioCard";
import { NegocioModal } from "./components/NegocioModal";
import { CompartilharModal } from "./components/CompartilharModal";
import { AdminLoginModal } from "./components/AdminLoginModal";
import { SobreSection } from "./components/SobreSection";
import { EventosSection } from "./components/EventosSection";
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

  const [secaoAtiva, setSecaoAtiva] = useState<"vitrine" | "sobre" | "eventos">("vitrine");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [loginModalAberto, setLoginModalAberto] = useState(false);
  const [negocioEditar, setNegocioEditar] = useState<Negocio | null>(null);
  const [negocioCompartilhar, setNegocioCompartilhar] = useState<Negocio | null>(null);
  const [toast, setToast] = useState<ToastInfo | null>(null);

  // Smooth scroll to card if direct hash is provided
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash && hash.startsWith("#card-negocio-")) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("ring-2", "ring-[#E04823]", "ring-offset-4");
          setTimeout(() => {
            el.classList.remove("ring-2", "ring-[#E04823]", "ring-offset-4");
          }, 3000);
        }, 300);
      }
    } else if (hash === "#sobre") {
      setSecaoAtiva("sobre");
    } else if (hash === "#eventos") {
      setSecaoAtiva("eventos");
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
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSecaoAtiva(entry.target.id as "vitrine" | "sobre" | "eventos");
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

  function rolarParaSecao(secao: "vitrine" | "sobre" | "eventos") {
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

  function handleRequisitarCadastro() {
    if (!isAdmin) {
      setLoginModalAberto(true);
    } else {
      setNegocioEditar(null);
      setModalAberto(true);
    }
  }

  function handleSalvar(dados: Partial<Negocio>) {
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
        mensagem: "A empresa foi cadastrada com sucesso e salva na vitrine.",
      });
    }
  }

  function handleAbrirEditar(item: Negocio) {
    if (!isAdmin) {
      setLoginModalAberto(true);
      return;
    }
    setNegocioEditar(item);
    setModalAberto(true);
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 selection:bg-[#E04823]/20 bg-textura">
      {/* Toast alert */}
      <ToastNotification toast={toast} onFechar={() => setToast(null)} />

      {/* Hero Banner Header */}
      <HeaderHero
        total={negocios.length}
        isAdmin={isAdmin}
        onLogout={logout}
        secaoAtiva={secaoAtiva}
      />

      {/* Sticky Section Navigation Bar */}
      <div className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 py-2.5 shadow-xs">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-2">
          {/* Section Switcher Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-0.5 scrollbar-none">
            <button
              id="sticky-nav-vitrine"
              onClick={() => rolarParaSecao("vitrine")}
              className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                secaoAtiva === "vitrine"
                  ? "bg-[#E04823] text-white shadow-xs"
                  : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Vitrine</span>
              <span className="text-[11px] opacity-75 font-normal ml-0.5">({negocios.length})</span>
            </button>

            <button
              id="sticky-nav-sobre"
              onClick={() => rolarParaSecao("sobre")}
              className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                secaoAtiva === "sobre"
                  ? "bg-[#E04823] text-white shadow-xs"
                  : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Sobre</span>
            </button>

            <button
              id="sticky-nav-eventos"
              onClick={() => rolarParaSecao("eventos")}
              className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                secaoAtiva === "eventos"
                  ? "bg-[#E04823] text-white shadow-xs"
                  : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Eventos</span>
            </button>
          </div>

          {/* Organizer Quick Action if logged in */}
          {isAdmin && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setNegocioEditar(null);
                  setModalAberto(true);
                }}
                className="inline-flex items-center gap-1.5 bg-[#E04823] hover:bg-[#C83E1D] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nova Empresa</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area containing all 3 sections */}
      <main className="max-w-6xl mx-auto px-6">
        {/* ================= SEÇÃO 1: VITRINE ================= */}
        <section id="vitrine" className="pt-10 pb-16 md:pt-14 md:pb-20 scroll-mt-20">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#E04823] mb-1.5">
                Vitrine Digital
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight text-stone-900">
                Conheça quem faz a feira acontecer
              </h2>
            </div>

            {isAdmin && (
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  Modo Organizador
                </span>
                <button
                  onClick={() => {
                    setNegocioEditar(null);
                    setModalAberto(true);
                  }}
                  className="inline-flex items-center gap-1.5 bg-[#E04823] hover:bg-[#C83E1D] text-white px-4 py-2 rounded-full font-semibold shadow-xs transition-colors cursor-pointer text-xs sm:text-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Cadastrar Empresa</span>
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
                  onEditar={handleAbrirEditar}
                  onDestacar={alternarDestaque}
                  onCompartilhar={(negocio) => setNegocioCompartilhar(negocio)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-stone-200/90 shadow-xs">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-stone-100 flex items-center justify-center mb-4 text-stone-400">
                <Store className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold mb-1 text-stone-900">
                Nenhum empreendimento encontrado
              </h3>
              <p className="text-sm text-stone-500 max-w-sm mx-auto">
                Tente buscar por outro termo ou escolher outra categoria para ver os negócios disponíveis.
              </p>
            </div>
          )}
        </section>

        {/* ================= SEÇÃO 2: SOBRE ================= */}
        <SobreSection />

        {/* ================= SEÇÃO 3: EVENTOS ================= */}
        <EventosSection onToast={(t) => setToast(t)} />

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
        onSalvar={handleSalvar}
        negocioEditar={negocioEditar}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        aberto={loginModalAberto}
        onFechar={() => setLoginModalAberto(false)}
        onLogin={login}
        onSucesso={() => {
          setToast({
            titulo: "Acesso de Administrador liberado! 🛡️",
            mensagem: "Você pode cadastrar e gerenciar as empresas da vitrine.",
          });
          setNegocioEditar(null);
          setModalAberto(true);
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

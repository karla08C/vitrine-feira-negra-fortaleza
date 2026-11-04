import React, { useState } from "react";
import {
  Sparkles,
  Send,
  CheckCircle2,
  Store,
  HeartHandshake,
  Users,
  Compass,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { CATEGORIAS } from "../data/seedData";
import { ToastInfo, SolicitacaoExpositor } from "../types";

interface QueroExporSectionProps {
  onEnviarSolicitacao: (
    dados: Omit<SolicitacaoExpositor, "id" | "dataEnvio" | "status">
  ) => SolicitacaoExpositor;
  onToast: (toast: ToastInfo) => void;
}

export const QueroExporSection: React.FC<QueroExporSectionProps> = ({
  onEnviarSolicitacao,
  onToast,
}) => {
  const [nomeNegocio, setNomeNegocio] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [categoria, setCategoria] = useState("Moda e Vestuário");
  const [descricao, setDescricao] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [foto, setFoto] = useState("");
  const [enviadoComSucesso, setEnviadoComSucesso] = useState(false);
  const [solicitacaoRecente, setSolicitacaoRecente] = useState<SolicitacaoExpositor | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nomeNegocio.trim() || !responsavel.trim() || !whatsapp.trim() || !descricao.trim()) {
      onToast({
        titulo: "Campos obrigatórios",
        mensagem: "Por favor, preencha o nome do negócio, responsável, WhatsApp e descrição.",
      });
      return;
    }

    const nova = onEnviarSolicitacao({
      nomeNegocio: nomeNegocio.trim(),
      responsavel: responsavel.trim(),
      categoria,
      descricao: descricao.trim(),
      whatsapp: whatsapp.trim().replace(/\D/g, ""),
      instagram: instagram.trim(),
      foto: foto.trim() || "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=800&q=80",
    });

    setSolicitacaoRecente(nova);
    setEnviadoComSucesso(true);

    onToast({
      titulo: "Solicitação Enviada! 🎉",
      mensagem: "Recebemos sua candidatura. A equipe da Feira Negra entrará em contato para aprovação.",
    });

    // Reset form
    setNomeNegocio("");
    setResponsavel("");
    setDescricao("");
    setWhatsapp("");
    setInstagram("");
    setFoto("");
  }

  function handleNovaInscricao() {
    setEnviadoComSucesso(false);
    setSolicitacaoRecente(null);
  }

  return (
    <section id="quero-expor" className="py-16 md:py-24 border-t border-[#D8C29D]/60 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#260E05] text-[#FAF1DE] border border-[#F9910F]/30 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F9910F]" />
            <span>Chamada Aberta de Expositores</span>
          </div>

          <h2 className="font-poster text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-[#260E05] uppercase mb-4">
            Venha expor na Feira Negra
          </h2>

          <p className="text-base sm:text-lg text-[#3D2014]/85 font-medium leading-relaxed">
            Seja parte da maior vitrine de afroempreendedorismo e cultura negra de Fortaleza.
            Preencha seus dados abaixo para enviar sua solicitação de participação para nossa curadoria.
          </p>
        </div>

        {/* Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <div className="bg-[#FAF1DE] border-2 border-[#D8C29D] p-6 rounded-3xl shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#260E05] text-[#F9910F] flex items-center justify-center mb-4">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="font-poster text-lg font-normal text-[#260E05] uppercase mb-2">
              Presencial & Digital
            </h3>
            <p className="text-sm text-[#3D2014]/80 leading-relaxed font-medium">
              Sua marca em destaque nos eventos presenciais em Fortaleza e com catálogo permanente na Vitrine Oficial.
            </p>
          </div>

          <div className="bg-[#FAF1DE] border-2 border-[#D8C29D] p-6 rounded-3xl shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#F9910F] text-[#260E05] flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-poster text-lg font-normal text-[#260E05] uppercase mb-2">
              Rede de Apoio Coletivo
            </h3>
            <p className="text-sm text-[#3D2014]/80 leading-relaxed font-medium">
              Conexão com dezenas de afroempreendedores, troca de experiências, parcerias e fortalecimento mútuo.
            </p>
          </div>

          <div className="bg-[#FAF1DE] border-2 border-[#D8C29D] p-6 rounded-3xl shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#260E05] text-[#FAF1DE] flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6 text-[#F9910F]" />
            </div>
            <h3 className="font-poster text-lg font-normal text-[#260E05] uppercase mb-2">
              Curadoria Afetuosa
            </h3>
            <p className="text-sm text-[#3D2014]/80 leading-relaxed font-medium">
              Avaliação transparente e retorno direto da nossa comissão organizadora para apoiar o seu negócio.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#F8E4B8] border-4 border-[#3D2014] rounded-3xl sm:rounded-[36px] p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden bg-afro-grid">
          {enviadoComSucesso ? (
            /* Success confirmation card */
            <div className="text-center max-w-xl mx-auto py-8 animate-fade-up">
              <div className="w-20 h-20 rounded-full bg-[#260E05] text-[#F9910F] flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="font-condensed text-base tracking-widest uppercase bg-[#260E05] text-[#FAF1DE] px-3.5 py-1 rounded-full mb-3 inline-block">
                ✦ Candidatura Registrada ✦
              </span>

              <h3 className="font-poster text-2xl sm:text-3xl text-[#260E05] uppercase mb-4">
                Solicitação enviada com sucesso!
              </h3>

              <p className="text-sm sm:text-base text-[#3D2014] font-medium leading-relaxed mb-6">
                Muito obrigado pelo interesse em expor na Feira Negra de Fortaleza!
                Nossa equipe de organização e curadoria recebeu os dados de{" "}
                <strong className="text-[#260E05] font-black">
                  “{solicitacaoRecente?.nomeNegocio}”
                </strong>{" "}
                e fará a análise para aprovação.
              </p>

              {solicitacaoRecente && (
                <div className="bg-[#FAF1DE] border-2 border-[#D8C29D] rounded-2xl p-5 text-left mb-8 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div>
                      <span className="text-[#3D2014]/70 font-bold uppercase text-[10px] block">
                        Marca
                      </span>
                      <strong className="text-[#260E05]">{solicitacaoRecente.nomeNegocio}</strong>
                    </div>
                    <div>
                      <span className="text-[#3D2014]/70 font-bold uppercase text-[10px] block">
                        Responsável
                      </span>
                      <strong className="text-[#260E05]">{solicitacaoRecente.responsavel}</strong>
                    </div>
                    <div>
                      <span className="text-[#3D2014]/70 font-bold uppercase text-[10px] block">
                        Categoria
                      </span>
                      <strong className="text-[#260E05]">{solicitacaoRecente.categoria}</strong>
                    </div>
                    <div>
                      <span className="text-[#3D2014]/70 font-bold uppercase text-[10px] block">
                        Status
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full text-xs">
                        Pendente de Aprovação
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleNovaInscricao}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#260E05] hover:bg-[#F9910F] text-[#FAF1DE] hover:text-[#260E05] px-6 py-3.5 rounded-full font-bold uppercase text-xs tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <span>Enviar outra inscrição</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://api.whatsapp.com/send?phone=5585999999999&text=Ol%C3%A1!%20Acabei%20de%20enviar%20minha%20solicita%C3%A7%C3%A3o%20para%20expor%20na%20Feira%20Negra%20de%20Fortaleza."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#260E05] text-[#260E05] hover:text-[#FAF1DE] border-2 border-[#260E05] px-6 py-3.5 rounded-full font-bold uppercase text-xs tracking-wider transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#F9910F]" />
                  <span>Dúvidas com a Organização</span>
                </a>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
              <div className="border-b-2 border-[#260E05]/15 pb-4 mb-6">
                <h3 className="font-poster text-xl sm:text-2xl text-[#260E05] uppercase">
                  Formulário de Inscrição
                </h3>
                <p className="text-xs sm:text-sm text-[#3D2014]/80 font-medium mt-1">
                  Os campos marcados com <span className="text-[#F9910F] font-bold">*</span> são obrigatórios para avaliação.
                </p>
              </div>

              {/* Grid 2 cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#260E05] mb-1.5">
                    Nome da Marca ou Negócio <span className="text-[#F9910F]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={nomeNegocio}
                    onChange={(e) => setNomeNegocio(e.target.value)}
                    placeholder="Ex: Dendê & Dengo Acarajé"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF1DE] border-2 border-[#D8C29D] text-[#260E05] font-medium text-sm focus:outline-none focus:border-[#F9910F] focus:ring-4 focus:ring-[#F9910F]/15 placeholder:text-[#3D2014]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#260E05] mb-1.5">
                    Nome do(a) Responsável <span className="text-[#F9910F]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={responsavel}
                    onChange={(e) => setResponsavel(e.target.value)}
                    placeholder="Ex: Dandara dos Santos"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF1DE] border-2 border-[#D8C29D] text-[#260E05] font-medium text-sm focus:outline-none focus:border-[#F9910F] focus:ring-4 focus:ring-[#F9910F]/15 placeholder:text-[#3D2014]/40"
                  />
                </div>
              </div>

              {/* Grid 2 cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#260E05] mb-1.5">
                    Categoria de Atuação <span className="text-[#F9910F]">*</span>
                  </label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF1DE] border-2 border-[#D8C29D] text-[#260E05] font-semibold text-sm focus:outline-none focus:border-[#F9910F] focus:ring-4 focus:ring-[#F9910F]/15"
                  >
                    {CATEGORIAS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#260E05] mb-1.5">
                    WhatsApp Comercial <span className="text-[#F9910F]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Ex: 85999998888 (com DDD)"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF1DE] border-2 border-[#D8C29D] text-[#260E05] font-medium text-sm focus:outline-none focus:border-[#F9910F] focus:ring-4 focus:ring-[#F9910F]/15 placeholder:text-[#3D2014]/40"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#260E05] mb-1.5">
                  Apresentação da Marca & Produtos <span className="text-[#F9910F]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Conte-nos o que você produz, a inspiração ancestral por trás dos seus produtos e o que você pretende levar para o estande da feira..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF1DE] border-2 border-[#D8C29D] text-[#260E05] font-medium text-sm focus:outline-none focus:border-[#F9910F] focus:ring-4 focus:ring-[#F9910F]/15 placeholder:text-[#3D2014]/40 leading-relaxed"
                />
              </div>

              {/* Grid 2 cols: Instagram and Photo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#260E05] mb-1.5">
                    Instagram da Marca (Opcional)
                  </label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@seuperfil"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF1DE] border-2 border-[#D8C29D] text-[#260E05] font-medium text-sm focus:outline-none focus:border-[#F9910F] focus:ring-4 focus:ring-[#F9910F]/15 placeholder:text-[#3D2014]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#260E05] mb-1.5">
                    Link da Foto dos Produtos ou Logo (Opcional)
                  </label>
                  <input
                    type="url"
                    value={foto}
                    onChange={(e) => setFoto(e.target.value)}
                    placeholder="https://exemplo.com/foto.jpg"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF1DE] border-2 border-[#D8C29D] text-[#260E05] font-medium text-sm focus:outline-none focus:border-[#F9910F] focus:ring-4 focus:ring-[#F9910F]/15 placeholder:text-[#3D2014]/40"
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#3D2014]/70 font-medium">
                  ✦ Suas informações serão avaliadas pela coordenação da Feira Negra.
                </p>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#260E05] hover:bg-[#F9910F] text-[#FAF1DE] hover:text-[#260E05] px-8 py-4 rounded-full font-bold uppercase text-xs sm:text-sm tracking-wider transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-102 active:scale-98 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Solicitação para Aprovação</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

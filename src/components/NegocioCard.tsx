import React, { useState } from "react";
import { MessageCircle, Pencil, Star, Trash2, Check, X, Share2, Shield } from "lucide-react";
import { Negocio } from "../types";
import { getCategoriaCor } from "../data/seedData";
import { getWhatsAppUrl } from "../utils/formatters";

interface NegocioCardProps {
  negocio: Negocio;
  index?: number;
  isAdmin?: boolean;
  onRemover: (id: string) => void;
  onEditar: (negocio: Negocio) => void;
  onDestacar: (id: string) => void;
  onCompartilhar: (negocio: Negocio) => void;
}

export const NegocioCard: React.FC<NegocioCardProps> = ({
  negocio,
  index = 0,
  isAdmin = false,
  onRemover,
  onEditar,
  onDestacar,
  onCompartilhar,
}) => {
  const [imgValida, setImgValida] = useState(true);
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
  const cor = getCategoriaCor(negocio.categoria);

  return (
    <article
      id={`card-negocio-${negocio.id}`}
      className="group bg-[#FAF1DE] rounded-3xl overflow-hidden border-2 border-[#D8C29D] shadow-sm hover:shadow-2xl hover:border-[#260E05] transition-all duration-300 hover:-translate-y-1.5 flex flex-col animate-fade-up scroll-mt-24"
      style={{ animationDelay: `${Math.min(index, 8) * 0.04}s` }}
    >
      {/* Visual Image Header */}
      <div className="relative h-52 overflow-hidden bg-[#260E05]">
        {imgValida && negocio.foto ? (
          <img
            src={negocio.foto}
            alt={negocio.nome}
            loading="lazy"
            onError={() => setImgValida(false)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#260E05]">
            <span className="font-poster text-5xl select-none text-[#F9910F]/30 uppercase">
              {negocio.nome.charAt(0)}
            </span>
          </div>
        )}

        {/* Gradient base scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="backdrop-blur-md bg-[#260E05]/90 text-[#FAF1DE] border border-[#F9910F]/40 shadow-xs text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: cor.dotColor || "#F9910F" }}
            />
            <span>{negocio.categoria}</span>
          </span>
        </div>

        {/* Destaque Badge */}
        {negocio.destaque && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#F9910F] text-[#260E05] shadow-md">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Destaque</span>
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="font-poster text-xl sm:text-2xl font-normal leading-tight text-[#260E05] mb-2 group-hover:text-[#F9910F] transition-colors uppercase">
          {negocio.nome}
        </h3>

        <p className="text-sm text-[#3D2014]/85 font-medium leading-relaxed mb-5 line-clamp-3">
          {negocio.descricao}
        </p>

        {/* Card Footer Actions */}
        <div className="mt-auto pt-4 border-t border-[#D8C29D]/60 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <a
              id={`whatsapp-btn-${negocio.id}`}
              href={getWhatsAppUrl(negocio.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#260E05] hover:bg-[#F9910F] text-[#FAF1DE] hover:text-[#260E05] px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg active:scale-98"
              title="Falar diretamente com o empreendedor no WhatsApp"
            >
              <MessageCircle className="w-4 h-4 shrink-0 text-[#F9910F]" />
              <span>WhatsApp</span>
            </a>

            <button
              id={`share-btn-${negocio.id}`}
              onClick={() => onCompartilhar(negocio)}
              className="inline-flex items-center justify-center gap-1.5 bg-white/80 hover:bg-white border-2 border-[#D8C29D] hover:border-[#260E05] text-[#260E05] px-3.5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              title="Compartilhar e divulgar este negócio"
              aria-label="Compartilhar este negócio"
            >
              <Share2 className="w-4 h-4 shrink-0 text-[#260E05]" />
              <span className="hidden sm:inline">Divulgar</span>
            </button>
          </div>

          {/* Admin Management Row (Only visible when logged in as Admin) */}
          {isAdmin && (
            <div className="flex items-center justify-between text-xs text-[#3D2014]/70 pt-2 border-t border-[#D8C29D]/40 animate-fade-up">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#F9910F] flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Painel Admin
              </span>

              <div className="flex items-center gap-1">
                {!confirmandoExclusao ? (
                  <>
                    <button
                      id={`edit-btn-${negocio.id}`}
                      onClick={() => onEditar(negocio)}
                      className="p-1.5 hover:bg-[#260E05]/10 rounded-lg text-[#260E05] transition-colors cursor-pointer"
                      title="Editar negócio"
                      aria-label="Editar dados do negócio"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>

                    <button
                      id={`star-btn-${negocio.id}`}
                      onClick={() => onDestacar(negocio.id)}
                      className={`p-1.5 hover:bg-[#260E05]/10 rounded-lg transition-colors cursor-pointer ${
                        negocio.destaque
                          ? "text-[#F9910F]"
                          : "text-[#3D2014]/40 hover:text-[#F9910F]"
                      }`}
                      title={negocio.destaque ? "Remover destaque" : "Destacar negócio"}
                      aria-label="Alternar destaque do negócio"
                    >
                      <Star className={`w-3.5 h-3.5 ${negocio.destaque ? "fill-current" : ""}`} />
                    </button>

                    <button
                      id={`delete-btn-${negocio.id}`}
                      onClick={() => setConfirmandoExclusao(true)}
                      className="p-1.5 hover:bg-red-500/10 rounded-lg text-red-600 transition-colors cursor-pointer"
                      title="Excluir negócio"
                      aria-label="Excluir negócio"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-lg border border-red-200">
                    <span className="text-[10px] text-red-700 font-semibold mr-1">Excluir?</span>
                    <button
                      id={`confirm-delete-${negocio.id}`}
                      onClick={() => {
                        onRemover(negocio.id);
                        setConfirmandoExclusao(false);
                      }}
                      className="p-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                      title="Confirmar exclusão"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                    <button
                      id={`cancel-delete-${negocio.id}`}
                      onClick={() => setConfirmandoExclusao(false)}
                      className="p-1 bg-stone-200 text-stone-700 rounded-md hover:bg-stone-300 transition-colors cursor-pointer"
                      title="Cancelar"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

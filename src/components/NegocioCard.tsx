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
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-stone-300 transition-all duration-300 hover:-translate-y-1 flex flex-col animate-fade-up scroll-mt-24"
      style={{ animationDelay: `${Math.min(index, 8) * 0.04}s` }}
    >
      {/* Visual Image Header */}
      <div className="relative h-52 overflow-hidden bg-stone-100">
        {imgValida && negocio.foto ? (
          <img
            src={negocio.foto}
            alt={negocio.nome}
            loading="lazy"
            onError={() => setImgValida(false)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#181513]">
            <span
              className="font-display text-5xl font-bold select-none text-white/20"
            >
              {negocio.nome.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Gradient base scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="backdrop-blur-md bg-white/95 text-stone-900 border border-stone-200/60 shadow-xs text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: cor.dotColor }}
            />
            <span>{negocio.categoria}</span>
          </span>
        </div>

        {/* Destaque Badge */}
        {negocio.destaque && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950 shadow-sm">
              <Star className="w-3 h-3 fill-current" />
              <span>Destaque</span>
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight text-stone-900 mb-2 group-hover:text-primary transition-colors">
          {negocio.nome}
        </h3>

        <p className="text-sm text-stone-600 leading-relaxed mb-5 line-clamp-3">
          {negocio.descricao}
        </p>

        {/* Card Footer Actions */}
        <div className="mt-auto pt-4 border-t border-stone-100 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <a
              id={`whatsapp-btn-${negocio.id}`}
              href={getWhatsAppUrl(negocio.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#0E7064] text-white px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow active:scale-[0.98]"
              title="Falar diretamente com o empreendedor no WhatsApp"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>WhatsApp</span>
            </a>

            <button
              id={`share-btn-${negocio.id}`}
              onClick={() => onCompartilhar(negocio)}
              className="inline-flex items-center justify-center gap-1.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 px-3.5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer shrink-0"
              title="Compartilhar e divulgar este negócio"
              aria-label="Compartilhar este negócio"
            >
              <Share2 className="w-4 h-4 shrink-0 text-stone-500" />
              <span>Compartilhar</span>
            </button>
          </div>

          {/* Admin Management Row (Only visible when logged in as Admin) */}
          {isAdmin && (
            <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100 animate-fade-up">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-[#E04823] flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Opções de Admin
              </span>

              <div className="flex items-center gap-1">
                {!confirmandoExclusao ? (
                  <>
                    <button
                      id={`edit-btn-${negocio.id}`}
                      onClick={() => onEditar(negocio)}
                      className="w-7 h-7 inline-flex items-center justify-center rounded-full text-stone-500 hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                      aria-label="Editar negócio"
                      title="Editar informações"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>

                    <button
                      id={`destacar-btn-${negocio.id}`}
                      onClick={() => onDestacar(negocio.id)}
                      className={`w-7 h-7 inline-flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                        negocio.destaque
                          ? "text-amber-500 bg-amber-50 hover:bg-amber-100"
                          : "text-stone-400 hover:text-amber-500 hover:bg-amber-50"
                      }`}
                      aria-label={negocio.destaque ? "Remover destaque" : "Destacar negócio"}
                      title={negocio.destaque ? "Remover destaque" : "Destacar"}
                    >
                      <Star className={`w-3.5 h-3.5 ${negocio.destaque ? "fill-current" : ""}`} />
                    </button>

                    <button
                      id={`delete-btn-${negocio.id}`}
                      onClick={() => setConfirmandoExclusao(true)}
                      className="w-7 h-7 inline-flex items-center justify-center rounded-full text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      aria-label="Excluir negócio"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-1 animate-scale-in">
                    <button
                      id={`confirm-delete-btn-${negocio.id}`}
                      onClick={() => onRemover(negocio.id)}
                      className="inline-flex items-center gap-1 bg-red-600 text-white px-2.5 py-1 rounded-full text-[11px] font-semibold hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      <Check className="w-3 h-3" /> Confirmar
                    </button>
                    <button
                      id={`cancel-delete-btn-${negocio.id}`}
                      onClick={() => setConfirmandoExclusao(false)}
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-stone-400 hover:bg-stone-100 transition-colors cursor-pointer"
                      aria-label="Cancelar"
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

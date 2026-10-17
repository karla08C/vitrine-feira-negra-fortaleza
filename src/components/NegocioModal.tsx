import React, { useState, useEffect } from "react";
import { Store, X, Check, ImagePlus, Link2 } from "lucide-react";
import { Negocio, Categoria } from "../types";
import { CATEGORIAS } from "../data/seedData";
import { formatWhatsApp, unformatDigits, isValidWhatsApp } from "../utils/formatters";

interface NegocioModalProps {
  aberto: boolean;
  onFechar: () => void;
  onSalvar: (negocio: Partial<Negocio>) => void;
  negocioEditar?: Negocio | null;
}

const EMPTY_FORM = {
  nome: "",
  categoria: "",
  descricao: "",
  whatsapp: "",
  foto: "",
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const NegocioModal: React.FC<NegocioModalProps> = ({
  aberto,
  onFechar,
  onSalvar,
  negocioEditar = null,
}) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [erros, setErros] = useState<Record<string, string | null>>({});
  const [salvando, setSalvando] = useState(false);
  const [uploadando, setUploadando] = useState(false);
  const [erroUpload, setErroUpload] = useState("");
  const [mostrarCampoUrl, setMostrarCampoUrl] = useState(false);

  useEffect(() => {
    if (aberto) {
      if (negocioEditar) {
        setForm({
          nome: negocioEditar.nome || "",
          categoria: negocioEditar.categoria || "",
          descricao: negocioEditar.descricao || "",
          whatsapp: formatWhatsApp(negocioEditar.whatsapp || ""),
          foto: negocioEditar.foto || "",
        });
      } else {
        setForm(EMPTY_FORM);
      }
      setErros({});
      setErroUpload("");
      setMostrarCampoUrl(false);
    }
  }, [aberto, negocioEditar]);

  useEffect(() => {
    if (!aberto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [aberto, onFechar]);

  function handleChange(campo: string, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    if (erros[campo]) {
      setErros((prev) => ({ ...prev, [campo]: null }));
    }
  }

  function validar() {
    const novosErros: Record<string, string> = {};
    if (!form.nome.trim()) {
      novosErros.nome = "Informe o nome do negócio.";
    } else if (form.nome.trim().length < 3) {
      novosErros.nome = "Mínimo de 3 caracteres.";
    }

    if (!form.categoria) {
      novosErros.categoria = "Escolha uma categoria.";
    }

    if (!form.descricao.trim()) {
      novosErros.descricao = "Escreva uma descrição curta.";
    } else if (form.descricao.trim().length < 10) {
      novosErros.descricao = "Mínimo de 10 caracteres.";
    }

    if (!isValidWhatsApp(form.whatsapp)) {
      novosErros.whatsapp = "Informe um WhatsApp válido com DDD.";
    }

    return novosErros;
  }

  function handleFileSelected(file?: File) {
    setErroUpload("");
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErroUpload("Selecione um arquivo de imagem (JPG, PNG, WebP...).");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setErroUpload("Imagem muito grande. Máximo de 5MB.");
      return;
    }

    setUploadando(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        handleChange("foto", reader.result);
      }
      setUploadando(false);
    };
    reader.onerror = () => {
      setErroUpload("Não foi possível carregar a imagem. Tente novamente.");
      setUploadando(false);
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const problemas = validar();
    setErros(problemas);

    if (Object.keys(problemas).length > 0) return;

    setSalvando(true);
    setTimeout(() => {
      onSalvar({
        ...(negocioEditar ? { id: negocioEditar.id } : {}),
        nome: form.nome.trim(),
        categoria: form.categoria as Categoria,
        descricao: form.descricao.trim(),
        whatsapp: unformatDigits(form.whatsapp),
        foto: form.foto.trim(),
      });
      setSalvando(false);
    }, 300);
  }

  if (!aberto) return null;

  const getInputClass = (temErro?: string | null) =>
    `w-full px-4 py-2.5 rounded-xl bg-background border focus:outline-none focus:ring-2 transition-all text-sm ${
      temErro
        ? "border-destructive focus:ring-destructive/30"
        : "border-border focus:border-primary/40 focus:ring-primary/30"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-[hsl(24_32%_12%_/_0.55)] backdrop-blur-sm animate-scale-in"
        onClick={onFechar}
      />

      <div className="relative bg-card w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl animate-scale-in">
        <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-md px-6 py-5 border-b border-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-terroso flex items-center justify-center text-primary-foreground shrink-0">
            <Store className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-xl font-semibold leading-tight text-foreground truncate">
              {negocioEditar ? "Editar Negócio" : "Cadastrar meu Negócio"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {negocioEditar
                ? "Atualize as informações do seu negócio na vitrine."
                : "Seu negócio aparece na vitrine e fica salvo neste navegador."}
            </p>
          </div>
          <button
            id="modal-close-btn"
            onClick={onFechar}
            className="w-9 h-9 rounded-full hover:bg-secondary flex items-center justify-center transition-colors text-muted-foreground cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
          {/* Nome */}
          <label className="block">
            <span className="block text-sm font-medium mb-1.5 text-foreground">
              Nome do Negócio
            </span>
            <input
              id="input-nome"
              type="text"
              value={form.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              placeholder="Ex: D'ZABOR Crochê Autoral"
              className={getInputClass(erros.nome)}
            />
            {erros.nome && (
              <span className="block text-xs text-destructive mt-1.5">{erros.nome}</span>
            )}
          </label>

          {/* Categoria */}
          <label className="block">
            <span className="block text-sm font-medium mb-1.5 text-foreground">
              Categoria
            </span>
            <div className="relative">
              <select
                id="select-categoria"
                value={form.categoria}
                onChange={(e) => handleChange("categoria", e.target.value)}
                className={`${getInputClass(erros.categoria)} appearance-none pr-10 cursor-pointer`}
              >
                <option value="">Selecione uma categoria</option>
                {CATEGORIAS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {erros.categoria && (
              <span className="block text-xs text-destructive mt-1.5">{erros.categoria}</span>
            )}
          </label>

          {/* Descrição */}
          <label className="block">
            <span className="block text-sm font-medium mb-1.5 text-foreground">
              Descrição curta
            </span>
            <textarea
              id="textarea-descricao"
              value={form.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              placeholder="Conte em poucas palavras o que você oferece..."
              rows={3}
              maxLength={180}
              className={`${getInputClass(erros.descricao)} resize-none`}
            />
            <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
              {erros.descricao ? (
                <span className="text-destructive">{erros.descricao}</span>
              ) : (
                <span />
              )}
              <span>{form.descricao.length}/180</span>
            </div>
          </label>

          {/* WhatsApp */}
          <label className="block">
            <span className="block text-sm font-medium mb-1.5 text-foreground">
              WhatsApp
            </span>
            <input
              id="input-whatsapp"
              type="tel"
              inputMode="tel"
              value={form.whatsapp}
              onChange={(e) => handleChange("whatsapp", formatWhatsApp(e.target.value))}
              placeholder="(85) 99999-9999"
              className={getInputClass(erros.whatsapp)}
            />
            {erros.whatsapp && (
              <span className="block text-xs text-destructive mt-1.5">{erros.whatsapp}</span>
            )}
          </label>

          {/* Foto do Negócio */}
          <div>
            <span className="block text-sm font-medium mb-1.5 text-foreground">
              Foto do Negócio
            </span>

            {form.foto ? (
              <div className="relative w-full h-36 rounded-xl overflow-hidden border border-border bg-secondary group">
                <img
                  src={form.foto}
                  alt="Prévia"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  id="remove-photo-btn"
                  onClick={() => handleChange("foto", "")}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[hsl(10_5%_13%_/_0.7)] text-white flex items-center justify-center hover:bg-[hsl(10_5%_13%_/_0.9)] transition-colors cursor-pointer"
                  aria-label="Remover foto"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label
                className={`flex flex-col items-center justify-center gap-2 w-full h-36 rounded-xl border-2 border-dashed cursor-pointer transition-colors bg-card ${
                  erroUpload
                    ? "border-destructive/60 hover:border-destructive"
                    : "border-border hover:border-primary/50 hover:bg-secondary/50"
                }`}
              >
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileSelected(e.target.files?.[0])}
                  disabled={uploadando}
                />
                {uploadando ? (
                  <>
                    <span className="w-7 h-7 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-xs text-muted-foreground">Enviando...</span>
                  </>
                ) : (
                  <>
                    <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-primary">
                      <ImagePlus className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      Clique para enviar uma foto
                    </span>
                    <span className="text-xs text-muted-foreground">
                      JPG, PNG ou WebP · até 5MB
                    </span>
                  </>
                )}
              </label>
            )}

            {erroUpload && (
              <span className="block text-xs text-destructive mt-1.5">{erroUpload}</span>
            )}

            {!form.foto && (
              <div className="mt-2">
                {mostrarCampoUrl ? (
                  <input
                    id="input-photo-url"
                    type="url"
                    value={form.foto}
                    onChange={(e) => handleChange("foto", e.target.value)}
                    placeholder="Cole a URL da imagem (https://...)"
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/30 text-sm transition-all"
                  />
                ) : (
                  <button
                    type="button"
                    id="toggle-url-input-btn"
                    onClick={() => setMostrarCampoUrl(true)}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    Prefiro colar um link de imagem
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Form action buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <button
              type="button"
              id="modal-cancel-btn"
              onClick={onFechar}
              className="sm:flex-1 px-5 py-3 rounded-full border border-border font-medium hover:bg-secondary transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              id="modal-submit-btn"
              disabled={salvando}
              className="sm:flex-[2] inline-flex items-center justify-center gap-2 gradient-terroso text-primary-foreground px-5 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 cursor-pointer shadow-md"
            >
              {salvando ? (
                <>
                  <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {negocioEditar ? "Salvar alterações" : "Cadastrar na vitrine"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

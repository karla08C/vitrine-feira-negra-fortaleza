import React, { useState } from "react";
import {
  Settings,
  Trash2,
  Check,
  X,
  ShieldCheck,
  LogOut,
  KeyRound,
  Plus,
  Lock,
  RotateCcw,
} from "lucide-react";
import { ToastInfo } from "../types";

interface AdminPanelProps {
  isAdmin: boolean;
  onAbrirLogin: () => void;
  onLogout: () => void;
  onCadastrar: () => void;
  onLimparTudo: () => void;
  onAlterarSenha: (senhaAtual: string, novaSenha: string) => { success: boolean; message: string };
  onToast: (toast: ToastInfo) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isAdmin,
  onAbrirLogin,
  onLogout,
  onCadastrar,
  onLimparTudo,
  onAlterarSenha,
  onToast,
}) => {
  const [aberto, setAberto] = useState(false);
  const [confirmandoLimpeza, setConfirmandoLimpeza] = useState(false);
  const [mostrandoTrocarSenha, setMostrandoTrocarSenha] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  function handleSalvarNovaSenha(e: React.FormEvent) {
    e.preventDefault();
    const res = onAlterarSenha(senhaAtual, novaSenha);
    if (res.success) {
      onToast({
        titulo: "Senha alterada! 🔒",
        mensagem: res.message,
      });
      setSenhaAtual("");
      setNovaSenha("");
      setErroSenha("");
      setMostrandoTrocarSenha(false);
    } else {
      setErroSenha(res.message);
    }
  }

  return (
    <div className="mb-8 rounded-2xl border border-stone-200/90 bg-white overflow-hidden shadow-xs">
      {/* Top Banner Bar */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 bg-stone-50/70 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          {isAdmin ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Modo Administrador Ativo</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200">
              <Lock className="w-3.5 h-3.5 text-stone-500" />
              <span>Painel de Gestão da Feira</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          {!isAdmin ? (
            <button
              id="admin-entrar-btn"
              onClick={onAbrirLogin}
              className="inline-flex items-center gap-1.5 bg-[#181513] hover:bg-stone-800 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Entrar como Admin</span>
            </button>
          ) : (
            <button
              id="admin-logout-btn"
              onClick={() => {
                onLogout();
                onToast({
                  titulo: "Sessão encerrada",
                  mensagem: "Você saiu do modo administrador.",
                });
              }}
              className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              title="Desconectar do painel administrativo"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          )}

          <button
            id="admin-panel-toggle"
            onClick={() => setAberto((prev) => !prev)}
            className="text-xs text-stone-600 hover:text-stone-900 px-2.5 py-1.5 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer flex items-center gap-1 font-medium"
          >
            <Settings className="w-3.5 h-3.5 text-stone-500" />
            <span>{aberto ? "Ocultar" : "Opções"}</span>
          </button>
        </div>
      </div>

      {aberto && (
        <div className="p-5 animate-fade-up bg-white space-y-4">
          {isAdmin ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                <div>
                  <p className="text-xs font-bold text-stone-900">
                    Acesso Total de Administração
                  </p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Você pode cadastrar novas empresas, editar dados e gerenciar destaques diretamente nos cards.
                  </p>
                </div>
                <button
                  id="admin-panel-cadastrar-btn"
                  onClick={onCadastrar}
                  className="inline-flex items-center gap-1.5 bg-[#E04823] hover:bg-[#C83E1D] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  Cadastrar Empresa
                </button>
              </div>

              {/* Password change accordion */}
              <div className="border border-stone-200/80 rounded-xl p-4 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-[#E04823]" />
                    Alterar Senha do Administrador
                  </span>
                  <button
                    type="button"
                    onClick={() => setMostrandoTrocarSenha((p) => !p)}
                    className="text-xs text-[#E04823] font-medium hover:underline cursor-pointer"
                  >
                    {mostrandoTrocarSenha ? "Cancelar" : "Alterar senha"}
                  </button>
                </div>

                {mostrandoTrocarSenha && (
                  <form onSubmit={handleSalvarNovaSenha} className="mt-3 space-y-3 pt-3 border-t border-stone-100 animate-fade-up">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-stone-600 mb-1">
                          Senha Atual
                        </label>
                        <input
                          type="password"
                          value={senhaAtual}
                          onChange={(e) => {
                            setSenhaAtual(e.target.value);
                            setErroSenha("");
                          }}
                          placeholder="Senha atual (ex: admin123)"
                          className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#E04823]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-600 mb-1">
                          Nova Senha
                        </label>
                        <input
                          type="password"
                          value={novaSenha}
                          onChange={(e) => {
                            setNovaSenha(e.target.value);
                            setErroSenha("");
                          }}
                          placeholder="Mínimo 4 caracteres"
                          className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#E04823]"
                        />
                      </div>
                    </div>

                    {erroSenha && (
                      <p className="text-xs text-red-600 font-medium">{erroSenha}</p>
                    )}

                    <div className="flex justify-end gap-2">
                      <button
                        type="submit"
                        className="bg-[#E04823] hover:bg-[#C83E1D] text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                      >
                        Salvar Nova Senha
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Reset to seed data */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100">
                <p className="text-xs text-stone-500">
                  Restaurar a vitrine para os empreendimentos iniciais da Feira Negra.
                </p>

                {confirmandoLimpeza ? (
                  <div className="flex items-center gap-2">
                    <button
                      id="admin-confirm-clear"
                      onClick={() => {
                        onLimparTudo();
                        setConfirmandoLimpeza(false);
                        onToast({
                          titulo: "Dados restaurados",
                          mensagem: "A vitrine foi recarregada com os negócios originais.",
                        });
                      }}
                      className="inline-flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" /> Sim, restaurar
                    </button>
                    <button
                      onClick={() => setConfirmandoLimpeza(false)}
                      className="text-xs text-stone-500 hover:text-stone-800 px-2 py-1 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" /> Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    id="admin-trigger-clear"
                    onClick={() => setConfirmandoLimpeza(true)}
                    className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-stone-200 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restaurar dados de exemplo</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 px-4">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-stone-900 mb-1">
                Área Restrita aos Organizadores
              </p>
              <p className="text-xs text-stone-500 max-w-md mx-auto mb-4">
                Para cadastrar novas empresas ou gerenciar as existentes, autentique-se com a senha da organização da Feira Negra.
              </p>
              <button
                onClick={onAbrirLogin}
                className="inline-flex items-center gap-2 bg-[#181513] hover:bg-stone-800 text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>Fazer Login como Administrador</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

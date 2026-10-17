import React from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { CATEGORIAS, getCategoriaCor } from "../data/seedData";

interface FilterBarProps {
  categoriaAtiva: string;
  setCategoriaAtiva: (cat: string) => void;
  busca: string;
  setBusca: (busca: string) => void;
  total: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  categoriaAtiva,
  setCategoriaAtiva,
  busca,
  setBusca,
  total,
}) => {
  const categorias = ["Todas", ...CATEGORIAS];

  return (
    <div className="mb-8 space-y-4">
      {/* Top row: Search Bar and Results Counter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            id="search-input"
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, categoria ou produto..."
            className="w-full pl-11 pr-10 py-3 rounded-full bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all text-stone-900 placeholder:text-stone-400 shadow-xs"
          />
          {busca && (
            <button
              onClick={() => setBusca("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 transition-colors cursor-pointer"
              title="Limpar busca"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center text-xs font-medium text-stone-500">
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
          <span>
            Exibindo <strong className="text-stone-800 font-semibold">{total}</strong>{" "}
            {total === 1 ? "negócio" : "negócios"}
          </span>
        </div>
      </div>

      {/* Category Pills Row */}
      <div className="flex flex-wrap gap-2 items-center pt-1">
        {categorias.map((cat) => {
          const isAtivo = categoriaAtiva === cat;

          if (cat === "Todas") {
            return (
              <button
                id="filter-category-todas"
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isAtivo
                    ? "bg-[#181513] text-white shadow-sm ring-2 ring-[#181513]/10"
                    : "bg-white text-stone-700 border border-stone-200/90 hover:border-stone-300 hover:bg-stone-50/80 shadow-xs"
                }`}
              >
                <span>Todas</span>
              </button>
            );
          }

          const cor = getCategoriaCor(cat);

          return (
            <button
              id={`filter-category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              key={cat}
              onClick={() => setCategoriaAtiva(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                isAtivo
                  ? "text-white shadow-sm scale-[1.02]"
                  : "bg-white text-stone-700 border border-stone-200/90 hover:border-stone-300 hover:bg-stone-50/80 shadow-xs"
              }`}
              style={
                isAtivo
                  ? { backgroundColor: cor.bg, color: cor.text }
                  : undefined
              }
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  backgroundColor: isAtivo ? "#ffffff" : cor.dotColor,
                }}
              />
              <span>{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

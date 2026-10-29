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
    <div className="mb-10 space-y-4">
      {/* Top row: Search Bar and Results Counter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3D2014]/60 pointer-events-none" />
          <input
            id="search-input"
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por marca, categoria ou produto..."
            className="w-full pl-11 pr-10 py-3 rounded-full bg-[#FAF1DE] border-2 border-[#D8C29D] focus:outline-none focus:border-[#F9910F] focus:ring-4 focus:ring-[#F9910F]/15 text-sm font-medium transition-all text-[#260E05] placeholder:text-[#3D2014]/50 shadow-sm"
          />
          {busca && (
            <button
              onClick={() => setBusca("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#260E05]/10 hover:bg-[#260E05]/20 flex items-center justify-center text-[#260E05] transition-colors cursor-pointer"
              title="Limpar busca"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center text-xs font-bold uppercase tracking-wider text-[#3D2014]/80 bg-[#FAF1DE] px-4 py-2 rounded-full border border-[#D8C29D]">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#F9910F]" />
          <span>
            Exibindo <strong className="text-[#260E05] font-black">{total}</strong>{" "}
            {total === 1 ? "expositor" : "expositores"}
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
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  isAtivo
                    ? "bg-[#260E05] text-[#FAF1DE] shadow-md border-2 border-[#260E05] scale-102"
                    : "bg-[#FAF1DE] text-[#260E05] border-2 border-[#D8C29D] hover:border-[#260E05] shadow-xs"
                }`}
              >
                <span>✦ Todas</span>
              </button>
            );
          }

          const cor = getCategoriaCor(cat);

          return (
            <button
              id={`filter-category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              key={cat}
              onClick={() => setCategoriaAtiva(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                isAtivo
                  ? "bg-[#260E05] text-[#FAF1DE] border-2 border-[#260E05] shadow-md scale-102"
                  : "bg-[#FAF1DE] text-[#260E05] border-2 border-[#D8C29D] hover:border-[#260E05] shadow-xs"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{
                  backgroundColor: isAtivo ? "#F9910F" : cor.dotColor,
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

"use client";

import Tooth from "./Tooth";

interface DentalChartProps {
  onToothSelect: (toothNumber: number) => void;
  selectedTooth: number | null;
  teethWithRecords: number[];
}

export default function DentalChart({ onToothSelect, selectedTooth, teethWithRecords }: DentalChartProps) {
  const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

  const hasRecord = (n: number) => teethWithRecords.includes(n);

  return (
    <div className="flex flex-col items-center gap-16 p-4 md:p-12 bg-slate-50/50 rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-inner">

      {/* Upper Arcada */}
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="flex items-center gap-4 w-full">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200"></div>
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] whitespace-nowrap">Arcada Superior</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200"></div>
        </div>
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
          {upperTeeth.map((n) => (
            <Tooth 
              key={n} 
              number={n} 
              isSelected={selectedTooth === n}
              hasRecord={hasRecord(n)}
              onClick={onToothSelect}
            />
          ))}
        </div>
      </div>

      {/* Middle Gap / Bite Line */}
      <div className="relative w-full py-4">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-slate-200 rounded-full shadow-sm"></div>
      </div>

      {/* Lower Arcada */}
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
          {lowerTeeth.map((n) => (
            <Tooth 
              key={n} 
              number={n} 
              isSelected={selectedTooth === n}
              hasRecord={hasRecord(n)}
              onClick={onToothSelect}
            />
          ))}
        </div>
        <div className="flex items-center gap-4 w-full">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200"></div>
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] whitespace-nowrap">Arcada Inferior</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200"></div>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-8 bg-white px-8 py-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 border border-blue-700 shadow-sm"></div>
          <span className="text-xs font-bold text-slate-600">Selecionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-b from-red-300 to-red-500 border border-red-600 shadow-sm"></div>
          <span className="text-xs font-bold text-slate-600">Com Registro</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-slate-100 border border-slate-200 shadow-sm"></div>
          <span className="text-xs font-bold text-slate-600">Sem Registro</span>
        </div>
      </div>
    </div>
  );
}

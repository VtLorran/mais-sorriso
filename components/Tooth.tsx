"use client";

interface ToothProps {
  number: number;
  isSelected?: boolean;
  hasRecord?: boolean;
  onClick: (number: number) => void;
}

export default function Tooth({ number, isSelected, hasRecord, onClick }: ToothProps) {
  return (
    <button
      onClick={() => onClick(number)}
      className={`
        w-12 h-16 rounded-xl border-2 flex flex-col items-center justify-between p-1 transition-all duration-500 relative group
        ${isSelected 
          ? "border-blue-500 bg-blue-50 shadow-xl shadow-blue-100 ring-4 ring-blue-50 scale-110 z-10" 
          : hasRecord 
            ? "border-red-200 bg-red-50 hover:border-red-400 hover:bg-red-100/50" 
            : "border-slate-100 bg-white hover:border-blue-200 hover:shadow-lg hover:scale-105"}
      `}
    >
      <span className={`text-[9px] font-black tracking-tighter ${isSelected ? "text-blue-600" : hasRecord ? "text-red-500" : "text-slate-300"}`}>
        {number}
      </span>
      
      <div className="relative w-full flex-1 flex items-center justify-center py-1">
        <div className={`
          w-7 h-9 rounded-t-2xl rounded-b-lg shadow-sm border-x border-b transition-all duration-500
          ${isSelected 
            ? "bg-gradient-to-b from-blue-400 to-blue-600 border-blue-700 shadow-blue-200" 
            : hasRecord 
              ? "bg-gradient-to-b from-red-300 to-red-500 border-red-600 shadow-red-100" 
              : "bg-gradient-to-b from-slate-50 to-slate-200 border-slate-300 group-hover:from-white group-hover:to-slate-100"}
        `}>
          {/* Shine effect */}
          <div className="absolute top-1 left-1.5 w-1.5 h-3 bg-white/30 rounded-full skew-x-12 blur-[1px]"></div>
        </div>
      </div>

      {hasRecord && !isSelected && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
      )}
    </button>
  );
}


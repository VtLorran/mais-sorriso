"use client";

import { useState, useEffect } from "react";
import { Stethoscope, Loader2, FileText, Calendar } from "lucide-react";
import DentalChart from "@/components/DentalChart";

interface DentalRecord {
  id: string;
  toothNumber: number;
  description: string;
  createdAt: string;
}

export default function ClientRecordsPage() {
  const [records, setRecords] = useState<DentalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/client/records")
      .then((res) => res.json())
      .then((data) => {
        setRecords(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Meu Prontuário</h2>
        <p className="text-slate-500 font-medium tracking-tight">Acompanhe as observações do seu dentista e tratamentos por dente.</p>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-premium p-8">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          </div>
        ) : records.length === 0 ? (
          <div className="py-20 text-center">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-10 h-10 text-slate-200" />
            </div>
            <p className="text-slate-400 font-bold text-lg">Nenhum registro encontrado no prontuário.</p>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100/60 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Mapa Anatômico Interativo</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Dentes com diagnóstico ou intervenção</p>
                </div>
              </div>
              <DentalChart 
                selectedTooth={null}
                onToothSelect={() => {}} // Read-only for client
                teethWithRecords={Array.from(new Set(records.map(r => r.toothNumber)))}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Histórico Cronológico</h3>
              </div>
              <div className="space-y-4">
                {records.map((record) => (
                  <div key={record.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row md:items-center gap-6 hover:bg-white hover:border-slate-200 transition-all shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200/60 shadow-sm flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Dente</span>
                      <span className="text-xl font-black text-blue-600 leading-none">{record.toothNumber}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <p className="font-bold text-slate-700 text-sm">Observação Clínica</p>
                      </div>
                      <p className="text-slate-600 leading-relaxed font-medium">
                        {record.description}
                      </p>
                    </div>
                    <div className="shrink-0 flex flex-col sm:flex-row items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{new Date(record.createdAt).toLocaleDateString()}</span>
                      <span className="text-slate-300 font-black">•</span>
                      <span className="text-xs font-black text-slate-400">{new Date(record.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

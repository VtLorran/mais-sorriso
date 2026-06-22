"use client";

import { useState, useEffect } from "react";
import { FileText, DollarSign, Calendar, Clock, Loader2, Info } from "lucide-react";

interface Budget {
  id: string;
  description: string;
  value: number;
  createdAt: string;
}

export default function ClientBudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/client/budgets")
      .then((res) => res.json())
      .then((data) => {
        setBudgets(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching client budgets:", err))
      .finally(() => setLoading(false));
  }, []);

  const totalAccumulated = budgets.reduce((sum, b) => sum + b.value, 0);

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Meus Orçamentos</h2>
          <p className="text-slate-500 font-medium tracking-tight">
            Consulte o histórico de orçamentos e tratamentos gerados para o seu cadastro.
          </p>
        </div>

        {budgets.length > 0 && (
          <div className="bg-emerald-50/50 border border-emerald-100/60 px-6 py-4 rounded-3xl flex items-center gap-4 self-start md:self-auto shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Investimento Total</p>
              <p className="text-xl font-black text-emerald-800">
                {totalAccumulated.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-premium p-8">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          </div>
        ) : budgets.length === 0 ? (
          <div className="py-20 text-center">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-slate-200" />
            </div>
            <p className="text-slate-400 font-bold text-lg">Nenhum orçamento encontrado.</p>
            <p className="text-slate-300 text-xs mt-1">
              Quando novos orçamentos forem gerados pelo administrador, eles aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {budgets.map((budget) => {
              const dt = new Date(budget.createdAt);
              return (
                <div
                  key={budget.id}
                  className="bg-white border border-slate-100 hover:border-blue-100 p-6 rounded-3xl transition-all shadow-sm hover:shadow-xl hover:shadow-blue-50/40 group hover:scale-[1.02] flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {dt.toLocaleDateString("pt-BR")}
                          </p>
                          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {dt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="font-bold text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                        {budget.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Valor do Orçamento</span>
                    <span className="text-xl font-black text-emerald-600 group-hover:text-emerald-700 transition-colors">
                      {budget.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

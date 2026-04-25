"use client";

import { PlusCircle, LogOut, CheckCircle2 } from "lucide-react";

export default function WelcomePage() {

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-200 mb-10 animate-bounce">
        <PlusCircle className="text-white w-12 h-12" />
      </div>
      
      <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">Seja bem-vindo ao +Sorriso!</h1>
      <p className="text-slate-500 font-medium text-lg max-w-md mb-12">
        Sua conta de <span className="text-blue-600 font-bold">Paciente</span> foi criada com sucesso. Em breve você poderá agendar suas consultas e ver seu histórico por aqui.
      </p>

      <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 flex flex-col items-center gap-4 mb-12">
        <CheckCircle2 className="text-emerald-500 w-8 h-8" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Painel do Paciente em Breve</p>
      </div>

      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-8 py-4 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-2xl font-black transition-all group"
      >
        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        SAIR DA CONTA
      </button>
    </div>
  );
}

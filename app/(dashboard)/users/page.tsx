"use client";

import { useState } from "react";
import { UserPlus, Mail, Lock, User, Shield, Loader2, CheckCircle2 } from "lucide-react";

export default function UsersPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CLIENTE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPassword("");
        setRole("CLIENTE");
      } else {
        setError(data.error || "Erro ao criar acesso");
      }
    } catch {
      setError("Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Gerenciar Acessos</h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Cadastre novos dentistas e pacientes no sistema</p>
      </header>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-[3rem] p-10 shadow-premium border border-slate-100 flex flex-col gap-8">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Novo Acesso</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Preencha as credenciais</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-xs font-bold border border-red-100 text-center animate-shake">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl text-xs font-bold border border-emerald-100 text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                ACESSO CRIADO COM SUCESSO!
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  required
                  type="text" 
                  placeholder="Nome do usuário"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-8 focus:ring-blue-50 transition-all outline-none font-bold text-slate-600"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  required
                  type="email" 
                  placeholder="exemplo@email.com"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-8 focus:ring-blue-50 transition-all outline-none font-bold text-slate-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Senha Inicial</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  required
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-8 focus:ring-blue-50 transition-all outline-none font-bold text-slate-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Cargo do Usuário</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setRole("ADMIN")}
                  className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest border transition-all ${role === "ADMIN" ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-100" : "bg-white text-slate-400 border-slate-100 hover:bg-slate-50"}`}
                >
                  <Shield className="w-4 h-4" />
                  Dentista
                </button>
                <button 
                  type="button"
                  onClick={() => setRole("CLIENTE")}
                  className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest border transition-all ${role === "CLIENTE" ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-100" : "bg-white text-slate-400 border-slate-100 hover:bg-slate-50"}`}
                >
                  <User className="w-4 h-4" />
                  Paciente
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl shadow-xl shadow-slate-100 transition-all flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
              CRIAR NOVO ACESSO
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


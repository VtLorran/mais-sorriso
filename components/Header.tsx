"use client";

import { Bell, Search, User, LogOut, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useSidebar } from "./SidebarContext";

export default function Header() {
  const [userName, setUserName] = useState("...");
  const [userRole, setUserRole] = useState("...");
  const { toggle } = useSidebar();

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        if (data.name) {
          setUserName(data.name);
          setUserRole(data.role === "ADMIN" ? "Administrador" : "Paciente");
        }
      })
      .catch(() => {
        setUserName("Acesso");
        setUserRole("Convidado");
      });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <header className="h-24 sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200/60 z-40 px-4 md:px-10 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggle}
          className="md:hidden p-3 hover:bg-slate-50 rounded-2xl text-slate-500 border border-slate-100 shadow-sm transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden md:flex items-center gap-4 bg-slate-50 hover:bg-white px-5 py-3 rounded-2xl border border-slate-200/50 flex-1 max-w-xl transition-all duration-300 group focus-within:ring-4 focus-within:ring-blue-50 focus-within:border-blue-200 ml-0 md:ml-0">
          <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Pesquisar registros..." 
            className="bg-transparent border-none outline-none text-slate-600 placeholder:text-slate-400 w-full text-sm font-medium"
          />
          <div className="bg-slate-200 text-slate-500 px-2 py-1 rounded text-[10px] font-bold">⌘K</div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6 ml-4">
        <button className="hidden sm:flex p-3 rounded-2xl hover:bg-slate-50 transition-all relative group bg-white shadow-sm border border-slate-100">
          <Bell className="w-5 h-5 text-slate-500 group-hover:text-blue-600" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
        
        <div className="hidden sm:block h-8 w-px bg-slate-200"></div>

        <div className="flex items-center gap-3 md:gap-4 pl-0 md:pl-2 group cursor-pointer relative">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight truncate max-w-[150px]">{userName}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{userRole}</p>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 p-0.5 shadow-inner transition-transform group-hover:scale-105 border border-slate-100/50">
            <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center text-blue-600">
              <User className="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
            title="Sair do sistema"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

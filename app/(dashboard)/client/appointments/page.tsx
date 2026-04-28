"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, User, Loader2 } from "lucide-react";

interface Appointment {
  id: string;
  date: string;
  dentist?: {
    name: string;
  };
}

export default function ClientAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/client/appointments")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Minhas Consultas</h2>
        <p className="text-slate-500 font-medium tracking-tight">Veja o histórico e as próximas datas de suas consultas.</p>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-premium p-8">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          </div>
        ) : appointments.length === 0 ? (
          <div className="py-20 text-center">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-slate-200" />
            </div>
            <p className="text-slate-400 font-bold text-lg">Nenhuma consulta encontrada.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((apt) => {
              const dt = new Date(apt.date);
              const isPast = dt < new Date();
              return (
                <div key={apt.id} className={`p-6 rounded-3xl border transition-all ${isPast ? 'bg-slate-50 border-slate-100 opacity-70' : 'bg-white border-blue-100 shadow-xl shadow-blue-50/50 hover:scale-[1.02]'}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isPast ? 'bg-slate-200 text-slate-500' : 'bg-blue-100 text-blue-600'}`}>
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{dt.toLocaleDateString()}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100/60">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Profissional Responsável</p>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="font-bold text-sm text-slate-700">{apt.dentist?.name || "Dentista Indefinido"}</span>
                    </div>
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

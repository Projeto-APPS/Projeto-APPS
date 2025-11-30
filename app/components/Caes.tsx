"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Caes() {
  const router = useRouter();
  const [caes, setCaes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchCaes() {
      const { data, error } = await supabase
        .from("animais")
        .select("*")
        .eq("especie", "cachorro");

      if (!error && data) {
        setCaes(data);
      }

      setLoading(false);
    }

    fetchCaes();
  }, []);

  const filtered = caes.filter((c) =>
    c.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-white flex flex-col relative">

      {/* TOPO */}
      <div className="w-full bg-[#86D2BD] py-3 px-4 flex items-center justify-between shadow">
        <button onClick={() => router.back()} className="text-black text-lg">← Voltar</button>
        <Image src="/logoSJPA.png" alt="Logo" width={50} height={50} className="rounded-full" />
        <span className="text-xl font-bold text-white">SJPA</span>
      </div>

      {/* CAMPO DE BUSCA */}
      <div className="w-full px-4 mt-4">
        <input
          type="text"
          placeholder="Digite um nome/setor/canil"
          className="w-full px-4 py-2 border border-gray-400 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LISTAGEM */}
      <div className="flex-1 overflow-y-auto px-4 py-4">

        {loading ? (
          <p className="text-center text-gray-600">Carregando...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum cão encontrado.</p>
        ) : (
          filtered.map((c) => (
            <div
              key={c.id}
              className="w-full bg-white rounded-xl border border-gray-300 shadow p-3 flex items-center justify-between mb-3"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={c.foto_url || "/dog-icon.png"}
                  alt={c.nome}
                  width={60}
                  height={60}
                  className="rounded-full object-cover w-16 h-16 border"
                />

                <div>
                  <h3 className="font-bold text-lg">{c.nome}</h3>
                  <p className="text-sm text-gray-700">{c.idade || "Sem idade"}</p>
                  <p className="text-sm text-gray-700">{c.cor || ""}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="text-green-600 text-xl">✏️</button>
                <button className="text-red-600 text-xl">➖</button>
              </div>
            </div>
          ))
        )}

      </div>

      {/* MENU INFERIOR */}
      <div className="w-full bg-[#86D2BD] py-3 flex justify-around shadow-lg">
        <button onClick={() => router.push("/home")}>🏠</button>
        <button onClick={() => router.push("/animais")}>🐶🐱</button>
        <button onClick={() => router.push("/voluntarios")}>✋</button>
        <button onClick={() => router.push("/perfil")}>👤</button>
      </div>
    </div>
  );
}

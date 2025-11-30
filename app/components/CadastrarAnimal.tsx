"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CadastrarAnimal() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("cachorro");
  const [sexo, setSexo] = useState("macho");
  const [porte, setPorte] = useState("");
  const [idade, setIdade] = useState("");
  const [cor, setCor] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Função pega a imagem e cria preview
  function handleFotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  // Envia imagem para Supabase Storage
  async function uploadFoto() {
    if (!foto) return null;

    const fileExt = foto.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `animais/${fileName}`;

    const { error } = await supabase.storage
      .from("animais")
      .upload(filePath, foto);

    if (error) {
      alert("Erro ao enviar foto: " + error.message);
      return null;
    }

    // URL pública
    const { data } = supabase.storage
      .from("animais")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  // Cadastrar animal
  async function handleCadastro() {
    let foto_url = null;

    if (foto) {
      foto_url = await uploadFoto();
      if (!foto_url) return;
    }

    const res = await fetch("/api/animais/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        especie,
        sexo,
        porte,
        idade,
        cor,
        observacoes,
        foto_url,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Animal cadastrado!");
    router.push("/animais");
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      {/* HEADER */}
      <div className="w-full bg-[#86D2BD] py-3 px-4 flex items-center justify-between shadow">
        <Image
          src="/logoSJPA.png"
          alt="Logo"
          width={50}
          height={50}
          className="rounded-full border"
        />
        <span className="text-xl font-bold text-white">Cadastrar Animal</span>
      </div>

      {/* FUNDO */}
      <div className="absolute inset-0 pointer-events-none select-none bg-[url('/paws-pattern.png')] bg-repeat opacity-20"></div>

      <div className="relative z-10 w-full flex flex-col items-center px-6 py-8">
        <div className="w-full max-w-md space-y-5">

          {/* Preview da foto */}
          {preview && (
            <div className="w-full flex justify-center">
              <img
                src={preview}
                className="w-40 h-40 object-cover rounded-full border-2 border-[#71C7A6]"
              />
            </div>
          )}

          {/* Botão de upload */}
          <div>
            <label className="font-semibold text-black">Foto do Animal</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              className="w-full mt-2"
            />
          </div>

          {/* Nome */}
          <div>
            <label className="font-semibold text-black">Nome</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Rex"
              className="w-full mt-2 px-4 py-3 bg-white rounded-xl border border-gray-800 text-black"
            />
          </div>

          {/* Espécie */}
          <div>
            <label className="font-semibold text-black">Espécie</label>
            <select
              value={especie}
              onChange={(e) => setEspecie(e.target.value)}
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-800 bg-white text-black"
            >
              <option value="cachorro">Cachorro</option>
              <option value="gato">Gato</option>
            </select>
          </div>

          {/* Sexo */}
          <div>
            <label className="font-semibold text-black">Sexo</label>
            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-800 bg-white text-black"
            >
              <option value="macho">Macho</option>
              <option value="femea">Fêmea</option>
            </select>
          </div>

          {/* Outros campos */}
          <div>
            <label className="font-semibold text-black">Porte</label>
            <input
              value={porte}
              onChange={(e) => setPorte(e.target.value)}
              placeholder="Pequeno / Médio / Grande"
              className="w-full mt-2 px-4 py-3 bg-white rounded-xl border border-gray-800 text-black"
            />
          </div>

          <div>
            <label className="font-semibold text-black">Idade</label>
            <input
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              placeholder="Ex: 2 anos"
              className="w-full mt-2 px-4 py-3 bg-white rounded-xl border border-gray-800 text-black"
            />
          </div>

          <div>
            <label className="font-semibold text-black">Cor</label>
            <input
              value={cor}
              onChange={(e) => setCor(e.target.value)}
              placeholder="Ex: Caramelo"
              className="w-full mt-2 px-4 py-3 bg-white rounded-xl border border-gray-800 text-black"
            />
          </div>

          <div>
            <label className="font-semibold text-black">Observações</label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              className="w-full mt-2 px-4 py-3 bg-white rounded-xl border border-gray-800 text-black h-28 resize-none"
            />
          </div>

          {/* Botão */}
          <button
            onClick={handleCadastro}
            className="w-full bg-[#71C7A6] py-3 text-white font-semibold rounded-xl text-lg border border-black shadow"
          >
            Cadastrar Animal
          </button>

        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Animais() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">

      <div className="w-full bg-[#86D2BD] py-3 px-4 flex items-center justify-between shadow">
        <Image
          src="/logoSJPA.png"
          alt="Logo"
          width={50}
          height={50}
          className="rounded-full border"
        />
        <span className="text-xl font-bold text-white">SJPA</span>
      </div>

      <div className="flex-1 w-full flex flex-col items-center px-6 py-8 relative">

        <div className="absolute inset-0 pointer-events-none select-none bg-[url('/paws-pattern.png')] bg-repeat opacity-20"></div>

        <div className="w-full max-w-xs space-y-6 relative z-10">

          <button
            onClick={() => router.push("/caes")}
            className="w-full bg-[#71C7A6] text-white text-xl font-semibold py-4 
                       rounded-2xl shadow border border-black flex items-center justify-between px-6"
          >
            Cães
            <span className="text-2xl">🐶</span>
          </button>

          <button
            onClick={() => router.push("/gatos")}
            className="w-full bg-[#71C7A6] text-white text-xl font-semibold py-4 
                       rounded-2xl shadow border border-black flex items-center justify-between px-6"
          >
            Gatos
            <span className="text-2xl">🐱</span>
          </button>

          <button
            onClick={() => router.push("/animais/cadastrar")}
            className="w-full bg-[#71C7A6] text-white text-xl font-semibold py-4 
                       rounded-2xl shadow border border-black flex items-center justify-between px-6"
          >
            Cadastrar
            <span className="text-2xl">➕</span>
          </button>

        </div>
      </div>
    </div>
  );
}

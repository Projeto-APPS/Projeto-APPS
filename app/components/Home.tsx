"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
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

        <div className="absolute inset-0 pointer-events-none select-none bg-[url('/paws-pattern.png')] bg-repeat opacity-20">
        <Image
            src="/paws-pattern.png"
            alt="paws"
            fill
            className="object-cover opacity-10"
            priority
        />
        </div>

        <div className="w-full max-w-xs space-y-5 relative z-10">

          <button
            onClick={() => router.push("/animais")}
            className="w-full bg-[#71C7A6] text-white text-xl font-semibold py-4 rounded-2xl shadow border border-black flex items-center justify-between px-6"
          >
            Animais
            <span>🐶🐱</span>
          </button>

          <button className="w-full bg-[#71C7A6] text-white text-xl font-semibold py-4 rounded-2xl shadow border border-black px-6">
            Colaboradores
          </button>

          <button className="w-full bg-[#71C7A6] text-white text-xl font-semibold py-4 rounded-2xl shadow border border-black px-6">
            Despesas
          </button>

          <button className="w-full bg-[#71C7A6] text-white text-xl font-semibold py-4 rounded-2xl shadow border border-black px-6">
            Doações
          </button>

          <button className="w-full bg-[#71C7A6] text-white text-xl font-semibold py-4 rounded-2xl shadow border border-black flex items-center justify-between px-6">
            Voluntários
            <span>🤝</span>
          </button>

        </div>

      </div>

    </div>
  );
}

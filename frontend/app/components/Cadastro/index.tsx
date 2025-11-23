"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Cadastro() {
    const router = useRouter();

    function handleSignIn() {
        router.push('/login')
    }

    return (
        <div className="min-h-screen w-full bg-[#73D9B8] flex flex-col items-center px-6 py-10 justify-start">
            <div className="flex flex-col items-center mt-6">
                <Image
                    src="/logoSJPA.png"
                    alt="Logo da SJPA"
                    width={180}
                    height={180}
                    className="rounded-full object-contain"
                />

                <h1 className="text-3xl font-bold text-black mt-4">
                    SJPA
                </h1>
            </div>
            <div className="w-full max-w-sm mt-10">
                <h2 className="text-black text-xl font-semibold">
                    Crie sua conta
                </h2>
            </div>

            <h2 className="text-black text-lg font-semibold w-full max-w-sm mt-10">
                Login
            </h2>
            <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full mt-4 px-4 py-3 bg-white rounded-xl text-black placeholder-gray-400 border border-gray-800 focus:outline-none"
            />
            <h2 className="text-black text-lg font-semibold w-full max-w-sm mt-10">
                Email
            </h2>
            <input
                type="text"
                placeholder="Digite seu email"
                className="w-full mt-4 px-4 py-3 bg-white rounded-xl text-black placeholder-gray-400 border border-gray-800 focus:outline-none"
            />
            <h2 className="text-black text-lg font-semibold w-full max-w-sm mt-10">
                Telefone
            </h2>
            <input
                type="text"
                placeholder="Digite seu telefone"
                className="w-full mt-4 px-4 py-3 bg-white rounded-xl text-black placeholder-gray-400 border border-gray-800 focus:outline-none"
            />
            <h2 className="text-black text-lg font-semibold w-full max-w-sm mt-10">
                Senha
            </h2>
            <input
                type="text"
                placeholder="Digite sua senha"
                className="w-full mt-4 px-4 py-3 bg-white rounded-xl text-black placeholder-gray-400 border border-gray-800 focus:outline-none"
            />

            <button 
                className="w-full mt-6 bg-[#279B75] text-white py-3 rounded-xl text-lg font-medium"
            >
                Cadastrar
            </button>

            <p className="text-center text-black mt-6">
                Já possuo {" "}
                <a onClick={handleSignIn} className="font-semibold underline">
                    login
                </a>
            </p>
        </div>
    )
}
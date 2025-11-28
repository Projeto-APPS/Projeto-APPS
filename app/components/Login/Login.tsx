"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Login() {
    const router = useRouter();

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        setErro("");
        setLoading(true);

        if (!usuario.trim() || !senha.trim()) {
            setErro("Preencha todos os campos.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, senha }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErro(data.error || "Erro ao tentar fazer login.");
                setLoading(false);
                return;
            }

            router.push("/home");
        } catch (err) {
            setErro("Não foi possível conectar ao servidor.");
        }

        setLoading(false);
    }

    function handleSignUp() {
        router.push("/cadastro");
    }

    return (
        <div className="min-h-screen w-full bg-[#73D9B8] flex flex-col items-center px-6 py-10">

            <div className="flex flex-col items-center mt-6">
                <Image src="/logoSJPA.png" alt="Logo" width={180} height={180} />
                <h1 className="text-3xl font-bold text-black mt-4">SJPA</h1>
            </div>

            <div className="w-full max-w-sm mt-10">
                <h2 className="text-black text-xl font-semibold">Login</h2>
            </div>

            <input
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                type="text"
                placeholder="Email, telefone ou nome"
                className="w-full max-w-sm mt-4 px-4 py-3 bg-white rounded-xl border border-gray-800 
                    text-black placeholder-black/50"
            />

            <input
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                type="password"
                placeholder="Senha"
                className="w-full max-w-sm mt-4 px-4 py-3 bg-white rounded-xl border border-gray-800
               text-black placeholder-black/50"
            />

            {erro && (
                <p className="text-red-700 bg-red-200 border border-red-400 rounded-lg mt-4 px-4 py-2 w-full max-w-sm text-center">
                    {erro}
                </p>
            )}

            <button
                onClick={handleLogin}
                disabled={loading}
                className={`w-full max-w-sm mt-6 text-white py-3 rounded-xl text-lg font-medium 
                    ${loading ? "bg-gray-500" : "bg-[#279B75]"}
                `}
            >
                {loading ? "Entrando..." : "Entrar"}
            </button>

            <p className="text-center text-black mt-6">
                Não tem uma conta?{" "}
                <a onClick={handleSignUp} className="underline font-semibold cursor-pointer">
                    Cadastre-se
                </a>
            </p>
        </div>
    );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Cadastro() {
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");

    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleCadastro() {
        setErro("");
        setLoading(true);

        if (!nome.trim() || !email.trim() || !telefone.trim() || !senha.trim()) {
            setErro("Preencha todos os campos.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/cadastro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, telefone, senha }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErro(data.error || "Erro ao cadastrar usuário.");
                setLoading(false);
                return;
            }

            router.push("/home");
        } catch (error) {
            setErro("Erro ao conectar com o servidor.");
        }

        setLoading(false);
    }

    function handleSignIn() {
        router.push("/login");
    }

    function formatarTelefone(value: string) {
    value = value.replace(/\D/g, "");

    if (value.length > 10) {
        return value
            .replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    }

    return value
        .replace(/^(\d{2})(\d{4})(\d{4}).*/, "($1) $2-$3");
    }

    return (
        <div className="min-h-screen w-full bg-[#73D9B8] flex flex-col items-center px-6 py-10">

            <div className="flex flex-col items-center mt-6">
                <Image src="/logoSJPA.png" alt="Logo" width={180} height={180} />
                <h1 className="text-3xl font-bold text-black mt-4">SJPA</h1>
            </div>

            <div className="w-full max-w-sm mt-10">
                <h2 className="text-black text-xl font-semibold">Crie sua conta</h2>
            </div>

            <div className="w-full max-w-sm mt-6">
                <label className="text-black font-semibold">Nome</label>
                <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    type="text"
                    placeholder="Digite seu nome"
                    className="w-full mt-2 px-4 py-3 bg-white rounded-xl border border-gray-800
                               text-black placeholder-black/50"
                />
            </div>

            <div className="w-full max-w-sm mt-6">
                <label className="text-black font-semibold">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Digite seu email"
                    className="w-full mt-2 px-4 py-3 bg-white rounded-xl border border-gray-800
                               text-black placeholder-black/50"
                />
            </div>

            <div className="w-full max-w-sm mt-6">
                <label className="text-black font-semibold">Telefone</label>
                <input
                    value={telefone}
                    onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                    type="text"
                    placeholder="Digite seu telefone"
                    maxLength={15}
                    className="w-full mt-2 px-4 py-3 bg-white rounded-xl border border-gray-800
                            text-black placeholder-black/50"
                />
            </div>

            <div className="w-full max-w-sm mt-6">
                <label className="text-black font-semibold">Senha</label>
                <input
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    type="password"
                    placeholder="Digite sua senha"
                    className="w-full mt-2 px-4 py-3 bg-white rounded-xl border border-gray-800
                               text-black placeholder-black/50"
                />
            </div>

            {erro && (
                <p className="text-red-700 bg-red-200 border border-red-400 rounded-lg mt-4 px-4 py-2 w-full max-w-sm text-center">
                    {erro}
                </p>
            )}

            <button
                onClick={handleCadastro}
                disabled={loading}
                className={`w-full max-w-sm mt-6 text-white py-3 rounded-xl text-lg font-medium
                    ${loading ? "bg-gray-500" : "bg-[#279B75]"}`}
            >
                {loading ? "Cadastrando..." : "Cadastrar"}
            </button>

            <p className="text-center text-black mt-6">
                Já possuo{" "}
                <a onClick={handleSignIn} className="underline font-semibold cursor-pointer">
                    login
                </a>
            </p>
        </div>
    );
}

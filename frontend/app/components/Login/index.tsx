import Image from "next/image";

export default function Login() {
    return (
        <div className="min-h-screen w-full bg-[#73D9B8] flex flex-col items-center px-6 py-10 justify-end">

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
                <h2 className="text-black text-lg font-semibold">
                    Login
                </h2>
            </div>

            <input
                type="text"
                placeholder="Telefone, nome de usuário ou email"
                className="w-full mt-4 px-4 py-3 bg-white rounded-xl text-black placeholder-gray-400 border border-gray-800 focus:outline-none"
            />
            <input
                type="text"
                placeholder="Senha"
                className="w-full mt-4 px-4 py-3 bg-white rounded-xl text-black placeholder-gray-400 border border-gray-800 focus:outline-none"
            />
            <button className="w-full mt-6 bg-[#279B75] text-white py-3 rounded-xl text-lg font-medium">
                Entrar
            </button>

            <p className="text-center text-black mt-6">
                Não tem uma conta?{" "}
                <a href="#" className="font-semibold underline">
                    Cadastre-se
                </a>
            </p>
        </div>
    )
}
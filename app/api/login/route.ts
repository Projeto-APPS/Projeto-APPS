import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { usuario, senha } = await request.json();

    if (!usuario || !senha) {
      return new Response(JSON.stringify({ error: "Preencha todos os campos!" }), { status: 400 });
    }

    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .or(`email.eq.${usuario},telefone.eq.${usuario}`)
      .maybeSingle();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    if (!data) {
      return new Response(JSON.stringify({ error: "Usuário não encontrado" }), { status: 404 });
    }

    const senhaCorreta = await bcrypt.compare(senha, data.senha_hash);

    if (!senhaCorreta) {
      return new Response(JSON.stringify({ error: "Senha incorreta" }), { status: 401 });
    }

    delete data.senha_hash;

    return new Response(JSON.stringify({ message: "Login OK", user: data }), { status: 200 });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

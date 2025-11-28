import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { nome, email, telefone, senha } = await request.json();

    if (!nome || !email || !telefone || !senha) {
      return new Response(
        JSON.stringify({ error: "Preencha todos os campos!" }),
        { status: 400 }
      );
    }

    const { data: existente } = await supabase
      .from("usuarios")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existente) {
      return new Response(JSON.stringify({ error: "Email já cadastrado." }), {
        status: 409,
      });
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    const { data, error } = await supabase
      .from("usuarios")
      .insert([{ nome, email, telefone, senha_hash }])
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    delete data.senha_hash;

    return new Response(JSON.stringify({ message: "Sucesso!", user: data }), {
      status: 201,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

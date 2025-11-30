import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nome,
      especie,
      sexo,
      porte,
      idade,
      cor,
      observacoes,
      foto_url
    } = body;

    if (!nome || !especie || !sexo) {
      return NextResponse.json(
        { error: "Nome, espécie e sexo são obrigatórios." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("animais")
      .insert({
        nome,
        especie,
        sexo,
        porte,
        idade,
        cor,
        observacoes,
        foto_url: foto_url || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Erro ao inserir no banco: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, animal: data }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: "Erro no servidor: " + String(error) },
      { status: 500 }
    );
  }
}

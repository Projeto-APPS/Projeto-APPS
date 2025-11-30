import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const especie = searchParams.get("especie");

  const query = supabase.from("animais").select("*");

  if (especie) {
    query.eq("especie", especie);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: "Erro ao buscar animais: " + error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ animais: data }, { status: 200 });
}

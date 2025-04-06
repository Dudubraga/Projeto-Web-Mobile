'use client'
import Link from "next/link";
import { Cabecalho } from "@/components/cabecalho";

export default function HomePage() {
  return (
    <>
    <Cabecalho />
    <div className="box-container">
    <div className="home-container">
      <h1>Quiz</h1>
      <p>Escolha seu periodo:</p>
          <div className="period-links">
            <Link href="/periodo/primeiro-periodo">Primeiro Período</Link>
            <Link href="/periodo/segundo-periodo">Segundo Período</Link>
            <Link href="/periodo/terceiro-periodo">Terceiro Período</Link>
            <Link href="/periodo/quarto-periodo">Quarto Período</Link>
            <Link href="/periodo/quinto-periodo">Quinto Período</Link>
          </div>

    </div>
    </div>
    </>
  );
}

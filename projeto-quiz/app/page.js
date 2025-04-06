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
        {/* Links para cada período */}
        <Link href="/primeiro-periodo">Primeiro Período</Link>
        <Link href="/segundo-periodo">Segundo Período</Link>
        <Link href="/terceiro-periodo">Terceiro Período</Link>
        <Link href="/quarto-periodo">Quarto Período</Link>
        <Link href="/quinto-periodo">Quinto Período</Link>
      </div>
    </div>
    </div>
    </>
  );
}

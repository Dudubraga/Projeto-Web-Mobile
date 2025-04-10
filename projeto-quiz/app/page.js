"use client";
import Link from "next/link";
import { Cabecalho } from "@/components/cabecalho";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Parse from "@/lib/parseConfig";

export default function HomePage() {
  const router = useRouter();
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [mensagem, setMensagem] = useState(""); // mensagem de aviso

  //ve se o usuário ta logado quando a página carrega
  useEffect(() => {
    const user = Parse.User.current();
    setUsuarioLogado(user);
  }, []);

  //checa se ta logado antes de mandar para o quiz
  const acessarQuiz = (periodo) => {
    if (usuarioLogado) {
      router.push(`/periodo/${periodo}`);
    } else {
      setMensagem("loga ai primeiro");
      setTimeout(() => {
        router.push("/login");
      }, 2000); // espera 2 segundos pra mandar pro login
    }
  };

  return (
    <>
    <Cabecalho />
      <div className="centralize">
        <div className="home-container">
          <h1>Quiz</h1>
          <p>Escolha seu periodo:</p>
          <div className="period-links">
            <button onClick={() => acessarQuiz("primeiro-periodo")}>
              Primeiro Período
            </button>
            <button onClick={() => acessarQuiz("segundo-periodo")}>
              Segundo Período
            </button>
            <button onClick={() => acessarQuiz("terceiro-periodo")}>
              Terceiro Período
            </button>
            <button onClick={() => acessarQuiz("quarto-periodo")}>
              Quarto Período
            </button>
            <button onClick={() => acessarQuiz("quinto-periodo")}>
              Quinto Período
            </button>
          </div>
          {mensagem && (
            <p style={{ color: "red", marginTop: "10px" }}>{mensagem}</p>
          )}
        </div>
      </div>
    </>
  );
}

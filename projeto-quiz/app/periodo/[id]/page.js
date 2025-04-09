"use client";
import { useParams } from "next/navigation";
import { Cabecalho } from "@/components/cabecalho";
import { useEffect, useState } from "react";
import { buscarPerguntasPorPeriodo } from "@/lib/parsePerguntas";
import Parse from "@/lib/parseConfig";

export default function PeriodoPage() {
  const { id } = useParams();

  //cria estado reativo para armazenar perguntas carregadas da API.
  //perguntas é o nome da variável (estado atual) e setPerguntas é a função que atualiza o valor dela
  const [perguntas, setPerguntas] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0); // controla a pergunta atual
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [pontuacao, setPontuacao] = useState(0); // armazena a pontuação do usuário
  const [pontuacaoTotal, setPontuacaoTotal] = useState(null); // armazena a pontuação acumulada do usuário

  //passa o id do periodo para a função buscarPerguntasPorPeriodo que recebe inteiro
  let periodoNumero;
  if (id === "primeiro-periodo") {
    periodoNumero = 1;
  } else if (id === "segundo-periodo") {
    periodoNumero = 2;
  } else if (id === "terceiro-periodo") {
    periodoNumero = 3;
  } else if (id === "quarto-periodo") {
    periodoNumero = 4;
  } else if (id === "quinto-periodo") {
    periodoNumero = 5;
  } else {
    periodoNumero = null;
  }

  //useEffect roda toda vez que periodoNumero mudar (entrar e sair da página)
  useEffect(() => {
    if (periodoNumero) {
      //verifica se o periodoNumero é válido
      //chama a função buscarPerguntasPorPeriodo e atualiza o estado com as perguntas retornadas
      buscarPerguntasPorPeriodo(periodoNumero).then((dados) => {
        //dados é o resultado da função buscarPerguntasPorPeriodo, ele armazena as perguntas
        //isso acintece pq a função retorna uma Promise, que nao é o valor final, só vai ser quando a função terminar
        //então precisa uar o .then para pegar o resultado final,
        setPerguntas(dados);
        //atualiza o estado perguntas com os dados recebidos e atualiza na página pq é reativo
      });
    }
  }, [periodoNumero]);

  //é usada quando o usuário clica em uma alternativa
  const responderPergunta = async (alternativaSelecionada) => {
    const respostaCorreta = perguntas[indiceAtual].resposta_correta;

    if (alternativaSelecionada === respostaCorreta) {
      setPontuacao((prevPontuacao) => prevPontuacao + 1);
    }

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      setQuizFinalizado(true);

      const usuario = Parse.User.current();
      if (usuario) {
        const pontuacaoAtual = usuario.get("pontuacao") || 0;
        const questoesRespondidasAtual =
          usuario.get("questoesRespondidas") || 0;

        const acertouUltima = alternativaSelecionada === respostaCorreta;
        const totalAcertosQuiz = pontuacao + (acertouUltima ? 1 : 0);
        const novaPontuacao = pontuacaoAtual + totalAcertosQuiz;
        const novasQuestoesRespondidas =
          questoesRespondidasAtual + perguntas.length;

        usuario.set("pontuacao", novaPontuacao);
        usuario.set("questoesRespondidas", novasQuestoesRespondidas);
        await usuario.save();

        setPontuacaoTotal(novaPontuacao);
      }
    }
  };

  return (
    <>
      <Cabecalho />
      <div className="quiz-container">
        <div className="quiz-content">
          <h1>Quiz do {id.replace("-", " ")}</h1>

          {quizFinalizado ? (
            <div>
              <p>VAPO!!!!!!a pontuação foi:</p>
              <h2>
                {pontuacao} / {perguntas.length}
              </h2>
              {pontuacaoTotal !== null && (
                <p>PONTUACAO ATUAL DO USUARIO: {pontuacaoTotal}</p>
              )}
            </div>
          ) : perguntas.length > 0 ? (
            <div className="pergunta-card">
              <p className="pergunta-texto">
                <strong>{indiceAtual + 1}.</strong>{" "}
                {perguntas[indiceAtual].pergunta}
              </p>
              <div className="alternativas">
                <button onClick={() => responderPergunta("A")}>
                  A) {perguntas[indiceAtual].alternativa_a}
                </button>
                <button onClick={() => responderPergunta("B")}>
                  B) {perguntas[indiceAtual].alternativa_b}
                </button>
                <button onClick={() => responderPergunta("C")}>
                  C) {perguntas[indiceAtual].alternativa_c}
                </button>
                <button onClick={() => responderPergunta("D")}>
                  D) {perguntas[indiceAtual].alternativa_d}
                </button>
              </div>
            </div>
          ) : (
            <p>Carregando perguntas...</p>
          )}
        </div>
      </div>
    </>
  );
}

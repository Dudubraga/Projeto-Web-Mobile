"use client";
import { useParams } from "next/navigation";
import { Cabecalho } from "@/components/cabecalho";
import { useEffect, useState } from "react";
import { buscarPerguntasPorPeriodo } from "@/lib/parsePerguntas";
//useState: cria uma variável reativa que atualiza a interface quando muda o valor
//useEffect: deixa buscar as perguntas no bando de dados depois que o componente renderiza

export default function PeriodoPage() {
  const { id } = useParams();

  //cria estado reativo para armazenar perguntas carregadas da API.
  //perguntas é o nome da variável (estado atual) e setPerguntas é a função que atualiza o valor dela
  const [perguntas, setPerguntas] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0); // controla a pergunta atual
  const [quizFinalizado, setQuizFinalizado] = useState(false);

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

  //é usada quando clica no botão "Próxima" até acabar as 5 perguntas
  const avancarPergunta = () => {
    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      setQuizFinalizado(true);
    }
  };

  return (
    <>
      <Cabecalho />
      <div className="quiz-container">
        <div className="quiz-content">
          <h1>Quiz do {id.replace("-", " ")}</h1>

          {quizFinalizado ? (
            <p>CABOU</p>
          ) : perguntas.length > 0 ? (
            <div className="pergunta-card">
              <p className="pergunta-texto">
                <strong>{indiceAtual + 1}.</strong>{" "}
                {perguntas[indiceAtual].pergunta}
              </p>
              <div className="alternativas">
                <p>A) {perguntas[indiceAtual].alternativa_a}</p>
                <p>B) {perguntas[indiceAtual].alternativa_b}</p>
                <p>C) {perguntas[indiceAtual].alternativa_c}</p>
                <p>D) {perguntas[indiceAtual].alternativa_d}</p>
              </div>
              <button onClick={avancarPergunta} className="botao-avancar">
                Próxima
              </button>
            </div>
          ) : (
            <p>Carregando perguntas...</p>
          )}
        </div>
      </div>
    </>
  );
}

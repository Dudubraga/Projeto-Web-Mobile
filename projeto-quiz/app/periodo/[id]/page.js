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

  return (
    <>
      <Cabecalho />
      <div className="quiz-container">
        <div className="quiz-content">
          <h1>Quiz do {id.replace("-", " ")}</h1>

          {perguntas.length > 0 ? ( //verifica se o as perguntas foram carregadas
            <div className="perguntas-lista">
              {perguntas.map(
                (
                  p,
                  index //percorre as perguntas e renderiza cada uma
                ) => (
                  //cria um card para cada pergunta
                  <div key={p.id} className="pergunta-card">
                    <p className="pergunta-texto">
                      <strong>{index + 1}.</strong> {p.pergunta}
                    </p>
                    <div className="alternativas">
                      <p>A) {p.alternativa_a}</p>
                      <p>B) {p.alternativa_b}</p>
                      <p>C) {p.alternativa_c}</p>
                      <p>D) {p.alternativa_d}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <p>Carregando perguntas...</p> // aparece enquanto as perguntas estão sendo carregadas
          )}
        </div>
      </div>
    </>
  );
}

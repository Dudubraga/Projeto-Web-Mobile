import Parse from "./parseConfig";

export async function buscarPerguntasPorPeriodo(periodo) {
  const Pergunta = Parse.Object.extend("Pergunta"); //referência à classe Pergunta
  const query = new Parse.Query(Pergunta); //cria nova consulta
  query.equalTo("periodo", periodo); //filtra a busca
  const resultados = await query.find(); //executa a busca e faz o código esperar até o resultado chegar

  const perguntas = resultados.map((obj) => ({
    //transforma os resultados em objetos js
    id: obj.id,
    pergunta: obj.get("pergunta"),
    cadeira: obj.get("cadeira"),
    alternativa_a: obj.get("alternativa_a"),
    alternativa_b: obj.get("alternativa_b"),
    alternativa_c: obj.get("alternativa_c"),
    alternativa_d: obj.get("alternativa_d"),
    resposta_correta: obj.get("resposta_correta"),
  }));
  //gera um array perguntas

  //escolhe 5 perguntas aleatórias e retorna elas
  const perguntasAleatorias = perguntas
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
  return perguntasAleatorias;
}

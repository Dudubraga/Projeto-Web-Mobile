"use client";
import { useParams } from "next/navigation";
import { Cabecalho } from "@/components/cabecalho";
import { useEffect, useState } from "react";
import Parse from "@/lib/parseConfig";

export default function PeriodoPage() {
  const { id } = useParams();

  let periodoNumero; ///Passar o periodo para o numero, facilitando a manipulação no bdd
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
    periodoNumero = "ID inválido";
  }

  return (
    <>
      <Cabecalho />
      <div className="box-container">
        <div className="home-container">
          <h1>Quiz do {id.replace("-", " ")}</h1>
        </div>
      </div>
    </>
  );
}

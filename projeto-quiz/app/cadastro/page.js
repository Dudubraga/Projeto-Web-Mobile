"use client";

import { Cabecalho } from "@/components/cabecalho";

export default function CadastroPage() {
  return (
    <>
      <Cabecalho />
      <div className="box-container">
        <div className="home-container">
          <h1>Cadastro</h1>
          <form className="form-container">
            <input
              type="text"
              placeholder="Nome de usuário"
              name="username"
              required
            />
            <input type="email" placeholder="Email" name="email" required />
            <input
              type="password"
              placeholder="Senha"
              name="password"
              required
            />
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  );
}

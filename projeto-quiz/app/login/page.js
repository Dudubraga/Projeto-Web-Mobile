"use client";

import { Cabecalho } from "@/components/cabecalho";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <Cabecalho />
      <div className="box-container">
        <div className="home-container">
          <h1>Login</h1>
          <form>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="input-login"
              required
            />
            <input
              type="password"
              placeholder="Digite sua senha"
              className="input-login"
              required
            />
            <button type="submit" className="btn-login">
              Entrar
            </button>
          </form>

          <p style={{ marginTop: "20px" }}>
            Ainda não tem uma conta?{" "}
            <Link href="/cadastro">
              <button className="btn-login">Cadastrar</button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

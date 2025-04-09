"use client";

import { useState } from "react";
import Parse from "@/lib/parseConfig";
import { useRouter } from "next/navigation";
import { Cabecalho } from "@/components/cabecalho";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  //guarda valores digitados no campo e mensagem de erro pra exibir
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const user = await Parse.User.logIn(username, senha);
      //chama a função de login do Parse pra tentar autenticar o usuario com nome e senha
      if (user) {
        router.push("/");
      }
    } catch (err) {
      console.error("Erro no login:", err.message || err);
      if (err.code === 101) {
        setErro("Usuário ou senha errados."); //101 é padrao por credencial errada
      } else {
        setErro("erro generico. Tente novamente."); //erro genérico
      }
    }
  };

  return (
    <>
      <Cabecalho />
      <div className="box-container">
        <div className="home-container">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Digite seu username"
              className="input-login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Digite sua senha"
              className="input-login"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button type="submit" className="btn-login">
              Entrar
            </button>
          </form>

          {erro && <p style={{ color: "red", marginTop: "10px" }}>{erro}</p>}

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

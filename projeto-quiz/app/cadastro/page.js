"use client";

import { useState } from "react";
import Parse from "@/lib/parseConfig";
import { useRouter } from "next/navigation";
import { Cabecalho } from "@/components/cabecalho";

export default function CadastroPage() {
  //controlar os inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  //funçao que vai ser executada clicar pra enviar o formulario de cadastro
  //o e é o formulário
  const handleCadastro = async (e) => {
    //o async é pra esperar a resposta do Parse
    e.preventDefault(); //pra não recarregar a página

    const user = new Parse.User();
    user.set("username", username);
    user.set("email", email);
    user.set("password", password);
    //cria usuario e define os campos obrigatorios
    try {
      await user.signUp();
      alert("Usuário cadastrado"); //janela pra avisar
      router.push("/");
    } catch (error) {
      alert("Erro ao cadastrar: " + error.message);
      console.error("Erro:", error);
    }
  };

  return (
    <>
      <Cabecalho />
      <div className="centralize">
        <div className="home-container">
          <h1>Cadastro</h1>
          <form className="form-container" onSubmit={handleCadastro}>
            {/*onSubmit que chama handleCadastro*/}
            <input
              type="text"
              placeholder="Nome de usuário"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} /*atualuzar o estado*/
              required
            />
            <input
              type="password"
              placeholder="Senha"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  );
}

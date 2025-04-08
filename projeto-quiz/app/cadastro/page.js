"use client";

import { useState } from "react";
import Parse from "@/lib/parseConfig";
import { useRouter } from "next/navigation";
import { Cabecalho } from "@/components/cabecalho";

export default function CadastroPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleCadastro = async (e) => {
    e.preventDefault();

    const user = new Parse.User();
    user.set("username", username);
    user.set("email", email);
    user.set("password", password);

    try {
      await user.signUp();
      alert("Usuário cadastrado com sucesso!");
      router.push("/login");
    } catch (error) {
      alert("Erro ao cadastrar: " + error.message);
      console.error("Erro:", error);
    }
  };

  return (
    <>
      <Cabecalho />
      <div className="box-container">
        <div className="home-container">
          <h1>Cadastro</h1>
          <form className="form-container" onSubmit={handleCadastro}>
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
              onChange={(e) => setEmail(e.target.value)}
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

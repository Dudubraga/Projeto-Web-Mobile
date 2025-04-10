"use client";

import { useEffect, useState } from "react";
import Parse from "@/lib/parseConfig";
import { useRouter } from "next/navigation";
import { Cabecalho } from "@/components/cabecalho";

export default function UsuarioPage() {
  const [user, setUser] = useState(null);
  const [novaSenha, setNovaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  useEffect(() => {
    //roda uma vez quando a pagina carrega
    const currentUser = Parse.User.current(); //pega o usuario logado
    if (currentUser) {
      setUser(currentUser); //seta usuario
    } else {
      // se não estiver logado, redireciona pro login
      router.push("/login");
    }
  }, []);

  const handleAlterarSenha = async (e) => {
    e.preventDefault();
    setMensagem("");

    const user = Parse.User.current();
    try {
      user.setPassword(novaSenha);
      await user.save();
      setMensagem("Senha alterada com sucesso!");
    } catch (err) {
      console.error("Erro ao alterar senha:", err.message || err);
      setMensagem("Erro ao alterar senha. Tente novamente.");
    }
  };

  return (
    <>
      <Cabecalho />
      <div className="box-container">
        <div className="home-container">
          <h1>Informações do Usuário</h1>
          {user ? (
            <div>
              <p>
                <strong>nome de usuário:</strong> {user.get("username")}
              </p>
              <p>
                <strong>email:</strong> {user.get("email")}
              </p>
              <p>
                <strong>questões acertadas:</strong> {user.get("pontuacao")}
              </p>
              <p>
                <strong>questões respondidas:</strong>{" "}
                {user.get("questoesRespondidas")}
              </p>
            </div>
          ) : (
            <p>carregando...</p>
          )}
          <form onSubmit={handleAlterarSenha}>
            <input
              type="password"
              placeholder="Digite a nova senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required
            />
            <button type="submit">Alterar Senha</button>
          </form>
          {mensagem && <p>{mensagem}</p>}
        </div>
      </div>
    </>
  );
}

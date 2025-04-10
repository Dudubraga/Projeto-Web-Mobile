"use client";

import { useEffect, useState } from "react";
import Parse from "@/lib/parseConfig";
import { useRouter } from "next/navigation";
import { Cabecalho } from "@/components/cabecalho";

export default function UsuarioPage() {
  const [user, setUser] = useState(null);
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
        </div>
      </div>
    </>
  );
}

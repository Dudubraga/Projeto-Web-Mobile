"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Parse from "@/lib/parseConfig";
import { useRouter } from "next/navigation";

export function Cabecalho() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const router = useRouter();

  useEffect(() => {
    //detectar se usuario ta logado
    const user = Parse.User.current();
    setUsuarioLogado(user);
  }, []);

  const handlePerfilClick = () => {
    router.push("/pagina-usuario");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    //botão de sair
    try {
      await Parse.User.logOut();
      setUsuarioLogado(null);
      router.push("/");
    } catch (err) {
      console.error("Erro ao sair:", err);
    }
  };

  return (
    <header>
      <nav className={styles.nav}>
        QUIZ CC
        <ul>
          <Link href="/">
            <li>Home</li>
          </Link>
          <li>Períodos</li>
          {/*aqui é a lógica pra o que vai aparecer na tela*/}
          {usuarioLogado ? (
            <>
              <li style={{ cursor: "pointer" }} onClick={handlePerfilClick}>
                Meu Perfil
              </li>
              <li
                style={{ cursor: "pointer", color: "red" }}
                onClick={handleLogout}
              >
                Sair
              </li>
            </>
          ) : (
            <li style={{ cursor: "pointer" }} onClick={handleLoginClick}>
              Login
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

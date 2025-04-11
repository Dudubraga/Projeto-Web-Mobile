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

  const handleHomeClick = () => {
    router.push("/");
  };
  
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
        <ul>
          <li className={styles.pointer} onClick={handleHomeClick}>
            <img src="../favicon.ico" alt="Logo do Quiz" className={styles.logo}/>
          </li>
          {usuarioLogado ? (
            <>
              <li className={styles.pointer} onClick={handlePerfilClick}>
                Meu Perfil
              </li>
              <li className={styles.pointer} onClick={handleLogout}>
                Sair
              </li>
            </>
          ) : (
            <li className={styles.pointer} onClick={handleLoginClick}>
              Login
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

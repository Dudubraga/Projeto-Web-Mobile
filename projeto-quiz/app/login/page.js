"use client";

import { useState } from "react";
import Parse from "@/lib/parseConfig";
import { useRouter } from "next/navigation";
import { Cabecalho } from "@/components/cabecalho";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [captchaToken, setCaptchaToken] = useState(""); // Armazena o token do CAPTCHA
  const router = useRouter();

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token); // Atualiza o token do CAPTCHA
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    if (!captchaToken) {
      setErro("Por favor, complete o CAPTCHA.");
      return;
    }

    try {
      const user = await Parse.User.logIn(username, senha);
      if (user) {
        router.push("/");
      }
    } catch (err) {
      console.error("Erro no login:", err.message || err);
      if (err.code === 101) {
        setErro("Usuário ou senha errados.");
      } else {
        setErro("Erro genérico. Tente novamente.");
      }
    }
  };

  return (
    <>
      <Cabecalho />
      <div className="centralize">
        <div className="box-login">
          <h1>Login</h1>
          <form className="login" onSubmit={handleLogin}>
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
            <ReCAPTCHA
              sitekey="6LekxxErAAAAAL4tXh019HXctcKVt9Hd0LxQxlc4" // Chave de site fornecida
              onChange={handleCaptchaChange}
            />
            <button type="submit">Entrar</button>
          </form>

          {erro && <p style={{ color: "red", marginTop: "10px" }}>{erro}</p>}

          <div className="login-cadastrar">
            <span>Ainda não tem uma conta?</span>
            <Link href="/cadastro">Cadastrar</Link>
          </div>
        </div>
      </div>
    </>
  );
}
